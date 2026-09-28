import { motion, useScroll, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({ children, delay = 0, className = '', reducedMotion = false }: { children: ReactNode; delay?: number; className?: string; reducedMotion?: boolean }) {
  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  kicker,
  title,
  desc,
}: {
  kicker: string
  title: ReactNode
  desc?: string
}) {
  return (
    <div className="max-w-3xl">
      <Reveal reducedMotion={true}>
        <p className="text-xs tracking-[0.3em] text-gold font-semibold">{kicker}</p>
      </Reveal>
      <Reveal delay={0.08} reducedMotion={true}>
        <h2 className="font-display text-3xl md:text-5xl font-700 font-bold leading-tight mt-3">{title}</h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16} reducedMotion={true}>
          <p className="text-slate-300/90 mt-4 leading-relaxed">{desc}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Parallax({ children, className = '', reducedMotion = false }: { children: ReactNode; className?: string; reducedMotion?: boolean }) {
  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -120])
  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
