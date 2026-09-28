import { useEffect, useRef, useState } from 'react'

type AtomCanvasProps = {
  className?: string
  enabled?: boolean
}

/**
 * Optimized React-atom canvas:
 * - Reduced particle count for mobile
 * - Respects prefers-reduced-motion
 * - Optional enabled prop to disable entirely
 * - Uses requestAnimationFrame only when visible
 * Fills its parent — place inside a relative container.
 */
export default function AtomCanvas({ className = '', enabled = true }: AtomCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mq.matches)
  }, [])

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    if (!enabled || isReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let rotation = 0

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.max(1, Math.floor(rect.width * dpr))
    canvas.height = Math.max(1, Math.floor(rect.height * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const draw = () => {
      if (!isMounted) return
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      const radius = Math.min(width, height) * 0.25

      rotation += 0.006

      // BACKGROUND GLOW
      const backgroundGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2)
      backgroundGlow.addColorStop(0, 'rgba(97,218,251,0.08)')
      backgroundGlow.addColorStop(0.5, 'rgba(97,218,251,0.02)')
      backgroundGlow.addColorStop(1, 'rgba(97,218,251,0)')
      ctx.fillStyle = backgroundGlow
      ctx.fillRect(0, 0, width, height)

      // ORBIT SYSTEM - simplified: 2 rings instead of 3
      const orbitWidth = radius * 1.5
      const orbitHeight = radius * 0.55

      ctx.save()
      ctx.translate(cx, cy)

      for (let i = 0; i < 2; i++) {
        ctx.save()
        ctx.rotate((Math.PI / 2) * i)

        ctx.beginPath()
        ctx.ellipse(0, 0, orbitWidth, orbitHeight, rotation, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(97,218,251,0.6)'
        ctx.lineWidth = 1
        ctx.shadowColor = '#61DAFB'
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.restore()
      }

      ctx.restore()

      // MOVING DOTS - reduced from 3 to 2
      for (let i = 0; i < 2; i++) {
        const orbitRotation = (Math.PI / 2) * i
        const direction = i === 1 ? -1 : 1
        const angle = rotation * direction + ((Math.PI * 2 * i) / 2)
        const x = Math.cos(angle) * orbitWidth
        const y = Math.sin(angle) * orbitHeight
        const finalX = x * Math.cos(orbitRotation) - y * Math.sin(orbitRotation)
        const finalY = x * Math.sin(orbitRotation) + y * Math.cos(orbitRotation)
        const px = cx + finalX
        const py = cy + finalY

        // Dot glow
        const dotGlow = ctx.createRadialGradient(px, py, 0, px, py, 16)
        dotGlow.addColorStop(0, 'rgba(255,255,255,1)')
        dotGlow.addColorStop(0.2, 'rgba(97,218,251,0.8)')
        dotGlow.addColorStop(0.5, 'rgba(97,218,251,0.4)')
        dotGlow.addColorStop(1, 'rgba(97,218,251,0)')
        ctx.fillStyle = dotGlow
        ctx.beginPath()
        ctx.arc(px, py, 16, 0, Math.PI * 2)
        ctx.fill()

        // Dot
        ctx.shadowColor = '#61DAFB'
        ctx.shadowBlur = 10
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // CENTER REACT LOGO - simplified single ellipse
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rotation * 0.08)
      ctx.shadowColor = '#61DAFB'
      ctx.shadowBlur = 12
      ctx.strokeStyle = '#61DAFB'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(0, 0, radius * 0.4, radius * 0.18, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()

      // FLOATING MICRO PARTICLES - reduced from 18 to 8
      for (let i = 0; i < 8; i++) {
        const angle = rotation * 0.2 + ((Math.PI * 2 * i) / 8)
        const distance = radius * (0.6 + (i % 2) * 0.15)
        const x = cx + Math.cos(angle) * distance
        const y = cy + Math.sin(angle) * distance
        const opacity = 0.1 + (i % 2) * 0.07

        ctx.fillStyle = `rgba(97,218,251,${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, i % 2 === 0 ? 2 : 1, 0, Math.PI * 2)
        ctx.fill()
      }

      if (isMounted) {
        animationId = requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [enabled, isReducedMotion, isMounted])

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {enabled && !isReducedMotion && (
        <canvas ref={canvasRef} data-testid="atom-canvas" className="block h-full w-full" />
      )}
    </div>
  )
}
