import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const product     = products.find(p => p.id === id)
  const [chapter, setChapter] = useState(0)

  useEffect(() => { setChapter(0) }, [id])

  if (!product) {
    return (
      <main style={{ paddingTop: '80px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '12px' }}>Product not found</h2>
          <Link to="/products" className="btn-primary">← Back to Products</Link>
        </div>
      </main>
    )
  }

  const current  = product.chapters[chapter]
  const progress = ((chapter + 1) / product.chapters.length) * 100

  return (
    <main className="pd-page" style={{ paddingTop: '80px' }}>
      {/* ── HEADER ── */}
      <div className="pd-header" style={{ borderBottom: `2px solid ${product.color}22` }}>
        <div className="container">
          <div className="pd-header-inner">
            <div className="pd-header-left">
              <Link to="/products" className="pd-back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                All Products
              </Link>
              <div className="pd-title-row">
                <div
                  className="pd-icon"
                  style={{ background: product.dimColor, border: `1.5px solid ${product.borderColor}` }}
                >
                  {product.icon}
                </div>
                <div>
                  <h1 className="pd-title">{product.title}</h1>
                  <div className="pd-meta">
                    <span
                      className="pd-category"
                      style={{ color: product.color, background: product.dimColor, border: `1px solid ${product.borderColor}` }}
                    >
                      {product.category}
                    </span>
                    <span className="pd-year">{product.year}</span>
                    <div className="pd-tech-row">
                      {product.tech.map(t => (
                        <span key={t} className="pd-tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pd-header-right">
              <div className="pd-metrics">
                {product.metrics.map(m => (
                  <div key={m.label} className="pd-metric">
                    <span className="pdm-val" style={{ color: product.color }}>{m.value}</span>
                    <span className="pdm-lbl">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="pd-progress-bar">
            <div
              className="pd-progress-fill"
              style={{ width: `${progress}%`, background: product.color }}
            />
          </div>
        </div>
      </div>

      {/* ── CHAPTER NAV ── */}
      <div className="pd-chapter-nav">
        <div className="container">
          <div className="pd-tabs">
            {product.chapters.map((ch, i) => (
              <button
                key={i}
                className={`pd-tab ${chapter === i ? 'active' : ''} ${i < chapter ? 'done' : ''}`}
                onClick={() => setChapter(i)}
                style={chapter === i ? { color: product.color, borderColor: product.color } : {}}
              >
                <span className="pd-tab-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pd-tab-label">{ch.title}</span>
              </button>
            ))}
          </div>
          {/* Dot indicators */}
          <div className="pd-dots">
            {product.chapters.map((_, i) => (
              <button
                key={i}
                className={`pd-dot ${chapter === i ? 'active' : ''}`}
                onClick={() => setChapter(i)}
                style={chapter === i ? { background: product.color } : {}}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── CHAPTER CONTENT ── */}
      <div className="pd-body">
        <div className="container">
          <div className="pd-content" key={chapter}>
            <div className="pd-content-left">
              <div className="pd-chapter-icon">{current.icon}</div>
              <p className="pd-chapter-num">Chapter {String(chapter + 1).padStart(2, '0')}</p>
              <h2 className="pd-chapter-title">{current.title}</h2>
              <p className="pd-chapter-subtitle">{current.subtitle}</p>
              <p className="pd-chapter-body">{current.body}</p>

              {/* Insight box */}
              <div
                className="pd-insight"
                style={{ borderLeft: `3px solid ${product.color}`, background: product.dimColor }}
              >
                <span className="pd-insight-label" style={{ color: product.color }}>Key Insight</span>
                <p>{current.insight}</p>
              </div>

              {/* Navigation */}
              <div className="pd-nav-actions">
                {chapter > 0 && (
                  <button className="pd-nav-btn prev" onClick={() => setChapter(c => c - 1)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                    Previous
                  </button>
                )}
                {chapter < product.chapters.length - 1 ? (
                  <button
                    className="pd-nav-btn next"
                    style={{ background: product.color }}
                    onClick={() => setChapter(c => c + 1)}
                  >
                    Next
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                ) : (
                  <Link
                    to={`/contact?product=${product.id}`}
                    className="pd-nav-btn next"
                    style={{ background: product.color }}
                  >
                    Request This Product
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                )}
              </div>
            </div>

            {/* Visual side */}
            <div className="pd-content-right">
              <div
                className="pd-visual-card"
                style={{ background: product.dimColor, border: `1px solid ${product.borderColor}` }}
              >
                <div className="pd-visual-icon">{current.icon}</div>
                <p className="pd-visual-title" style={{ color: product.color }}>{current.title}</p>
                <p className="pd-visual-sub">{current.subtitle}</p>

                {/* Chapter progress dots */}
                <div className="pd-visual-dots">
                  {product.chapters.map((_, i) => (
                    <div
                      key={i}
                      className={`pd-vdot ${i <= chapter ? 'active' : ''}`}
                      style={i <= chapter ? { background: product.color } : {}}
                    />
                  ))}
                </div>
                <p className="pd-visual-count" style={{ color: product.color }}>
                  {chapter + 1} of {product.chapters.length} chapters
                </p>
              </div>

              {/* Product quick facts */}
              <div className="pd-quick-facts">
                <h4>Quick Facts</h4>
                <div className="pd-facts-grid">
                  {product.metrics.map(m => (
                    <div key={m.label} className="pd-fact">
                      <span className="pdf-val" style={{ color: product.color }}>{m.value}</span>
                      <span className="pdf-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <section className="pd-cta" style={{ background: `linear-gradient(135deg, ${product.color}18, ${product.color}08)`, borderTop: `1px solid ${product.borderColor}` }}>
        <div className="container">
          <div className="pd-cta-inner">
            <div>
              <h2 className="heading-md">Want {product.title} for your business?</h2>
              <p>
                This product is live and proven. Our team will customise, deploy, and onboard
                your team — all within a week.
              </p>
            </div>
            <div className="pd-cta-actions">
              <Link
                to={`/contact?product=${product.id}`}
                className="btn-primary"
                style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)` }}
              >
                Request This Product
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/products" className="btn-outline">Browse All Products</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
