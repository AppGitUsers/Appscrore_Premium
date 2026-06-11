import { useState } from 'react'
import { submitLead } from '../lib/api'
import { useToast } from '../context/ToastContext'
import './Contact.css'

const SERVICES = [
  'IT Consulting',
  'Database Support',
  'Corporate Training',
  'Staffing & Recruitment',
  'Software Development',
  'Internship Program',
  'General Enquiry',
]

const BUDGETS   = ['< ₹50K', '₹50K – ₹2L', '₹2L – ₹10L', '₹10L+', 'Not Sure']
const TIMELINES = ['ASAP', '1 – 3 months', '3 – 6 months', '6 + months', 'Flexible']

const EMPTY = { name:'', email:'', phone:'', company:'', service:'', budget:'', timeline:'', message:'' }

export default function Contact() {
  const [form, setForm]       = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitLead(form)
      setSubmitted(true)
      toast('Enquiry sent! We\'ll be in touch shortly.', 'success')
    } catch (err) {
      toast(err.message || 'Something went wrong. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setSubmitted(false); setForm(EMPTY) }

  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="page-hero">
        <div className="grid-bg" />
        <div className="container">
          <div className="section-tag"><span className="dot" /> Let's Talk</div>
          <h1 className="heading-xl">
            Drop us a line,<br />
            <span className="gradient-text">we don't bite</span>
          </h1>
          <p className="page-hero-sub">
            Got a project, a question, or just want to explore what's possible?
            Reach out — we respond fast.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* FORM */}
            <div className="contact-form-wrap">
              {submitted ? (
                <div className="contact-success card">
                  <div className="success-animation">🚀</div>
                  <h2>Message Received!</h2>
                  <p>Our team will get back to you within 24 hours. Keep an eye on your inbox.</p>
                  <button className="btn-outline" onClick={reset}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form card" onSubmit={handleSubmit}>
                  <h2 className="form-title">Send us a message</h2>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input required type="text" placeholder="John Smith" value={form.name} onChange={set('name')} />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input required type="email" placeholder="john@company.com" value={form.email} onChange={set('email')} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={set('phone')} />
                    </div>
                    <div className="form-group">
                      <label>Company / Organisation</label>
                      <input type="text" placeholder="Acme Corp" value={form.company} onChange={set('company')} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>I'm Interested In</label>
                      <select value={form.service} onChange={set('service')}>
                        <option value="">Select a service</option>
                        {SERVICES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Timeline</label>
                      <select value={form.timeline} onChange={set('timeline')}>
                        <option value="">Select timeline</option>
                        {TIMELINES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Budget Range</label>
                    <div className="budget-options">
                      {BUDGETS.map(b => (
                        <button
                          type="button"
                          key={b}
                          className={`budget-btn ${form.budget === b ? 'selected' : ''}`}
                          onClick={() => setForm(f => ({ ...f, budget: b }))}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Tell us more *</label>
                    <textarea
                      required
                      rows="5"
                      placeholder="Describe your project, requirements, or questions…"
                      value={form.message}
                      onChange={set('message')}
                    />
                  </div>

                  <button type="submit" className="btn-primary form-submit" disabled={loading}>
                    {loading ? (
                      <><span className="spinner" /> Sending…</>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="contact-sidebar">
              <div className="contact-info card">
                <h3>Other ways to reach us</h3>
                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <div>
                    <span className="method-label">Phone</span>
                    <a href="tel:+919344983750" className="method-value">+91 93449 83750</a>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">✉️</div>
                  <div>
                    <span className="method-label">Email</span>
                    <a href="mailto:info@appscoresolutions.com" className="method-value">info@appscoresolutions.com</a>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">🕐</div>
                  <div>
                    <span className="method-label">Working Hours</span>
                    <span className="method-value">Mon–Sat, 8:00 AM – 6:00 PM</span>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div>
                    <span className="method-label">Office</span>
                    <span className="method-value">153, ROAD STREET ,VANAKAMPADI,VTC:Vanakambadi PO: Damarapakkam, District : Vellore , State : Tamil Nadu , PIN Code : 632504</span>
                  </div>
                </div>
              </div>

              <div className="response-card card">
                <div className="response-header">
                  <span className="online-dot" />
                  <span>Typically replies in</span>
                </div>
                <div className="response-time gradient-text">&lt; 24 hours</div>
                <p>On business days. We're quick.</p>
              </div>

              <div className="quick-links card">
                <h4>Quick Actions</h4>
                <div className="quick-btns">
                  <a href="tel:+918939600098" className="quick-btn">📞 Call Now</a>
                  <a
                    href="https://wa.me/918939600098"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-btn quick-btn-wa"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
