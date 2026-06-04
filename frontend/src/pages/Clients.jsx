import './Clients.css'

const testimonials = [
  {
    name: 'Ananya Krishnan',
    role: 'Data Engineer, Wipro',
    quote: 'The internship at Appscore was a game-changer. I went from knowing basic Python to building production-grade data pipelines on AWS in just 4 months.',
    rating: 5,
  },
  {
    name: 'Ravi Shankar',
    role: 'DB Admin, TCS',
    quote: 'Their Oracle DBA training is the most practical I have ever done. Real scenarios, real databases, real problems. Not a single boring slide.',
    rating: 5,
  },
  {
    name: 'Preethi Mohan',
    role: 'IT Manager, Infosys',
    quote: 'We hired 3 full-stack developers through Appscore\'s staffing division. Screened perfectly, onboarded smoothly. Zero friction.',
    rating: 5,
  },
  {
    name: 'Suresh Babu',
    role: 'CTO, EdTech Startup',
    quote: 'Appscore helped us migrate a legacy Oracle database to PostgreSQL with zero downtime. Their DBA team is simply exceptional.',
    rating: 5,
  },
  {
    name: 'Kavitha Nair',
    role: 'Cloud Architect, HCL',
    quote: 'The AWS + DevOps training completely transformed how my team thinks about infrastructure. Worth every rupee.',
    rating: 5,
  },
  {
    name: 'Deepak Raj',
    role: 'Senior Developer, Cognizant',
    quote: 'Joined their Full-Stack program as a backend dev. Came out building complete React + Node applications. The mentorship is what sets Appscore apart.',
    rating: 5,
  },
]

const companies = [
  { name: 'Wipro', sector: 'IT Services' },
  { name: 'TCS', sector: 'IT Services' },
  { name: 'Infosys', sector: 'IT Services' },
  { name: 'HCL', sector: 'Technology' },
  { name: 'Cognizant', sector: 'IT Consulting' },
  { name: 'Tech Mahindra', sector: 'IT Services' },
  { name: 'Capgemini', sector: 'Consulting' },
  { name: 'Hexaware', sector: 'Technology' },
  { name: 'Mphasis', sector: 'IT Services' },
  { name: 'Zoho', sector: 'Software' },
  { name: 'Freshworks', sector: 'SaaS' },
  { name: 'Unisys', sector: 'IT Solutions' },
]

const stats = [
  { value: '700+', label: 'Students Trained' },
  { value: '120+', label: 'Client Companies' },
  { value: '95%', label: 'Placement Rate' },
  { value: '4.9/5', label: 'Avg. Rating' },
]

export default function Clients() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="page-hero">
        <div className="grid-bg" />
        <div className="container">
          <div className="section-tag"><span className="dot"/> Social Proof</div>
          <h1 className="heading-xl">
            Results that <span className="gradient-text">speak louder</span><br />
            than promises
          </h1>
          <p className="page-hero-sub">
            700+ trained professionals. 120+ client companies. Real stories from people who've been through it.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="section">
        <div className="container">
          <div className="client-stats-grid">
            {stats.map(({ value, label }) => (
              <div key={label} className="client-stat-card card">
                <div className="cs-value gradient-text">{value}</div>
                <div className="cs-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag"><span className="dot"/> Testimonials</div>
            <h2 className="heading-lg">What our community <span className="gradient-text">says</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map(({ name, role, quote, rating }) => (
              <div key={name} className="testimonial-card card">
                <div className="stars">{'⭐'.repeat(rating)}</div>
                <p className="quote">"{quote}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{name[0]}</div>
                  <div>
                    <div className="author-name">{name}</div>
                    <div className="author-role">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANIES */}
      <section className="section companies-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag"><span className="dot"/> Our Network</div>
            <h2 className="heading-lg">Our alumni work at <span className="gradient-text">top companies</span></h2>
          </div>
          <div className="companies-grid">
            {companies.map(({ name, sector }) => (
              <div key={name} className="company-card card">
                <div className="company-initial">{name[0]}</div>
                <div>
                  <div className="company-name">{name}</div>
                  <div className="company-sector">{sector}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
