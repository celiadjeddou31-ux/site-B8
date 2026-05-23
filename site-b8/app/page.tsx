'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ─── DATA ───────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Method',   href: '#method'   },
  { label: 'Results',  href: '#results'  },
  { label: 'Services', href: '#services' },
  { label: 'Markets',  href: '#markets'  },
  { label: 'FAQ',      href: '#faq'      },
]

const LIVE_LEADS = [
  { name: 'Al-Rashid Family Office', market: 'Riyadh 🇸🇦',    value: '€ 6.2M', status: 'hot'  },
  { name: 'Zhang Wei Investments',   market: 'Shanghai 🇨🇳',   value: '€ 3.8M', status: 'warm' },
  { name: 'Patel Group Holdings',    market: 'Mumbai 🇮🇳',     value: '€ 2.1M', status: 'warm' },
  { name: 'Al-Maktoum Associates',   market: 'Dubai 🇦🇪',      value: '€ 9.4M', status: 'hot'  },
  { name: 'Tan & Partners SG',       market: 'Singapore 🇸🇬',  value: '€ 4.7M', status: 'new'  },
]

const STEPS = [
  {
    n: '01',
    title: 'Capture',
    body: "Your website automatically captures visitor intent, budget, and buying timeline through a form or/and a chatbot even outside business hours.",
    sub: 'Every interaction becomes a qualified opportunity.',
  },

  {
    n: '02',
    title: 'Qualify',
    body: "Each lead is automatically enriched with high-value business and profile insights, giving your team the context needed before the first conversation even begins.",
    sub: 'Complete lead visibility without manual research.',
  },

  {
    n: '03',
    title: 'Automate',
    body: "Every lead is instantly routed into the right follow-up journey based on intent, urgency, and profile quality — ensuring faster responses and more efficient conversions.",
    sub: 'Tailor-made workflows built to scale your pipeline.',
  },
]

const RESULTS = [
  { n: '3×',    label: 'More qualified leads captured per month, on average'  },
  { n: '90 %',  label: 'Reduction in manual data entry and follow-up tasks'   },
  { n: '48 h',  label: 'Average time from first call to fully live system'    },
  { n: '24/7',  label: 'Automated lead capture — while your team sleeps'      },
]

const SERVICES = [
  { g: '◈', title: 'Tailor-Made CRM Automation', body: "Fully customised automation systems designed around your agency’s workflow —> from lead qualification and intelligent routing to automatic follow-ups, notifications, and personalised outreach. Every process works seamlessly from end to end." },
  { g: '◉', title: 'Full Ownership & Training',  body: "You stay in complete control of your system at all times. We personally train your team in under an hour and remain available for ongoing support, updates, and optimisation whenever needed." },
  { g: '◇', title: 'Smart Form Intelligence', body: "Adaptive forms that extract intent, budget, and timeline from every visitor before the first conversation starts." },
  { g: '◈', title: 'Multi-Market Routing',    body: "Different qualification rules for Riyadh, Dubai, Singapore, and Mumbai. Cultural nuance engineered into every workflow." },
  { g: '◉', title: 'Pipeline Analytics',      body: "Live dashboards showing lead velocity, source quality, and conversion rates by market. Know exactly what's working." },
  { g: '◇', title: 'Integration & Maintenance', body: "We connect to your existing stack and keep everything running. One point of contact. Zero technical overhead for you." },
]

const MARKETS = [
  { flag: '🇸🇦', country: 'Saudi Arabia', cities: 'Riyadh · Jeddah'    },
  { flag: '🇦🇪', country: 'UAE',           cities: 'Dubai · Abu Dhabi'  },
  { flag: '🇶🇦', country: 'Qatar',         cities: 'Doha'               },
  { flag: '🇨🇳', country: 'China',         cities: 'Shanghai · Beijing' },
  { flag: '🇮🇳', country: 'India',         cities: 'Mumbai · New Delhi' },
  { flag: '🇲🇾', country: 'Malaysia',      cities: 'Kuala Lumpur'       },
  { flag: '🇸🇬', country: 'Singapore',     cities: 'City-State'         },
]

