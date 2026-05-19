'use client'

import { useState, useEffect } from 'react'

/* ─── DATA ──────────────────────────────────────────────────── */


const problems = [
  { icon: '🕐', title: 'Leads visiting at 2AM Dubai time', desc: 'Your team is offline. The prospect fills in a form or chats — and hears nothing back. By morning, they\'ve called someone else.' },
  { icon: '🌐', title: 'Multi-timezone, multi-language buyers', desc: 'A UHNW buyer in Shanghai shouldn\'t fall through the cracks just because they browsed your listing at the wrong hour.' },
  { icon: '📋', title: 'Chatbot data sitting in a silo', desc: 'Tidio captures rich conversations — but they never automatically reach your CRM. That\'s revenue sitting in a dashboard no one checks.' },
  { icon: '🔄', title: 'Manual follow-up taking 24–72 hours', desc: 'By the time your team sees the lead, the prospect has already toured a competitor\'s property. Speed is the new service.' },
  { icon: '📊', title: 'Zero lead enrichment', desc: 'You get a first name and an email. No LinkedIn, no company, no buying intent signal. How do you prioritize without context?' },
  { icon: '💸', title: 'Marketing spend you can\'t attribute', desc: 'You invest in ads and SEO across multiple markets, but you can\'t trace which source drives your highest-value closings.' },
]

const systemNodes = [
  { step: '01', label: 'Website Visitor', icon: '👤', desc: 'HNW prospect lands on your agency client\'s luxury listing website' },
  { step: '02', label: 'Tidio Capture', icon: '💬', desc: 'Chatbot or contact form captures intent, language, timezone & contact details' },
  { step: '03', label: 'Make Automation', icon: '⚡', desc: 'Instant trigger: data is cleaned, structured, translated if needed & routed' },
  { step: '04', label: 'Clay Enrichment', icon: '🔍', desc: 'Lead enriched with LinkedIn, company data, wealth signals & intent scoring' },
  { step: '05', label: 'CRM + Alert', icon: '🎯', desc: 'Fully qualified profile in CRM + real-time Slack/email alert to your sales team' },
]

const gulfMarkets = [
  { flag: '🇸🇦', name: 'Saudi Arabia', detail: 'Vision 2030 mega-project real estate surge' },
  { flag: '🇦🇪', name: 'United Arab Emirates', detail: 'Dubai & Abu Dhabi ultra-luxury market' },
  { flag: '🇶🇦', name: 'Qatar', detail: 'Post-World Cup luxury demand & sovereign wealth' },
]

const asiaMarkets = [
  { flag: '🇨🇳', name: 'China', detail: 'UHNW buyers seeking international asset diversification' },
  { flag: '🇮🇳', name: 'India', detail: 'Rapidly growing ultra-luxury appetite' },
  { flag: '🇲🇾', name: 'Malaysia', detail: 'Strategic Southeast Asia gateway' },
  { flag: '🇸🇬', name: 'Singapore', detail: 'Prime hub for pan-Asian wealth management' },
]

const stats = [
  { num: '< 3 min', label: 'Visitor-to-CRM time' },
  { num: '100%',   label: 'Lead capture rate' },
  { num: '24 / 7', label: 'System uptime' },
  { num: '8+',     label: 'Markets covered' },
]

const processSteps = [
  {
    num: '01',
    title: 'Discovery Call',
    sub: '45 minutes · No obligation',
    desc: 'We map your current lead flow, pinpoint the exact drop-off points, and calculate the revenue you\'re losing every month. You leave with clarity whether we work together or not.',
  },
  {
    num: '02',
    title: 'System Build',
    sub: '2–3 weeks · Done-for-you',
    desc: 'Our team builds the full Clay + Make + Tidio automation stack, connects it to your CRM, and tests every touchpoint across your target markets. You don\'t touch a line of code.',
  },
  {
    num: '03',
    title: 'Go Live & Scale',
    sub: 'Ongoing · Continuous optimization',
    desc: 'Your pipeline goes live. Leads start flowing into your CRM within minutes. We monitor, optimize, and iterate — so your system captures more, better, every single week.',
  },
]

/* ─── COMPONENT ─────────────────────────────────────────────── */

