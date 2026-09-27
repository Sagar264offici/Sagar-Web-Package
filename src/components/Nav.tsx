import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const LINKS = [
  ['Packages', '#packages'],
  ['Foundation', '#foundation'],
  ['Growth', '#growth'],
  ['Infra', '#infra'],
  ['Compare', '#compare'],
  ['Terms', '#terms'],
  ['Contact', '#contact'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 mt-4">
        <div className="glass rounded-full px-5 py-3 flex items-center justify-between">
          <a href="#top" className="font-display font-bold tracking-wide">
            SP <span className="text-gold">· PACKAGES</span>
          </a>
          <div className="hidden md:flex gap-5 text-sm text-slate-300">
            {LINKS.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-gold transition">{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/Sagar_Pathak_Web_Development_Packages_INTERACTIVE.pdf"
              download
              className="hidden sm:inline-block bg-gold text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-white transition"
            >
              PDF ↓
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden border border-white/20 rounded-full w-9 h-9"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden glass rounded-2xl mt-2 p-4 flex flex-col gap-3 text-sm"
            >
              {LINKS.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="hover:text-gold">
                  {label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