const FAQS = [
  { q: 'Who is B8 Technologies built for?',
    a: 'Luxury real estate agencies in the Gulf (Saudi Arabia, UAE, Qatar) and Asia (China, India, Malaysia, Singapore) that want to capture and convert high-net-worth leads — without growing their headcount.' },
  { q: 'What exactly do you automate?',
    a: 'We connect your website chatbot (Tidio) and contact forms to a Clay CRM pipeline, orchestrated via Make. Every lead is enriched, scored, and routed to the right agent in real time — 24 hours a day.' },
  { q: 'How long does implementation take?',
    a: "Most systems go live within 7–14 business days. We handle the full setup, integration, and QA. You don't touch a single line of code." },
  { q: 'We already have a CRM — does that matter?',
    a: 'Not at all. Clay and Make connect to over 200 tools. Your existing CRM becomes smarter without being replaced. We augment, not disrupt.' },
  { q: 'What does it cost?',
    a: "Every engagement is scoped to your specific lead volume and markets. Book a call — we'll map your current pipeline and send a transparent proposal within 48 hours. No hidden fees, ever." },
  { q: 'Why B8 Technologies and not a generic automation agency?',
    a: 'We combine luxury real estate lead psychology with technical automation precision. A buyer from Riyadh and one from Singapore have completely different decision journeys. Our systems know the difference.' },
]

const TOOLS = ['Gain Time', 'Hot Leads', 'CRM', 'Salesforce', 'HubSpot', 'Clay', '', 'Notion']

const STATUS_COLOR: Record<string, string> = {
  hot:  'bg-red-400 animate-pulse-glow',
  warm: 'bg-rose-700',
  new:  'bg-emerald-400',
}

/* ─── COMPONENT ─────────────────────────────────── */

