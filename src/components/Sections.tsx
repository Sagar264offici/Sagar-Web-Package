import { motion } from 'framer-motion'
import { PACKAGES, FOUNDATION, INFRA, COMPARISON_ROWS, TERMS, SOCIALS } from '../data'
import { Reveal, SectionHeading } from './ui'
import { GithubIcon, LinkedinIcon, InstagramIcon, PortfolioIcon } from './icons'

const SOCIAL_STYLE: Record<string, { tile: string; icon: (cls: string) => JSX.Element; glow: string }> = {
  PORTFOLIO: {
    tile: 'bg-gradient-to-br from-gold to-amber-600 text-black',
    icon: (c) => <PortfolioIcon className={c} />,
    glow: 'group-hover:shadow-[0_0_28px_rgba(245,185,66,0.45)]',
  },
  GITHUB: {
    tile: 'bg-[#161b22] text-white border border-white/20',
    icon: (c) => <GithubIcon className={c} />,
    glow: 'group-hover:shadow-[0_0_28px_rgba(255,255,255,0.25)]',
  },
  LINKEDIN: {
    tile: 'bg-[#0A66C2] text-white',
    icon: (c) => <LinkedinIcon className={c} />,
    glow: 'group-hover:shadow-[0_0_28px_rgba(10,102,194,0.6)]',
  },
  INSTAGRAM: {
    tile: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white',
    icon: (c) => <InstagramIcon className={c} />,
    glow: 'group-hover:shadow-[0_0_28px_rgba(238,42,123,0.55)]',
  },
}

