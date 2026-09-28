import AtomCanvas from './AtomCanvas'

export default function Hero() {
  'use client'
  return (
    <header id="top" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <AtomCanvas enabled={true} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <p
            className="inline-flex items-center gap-2 text-xs tracking-[0.3em] text-electric border border-electric/30 rounded-full px-4 py-2 glass"
          >
            SAGAR PATHAK • WEB DEVELOPMENT • 01
          </p>
          <h1
            className="font-display font-bold leading-[0.95] mt-6 text-5xl md:text-7xl"
          >
            WEB<br />
            DEVELOPMENT<br />
            <span className="gold-gradient-text">PACKAGES</span>
          </h1>
          <p
            className="font-display text-2xl md:text-3xl mt-4 text-white/90"
          >
            Websites <span className="italic text-gold">built to work.</span>
          </p>
          <p
            className="text-slate-300 mt-4 max-w-lg leading-relaxed"
          >
            Professional websites for businesses, institutes and creators — designed for clarity,
            speed and real-world use.
          </p>

          <div
            className="flex flex-wrap gap-4 mt-8"
          >
            <div className="glass rounded-2xl px-6 py-4">
              <p className="text-[11px] tracking-[0.25em] text-slate-400">STARTING FROM</p>
              <p className="font-display text-3xl font-bold text-gold">₹10,000</p>
            </div>
            <div className="glass rounded-2xl px-6 py-4">
              <p className="text-[11px] tracking-[0.25em] text-slate-400">UP TO</p>
              <p className="font-display text-3xl font-bold">₹35,000</p>
            </div>
            <div className="glass rounded-2xl px-6 py-4 border-dashed">
              <p className="text-[11px] tracking-[0.25em] text-slate-400">CUSTOM APPS</p>
              <p className="font-display text-lg font-bold text-electric">QUOTED SEPARATELY</p>
            </div>
          </div>

          <div
            className="flex flex-wrap gap-3 mt-8"
          >
            <a href="#packages" className="bg-gold text-black font-semibold px-7 py-3 rounded-full hover:bg-white transition">
              View packages
            </a>
            <a
              href="/Sagar_Pathak_Web_Development_Packages_INTERACTIVE.pdf"
              download
              className="border border-white/20 px-7 py-3 rounded-full hover:border-gold hover:text-gold transition"
            >
              Download PDF brochure
            </a>
          </div>

          <p
            className="mt-6 text-xs leading-relaxed text-slate-400 max-w-lg border-l-2 border-gold/60 pl-4"
          >
            <span className="text-gold font-semibold">IMPORTANT — </span>
            Domain, hosting, database/cloud and other paid third-party infrastructure are not
            included in the development fee. Actual provider charges are paid separately by the client.
          </p>
        </div>

        <div
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-electric/20 via-violet2/20 to-gold/20 blur-3xl rounded-full" />
          <div className="relative glass rounded-[2rem] p-3 overflow-hidden">
            <img
              src="/portrait.png"
              alt="Sagar Pathak holding a glowing sphere of web technologies — React, JavaScript, Python and more"
              className="rounded-[1.6rem] w-full object-cover aspect-square"
              width={640}
              height={640}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-display font-bold">SAGAR PATHAK</p>
                <p className="text-xs text-slate-300">Web Development • Websites • Custom Apps</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-gold font-bold">
                SP
              </div>
            </div>
          </div>
          {/* floating chips */}
<div
          className="absolute -top-4 -left-4 glass rounded-full px-4 py-2 text-xs font-semibold text-electric"
        >
          ⚛ React + Three.js
        </div>
        <div
          className="absolute -bottom-4 -right-2 glass rounded-full px-4 py-2 text-xs font-semibold text-gold"
        >
          ◆ Tailwind + Motion
        </div>
        </div>
      </div>
    </header>
  )
}
