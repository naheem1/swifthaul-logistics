import { useState, useEffect } from 'react'
import './App.css'

const stats = [
  { value: '12,400+', label: 'Active Drivers' },
  { value: '98.7%', label: 'On-Time Rate' },
  { value: '47', label: 'Depot Locations' },
  { value: '£2.1B', label: 'Goods Delivered' },
]

const services = [
  {
    title: 'Same-Day Metro',
    desc: 'Guaranteed delivery within city limits by 6pm. Real-time driver tracking for every parcel.',
  },
  {
    title: 'Freight & Pallets',
    desc: 'Full and part-load nationwide. Temperature-controlled options available for sensitive cargo.',
  },
  {
    title: 'Fleet Management',
    desc: 'Live telematics, route optimisation and compliance reporting for your own vehicle fleet.',
  },
]

const ticker = [
  'Birmingham → Manchester  •  ETA 14:32',
  'Leeds → London  •  ETA 16:05',
  'Bristol → Cardiff  •  ETA 13:48',
  'Glasgow → Edinburgh  •  ETA 11:20',
  'Liverpool → Sheffield  •  ETA 15:10',
]

export default function App() {
  const [tickerIndex, setTickerIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const interval = setInterval(() => {
      setTickerIndex(i => (i + 1) % ticker.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`app ${visible ? 'visible' : ''}`}>

      <div className="topbar">
        <span className="topbar-live">&#9679; LIVE</span>
        <span className="topbar-ticker">{ticker[tickerIndex]}</span>
        <span className="topbar-right">UK Operations Centre</span>
      </div>

      <nav className="nav">
        <div className="nav-logo">
          <span className="logo-mark">S</span>
          <span className="logo-text">SWIFTHAUL</span>
        </div>
        <div className="nav-links">
          <a href="#">Services</a>
          <a href="#">Tracking</a>
          <a href="#">Fleet</a>
          <a href="#" className="nav-cta">Get a Quote</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-label">Nationwide Logistics</div>
        <h1 className="hero-title">
          Move faster.<br />
          <span className="hero-accent">Deliver smarter.</span>
        </h1>
        <p className="hero-sub">
          SwiftHaul connects 47 depots across the UK with real-time routing,
          live driver tracking, and guaranteed delivery windows for businesses
          that cannot afford to wait.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">Book a Delivery</button>
          <button className="btn-ghost">Track a Parcel &rarr;</button>
        </div>
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>3,200 deliveries in progress right now</span>
        </div>
      </section>

      <div className="stats-bar">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <section className="services">
        <div className="section-header">
          <span className="section-tag">What we do</span>
          <h2>Built for British business</h2>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-num">0{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href="#" className="service-link">Learn more &rarr;</a>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div className="cta-inner">
          <h2>Ready to move?</h2>
          <p>Join 8,000+ businesses shipping with SwiftHaul across the UK.</p>
          <button className="btn-primary">Start shipping today</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">
          <span className="logo-mark small">S</span>
          <span className="logo-text">SWIFTHAUL</span>
        </div>
        <p className="footer-copy">&copy; 2025 SwiftHaul Logistics Ltd. Registered in England &amp; Wales.</p>
        <p className="footer-note">Portfolio demo &mdash; deployed via automated CI/CD pipeline on AWS (S3 + CloudFront + GitHub Actions).</p>
      </footer>

    </div>
  )
}