export default function Home() {
  const [openFaq, setOpenFaq]     = useState<number | null>(null)
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  /* Navbar scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Scroll-reveal animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* Close mobile menu on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const CALENDLY = 'https://calendly.com/b8-technologies' // ← remplacez par votre lien Calendly

  return (
    <>
      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          {/* Logo — placez votre fichier dans /public/logo.png */}
          <a href="#hero" aria-label="B8 Technologies - Home">
            <img
              src="/logo.png"
              alt="B8 Technologies"
              className="navbar__logo"
              style={{ height: 44, width: 'auto', objectFit: 'contain' }}
            />
          </a>

          <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
            <a href="#system"  onClick={() => setMenuOpen(false)}>The System</a>
            <a href="#markets" onClick={() => setMenuOpen(false)}>Markets</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
            <a href="#faq"     onClick={() => setMenuOpen(false)}>FAQ</a>
          </div>

          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            Book a Call
          </a>

          <button
            className="navbar__burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <main>
        {/* ══════════════════ HERO ══════════════════ */}
        <section className="hero" id="hero">
          <div className="hero__bg-grid" aria-hidden="true" />

          <div className="container hero__inner">
            <div className="tag fade-in">AI-Powered CRM Automation · Luxury Real Estate</div>

            <h1 className="hero__title fade-in fade-in--delay-1">
              Your Next <em>$10M Deal</em><br />
              Just Left Your Website.<br />
              Did You Capture It?
            </h1>

            <p className="hero__sub fade-in fade-in--delay-2">
              B8 Technologies builds automated CRM pipelines that capture every high-value prospect
              from luxury real estate agency websites — from Dubai to Singapore —
              <strong> before they vanish forever.</strong>
            </p>

            <div className="hero__ctas fade-in fade-in--delay-3">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
                Book a Free Strategy Call
              </a>
              <a href="#system" className="btn btn--ghost btn--lg">
                See How It Works →
              </a>
            </div>

            <div className="hero__scarcity fade-in fade-in--delay-4">
              <span className="pulse-dot" aria-hidden="true" />
              Only <strong>3 client slots</strong> available this quarter
            </div>
          </div>

          <div className="hero__scroll-indicator" aria-hidden="true">
            <span />
          </div>
        </section>

        {/* ══════════════════ TRUST BAR ══════════════════ */}
        <div className="trust-bar">
          <div className="container">
            <p className="trust-bar__label">POWERED BY</p>
            <div className="trust-bar__logos">
              {['Clay', 'Make', 'Tidio', 'HubSpot', 'Salesforce'].map((tool) => (
                <span key={tool} className="trust-bar__logo">{tool}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════ PROBLEM ══════════════════ */}
        <section className="section problem" id="problem">
          <div className="container">
            <div className="section__header reveal">
              <div className="tag">The Problem</div>
              <h2 className="section__title">
                It Seems Like You're Leaving{' '}
                <span className="text-crimson">Millions</span> on the Table
              </h2>
              <p className="section__sub">
                High-net-worth individuals browse luxury listings at odd hours, across time zones —
                and most agencies have no system to capture them when it matters.
              </p>
            </div>

            <div className="problem__grid">
              {problems.map((item, i) => (
                <div key={item.title} className={`problem__card reveal reveal--delay-${(i % 3) + 1}`}>
                  <span className="problem__icon" aria-hidden="true">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ SYSTEM FLOW ══════════════════ */}
        <section className="section system" id="system">
          <div className="container">
            <div className="section__header reveal">
              <div className="tag">The B8 System</div>
              <h2 className="section__title">
                From Anonymous Visitor to{' '}
                <span className="text-crimson">Qualified Lead</span> in Minutes
              </h2>
              <p className="section__sub">
                We connect your clients' websites to a fully automated CRM pipeline that works
                24/7 across every time zone — with zero manual intervention required.
              </p>
            </div>

            <div className="system__flow reveal">
              {systemNodes.map((node, i) => (
                <div key={node.step} className="system__node">
                  <div className="system__node-inner">
                    <span className="system__node-icon" aria-hidden="true">{node.icon}</span>
                    <div className="system__node-step">{node.step}</div>
                    <h3 className="system__node-label">{node.label}</h3>
                    <p className="system__node-desc">{node.desc}</p>
                  </div>
                  {i < systemNodes.length - 1 && (
                    <div className="system__arrow" aria-hidden="true">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ MARKETS ══════════════════ */}
        <section className="section markets" id="markets">
          <div className="container">
            <div className="section__header reveal">
              <div className="tag">Our Markets</div>
              <h2 className="section__title">
                Built for the World's Most{' '}
                <span className="text-crimson">Competitive</span> Luxury Markets
              </h2>
              <p className="section__sub">
                We understand the nuances — language, culture, buying cycles — of luxury real estate
                in the Gulf and Asia. That's why our systems are calibrated for these exact markets.
              </p>
            </div>

            <div className="markets__grid reveal">
              {/* Gulf */}
              <div className="markets__region">
                <div className="markets__region-header">
                  <span className="markets__region-icon" aria-hidden="true">🌙</span>
                  <h3>Gulf Region</h3>
                </div>
                <ul className="markets__list">
                  {gulfMarkets.map((c) => (
                    <li key={c.name}>
                      <span aria-label={c.name}>{c.flag}</span>
                      <div>
                        <strong>{c.name}</strong>
                        <em>{c.detail}</em>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="markets__divider" aria-hidden="true" />

              {/* Asia */}
              <div className="markets__region">
                <div className="markets__region-header">
                  <span className="markets__region-icon" aria-hidden="true">🌏</span>
                  <h3>Asia Pacific</h3>
                </div>
                <ul className="markets__list">
                  {asiaMarkets.map((c) => (
                    <li key={c.name}>
                      <span aria-label={c.name}>{c.flag}</span>
                      <div>
                        <strong>{c.name}</strong>
                        <em>{c.detail}</em>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ PROCESS ══════════════════ */}
        <section className="section process" id="process">
          <div className="container">
            <div className="section__header reveal">
              <div className="tag">How It Works</div>
              <h2 className="section__title">
                Live in 3 Steps.{' '}
                <span className="text-crimson">No Tech Team Required.</span>
              </h2>
              <p className="section__sub">
                We do the heavy lifting. You show up to one call and watch your pipeline come alive.
              </p>
            </div>

            <div className="process__steps">
              {processSteps.map((step, i) => (
                <div key={step.num} className={`process__step reveal reveal--delay-${i + 1}`}>
                  <div className="process__step-num" aria-hidden="true">{step.num}</div>
                  <div className="process__step-content">
                    <div className="process__step-sub">{step.sub}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ AUTHORITY / PROOF ══════════════════ */}
        <section className="section authority">
          <div className="container">
            <div className="authority__inner">
              <blockquote className="authority__quote reveal">
                <p>
                  "Before B8, our Tidio conversations just sat in a dashboard no one checked.
                  Now every lead is enriched, scored, and in our CRM within three minutes.
                  We closed two Dubai deals last quarter from leads we would have missed entirely."
                </p>
                <cite>— International Luxury Real Estate Agency, Dubai</cite>
              </blockquote>

              <div className="authority__stats reveal reveal--delay-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="authority__stat">
                    <strong>{stat.num}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        
        {/* ══════════════════ FINAL CTA ══════════════════ */}
        <section className="section cta-section" id="cta">
          <div className="container">
            <div className="cta-section__inner reveal">
              <div className="tag">Let's Talk</div>

              <h2 className="cta-section__title">
                How Much Revenue Are You{' '}
                <span className="text-crimson">Currently Losing</span> Every Month?
              </h2>

              <p className="cta-section__sub">
                Book a free 45-minute strategy call. We'll audit your current lead flow,
                identify exactly where prospects are disappearing, and show you the ROI
                of a fully automated pipeline — with real numbers, not promises.
                No hard sell. Just clarity.
              </p>

              <div className="cta-section__scarcity">
                <div className="scarcity-bar">
                  <div className="scarcity-bar__fill" />
                </div>
                <p>
                  <strong>🔴 Only 1 slot remaining this quarter.</strong>{' '}
                  2 of 3 client spots already claimed.
                </p>
              </div>

              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--xl"
              >
                Claim Your Free Strategy Call →
              </a>

              <p className="cta-section__note">
                No commitment. No sales pitch. Just 45 minutes of real clarity on your lead pipeline.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <img
              src="/logo.png"
              alt="B8 Technologies"
              style={{ height: 36, width: 'auto', objectFit: 'contain' }}
            />
            <p>
              AI-powered CRM automation for luxury real estate agencies worldwide.
              Capturing every lead, across every time zone.
            </p>
          </div>

          <nav className="footer__links" aria-label="Footer navigation">
            <a href="#system">The System</a>
            <a href="#markets">Markets</a>
            <a href="#process">Process</a>
            <a href="#faq">FAQ</a>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
            <a href="mailto:contact@b8-technologies.com">contact@b8-technologies.com</a>
          </nav>

          <div className="footer__legal">
            <p>© {new Date().getFullYear()} B8 Technologies LTD. All rights reserved.</p>
            <p>77 Camden Street Lower, Saint Kevin's</p>
            <p>Dublin, D02 XE80, Ireland</p>
          </div>
        </div>
      </footer>
    </>
  )
}