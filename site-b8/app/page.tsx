'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import s from './page.module.css'

/* ─── DATA ─────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Method', href: '#method' },
  { label: 'Results', href: '#results' },
  { label: 'Services', href: '#services' },
  { label: 'Markets', href: '#markets' },
  { label: 'FAQ', href: '#faq' },
]

const LIVE_LEADS = [
  { name: 'Al-Rashid Family Office', market: 'Riyadh 🇸🇦', value: '€ 6.2M', status: 'hot'  },
  { name: 'Zhang Wei Investments',   market: 'Shanghai 🇨🇳', value: '€ 3.8M', status: 'warm' },
  { name: 'Patel Group Holdings',    market: 'Mumbai 🇮🇳',   value: '€ 2.1M', status: 'warm' },
  { name: 'Al-Maktoum Associates',   market: 'Dubai 🇦🇪',    value: '€ 9.4M', status: 'hot'  },
  { name: 'Tan & Partners SG',       market: 'Singapore 🇸🇬', value: '€ 4.7M', status: 'new'  },
]

const STEPS = [
  {
    n: '01',
    title: 'Capture',
    body: 'Your Tidio chatbot and contact forms collect every visitor\'s intent, budget, and decision timeline — even outside office hours.',
    sub: 'Powered by Tidio AI + custom qualification scripts',
  },
  {
    n: '02',
    title: 'Enrich',
    body: 'Clay pulls LinkedIn data, company revenue signals, and wealth indicators on each contact automatically. Your team sees the full picture before the first call.',
    sub: '200 + data sources enriched in real time',
  },
  {
    n: '03',
    title: 'Route',
    body: 'Make triggers the right sequence: hot leads ring your phone within minutes, warm leads enter a personalised nurture flow, cold leads receive targeted content.',
    sub: 'Zero manual sorting. Every lead treated correctly.',
  },
]

const RESULTS = [
  { n: '3×',   label: 'More qualified leads captured per month, on average' },
  { n: '90 %', label: 'Reduction in manual data entry and follow-up tasks'  },
  { n: '48 h', label: 'Average time from first call to fully live system'   },
  { n: '24/7', label: 'Automated lead capture — while your team sleeps'     },
]

const SERVICES = [
  {
    glyph: '◈',
    title: 'CRM Automation',
    body: 'Clay + Make pipelines that enrich, score, and route every lead. Your agents close deals — they never touch data entry again.',
  },
  {
    glyph: '◉',
    title: 'AI Lead Capture',
    body: 'Tidio chatbots trained on your listings. They qualify Gulf and Asian buyers in their cultural context, around the clock.',
  },
  {
    glyph: '◇',
    title: 'Smart Form Intelligence',
    body: 'Adaptive forms that extract intent, budget, and timeline from every visitor before the first conversation starts.',
  },
  {
    glyph: '◈',
    title: 'Multi-Market Routing',
    body: 'Different qualification rules for Riyadh, Dubai, Singapore, and Mumbai. Cultural nuance is engineered into every workflow.',
  },
  {
    glyph: '◉',
    title: 'Pipeline Analytics',
    body: 'Live dashboards showing lead velocity, source quality, and conversion rates by market. Know exactly what\'s working.',
  },
  {
    glyph: '◇',
    title: 'Integration & Maintenance',
    body: 'We connect to your existing stack and keep everything running. One point of contact. Zero technical overhead for you.',
  },
]

const MARKETS = [
  { flag: '🇸🇦', country: 'Saudi Arabia', cities: 'Riyadh · Jeddah'       },
  { flag: '🇦🇪', country: 'UAE',           cities: 'Dubai · Abu Dhabi'     },
  { flag: '🇶🇦', country: 'Qatar',         cities: 'Doha'                  },
  { flag: '🇨🇳', country: 'China',         cities: 'Shanghai · Beijing'    },
  { flag: '🇮🇳', country: 'India',         cities: 'Mumbai · New Delhi'    },
  { flag: '🇲🇾', country: 'Malaysia',      cities: 'Kuala Lumpur'          },
  { flag: '🇸🇬', country: 'Singapore',     cities: 'City-State'            },
]

const FAQS = [
  {
    q: 'Who is B8 Technologies built for?',
    a: 'Luxury real estate agencies in the Gulf (Saudi Arabia, UAE, Qatar) and Asia (China, India, Malaysia, Singapore) that want to capture and convert high-net-worth leads — without growing their headcount.',
  },
  {
    q: 'What exactly do you automate?',
    a: 'We connect your website chatbot (Tidio) and contact forms to a Clay CRM pipeline, orchestrated via Make. Every lead is enriched, scored, and routed to the right agent in real time — 24 hours a day.',
  },
  {
    q: 'How long does implementation take?',
    a: 'Most systems go live within 7–14 business days. We handle the full setup, integration, and QA. You don\'t touch a single line of code.',
  },
  {
    q: 'We already have a CRM — does that matter?',
    a: 'Not at all. Clay and Make connect to over 200 tools. Your existing CRM becomes smarter without being replaced. We augment, not disrupt.',
  },
  {
    q: 'What does it cost?',
    a: 'Every engagement is scoped to your specific lead volume and markets. Book a call — we\'ll map your current pipeline and send a transparent proposal within 48 hours. No hidden fees, ever.',
  },
  {
    q: 'Why B8 Technologies and not a generic automation agency?',
    a: 'We combine luxury real estate lead psychology with technical automation precision. A buyer from Riyadh and one from Singapore have completely different decision journeys. Our systems know the difference.',
  },
]

const TOOLS = ['Clay', 'Make', 'Tidio', 'Salesforce', 'HubSpot', 'OpenAI', 'Zapier', 'Notion']

/* ─── COMPONENT ─────────────────────────────────────────────── */

