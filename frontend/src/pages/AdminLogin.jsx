import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../lib/api'
import { useToast } from '../context/ToastContext'
import './AdminLogin.css'

export default function AdminLogin() {
  const [form, setForm]       = useState({ username: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate              = useNavigate()
  const toast                 = useToast()

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { access, refresh } = await adminLogin(form.username, form.password)
      localStorage.setItem('as_access',  access)
      localStorage.setItem('as_refresh', refresh)
      toast('Welcome back, ' + form.username, 'success')
      navigate('/admin/dashboard')
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="admin-login-page">
      <div className="al-card">
        <div className="al-logo">
          <div className="al-logo-icon">
            <svg viewBox="0 0 34 34" fill="none" width="32" height="32">
              <rect width="34" height="34" rx="9" fill="url(#alg)"/>
              <path d="M9 24L15 11L21 19.5L25.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="25.5" cy="15" r="2.5" fill="rgba(255,255,255,0.9)"/>
              <defs>
                <linearGradient id="alg" x1="0" y1="0" x2="34" y2="34">
                  <stop offset="0%" stopColor="#1e5bce"/>
                  <stop offset="100%" stopColor="#2d7cf6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="al-logo-text">Appscore</span>
        </div>

        <h1 className="al-title">Admin Portal</h1>
        <p className="al-sub">Sign in to manage enquiries</p>

        <form className="al-form" onSubmit={handleSubmit}>
          <div className="al-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="admin"
              value={form.username}
              onChange={set('username')}
              required
              autoFocus
            />
          </div>

          <div className="al-field">
            <label>Password</label>
            <div className="al-pwd-wrap">
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={set('password')}
                required
              />
              <button
                type="button"
                className="al-eye"
                onClick={() => setShowPwd(v => !v)}
                tabIndex={-1}
              >
                {showPwd ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button type="submit" className="al-submit btn-primary" disabled={loading}>
            {loading ? <><span className="spinner" /> Signing in…</> : 'Sign In'}
          </button>
        </form>

        <p className="al-back">
          <a href="/">← Back to website</a>
        </p>
      </div>
    </main>
  )
}
