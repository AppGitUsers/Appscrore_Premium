import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import './Products.css'

export default function Products() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? products
    : products.filter(p => p.category === active)

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.06 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [filtered])

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* HERO */}
      <section className="page-hero products-hero">
        <div className="grid-bg" />
        <div className="products-hero-glow" />
        <div className="container">
          <div className="section-tag"><span className="dot" /> Ready-to-Deploy</div>
          <h1 className="heading-xl">
            Software we've built,<br />
            <span className="gradient-text">ready for your business</span>
          </h1>
          <p className="page-hero-sub">
            Battle-tested platforms built for real industries. Each one is live, proven, and
            can be configured for your business in under a week.
          </p>

          <div className="products-hero-stats">
            <div className="phs-item">
              <span className="phs-val">5</span>
              <span className="phs-lbl">Products</span>
            </div>
            <div className="phs-item">
              <span className="phs-val">20+</span>
              <span className="phs-lbl">Live Deployments</span>
            </div>
            <div className="phs-item">
              <span className="phs-val">&lt;1 wk</span>
              <span className="phs-lbl">Avg Setup Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section className="section products-section">
        <div className="container">
          {/* Filter tabs */}
          <div className="products-filter-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`pf-tab ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="products-grid">
            {filtered.map((product, i) => (
              <article
                key={product.id}
                className="product-card card reveal"
                style={{ '--delay': `${i * 0.08}s` }}
              >
                {/* Card top */}
                <div className="pc-top">
                  <div
                    className="pc-icon"
                    style={{
                      background: product.dimColor,
                      border: `1px solid ${product.borderColor}`,
                    }}
                  >
                    <span>{product.icon}</span>
                  </div>
                  <div className="pc-meta">
                    <span
                      className="pc-category"
                      style={{ color: product.color, background: product.dimColor, border: `1px solid ${product.borderColor}` }}
                    >
                      {product.category}
                    </span>
                    <span className="pc-year">{product.year}</span>
                  </div>
                </div>

                {/* Content */}
                <h2 className="pc-title">{product.title}</h2>
                <p className="pc-tagline">{product.tagline}</p>

                {/* Metrics */}
                <div className="pc-metrics">
                  {product.metrics.map(m => (
                    <div key={m.label} className="pc-metric">
                      <span className="pcm-val" style={{ color: product.color }}>{m.value}</span>
                      <span className="pcm-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="pc-tech">
                  {product.tech.map(t => (
                    <span key={t} className="pc-tech-pill">{t}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pc-actions">
                  <Link
                    to={`/products/${product.id}`}
                    className="pc-btn-primary"
                    style={{ background: product.color }}
                  >
                    View Case Study →
                  </Link>
                  <Link
                    to={`/contact?product=${product.id}`}
                    className="pc-btn-outline"
                    style={{ borderColor: product.borderColor, color: product.color }}
                  >
                    Request This
                  </Link>
                </div>

                {/* Bottom accent bar */}
                <div
                  className="pc-accent-bar"
                  style={{ background: `linear-gradient(90deg, ${product.color}, transparent)` }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="products-cta">
        <div className="container">
          <div className="pcta-inner">
            <div>
              <div className="section-tag"><span className="dot" /> Custom Build</div>
              <h2 className="heading-lg">
                Don't see exactly what you need?<br />
                <span className="gradient-text">We build it from scratch.</span>
              </h2>
              <p>
                Every product above started as a custom project. If your requirements are unique,
                our engineering team will scope and deliver a tailored solution.
              </p>
            </div>
            <div className="pcta-actions">
              <Link to="/contact" className="btn-primary">
                Start a Custom Project
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/services" className="btn-outline">See All Services</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