function PriceCard({ pkg, index }: { pkg: (typeof PACKAGES)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="glass rounded-3xl p-7 flex flex-col relative overflow-hidden group"
      data-testid={`package-card-${pkg.id}`}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${pkg.accent}, transparent)` }}
      />
      <p className="text-xs tracking-[0.3em] text-slate-400">{pkg.name}</p>
      <p className="font-display text-4xl font-bold mt-2" style={{ color: pkg.accent }}>
        {pkg.price}
      </p>
      <p className="text-[11px] tracking-[0.2em] text-slate-400 mt-1">{pkg.pages} · {pkg.tag}</p>
      <p className="text-slate-300 mt-4 text-sm leading-relaxed">{pkg.blurb}</p>
      <ul className="mt-5 space-y-2 text-sm text-slate-200">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span style={{ color: pkg.accent }}>✓</span> {f}
          </li>
        ))}
      </ul>
      <a
        href="#compare"
        className="mt-6 text-sm font-semibold tracking-wide hover:opacity-80"
        style={{ color: pkg.accent }}
      >
        VIEW DETAILS →
      </a>
    </motion.article>
  )
}

export function Packages() {
  return (
    <section id="packages" className="max-w-7xl mx-auto px-6 py-24">
      <SectionHeading
        kicker="SAGAR PATHAK • WEB DEVELOPMENT • 02 — PACKAGE OVERVIEW"
        title={<>Four packages. <span className="gold-gradient-text">One clear scope.</span></>}
        desc="Choose a package based on the number of pages, content depth and functionality you actually need."
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">
        {PACKAGES.map((p, i) => (
          <PriceCard key={p.id} pkg={p} index={i} />
        ))}
      </div>
      <Reveal className="mt-6">
        <div className="glass rounded-3xl p-7 md:flex items-center justify-between gap-6 border-dashed">
          <div>
            <p className="text-xs tracking-[0.3em] text-electric">CUSTOM APP / PLATFORM</p>
            <p className="mt-2 text-slate-300 max-w-3xl text-sm leading-relaxed">
              Requirements first. Pricing defined separately. Dashboards, authentication,
              database-backed apps, booking systems, payments, APIs, automation and other
              workflows are scoped individually.
            </p>
          </div>
          <a href="#custom" className="mt-4 md:mt-0 inline-block border border-electric/50 text-electric px-6 py-3 rounded-full text-sm font-semibold hover:bg-electric hover:text-black transition">
            GET QUOTE →
          </a>
        </div>
      </Reveal>
    </section>
  )
}

export function Foundation() {
  return (
    <section id="foundation" className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeading
        kicker="SAGAR PATHAK • 03 — COMMON FOUNDATION"
        title={<>Every website starts with <span className="gold-gradient-text">the same baseline.</span></>}
        desc="The package price covers design, development and the listed scope. Technical setup is included; infrastructure purchase is separate."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {FOUNDATION.map((f, i) => (
          <Reveal key={f.n} delay={i * 0.05}>
            <div className="glass rounded-2xl p-6 h-full hover:border-gold/40 transition" data-testid={`foundation-${f.n}`}>
              <p className="font-display text-gold font-bold">{f.n}</p>
              <p className="font-display font-semibold text-lg mt-1">{f.title}</p>
              <p className="text-sm text-slate-300 mt-2">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-gold font-semibold">ENTRY PACKAGES — STARTER ₹10,000 · BUSINESS ₹15,000</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          {PACKAGES.slice(0, 2).map((p) => (
            <Reveal key={p.id}>
              <div className="rounded-3xl p-8 bg-gradient-to-br from-white/[0.07] to-transparent border border-white/10">
                <p className="font-display font-bold text-2xl">{p.name} <span style={{ color: p.accent }}>{p.price}</span></p>
                <p className="text-xs tracking-[0.25em] text-slate-400 mt-1">{p.tag}</p>
                <p className="mt-3 text-slate-200">{p.longBlurb}</p>
                <ul className="mt-4 grid gap-2 text-sm text-slate-300">
                  {p.features.map((f) => (
                    <li key={f}>— {f}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Growth() {
  return (
    <section id="growth" className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeading
        kicker="SAGAR PATHAK • 04 — GROWTH PACKAGES"
        title={<>Professional & <span className="gold-gradient-text">Business Pro</span></>}
        desc="For sites with more content, more detail and, at the top tier, self-managed publishing."
      />
      <div className="grid md:grid-cols-2 gap-5 mt-10">
        {PACKAGES.slice(2).map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <div className="glass rounded-3xl p-8 h-full" data-testid={`growth-${p.id}`}>
              <p className="text-xs tracking-[0.3em]" style={{ color: p.accent }}>
                {p.name} · {p.price} · {p.tag}
              </p>
              <p className="mt-3 text-slate-200">{p.longBlurb}</p>
              <p className="mt-4 text-[11px] tracking-[0.25em] text-slate-400">EVERYTHING IN PREVIOUS PACKAGE, PLUS</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><span className="text-gold">✓</span>{f}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6">
        <div className="rounded-3xl p-7 bg-gold/[0.07] border border-gold/30">
          <p className="font-display font-bold text-gold">WHEN BUSINESS PRO MAKES SENSE</p>
          <p className="text-sm text-slate-200 mt-2 leading-relaxed">
            Use it when the site needs regular content updates without developer involvement.
            CMS-backed content is an infrastructure-dependent feature and does not change the
            separate-provider-cost rule.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

export function Infra() {
  return (
    <section id="infra" className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeading
        kicker="SAGAR PATHAK • 05 — INFRASTRUCTURE"
        title={<>You pay for development. <span className="gold-gradient-text">Providers bill separately.</span></>}
        desc="Keeping these costs separate avoids surprise renewals and makes ownership clear from day one."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {INFRA.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <div className="glass rounded-2xl p-6 h-full" data-testid={`infra-${i}`}>
              <p className="font-display font-bold">{c.title}</p>
              <p className="text-xs text-gold mt-1">{c.sub}</p>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6">
        <div className="glass rounded-2xl p-6 md:flex gap-6 items-center">
          <p className="font-display font-bold whitespace-nowrap">CLIENT → PROVIDER → YOUR BUILD</p>
          <p className="text-sm text-slate-300 mt-2 md:mt-0">
            <span className="text-gold font-semibold">RECOMMENDED CLIENT-OWNED SETUP — </span>
            Client owns the domain / hosting / database accounts and pays provider bills. You handle
            setup, configuration, deployment and integration inside the agreed scope.
          </p>
        </div>
      </Reveal>
      <Reveal>
        <p className="text-xs text-slate-400 mt-4">
          <span className="text-gold font-semibold">IMPORTANT — </span>
          Actual infrastructure costs can change by provider, plan, usage and renewals. They are never
          treated as part of the fixed development fee.
        </p>
      </Reveal>
    </section>
  )
}

export function Compare() {
  const heads = ['STARTER', 'BUSINESS', 'PROFESSIONAL', 'BUSINESS PRO']
  return (
    <section id="compare" className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeading
        kicker="SAGAR PATHAK • 06 — COMPARISON AT A GLANCE"
        title={<>What each <span className="gold-gradient-text">package includes</span></>}
        desc="A check means included in scope. Infrastructure purchase remains client-paid across all tiers."
      />
      <Reveal className="mt-10">
        <div className="glass rounded-3xl overflow-hidden overflow-x-auto" data-testid="comparison-table">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="p-5 font-display">FEATURE</th>
                {heads.map((h) => (
                  <th key={h} className="p-5 font-display text-gold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((r) => (
                <tr key={r.feature} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="p-4 text-slate-200">{r.feature}</td>
                  {r.values.map((v, i) => (
                    <td key={i} className="p-4 text-center">
                      {v === true ? <span className="text-emerald-400 font-bold">✓</span>
                        : v === false ? <span className="text-slate-600">—</span>
                          : <span className="font-display font-bold">{v}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
      <p className="text-xs text-slate-400 mt-4">
        <span className="text-gold font-semibold">READING THE TABLE — </span>
        A check means the website feature is included. A dash means it belongs to a higher package or
        requires separate custom scoping. Domain, hosting, database/cloud and third-party provider
        charges are outside the development fee.
      </p>
    </section>
  )
}

export function Terms() {
  return (
    <section id="terms" className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeading
        kicker="SAGAR PATHAK • 07 — COMMERCIAL TERMS"
        title={<>Clear scope. Clear ownership. <span className="gold-gradient-text">Clear handover.</span></>}
        desc="These terms are designed to prevent the most common source of confusion in freelance web projects."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {TERMS.map((t, i) => (
          <Reveal key={t.n} delay={i * 0.05}>
            <div className="glass rounded-2xl p-6 h-full" data-testid={`term-${t.n}`}>
              <p className="font-display text-3xl font-bold text-white/15">{t.n}</p>
              <p className="font-display font-bold text-gold mt-1">{t.title}</p>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{t.desc}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.2}>
          <div id="custom" className="rounded-2xl p-6 h-full bg-gradient-to-br from-electric/15 to-violet2/15 border border-electric/30">
            <p className="font-display font-bold">CUSTOM APP / PLATFORM</p>
            <p className="text-xs text-slate-300 mt-1">Pricing is defined after requirements are clear.</p>
            <p className="text-sm text-slate-300 mt-3">
              For dashboards, portals, booking systems, auth, payments, database-backed applications,
              API integrations or automation, the quote is created separately after scope and
              architecture are defined.
            </p>
            <ol className="mt-4 space-y-2 text-sm">
              <li><span className="text-electric font-bold">01 DISCUSS — </span>Users, workflow and goals.</li>
              <li><span className="text-electric font-bold">02 SCOPE — </span>Modules, integrations and infrastructure.</li>
              <li><span className="text-electric font-bold">03 QUOTE — </span>Development fee and terms in writing.</li>
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Contact() {
  const steps = ['Select a package', 'Confirm scope', 'Build', 'Review', 'Launch']
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-20">
      <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-gold/60 via-white/10 to-electric/50 overflow-hidden">
        <div className="glass rounded-[calc(2rem-1px)] p-8 md:p-14 relative overflow-hidden">
          <div className="absolute -top-28 -right-28 w-[28rem] h-[28rem] bg-gold/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -left-24 w-[24rem] h-[24rem] bg-electric/10 blur-3xl rounded-full pointer-events-none" />

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 relative">
            <div>
              <Reveal>
                <p className="text-xs tracking-[0.3em] text-gold">SAGAR PATHAK • 08 — READY TO BUILD</p>
                <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 leading-[1.02]">
                  Let's make<br /><span className="gold-gradient-text">something real.</span>
                </h2>
              </Reveal>

              {/* identity card */}
              <Reveal delay={0.08}>
                <div className="mt-8 flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-gold via-electric to-violet2 blur-[6px] opacity-70" />
                    <img
                      src="/portrait.png"
                      alt="Portrait of Sagar Pathak, web developer"
                      width={88}
                      height={88}
                      loading="lazy"
                      decoding="async"
                      className="relative w-20 h-20 md:w-22 md:h-22 rounded-full object-cover border-2 border-white/20"
                    />
                    <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-ink" title="Available for projects" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-xl leading-tight">Sagar Pathak</p>
                    <p className="text-sm text-slate-300 mt-0.5">Web Development • Websites • Custom Apps</p>
                    <p className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-400/10 border border-emerald-300/20 rounded-full px-3 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Open for projects
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* process */}
              <Reveal delay={0.12}>
                <ol className="mt-6 flex flex-wrap items-center gap-2 text-xs" aria-label="How it works">
                  {steps.map((s, i) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-slate-200">
                        <span className="font-display font-bold text-gold">{String(i + 1).padStart(2, '0')}</span> {s}
                      </span>
                      {i < steps.length - 1 && <span className="text-slate-600">→</span>}
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-6 text-sm tracking-[0.25em] text-slate-400">STARTING AT</p>
                <p className="font-display text-4xl font-bold">₹10,000 <span className="text-lg text-slate-400">WEBSITE</span></p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href="https://sagar-horizon.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="portfolio-link"
                    className="bg-gold text-black font-semibold px-7 py-3 rounded-full hover:bg-white transition"
                  >
                    View my portfolio ↗
                  </a>
                  <a href="/Sagar_Pathak_Web_Development_Packages_INTERACTIVE.pdf" download className="border border-white/20 px-7 py-3 rounded-full hover:border-gold hover:text-gold transition" data-testid="download-pdf">
                    Brochure (PDF) ↓
                  </a>
                  <a href="#top" className="px-5 py-3 rounded-full text-slate-400 hover:text-white transition text-sm self-center">Back to top ↑</a>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.1}>
                <p className="text-xs tracking-[0.3em] text-slate-400">SOCIALS / PROFESSIONAL</p>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'PORTFOLIO', value: 'sagar-horizon.vercel.app', href: 'https://sagar-horizon.vercel.app', hero: true },
                    ...SOCIALS.map((s) => ({ ...s, hero: false })),
                  ].map((s, i) => {
                    const style = SOCIAL_STYLE[s.label]
                    return (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        data-testid={`social-${s.label.toLowerCase()}`}
                        initial={{ opacity: 0, x: 48, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ type: 'spring', stiffness: 260, damping: 19, delay: i * 0.09 }}
                        whileHover={{ scale: 1.045, x: 6 }}
                        whileTap={{ scale: 0.96 }}
                        className={`flex items-center gap-4 rounded-2xl px-5 py-4 border transition-colors group ${
                          s.hero
                            ? 'bg-gradient-to-r from-gold/15 to-electric/10 border-gold/40 hover:border-gold'
                            : 'glass hover:border-gold/50'
                        }`}
                      >
                        <motion.span
                          whileHover={{ rotate: -10, scale: 1.15 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-shadow ${style?.tile ?? ''} ${style?.glow ?? ''}`}
                        >
                          {style?.icon('w-5 h-5')}
                        </motion.span>
                        <div className="min-w-0 flex-1">
                          <p className={`text-[11px] tracking-[0.25em] ${s.hero ? 'text-gold' : 'text-slate-400'}`}>{s.label}</p>
                          <p className="font-medium truncate group-hover:text-gold transition">{s.value}</p>
                        </div>
                        <motion.span
                          className="text-gold"
                          whileHover={{ x: 3, y: -3, scale: 1.3 }}
                        >
                          ↗
                        </motion.span>
                      </motion.a>
                    )
                  })}
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-xs text-slate-400 mt-6 border-l-2 border-gold/60 pl-4 leading-relaxed">
                  <span className="text-gold font-semibold">INFRASTRUCTURE NOTE — </span>
                  Domain, hosting, database/cloud and paid third-party services are billed separately by
                  the provider. Setup and deployment are included within the agreed website scope.
                </p>
                <p className="font-display font-bold mt-6">SAGAR PATHAK</p>
                <p className="text-xs text-slate-400">Web Development • Websites • Custom Apps — THANK YOU</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center text-xs text-slate-500 mt-10">
        © {new Date().getFullYear()} Sagar Pathak · <a className="hover:text-gold transition" href="https://sagar-horizon.vercel.app" target="_blank" rel="noreferrer">Portfolio</a> · Built with React + TS + Canvas + Framer Motion + Tailwind
      </footer>
    </section>
  )
}
