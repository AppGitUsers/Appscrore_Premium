import { Link } from 'react-router-dom'
import './About.css'

const team = [
  { name: 'Rajesh Kumar', role: 'Founder & CEO', exp: '22+ yrs', prev: 'Verizon, Mastek' },
  { name: 'Priya Suresh', role: 'Head of Training', exp: '18+ yrs', prev: 'Satyam, Patni' },
  { name: 'Arjun Nair', role: 'Lead DBA', exp: '15+ yrs', prev: 'Telstra Australia' },
  { name: 'Divya Rajan', role: 'Staffing Director', exp: '12+ yrs', prev: 'Scope International' },
]

const timeline = [
  { year: '2002', title: 'Founded in Chennai', desc: 'Started as a database consultancy with a team of 3.' },
  { year: '2008', title: 'Global Expansion', desc: 'Onboarded clients from Australia, UK, and the US.' },
  { year: '2014', title: 'Training Division Launched', desc: 'Corporate training programs for 500+ professionals.' },
  { year: '2019', title: 'Cloud & AI Focus', desc: 'Expanded curriculum to AWS, Azure, ML, and GenAI.' },
  { year: '2024', title: 'Internship Platform', desc: 'Structured data engineering internships with job placement.' },
]

export default function About() {
  return (
    <main className="about-page" style={{ paddingTop: '80px' }}>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="grid-bg" />
        <div className="container">
          <div className="section-tag"><span className="dot"/> Company Profile</div>
          <h1 className="heading-xl">
            Built by engineers,<br />
            <span className="gradient-text">for the industry</span>
          </h1>
          <p className="page-hero-sub">
            We're not a training institute that dabbles in consulting, or a consultancy that does training on the side. We're both — deeply, expertly, intentionally.
          </p>
        </div>
        <div className="about-hero-blob" />
      </section>

      {/* MISSION */}
      <section className="section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>Empower every individual and organization with the technical skills and solutions they need to lead — not just keep up — in the digital age.</p>
            </div>
            <div className="mission-card card">
              <div className="mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>Be the most trusted name in IT training, staffing, and consultancy across India and beyond — where quality isn't a promise, it's a given.</p>
            </div>
            <div className="mission-card card">
              <div className="mission-icon">💎</div>
              <h3>Our Values</h3>
              <p>Transparency. Expertise. Ownership. We treat every client and student as a long-term relationship, not a transaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section timeline-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag"><span className="dot"/> Our Journey</div>
            <h2 className="heading-lg">22 years in the making</h2>
          </div>
          <div className="timeline">
            {timeline.map(({ year, title, desc }, i) => (
              <div key={year} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content card">
                  <span className="timeline-year gradient-text">{year}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag"><span className="dot"/> Our People</div>
            <h2 className="heading-lg">The brains behind it all</h2>
          </div>
          <div className="team-grid">
            {team.map(({ name, role, exp, prev }) => (
              <div key={name} className="team-card card">
                <div className="team-avatar">
                  <div className="avatar-placeholder">{name[0]}</div>
                </div>
                <div className="team-info">
                  <h3>{name}</h3>
                  <span className="team-role">{role}</span>
                  <div className="team-meta">
                    <span>⏱ {exp}</span>
                    <span>🏢 {prev}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS LOGOS STRIP */}
      <section className="section partners-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag"><span className="dot"/> Our Alumni Have Worked At</div>
            <h2 className="heading-lg">Trusted by top <span className="gradient-text">global names</span></h2>
          </div>
          <div className="partners-row">
            {['Verizon', 'Mastek', 'Telstra', 'Satyam', 'Patni', 'Scope International', 'Big Pond', 'Infosys'].map(p => (
              <div key={p} className="partner-chip">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="about-cta card">
            <h2 className="heading-lg">Want to work with us?</h2>
            <p>Whether you're looking for training, consulting, or staffing — we'd love to hear from you.</p>
            <div className="cta-actions" style={{ marginTop: '28px' }}>
              <Link to="/contact" className="btn-primary">Get in Touch</Link>
              <Link to="/services" className="btn-outline">Our Services</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
