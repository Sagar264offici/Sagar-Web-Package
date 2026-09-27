import { useEffect, useRef } from 'react'

type AtomCanvasProps = {
  className?: string
}

/**
 * Spinning React-atom logo rendered on a lightweight 2D canvas:
 * background glow, 3 orbit rings, 3 travelling electron dots,
 * center React mark + nucleus, and floating micro particles.
 * Fills its parent — place inside a relative container.
 */
export default function AtomCanvas({ className = '' }: AtomCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let rotation = 0
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      const radius = Math.min(width, height) * 0.29

      rotation += 0.009

      // =========================
      // BACKGROUND GLOW
      // =========================

      const backgroundGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2)

      backgroundGlow.addColorStop(0, 'rgba(97,218,251,0.12)')
      backgroundGlow.addColorStop(0.5, 'rgba(97,218,251,0.035)')
      backgroundGlow.addColorStop(1, 'rgba(97,218,251,0)')

      ctx.fillStyle = backgroundGlow
      ctx.fillRect(0, 0, width, height)

      // =========================
      // ORBIT SYSTEM
      // =========================

      const orbitWidth = radius * 1.7
      const orbitHeight = radius * 0.62

      ctx.save()
      ctx.translate(cx, cy)

      for (let i = 0; i < 3; i++) {
        ctx.save()

        ctx.rotate((Math.PI / 3) * i)

        ctx.beginPath()

        ctx.ellipse(0, 0, orbitWidth, orbitHeight, rotation, 0, Math.PI * 2)

        ctx.strokeStyle = 'rgba(97,218,251,0.9)'

        ctx.lineWidth = 2

        ctx.shadowColor = '#61DAFB'
        ctx.shadowBlur = 12

        ctx.stroke()

        ctx.restore()
      }

      ctx.restore()

      // =========================
      // MOVING DOTS
      // =========================

      for (let i = 0; i < 3; i++) {
        const orbitRotation = (Math.PI / 3) * i

        const direction = i === 1 ? -1 : 1

        const angle = rotation * direction + ((Math.PI * 2 * i) / 3)

        const x = Math.cos(angle) * orbitWidth
        const y = Math.sin(angle) * orbitHeight

        const finalX = x * Math.cos(orbitRotation) - y * Math.sin(orbitRotation)
        const finalY = x * Math.sin(orbitRotation) + y * Math.cos(orbitRotation)

        const px = cx + finalX
        const py = cy + finalY

        // Dot glow

        const dotGlow = ctx.createRadialGradient(px, py, 0, px, py, 25)

        dotGlow.addColorStop(0, 'rgba(255,255,255,1)')
        dotGlow.addColorStop(0.15, 'rgba(97,218,251,1)')
        dotGlow.addColorStop(0.45, 'rgba(97,218,251,0.35)')
        dotGlow.addColorStop(1, 'rgba(97,218,251,0)')

        ctx.fillStyle = dotGlow

        ctx.beginPath()

        ctx.arc(px, py, 25, 0, Math.PI * 2)

        ctx.fill()

        // Dot

        ctx.shadowColor = '#61DAFB'
        ctx.shadowBlur = 15

        ctx.fillStyle = '#ffffff'

        ctx.beginPath()

        ctx.arc(px, py, 4, 0, Math.PI * 2)

        ctx.fill()

        ctx.shadowBlur = 0
      }

      // =========================
      // CENTER REACT LOGO
      // =========================

      ctx.save()

      ctx.translate(cx, cy)

      ctx.rotate(rotation * 0.12)

      ctx.shadowColor = '#61DAFB'
      ctx.shadowBlur = 20

      ctx.strokeStyle = '#61DAFB'
      ctx.lineWidth = 3

      // Three React logo ellipses

      for (let i = 0; i < 3; i++) {
        ctx.save()

        ctx.rotate((Math.PI / 3) * i)

        ctx.beginPath()

        ctx.ellipse(0, 0, radius * 0.55, radius * 0.22, 0, 0, Math.PI * 2)

        ctx.stroke()

        ctx.restore()
      }

      // Center nucleus

      const nucleusGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 45)

      nucleusGlow.addColorStop(0, '#ffffff')
      nucleusGlow.addColorStop(0.15, '#61DAFB')
      nucleusGlow.addColorStop(0.4, 'rgba(97,218,251,0.5)')
      nucleusGlow.addColorStop(1, 'rgba(97,218,251,0)')

      ctx.fillStyle = nucleusGlow

      ctx.beginPath()

      ctx.arc(0, 0, 45, 0, Math.PI * 2)

      ctx.fill()

      // Core

      ctx.shadowColor = '#61DAFB'
      ctx.shadowBlur = 25

      ctx.fillStyle = '#ffffff'

      ctx.beginPath()

      ctx.arc(0, 0, 7, 0, Math.PI * 2)

      ctx.fill()

      ctx.restore()

      // =========================
      // FLOATING MICRO PARTICLES
      // =========================

      for (let i = 0; i < 18; i++) {
        const angle = rotation * 0.3 + ((Math.PI * 2 * i) / 18)

        const distance = radius * (0.75 + (i % 4) * 0.12)

        const x = cx + Math.cos(angle) * distance
        const y = cy + Math.sin(angle) * distance

        const opacity = 0.15 + (i % 3) * 0.12

        ctx.fillStyle = `rgba(97,218,251,${opacity})`

        ctx.beginPath()

        ctx.arc(x, y, i % 3 === 0 ? 2 : 1, 0, Math.PI * 2)

        ctx.fill()
      }

      if (!reduced) {
        animationId = requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} data-testid="atom-canvas" className="block h-full w-full" />
    </div>
  )
}
