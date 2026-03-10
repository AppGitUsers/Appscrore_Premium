import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', budget: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="page-hero">
        <div className="grid-bg" />
        <div className="container">
          <div className="section-tag"><span className="dot"/> Let's Talk</div>
          <h1 className="heading-xl">
            Drop us a line,<br />
            <span className="gradient-text">we don't bite</span>
          </h1>
          <p className="page-hero-sub">
            Got a project, a question, or just want to explore what's possible? Reach out — we respond fast.
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
                  <p>Our team will get back to you within 24 hours. Check your email for a confirmation.</p>
                  <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', service:'', budget:'', message:'' }) }}>
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
                      <label>I'm Interested In</label>
                      <select value={form.service} onChange={set('service')}>
                        <option value="">Select a service</option>
                        <option>IT Consulting</option>
                        <option>Database Support</option>
                        <option>Corporate Training</option>
                        <option>Staffing & Recruitment</option>
                        <option>Software Development</option>
                        <option>Internship Program</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Budget Range</label>
                    <div className="budget-options">
                      {['< ₹50K', '₹50K–2L', '₹2L–10L', '₹10L+', 'Not Sure'].map(b => (
                        <button
                          type="button"
                          key={b}
                          className={`budget-btn ${form.budget === b ? 'selected' : ''}`}
                          onClick={() => setForm({ ...form, budget: b })}
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
                      placeholder="Describe your project, requirements, or questions..."
                      value={form.message}
                      onChange={set('message')}
                    />
                  </div>

                  <button type="submit" className="btn-primary form-submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
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
                    <a href="tel:+918939600098" className="method-value">+91 89396 00098</a>
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
                    <span className="method-value">Mon–Sat, 8:00AM – 6:00PM</span>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div>
                    <span className="method-label">Office</span>
                    <span className="method-value">No 442, Sidco Industrial Estate, 3rd Main Road, Ambattur, Chennai – 600098</span>
                  </div>
                </div>
              </div>

              <div className="response-card card">
                <div className="response-header">
                  <span className="online-dot" />
                  <span>Typically replies in</span>
                </div>
                <div className="response-time gradient-text">
                  &lt; 24 hours
                </div>
                <p>On business days. We're quick.</p>
              </div>

              <div className="quick-links card">
                <h4>Quick Actions</h4>
                <div className="quick-btns">
                  <a href="tel:+918939600098" className="quick-btn">
                    📞 Call Now
                  </a>
                  <a href="https://wa.me/918939600098" target="_blank" rel="noopener noreferrer" className="quick-btn quick-btn-wa">
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
