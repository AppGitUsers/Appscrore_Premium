import { useState } from 'react'
import { Link } from 'react-router-dom'
import { submitLead } from '../lib/api'
import { useToast } from '../context/ToastContext'
import './Careers.css'

const openings = [
  { id: 1, title: 'Senior Oracle DBA', dept: 'Database', type: 'Full-time', mode: 'Hybrid', location: 'Chennai' },
  { id: 2, title: 'Data Engineer (AWS)', dept: 'Cloud', type: 'Full-time', mode: 'Remote', location: 'India-wide' },
  { id: 3, title: 'Python Trainer', dept: 'Training', type: 'Full-time', mode: 'On-site', location: 'Chennai' },
  { id: 4, title: 'IT Recruiter', dept: 'HR & Staffing', type: 'Full-time', mode: 'Hybrid', location: 'Chennai' },
  { id: 5, title: 'React Developer', dept: 'Development', type: 'Contract', mode: 'Remote', location: 'India-wide' },
  { id: 6, title: 'SQL Server DBA', dept: 'Database', type: 'Full-time', mode: 'On-site', location: 'Chennai' },
]

const internships = [
  { title: 'Data Engineering Intern', duration: '3-6 months', skills: ['Python', 'SQL', 'AWS', 'Spark'] },
  { title: 'Full-Stack Dev Intern', duration: '3 months', skills: ['React', 'Node.js', 'MongoDB'] },
  { title: 'Cloud & DevOps Intern', duration: '3 months', skills: ['AWS', 'Docker', 'Linux', 'CI/CD'] },
]

const perks = [
  { icon: '🏠', title: 'Flexible Work', desc: 'Remote, hybrid, or on-site — you choose what works.' },
  { icon: '📚', title: 'Free Training', desc: 'Every employee gets access to all our training programs.' },
  { icon: '🌱', title: 'Career Growth', desc: 'Clear paths to senior, lead, and management roles.' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Market-leading salaries with performance bonuses.' },
  { icon: '🌍', title: 'Global Exposure', desc: 'Work with international clients and teams.' },
  { icon: '🎉', title: 'Great Culture', desc: 'Tight-knit team, fun events, and genuine mentorship.' },
]

export default function Careers() {
  const [applyFor, setApplyFor] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitLead({
        name:     form.name,
        email:    form.email,
        phone:    form.phone,
        company:  '',
        service:  'Career Application',
        budget:   '',
        timeline: '',
        message:  `Role: ${applyFor.title}\nExperience: ${form.experience || 'Not specified'}\n\n${form.message}`,
      })
      setSubmitted(true)
    } catch (err) {
      toast(err.message || 'Something went wrong. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => { setApplyFor(null); setSubmitted(false); setForm({ name: '', email: '', phone: '', experience: '', message: '' }) }

  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="page-hero">
        <div className="grid-bg" />
        <div className="container">
          <div className="section-tag"><span className="dot"/> Careers</div>
          <h1 className="heading-xl">
            Grow with people who <span className="gradient-text">actually know their stuff</span>
          </h1>
          <p className="page-hero-sub">
            Join a team where your expertise is valued, your growth is real, and your work matters to real clients.
          </p>
        </div>
      </section>

      {/* PERKS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag"><span className="dot"/> Why Join Us</div>
            <h2 className="heading-lg">Life at <span className="gradient-text">Appscore</span></h2>
          </div>
          <div className="perks-grid">
            {perks.map(({ icon, title, desc }) => (
              <div key={title} className="perk-card card">
                <div className="perk-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPENINGS */}
      <section className="section openings-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag"><span className="dot"/> Open Positions</div>
            <h2 className="heading-lg">Find your next <span className="gradient-text">challenge</span></h2>
          </div>
          <div className="openings-list">
            {openings.map(({ id, title, dept, type, mode, location }) => (
              <div key={id} className="opening-card card">
                <div className="opening-info">
                  <h3 className="opening-title">{title}</h3>
                  <div className="opening-tags">
                    <span className="tag tag-dept">{dept}</span>
                    <span className="tag tag-type">{type}</span>
                    <span className="tag tag-mode">{mode}</span>
                    <span className="tag tag-loc">📍 {location}</span>
                  </div>
                </div>
                <button
                  className="btn-primary opening-apply"
                  onClick={() => setApplyFor({ id, title })}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNSHIPS */}
      <section className="section internship-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag"><span className="dot"/> Internship Programs</div>
            <h2 className="heading-lg">Start your career <span className="gradient-text">the right way</span></h2>
          </div>
          <div className="internship-grid">
            {internships.map(({ title, duration, skills }) => (
              <div key={title} className="intern-card card">
                <h3>{title}</h3>
                <p className="intern-duration">⏱ {duration}</p>
                <div className="intern-skills">
                  {skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
                <button
                  className="btn-outline intern-apply"
                  onClick={() => setApplyFor({ id: title, title })}
                >
                  Apply for Internship
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY MODAL */}
      {applyFor && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="modal">
            {submitted ? (
              <div className="modal-success">
                <div className="success-icon">🎉</div>
                <h2>Application Sent!</h2>
                <p>We'll reach out within 2 business days.</p>
                <button className="btn-outline" style={{ marginTop: '20px' }} onClick={closeModal}>Close</button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Apply for <span className="gradient-text">{applyFor.title}</span></h2>
                  <button className="modal-close" onClick={closeModal}>✕</button>
                </div>
                <form className="apply-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input required type="text" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input required type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Years of Experience</label>
                      <select value={form.experience} onChange={e => setForm({...form, experience: e.target.value})}>
                        <option value="">Select</option>
                        <option>0-1 years (Fresher)</option>
                        <option>1-3 years</option>
                        <option>3-5 years</option>
                        <option>5-10 years</option>
                        <option>10+ years</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Why Appscore?</label>
                    <textarea rows="4" placeholder="Tell us why you'd be a great fit..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                  <button type="submit" className="btn-primary form-submit" disabled={loading}>
                    {loading ? <><span className="spinner" /> Sending…</> : <>Submit Application <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
