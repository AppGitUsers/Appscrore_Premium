import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLeads, markLeadRead, deleteLead } from '../lib/api'
import { useToast } from '../context/ToastContext'
import './AdminDashboard.css'

const SERVICE_LABELS = {
  'IT Consulting': 'IT Consulting',
  'Database Support': 'Database Support',
  'Corporate Training': 'Corporate Training',
  'Staffing & Recruitment': 'Staffing & Recruitment',
  'Software Development': 'Software Development',
  'Internship Program': 'Internship Program',
  'General Enquiry': 'General Enquiry',
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export default function AdminDashboard() {
  const navigate                    = useNavigate()
  const toast                       = useToast()
  const [data, setData]             = useState(null)
  const [loading, setLoading]       = useState(true)
  const [selected, setSelected]     = useState(null)
  const [filter, setFilter]         = useState('all')
  const [search, setSearch]         = useState('')
  const [deleting, setDeleting]     = useState(null)

  const token = localStorage.getItem('as_access')

  const fetchLeads = useCallback(async () => {
    if (!token) return navigate('/admin')
    try {
      const res = await getLeads(token)
      setData(res)
    } catch (err) {
      if (err.message.includes('401') || err.message.includes('token')) {
        localStorage.removeItem('as_access')
        localStorage.removeItem('as_refresh')
        navigate('/admin')
      } else {
        toast(err.message, 'error')
      }
    } finally {
      setLoading(false)
    }
  }, [token, navigate, toast])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const handleSelect = async lead => {
    setSelected(lead)
    if (!lead.is_read) {
      setData(prev => ({
        ...prev,
        leads: prev.leads.map(l => l.id === lead.id ? { ...l, is_read: 1 } : l),
        stats: { ...prev.stats, unread: Math.max(0, prev.stats.unread - 1) },
      }))
      try { await markLeadRead(lead.id, token) } catch {}
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Delete this lead permanently?')) return
    setDeleting(id)
    try {
      await deleteLead(id, token)
      setData(prev => ({
        ...prev,
        leads: prev.leads.filter(l => l.id !== id),
        stats: { ...prev.stats, total: prev.stats.total - 1 },
      }))
      if (selected?.id === id) setSelected(null)
      toast('Lead deleted', 'success')
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setDeleting(null)
    }
  }

  const logout = () => {
    localStorage.removeItem('as_access')
    localStorage.removeItem('as_refresh')
    navigate('/admin')
  }

  const filtered = (data?.leads || []).filter(l => {
    if (filter === 'unread' && l.is_read) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.service || '').toLowerCase().includes(q) ||
        (l.company || '').toLowerCase().includes(q)
      )
    }
    return true
  })

  if (loading) return (
    <div className="ad-loading">
      <div className="ad-spinner" />
    </div>
  )

  return (
    <div className="admin-dashboard">
      {/* TOP BAR */}
      <header className="ad-header">
        <div className="ad-header-left">
          <div className="ad-logo">
            <svg viewBox="0 0 34 34" fill="none" width="28" height="28">
              <rect width="34" height="34" rx="9" fill="url(#adg)"/>
              <path d="M9 24L15 11L21 19.5L25.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="25.5" cy="15" r="2.5" fill="rgba(255,255,255,0.9)"/>
              <defs>
                <linearGradient id="adg" x1="0" y1="0" x2="34" y2="34">
                  <stop offset="0%" stopColor="#1e5bce"/>
                  <stop offset="100%" stopColor="#2d7cf6"/>
                </linearGradient>
              </defs>
            </svg>
            <span>Appscore Admin</span>
          </div>
          <div className="ad-stats-bar">
            <div className="ad-stat-chip">
              <span className="asc-val">{data?.stats.total ?? 0}</span>
              <span className="asc-lbl">Total</span>
            </div>
            <div className="ad-stat-chip unread">
              <span className="asc-val">{data?.stats.unread ?? 0}</span>
              <span className="asc-lbl">Unread</span>
            </div>
            <div className="ad-stat-chip">
              <span className="asc-val">{data?.stats.today ?? 0}</span>
              <span className="asc-lbl">Today</span>
            </div>
          </div>
        </div>
        <div className="ad-header-right">
          <button className="ad-btn-ghost" onClick={fetchLeads} title="Refresh">
            ↻ Refresh
          </button>
          <button className="ad-btn-logout" onClick={logout}>
            Sign Out
          </button>
        </div>
      </header>

      <div className="ad-body">
        {/* LEAD LIST */}
        <div className="ad-list-pane">
          {/* Filters */}
          <div className="ad-filters">
            <div className="ad-filter-tabs">
              <button
                className={`ad-ftab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
                <span className="ad-ftab-count">{data?.stats.total ?? 0}</span>
              </button>
              <button
                className={`ad-ftab ${filter === 'unread' ? 'active' : ''}`}
                onClick={() => setFilter('unread')}
              >
                Unread
                {data?.stats.unread > 0 && (
                  <span className="ad-ftab-count unread">{data.stats.unread}</span>
                )}
              </button>
            </div>
            <input
              className="ad-search"
              type="text"
              placeholder="Search by name, email, service…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* List */}
          <div className="ad-leads-list">
            {filtered.length === 0 ? (
              <div className="ad-empty">
                <span>📭</span>
                <p>No enquiries found</p>
              </div>
            ) : filtered.map(lead => (
              <div
                key={lead.id}
                className={`ad-lead-row ${selected?.id === lead.id ? 'active' : ''} ${!lead.is_read ? 'unread' : ''}`}
                onClick={() => handleSelect(lead)}
              >
                <div className="alr-left">
                  {!lead.is_read && <span className="alr-dot" />}
                  <div className="alr-info">
                    <div className="alr-name">{lead.name}</div>
                    <div className="alr-email">{lead.email}</div>
                  </div>
                </div>
                <div className="alr-right">
                  {lead.service && (
                    <span className="alr-tag">{lead.service}</span>
                  )}
                  <span className="alr-time">{timeAgo(lead.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAIL PANEL */}
        <div className={`ad-detail-pane ${selected ? 'open' : ''}`}>
          {!selected ? (
            <div className="ad-detail-empty">
              <span>👆</span>
              <p>Select an enquiry to view details</p>
            </div>
          ) : (
            <div className="ad-detail-content">
              <div className="ad-detail-header">
                <div>
                  <h2 className="add-name">{selected.name}</h2>
                  <p className="add-date">{fmtDate(selected.created_at)} · {timeAgo(selected.created_at)}</p>
                </div>
                <div className="add-actions">
                  {selected.is_read && <span className="add-read-badge">✓ Read</span>}
                  <button
                    className="ad-btn-ghost red"
                    onClick={() => handleDelete(selected.id)}
                    disabled={deleting === selected.id}
                  >
                    {deleting === selected.id ? '…' : '🗑 Delete'}
                  </button>
                </div>
              </div>

              <div className="add-grid">
                <div className="add-field">
                  <span className="add-label">Email</span>
                  <a href={`mailto:${selected.email}`} className="add-val link">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div className="add-field">
                    <span className="add-label">Phone</span>
                    <a href={`tel:${selected.phone}`} className="add-val link">{selected.phone}</a>
                  </div>
                )}
                {selected.company && (
                  <div className="add-field">
                    <span className="add-label">Company</span>
                    <span className="add-val">{selected.company}</span>
                  </div>
                )}
                {selected.service && (
                  <div className="add-field">
                    <span className="add-label">Service</span>
                    <span className="add-val">{SERVICE_LABELS[selected.service] || selected.service}</span>
                  </div>
                )}
                {selected.budget && (
                  <div className="add-field">
                    <span className="add-label">Budget</span>
                    <span className="add-val">{selected.budget}</span>
                  </div>
                )}
                {selected.timeline && (
                  <div className="add-field">
                    <span className="add-label">Timeline</span>
                    <span className="add-val">{selected.timeline}</span>
                  </div>
                )}
              </div>

              <div className="add-message-section">
                <span className="add-label">Message</span>
                <div className="add-message">{selected.message}</div>
              </div>

              <div className="add-cta-row">
                <a
                  href={`mailto:${selected.email}?subject=Re: Your enquiry to Appscore Solutions`}
                  className="btn-primary"
                  style={{ fontSize: '0.84rem', padding: '11px 22px' }}
                >
                  ✉ Reply via Email
                </a>
                {selected.phone && (
                  <a
                    href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ fontSize: '0.84rem', padding: '11px 22px' }}
                  >
                    💬 WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