export default function Home() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [openFaq,     setOpenFaq]     = useState<number | null>(null)
  const [activeLead,  setActiveLead]  = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const registerFades = useCallback(() => {
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observerRef.current!.observe(el))
  }, [])

  useEffect(() => { registerFades(); return () => observerRef.current?.disconnect() }, [registerFades])

  useEffect(() => {
    const id = setInterval(() => setActiveLead(p => (p + 1) % LIVE_LEADS.length), 2200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const year = new Date().getFullYear()

  /* ── shared style tokens — palette extracted from #AA0228 logo ── */
  const GOLD        = '#AA0228'   /* logo rouge cramoisi — accent principal */
  const GOLD_LIGHT  = '#CC1A3E'   /* hover — rouge plus vif                */
  const CREAM       = '#F5F0E8'   /* warm cream — titres                   */
  const CHARCOAL    = '#160A0D'   /* section alt — noir chaud              */
  const DARK_CARD   = '#100508'   /* card bg                               */
  const BORDER      = 'rgba(170,2,40,0.20)'
  const TEXT_MUTED  = '#8A7A7D'   /* warm grey                             */
  const TEXT_BODY   = '#C8C0BE'   /* warm off-white                        */
  const BLACK       = '#0A0305'   /* quasi-noir teinté rouge               */

  return (
    <main style={{ minHeight: '100vh', background: BLACK }}>

      {/* ══ NAV ══════════════════════════════════════════════════ */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: scrolled ? '0.9rem 0' : '1.5rem 0',
        background: scrolled ? 'rgba(10,10,8,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? `1px solid ${BORDER}` : 'none',
        transition: 'all 0.35s ease',
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '2.5rem' }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', flexShrink: 0 }}>
            <LogoSvg color={GOLD} size={96} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: CREAM, letterSpacing: '.02em', whiteSpace: 'nowrap' }}>
              B8 Technologies
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '2rem', marginLeft: 'auto' }} className="hidden-mobile">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{ fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', color: TEXT_MUTED, transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT_MUTED)}>
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden-mobile" style={{
            fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase',
            padding: '.55rem 1.3rem', background: GOLD, color: BLACK, fontWeight: 500,
            whiteSpace: 'nowrap', flexShrink: 0, transition: 'background .2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = GOLD_LIGHT)}
            onMouseLeave={e => (e.currentTarget.style.background = GOLD)}>
            Book a Call
          </a>

          {/* Burger */}
          <button onClick={() => setMenuOpen(o => !o)} className="show-mobile"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 4, marginLeft: 'auto' }}
            aria-label="Toggle menu" aria-expanded={menuOpen}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 1.5, background: TEXT_BODY,
                transition: 'all .3s ease', transformOrigin: 'center',
                transform: menuOpen
                  ? (i === 0 ? 'rotate(45deg) translate(4.5px,4.5px)' : i === 2 ? 'rotate(-45deg) translate(4.5px,-4.5px)' : 'scaleX(0)')
                  : 'none',
              }} />
            ))}
          </button>
        </div>

        {/* Mobile drawer */}
        <div style={{
          maxHeight: menuOpen ? 400 : 0,
          overflow: 'hidden',
          background: CHARCOAL,
          borderBottom: menuOpen ? `1px solid ${BORDER}` : 'none',
          transition: 'max-height .4s ease',
        }}>
          <div style={{ padding: menuOpen ? '1.5rem 2rem' : '0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ fontSize: '.82rem', letterSpacing: '.1em', textTransform: 'uppercase', color: TEXT_MUTED, padding: '.6rem 0', borderBottom: `1px solid rgba(255,255,255,.04)` }}>
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} style={{
              marginTop: '.5rem', padding: '.8rem', textAlign: 'center',
              background: GOLD, color: BLACK, fontSize: '.75rem', letterSpacing: '.12em',
              textTransform: 'uppercase', fontWeight: 500,
            }}>
              Book a Call
            </a>
          </div>
        </div>
      </header>


      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '8rem 2rem 5rem', display: 'flex', alignItems: 'center', gap: '4rem', minHeight: '100vh', position: 'relative' }}>
        {/* Glows */}
        <div style={{ position: 'fixed', top: 0, left: '-20%', width: 700, height: 700, background: 'radial-gradient(circle at 30% 40%, rgba(170,2,40,.22) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'fixed', top: '20%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(170,2,40,.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Left copy */}
        <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }} className="animate-slide-up">
          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD, border: `1px solid ${BORDER}`, padding: '.4rem .9rem', marginBottom: '1.8rem' }}>
            <span className="animate-pulse-glow" style={{ width: 7, height: 7, borderRadius: '50%', background: GOLD, display: 'inline-block', flexShrink: 0 }} />
            Tailor made  CRM · High-converting leads 
          </div>

          <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', color: CREAM, marginBottom: '1.4rem', fontWeight: 300, lineHeight: 1.1 }}>
            Stop {' '}
            <em className="animate-shimmer">wasting time</em>{' '}
            chasing leads{' '}
            <em className="animate-shimmer">manually</em>{' '}
          </h1>

          <p style={{ fontSize: '1.05rem', color: TEXT_MUTED, maxWidth: 500, marginBottom: '1.6rem', lineHeight: 1.8 }}>
            We build tailor-made AI automation systems for luxury real estate agencies, from lead capture to qualification and follow-up, so your team can focus on closing high-value deals instead of wasting time on manual workflows.
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '.5rem .9rem', marginBottom: '2.2rem' }}>
            {['✦ 7 markets covered', '✦ Live in under 14 days', '✦ Controlled by your team.'].map(p => (
              <li key={p} style={{ fontSize: '.72rem', letterSpacing: '.06em', color: TEXT_MUTED }}>{p}</li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.4rem' }}>
            <PrimaryBtn href="#contact" gold={GOLD} goldLight={GOLD_LIGHT} black={BLACK}>
              Book a Free Strategy Call
            </PrimaryBtn>
            <a href="#method" style={{ fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', color: TEXT_MUTED, borderBottom: '1px solid transparent', paddingBottom: 2, transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = GOLD }}
              onMouseLeave={e => { e.currentTarget.style.color = TEXT_MUTED; e.currentTarget.style.borderColor = 'transparent' }}>
              See How It Works
            </a>
          </div>

          <p style={{ fontSize: '.73rem', color: TEXT_MUTED, letterSpacing: '.03em', fontStyle: 'italic' }}>
            We onboard a limited number of agencies per quarter to guarantee quality.
          </p>
        </div>

        {/* Right — dashboard mock */}
        <div style={{ flex: '0 0 420px', position: 'relative', zIndex: 1 }} className="animate-slide-up hero-right">
          <div className="animate-glow" style={{ background: DARK_CARD, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
            {/* Chrome bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', padding: '.75rem 1rem', borderBottom: `1px solid ${BORDER}`, background: 'rgba(255,255,255,.02)' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF6058', opacity: .6, flexShrink: 0 }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FFBE2E', opacity: .6, flexShrink: 0 }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840', opacity: .6, flexShrink: 0 }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: TEXT_MUTED, marginLeft: 'auto' }}>Lead Pipeline — Live</span>
              <span className="animate-pulse-glow" style={{ fontSize: '.62rem', color: '#4AE8A0', letterSpacing: '.1em' }}>● LIVE</span>
            </div>

            {/* Leads */}
            <ul style={{ listStyle: 'none', padding: '.3rem 0' }}>
              {LIVE_LEADS.map((lead, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '.7rem',
                  padding: '.6rem 1rem', borderBottom: `1px solid rgba(255,255,255,.03)`,
                  background: i === activeLead ? 'rgba(170,2,40,.07)' : 'transparent',
                  transition: 'background .3s',
                }}>
                  <span className={STATUS_COLOR[lead.status]} style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: '.76rem', color: TEXT_BODY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.name}</span>
                    <span style={{ display: 'block', fontSize: '.64rem', color: TEXT_MUTED, letterSpacing: '.04em' }}>{lead.market}</span>
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '.95rem', color: GOLD, flexShrink: 0 }}>{lead.value}</span>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '.55rem 1rem', fontSize: '.62rem', letterSpacing: '.08em', color: TEXT_MUTED, borderTop: `1px solid ${BORDER}`, background: 'rgba(255,255,255,.015)' }}>
              <span>17 new leads today</span>
              <span style={{ color: '#4AE8A0' }}>99.9 % uptime</span>
            </div>
          </div>

          {/* Floating chips */}
          <Chip style={{ position: 'absolute', bottom: '-1.5rem', left: '-2rem' }} dark={CHARCOAL} border={BORDER} gold={GOLD} muted={TEXT_MUTED} val="+340 %" label="Lead qualification rate" />
          <Chip style={{ position: 'absolute', top: '-1.5rem', right: '-1.5rem' }} dark={CHARCOAL} border={BORDER} gold={GOLD} muted={TEXT_MUTED} val="< 90 s" label="Time to first response" />
        </div>
      </section>


      {/* ══ TRUST BAR ═══════════════════════════════════════════ */}
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '1.1rem 0', overflow: 'hidden' }}>
        <div className="animate-scroll-x" style={{ display: 'flex', gap: '3rem', width: 'max-content' }}>
          {[...TOOLS, ...TOOLS].map((t, i) => (
            <span key={i} style={{ fontSize: '.66rem', letterSpacing: '.22em', textTransform: 'uppercase', color: TEXT_MUTED, whiteSpace: 'nowrap' }}>{t}</span>
          ))}
        </div>
      </div>


      {/* ══ METHOD ══════════════════════════════════════════════ */}
      <section id="method" style={{ padding: '7rem 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 2rem' }}>
          <SectionLabel gold={GOLD}>The Method</SectionLabel>
          <H2 cream={CREAM} gold={GOLD}>From web visitor to<br /><em>qualified prospect</em> in 90 seconds.</H2>
          <p className="reveal" style={{ fontSize: '1rem', color: TEXT_MUTED, maxWidth: 560, lineHeight: 1.8, marginBottom: '3.5rem' }}>
            Most luxury agencies lose 70 % of their inbound leads to silence. We engineer the system that closes that gap, permanently.
          </p>
          <ol style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {STEPS.map((step, i) => (
              <li key={i} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                <StepCard step={step} dark={DARK_CARD} border={BORDER} gold={GOLD} cream={CREAM} muted={TEXT_MUTED} />
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* ══ RESULTS ══════════════════════════════════════════════ */}
      <section id="results" style={{ padding: '7rem 0', background: CHARCOAL, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 2rem' }}>
          <SectionLabel gold={GOLD}>The Results</SectionLabel>
          <H2 cream={CREAM} gold={GOLD}>Numbers that change<br /><em>how you work.</em></H2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '3.5rem' }}>
            {RESULTS.map((r, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 100}ms`, padding: '2.5rem 2rem', border: `1px solid ${BORDER}`, background: DARK_CARD, textAlign: 'center' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(170,2,40,.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}>
                <dt style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.8rem, 4.5vw, 4.2rem)', color: GOLD, fontWeight: 300, lineHeight: 1, marginBottom: '.8rem' }}>{r.n}</dt>
                <dd style={{ fontSize: '.82rem', color: TEXT_MUTED, lineHeight: 1.55 }}>{r.label}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══ SERVICES ═════════════════════════════════════════════ */}
      <section id="services" style={{ padding: '7rem 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 2rem' }}>
          <SectionLabel gold={GOLD}>Services</SectionLabel>
          <H2 cream={CREAM} gold={GOLD}>Everything your agency needs<br /><em>to stop losing leads.</em></H2>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '3.5rem' }}>
            {SERVICES.map((sv, i) => (
              <li key={i} className="reveal" style={{ transitionDelay: `${i * 80}ms`, padding: '2rem', border: `1px solid ${BORDER}`, background: DARK_CARD, transition: 'border-color .25s, transform .25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(170,2,40,.35)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = 'translateY(0)' }}>
                <span style={{ display: 'block', fontSize: '1.4rem', color: GOLD, marginBottom: '1rem' }}>{sv.g}</span>
                <h3 style={{ fontSize: '1.25rem', color: CREAM, marginBottom: '.7rem' }}>{sv.title}</h3>
                <p style={{ fontSize: '.85rem', color: TEXT_MUTED, lineHeight: 1.72 }}>{sv.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* ══ MARKETS ══════════════════════════════════════════════ */}
      <section id="markets" style={{ padding: '7rem 0', background: CHARCOAL, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 2rem' }}>
          <SectionLabel gold={GOLD}>Markets</SectionLabel>
          <H2 cream={CREAM} gold={GOLD}>Where the world&apos;s<br /><em>luxury buyers come from.</em></H2>
          <p className="reveal" style={{ fontSize: '1rem', color: TEXT_MUTED, maxWidth: 560, lineHeight: 1.8, marginBottom: '3.5rem' }}>
            High-net-worth buyers from the Gulf and Asia now represent the fastest-growing segment of global luxury real estate acquisitions. We are already embedded in these markets.
          </p>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {MARKETS.map((m, i) => (
              <li key={i} className="reveal" style={{ transitionDelay: `${i * 70}ms`, display: 'flex', alignItems: 'center', gap: '.75rem', padding: '1.2rem 1.4rem', border: `1px solid ${BORDER}`, background: DARK_CARD, transition: 'border-color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(170,2,40,.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}>
                <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0 }}>{m.flag}</span>
                <div>
                  <div style={{ fontSize: '.84rem', color: CREAM, fontWeight: 400 }}>{m.country}</div>
                  <div style={{ fontSize: '.68rem', color: TEXT_MUTED, letterSpacing: '.04em' }}>{m.cities}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* ══ PHILOSOPHY QUOTE ═════════════════════════════════════ */}
      <div className="reveal" style={{ padding: '5.5rem 0', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: 'linear-gradient(180deg, transparent, rgba(170,2,40,.06), transparent)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 2rem' }}>
          <blockquote style={{ position: 'relative', maxWidth: 780, margin: '0 auto 2rem', textAlign: 'center' }}>
            <span aria-hidden="true" style={{ position: 'absolute', top: '-2.5rem', left: '50%', transform: 'translateX(-50%)', fontFamily: "'Cormorant Garamond', serif", fontSize: '7rem', color: 'rgba(170,2,40,.1)', lineHeight: 1, userSelect: 'none' }}>&ldquo;</span>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.45rem, 2.8vw, 2.1rem)', color: CREAM, fontWeight: 300, lineHeight: 1.45, fontStyle: 'italic', position: 'relative' }}>
              The best negotiators never split the difference, they architect the conversation so the other side{' '}
              <em style={{ fontStyle: 'normal', color: GOLD }}>wants</em> to say yes.
            </p>
            <footer style={{ fontSize: '.66rem', letterSpacing: '.18em', textTransform: 'uppercase', color: TEXT_MUTED, marginTop: '1.4rem' }}>
              Inspired by Chris Voss &amp; Robert Cialdini
            </footer>
          </blockquote>
          <p style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center', fontSize: '.88rem', color: TEXT_MUTED, lineHeight: 1.8 }}>
            This is the philosophy behind every automation we build. We don&apos;t just capture leads — we engineer the precise moment your prospect decides to call.
          </p>
        </div>
      </div>


      {/* ══ FAQ ═══════════════════════════════════════════════════ */}
      <section id="faq" style={{ padding: '7rem 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 2rem' }}>
          <SectionLabel gold={GOLD}>FAQ</SectionLabel>
          <H2 cream={CREAM} gold={GOLD}>Questions that deserve<br /><em>a straight answer.</em></H2>
          <div className="reveal" style={{ maxWidth: 740, marginTop: '3.5rem' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.4rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.12rem', color: openFaq === i ? GOLD : CREAM, transition: 'color .2s', gap: '1rem' }}>
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.2rem', color: GOLD, flexShrink: 0 }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? 300 : 0, overflow: 'hidden', transition: 'max-height .35s ease' }}>
                  <p style={{ paddingBottom: '1.4rem', fontSize: '.87rem', color: TEXT_MUTED, lineHeight: 1.8, maxWidth: 640 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══ CONTACT CTA ══════════════════════════════════════════ */}
      <section id="contact" style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(170,2,40,.15) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="reveal" style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 2rem' }}>
          <div style={{ fontSize: '.65rem', letterSpacing: '.25em', textTransform: 'uppercase', color: GOLD, marginBottom: '1.1rem' }}>Let&apos;s Talk</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)', color: CREAM, margin: '1rem 0 1.4rem', fontWeight: 300 }}>
            Your lead pipeline deserves<br />
            <em style={{ fontStyle: 'italic', color: GOLD }}>a serious upgrade.</em>
          </h2>
          <p style={{ fontSize: '1rem', color: TEXT_MUTED, lineHeight: 1.82, marginBottom: '2rem' }}>
            Book a 30-minute strategy call. We will map your current lead flow, show you precisely where high-value prospects are slipping away, and walk you through what an automated system looks like for your agency — at zero cost and zero commitment.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', fontSize: '.7rem', letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '2rem' }}>
            <span className="animate-pulse-glow" style={{ width: 7, height: 7, borderRadius: '50%', background: GOLD, display: 'inline-block' }} />
            Only 3 onboarding slots left open this month
          </div>
          <br />
          <PrimaryBtn href="https://calendly.com/b8-technologies" gold={GOLD} goldLight={GOLD_LIGHT} black={BLACK} external>
            Book Your Free Strategy Call
          </PrimaryBtn>
          <p style={{ display: 'block', fontSize: '.72rem', color: TEXT_MUTED, letterSpacing: '.04em', fontStyle: 'italic', margin: '1.2rem 0 2rem' }}>
            No sales pitch. No pressure. Just clarity about what&apos;s possible.
          </p>
          <a href="mailto:celia.barquis@b8-technologies.com" style={{ fontSize: '.82rem', color: TEXT_MUTED, transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = TEXT_MUTED)}>
            celia.barquis@b8-technologies.com
          </a>
        </div> 
      </section>


      {/* ══ FOOTER ═══════════════════════════════════════════════ */}
      <footer style={{ padding: '5rem 0 2.5rem', background: CHARCOAL, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
            <div>
              <LogoSvg color={GOLD} size={96} style={{ marginBottom: '1.4rem' }} />
              <p style={{ fontSize: '.84rem', color: TEXT_MUTED, lineHeight: 1.7 }}>
                AI-powered CRM automation<br />for prenium real estate agencies.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
              <div style={{ fontSize: '.62rem', letterSpacing: '.22em', textTransform: 'uppercase', color: GOLD, marginBottom: '.4rem' }}>Navigation</div>
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} style={{ fontSize: '.82rem', color: TEXT_MUTED, transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
                  onMouseLeave={e => (e.currentTarget.style.color = TEXT_MUTED)}>
                  {l.label}
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
              <div style={{ fontSize: '.62rem', letterSpacing: '.22em', textTransform: 'uppercase', color: GOLD, marginBottom: '.4rem' }}>Contact</div>
              <a href="mailto:celia.barquis@b8-technologies.com" style={{ fontSize: '.82rem', color: TEXT_MUTED, transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT_MUTED)}>
                celia.barquis@b8-technologies.com
              </a>
              <a href="#contact" style={{ fontSize: '.82rem', color: TEXT_MUTED, transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT_MUTED)}>
                Book a Call
              </a>
            </div>
          </div>
          <div style={{ paddingTop: '2rem', borderTop: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
            <p style={{ fontSize: '.72rem', color: TEXT_MUTED }}>© {year} B8 Technologies LTD · Registered in Ireland</p>
            <p style={{ fontSize: '.66rem', color: TEXT_MUTED, opacity: .7 }}>77 Camden Street Lower, Saint Kevin&apos;s, Dublin, D02 XE80, Ireland</p>
          </div>
        </div>
      </footer>

      {/* Responsive helpers */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
          .hero-right    { flex: none !important; width: 100% !important; max-width: 100% !important; }
        }
        @media (max-width: 1024px) {
          .hero-right { flex: none; max-width: 480px; }
        }
      `}</style>
    </main>
  )
}

/* ─── SUB-COMPONENTS ─────────────────────────────── */

function LogoSvg({ size, style }: { color?: string; size: number; style?: React.CSSProperties }) {
  return (
    <img
      src="/logo.png"
      alt="B8 Technologies logo"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block', ...style }}
    />
  )
}

function PrimaryBtn({ href, gold, goldLight, black, children, external }: { href: string; gold: string; goldLight: string; black: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '.55rem', padding: '.85rem 1.9rem', background: gold, color: black, fontSize: '.75rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', transition: 'background .2s, transform .15s' }}
      onMouseEnter={e => { e.currentTarget.style.background = goldLight; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'translateY(0)' }}>
      {children}
      <svg viewBox="0 0 20 20" fill="none" width={16} height={16} aria-hidden="true">
        <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

function SectionLabel({ gold, children }: { gold: string; children: React.ReactNode }) {
  return (
    <div className="reveal" style={{ display: 'inline-block', fontSize: '.65rem', letterSpacing: '.25em', textTransform: 'uppercase', color: gold, marginBottom: '1.1rem' }}>
      {children}
    </div>
  )
}

function H2({ cream, gold, children }: { cream: string; gold: string; children: React.ReactNode }) {
  return (
    <h2 className="reveal" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)', color: cream, marginBottom: '1.4rem', fontWeight: 300 }}>
      {children}
    </h2>
  )
}

function StepCard({ step, dark, border, gold, cream, muted }: { step: typeof STEPS[0]; dark: string; border: string; gold: string; cream: string; muted: string }) {
  return (
    <div style={{ padding: '2.5rem', border: `1px solid ${border}`, background: dark, transition: 'border-color .3s, transform .3s', height: '100%' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(170,2,40,.35)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = 'translateY(0)' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4rem', color: 'rgba(170,2,40,.1)', lineHeight: 1, marginBottom: '1.2rem', fontWeight: 300 }}>{step.n}</div>
      <h3 style={{ fontSize: '1.55rem', color: cream, marginBottom: '.9rem' }}>{step.title}</h3>
      <p style={{ fontSize: '.87rem', color: muted, lineHeight: 1.75, marginBottom: '1.4rem' }}>{step.body}</p>
      <div style={{ fontSize: '.64rem', letterSpacing: '.1em', textTransform: 'uppercase', color: gold, paddingTop: '1rem', borderTop: `1px solid ${border}` }}>{step.sub}</div>
    </div>
  )
}

function Chip({ val, label, dark, border, gold, muted, style }: { val: string; label: string; dark: string; border: string; gold: string; muted: string; style?: React.CSSProperties }) {
  return (
    <div style={{ padding: '.65rem 1rem', background: dark, border: `1px solid ${border}`, display: 'flex', flexDirection: 'column', gap: '.15rem', ...style }}>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: gold, lineHeight: 1 }}>{val}</span>
      <span style={{ fontSize: '.62rem', letterSpacing: '.06em', color: muted, whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  )
}