export default function Home() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [openFaq,   setOpenFaq]   = useState<number | null>(null)
  const [activeLead, setActiveLead] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  /* scroll-aware nav */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* intersection-observer fade-ins */
  const registerFades = useCallback(() => {
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add(s.visible) }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll(`.${s.reveal}`).forEach(el => observerRef.current!.observe(el))
  }, [])

  useEffect(() => {
    registerFades()
    return () => observerRef.current?.disconnect()
  }, [registerFades])

  /* cycling live-lead highlight */
  useEffect(() => {
    const id = setInterval(() => setActiveLead(p => (p + 1) % LIVE_LEADS.length), 2200)
    return () => clearInterval(id)
  }, [])

  /* close menu on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const year = new Date().getFullYear()

  return (
    <main className={s.root}>

      {/* ══════════════════════════════════════════
          NAV
      ══════════════════════════════════════════ */}
      <header className={`${s.nav} ${scrolled ? s.navSolid : ''}`}>
        <div className={s.navWrap}>

          {/* Logo */}
          <a href="#" className={s.logoLink} aria-label="B8 Technologies home">
            <svg viewBox="0 0 90 60" className={s.logoSvg} aria-hidden="true">
              {/* stylised B */}
              <path
                d="M8 4 L8 56 L34 56 C44 56 52 49 52 40 C52 34 48 29 42 27
                   C47 25 51 20 51 14 C51 8 45 4 35 4 Z
                   M18 12 L33 12 C38 12 41 15 41 19 C41 23 38 26 33 26 L18 26 Z
                   M18 34 L34 34 C40 34 42 37 42 41 C42 45 39 48 34 48 L18 48 Z"
                fill="currentColor"
              />
              {/* figure-8 / infinity */}
              <path
                d="M65 30 C65 22 70 16 77 16 C84 16 89 22 89 30 C89 38 84 44 77 44
                   C70 44 65 38 65 30 Z
                   M57 30 C57 22 62 16 69 16 C63 21 63 39 69 44 C62 44 57 38 57 30 Z"
                fill="currentColor"
                opacity="0.7"
              />
            </svg>
            <span className={s.logoText}>B8 Technologies</span>
          </a>

          {/* Desktop links */}
          <nav className={s.navLinks} aria-label="Main navigation">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className={s.navLink}>{l.label}</a>
            ))}
          </nav>

          {/* CTA */}
          <a href="#contact" className={s.navCta}>Book a Call</a>

          {/* Burger */}
          <button
            className={`${s.burger} ${menuOpen ? s.burgerOpen : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`${s.drawer} ${menuOpen ? s.drawerOpen : ''}`} aria-hidden={!menuOpen}>
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={s.drawerLink}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className={s.drawerCta} onClick={() => setMenuOpen(false)}>
            Book a Call
          </a>
        </div>
      </header>


      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className={s.hero}>
        {/* ambient glows */}
        <div className={s.glowLeft}  aria-hidden="true" />
        <div className={s.glowRight} aria-hidden="true" />

        <div className={s.heroInner}>
          {/* Left — copy */}
          <div className={s.heroLeft}>
            <div className={s.eyebrow}>
              <span className={s.pulse} aria-hidden="true" />
              AI-Powered CRM · Luxury Real Estate
            </div>

            <h1 className={s.heroTitle}>
              Your next{' '}
              <em className={s.heroEm}>high-value buyer</em>{' '}
              is already on your site.
            </h1>

            <p className={s.heroBody}>
              B8 Technologies builds automated CRM systems that capture, qualify,
              and route leads from your luxury real estate website — across the Gulf
              and Asia — before a competitor even picks up the phone.
            </p>

            {/* Micro social proof — Cialdini: Social Proof + Authority */}
            <ul className={s.proofPills} aria-label="Trust signals">
              <li>✦ 7 markets covered</li>
              <li>✦ Live in under 14 days</li>
              <li>✦ Zero setup fee</li>
            </ul>

            <div className={s.heroCtas}>
              <a href="#contact" className={s.btnPrimary}>
                Book a Free Strategy Call
                <ArrowRight />
              </a>
              <a href="#method" className={s.btnGhost}>See How It Works</a>
            </div>

            {/* Voss: scarcity without pressure */}
            <p className={s.heroNote}>
              We onboard a limited number of agencies per quarter to guarantee quality.
            </p>
          </div>

          {/* Right — live dashboard mock */}
          <div className={s.heroRight} aria-hidden="true">
            <div className={s.dashCard}>
              {/* window chrome */}
              <div className={s.dashChrome}>
                <span className={s.dot} style={{background:'#FF6058'}} />
                <span className={s.dot} style={{background:'#FFBE2E'}} />
                <span className={s.dot} style={{background:'#28C840'}} />
                <span className={s.dashLabel}>Lead Pipeline — Live</span>
                <span className={s.liveBadge}>● LIVE</span>
              </div>

              {/* lead rows */}
              <ul className={s.leadList}>
                {LIVE_LEADS.map((lead, i) => (
                  <li
                    key={i}
                    className={`${s.leadRow} ${i === activeLead ? s.leadActive : ''}`}
                  >
                    <span className={`${s.statusDot} ${s[lead.status]}`} />
                    <span className={s.leadInfo}>
                      <span className={s.leadName}>{lead.name}</span>
                      <span className={s.leadMarket}>{lead.market}</span>
                    </span>
                    <span className={s.leadValue}>{lead.value}</span>
                  </li>
                ))}
              </ul>

              {/* footer bar */}
              <div className={s.dashFooter}>
                <span>17 new leads today</span>
                <span className={s.dashUptime}>99.9 % uptime</span>
              </div>
            </div>

            {/* floating stat chips */}
            <div className={`${s.chip} ${s.chipA}`}>
              <span className={s.chipVal}>+340 %</span>
              <span className={s.chipLbl}>Lead qualification rate</span>
            </div>
            <div className={`${s.chip} ${s.chipB}`}>
              <span className={s.chipVal}>{'< 90 s'}</span>
              <span className={s.chipLbl}>Time to first lead response</span>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════ */}
      <div className={s.trustBar}>
        <div className={s.trustScroll} aria-label="Integrated tools">
          {[...TOOLS, ...TOOLS].map((t, i) => (
            <span key={i} className={s.trustItem}>{t}</span>
          ))}
        </div>
      </div>


      {/* ══════════════════════════════════════════
          METHOD
      ══════════════════════════════════════════ */}
      <section id="method" className={s.section}>
        <div className={s.wrap}>
          <div className={`${s.reveal} ${s.label}`}>The Method</div>

          <h2 className={`${s.reveal} ${s.h2}`}>
            From web visitor to<br />
            <em>qualified prospect</em> in 90 seconds.
          </h2>

          <p className={`${s.reveal} ${s.lead}`}>
            Most luxury agencies lose 70 % of their inbound leads to silence.
            We engineer the system that closes that gap — permanently.
          </p>

          <ol className={s.steps} aria-label="Three-step method">
            {STEPS.map((step, i) => (
              <li
                key={i}
                className={`${s.reveal} ${s.stepCard}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={s.stepN}>{step.n}</div>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <p className={s.stepBody}>{step.body}</p>
                <div className={s.stepSub}>{step.sub}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          RESULTS
      ══════════════════════════════════════════ */}
      <section id="results" className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.wrap}>
          <div className={`${s.reveal} ${s.label}`}>The Results</div>

          <h2 className={`${s.reveal} ${s.h2}`}>
            Numbers that change<br />
            <em>how you work.</em>
          </h2>

          <dl className={s.resultsGrid}>
            {RESULTS.map((r, i) => (
              <div
                key={i}
                className={`${s.reveal} ${s.resultCard}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <dt className={s.resultN}>{r.n}</dt>
                <dd className={s.resultLbl}>{r.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" className={s.section}>
        <div className={s.wrap}>
          <div className={`${s.reveal} ${s.label}`}>Services</div>

          <h2 className={`${s.reveal} ${s.h2}`}>
            Everything your agency needs<br />
            <em>to stop losing leads.</em>
          </h2>

          <ul className={s.servGrid} aria-label="Service list">
            {SERVICES.map((sv, i) => (
              <li
                key={i}
                className={`${s.reveal} ${s.servCard}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className={s.servGlyph} aria-hidden="true">{sv.glyph}</span>
                <h3 className={s.servTitle}>{sv.title}</h3>
                <p className={s.servBody}>{sv.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          MARKETS
      ══════════════════════════════════════════ */}
      <section id="markets" className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.wrap}>
          <div className={`${s.reveal} ${s.label}`}>Markets</div>

          <h2 className={`${s.reveal} ${s.h2}`}>
            Where the world's<br />
            <em>luxury buyers come from.</em>
          </h2>

          <p className={`${s.reveal} ${s.lead}`}>
            High-net-worth buyers from the Gulf and Asia now represent the fastest-growing
            segment of global luxury real estate acquisitions. We are already embedded
            in these markets — and we bring that knowledge into every system we build.
          </p>

          <ul className={s.marketsGrid} aria-label="Markets served">
            {MARKETS.map((m, i) => (
              <li
                key={i}
                className={`${s.reveal} ${s.marketCard}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className={s.mFlag} aria-hidden="true">{m.flag}</span>
                <div>
                  <div className={s.mCountry}>{m.country}</div>
                  <div className={s.mCities}>{m.cities}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          PHILOSOPHY PULL-QUOTE
          (Cialdini: Authority · Liking)
      ══════════════════════════════════════════ */}
      <div className={`${s.reveal} ${s.quoteSection}`}>
        <div className={s.wrap}>
          <blockquote className={s.quoteBlock}>
            <span className={s.quoteOpen} aria-hidden="true">&ldquo;</span>
            <p className={s.quoteText}>
              The best negotiators never split the difference — they architect the
              conversation so the other side <em>wants</em> to say yes.
            </p>
            <footer className={s.quoteSource}>
              Inspired by Chris Voss &amp; Robert Cialdini
            </footer>
          </blockquote>
          <p className={s.quoteComment}>
            This is the philosophy behind every automation we build. We don&apos;t just
            capture leads — we engineer the precise moment your prospect decides to call.
          </p>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section id="faq" className={s.section}>
        <div className={s.wrap}>
          <div className={`${s.reveal} ${s.label}`}>FAQ</div>

          <h2 className={`${s.reveal} ${s.h2}`}>
            Questions that deserve<br />
            <em>a straight answer.</em>
          </h2>

          <dl className={`${s.reveal} ${s.faqList}`}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`${s.faqItem} ${openFaq === i ? s.faqItemOpen : ''}`}
              >
                <dt>
                  <button
                    className={s.faqBtn}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-body-${i}`}
                  >
                    <span>{faq.q}</span>
                    <span className={s.faqIcon} aria-hidden="true">
                      {openFaq === i ? '−' : '+'}
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-body-${i}`}
                  className={s.faqBody}
                  hidden={openFaq !== i}
                >
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          CONTACT / CTA
          (Voss: anchoring + scarcity · Cialdini: Commitment)
      ══════════════════════════════════════════ */}
      <section id="contact" className={`${s.section} ${s.contactSection}`}>
        <div className={s.contactGlow} aria-hidden="true" />
        <div className={`${s.reveal} ${s.contactBox}`}>
          <div className={s.label}>Let&apos;s Talk</div>

          <h2 className={s.contactTitle}>
            Your lead pipeline deserves<br />
            <em>a serious upgrade.</em>
          </h2>

          <p className={s.contactBody}>
            Book a 30-minute strategy call. We will map your current lead flow,
            show you precisely where high-value prospects are slipping away, and
            walk you through what an automated system looks like for your agency —
            at zero cost and zero commitment.
          </p>

          {/* Cialdini: Scarcity + Reciprocity */}
          <div className={s.scarcity}>
            <span className={s.pulse} aria-hidden="true" />
            Only 3 onboarding slots open this month
          </div>

          <a
            href="https://calendly.com/b8technologies"
            target="_blank"
            rel="noopener noreferrer"
            className={s.btnPrimaryLg}
          >
            Book Your Free Strategy Call
            <ArrowRight />
          </a>

          <p className={s.contactMicro}>
            No sales pitch. No pressure. Just clarity about what&apos;s possible.
          </p>

          {/* Contact details */}
          <div className={s.contactMeta}>
            <a href="mailto:hello@b8-technologies.com" className={s.contactEmail}>
              hello@b8-technologies.com
            </a>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footerGrid}>

            {/* Brand */}
            <div className={s.footerBrand}>
              <svg viewBox="0 0 90 60" className={s.footerLogo} aria-hidden="true">
                <path
                  d="M8 4 L8 56 L34 56 C44 56 52 49 52 40 C52 34 48 29 42 27
                     C47 25 51 20 51 14 C51 8 45 4 35 4 Z
                     M18 12 L33 12 C38 12 41 15 41 19 C41 23 38 26 33 26 L18 26 Z
                     M18 34 L34 34 C40 34 42 37 42 41 C42 45 39 48 34 48 L18 48 Z"
                  fill="currentColor"
                />
                <path
                  d="M65 30 C65 22 70 16 77 16 C84 16 89 22 89 30 C89 38 84 44 77 44
                     C70 44 65 38 65 30 Z
                     M57 30 C57 22 62 16 69 16 C63 21 63 39 69 44 C62 44 57 38 57 30 Z"
                  fill="currentColor"
                  opacity="0.7"
                />
              </svg>
              <p className={s.footerTagline}>
                AI-powered CRM automation<br />for luxury real estate agencies.
              </p>
            </div>

            {/* Navigation */}
            <nav className={s.footerNav} aria-label="Footer navigation">
              <div className={s.footerColHead}>Navigation</div>
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className={s.footerLink}>{l.label}</a>
              ))}
            </nav>

            {/* Contact */}
            <div className={s.footerContact}>
              <div className={s.footerColHead}>Contact</div>
              <a href="mailto:hello@b8-technologies.com" className={s.footerLink}>
                hello@b8-technologies.com
              </a>
              <a href="#contact" className={s.footerLink}>Book a Call</a>
            </div>
          </div>

          <div className={s.footerBottom}>
            <p>© {year} B8 Technologies LTD · Registered in Ireland</p>
            <p className={s.footerAddr}>
              77 Camden Street Lower, Saint Kevin&apos;s, Dublin, D02 XE80, Ireland
            </p>
          </div>
        </div>
      </footer>

    </main>
  )
}

/* ─── ARROW ICON ────────────────────────────────────────────── */
function ArrowRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: 16, height: 16 }}
    >
      <path
        d="M4 10h12M10 4l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}