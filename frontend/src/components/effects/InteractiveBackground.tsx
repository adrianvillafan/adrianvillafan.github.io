import React, { useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
  radius: number
  color: string
  alpha: number
}

export const InteractiveBackground: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    // Verificar soporte para reducción de movimiento o pantallas táctiles
    const mediaReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mediaTouch = window.matchMedia('(pointer: coarse)')
    if (mediaReducedMotion.matches || mediaTouch.matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouseX = -9999
    let mouseY = -9999
    let targetMouseX = -9999
    let targetMouseY = -9999

    // Adaptar colores según tema
    const isDark = theme === 'dark'
    const particleColors = isDark
      ? ['#818cf8', '#38bdf8', '#34d399', '#a78bfa']
      : ['#6366f1', '#0ea5e9', '#10b981', '#8b5cf6']
    const lineColor = isDark ? 'rgba(129, 140, 248, ' : 'rgba(99, 102, 241, '

    // Ajustar densidad de partículas de manera equilibrada
    const particleCount = Math.min(Math.floor((width * height) / 24000), 55)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1.2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.45 + 0.25,
      })
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    const handlePointerLeave = () => {
      targetMouseX = -9999
      targetMouseY = -9999
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerleave', handlePointerLeave)

    // Loop de renderizado optimizado
    const render = () => {
      // Suavizado de coordenadas del mouse
      mouseX += (targetMouseX - mouseX) * 0.12
      mouseY += (targetMouseY - mouseY) * 0.12

      ctx.clearRect(0, 0, width, height)

      // 🔷 Spotlight ambiente suave que sigue al cursor
      if (mouseX > 0 && mouseY > 0) {
        const spotRadius = 280
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, spotRadius)
        const spotlightAlpha = isDark ? 0.08 : 0.045
        gradient.addColorStop(0, `rgba(99, 102, 241, ${spotlightAlpha})`)
        gradient.addColorStop(0.5, `rgba(56, 189, 248, ${spotlightAlpha * 0.4})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, spotRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Actualizar y dibujar partículas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Movimiento natural
        p.x += p.vx
        p.y += p.vy

        // Rebote elástico suave en los bordes
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Interacción gravitacional suave con el cursor
        if (mouseX > 0 && mouseY > 0) {
          const dx = mouseX - p.x
          const dy = mouseY - p.y
          const dist = Math.hypot(dx, dy)
          const maxDist = 180

          if (dist < maxDist) {
            // Atracción/desplazamiento suave simulando campo de fuerzas
            const force = (1 - dist / maxDist) * 1.5
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }

        // Dibujar nodo
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      }

      // Dibujar conexiones de red / constelaciones
      const maxConnectDistance = 110
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)

          if (dist < maxConnectDistance) {
            const alpha = (1 - dist / maxConnectDistance) * (isDark ? 0.22 : 0.15)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `${lineColor}${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        // Conexión directa al cursor si está en proximidad
        if (mouseX > 0 && mouseY > 0) {
          const dx = mouseX - particles[i].x
          const dy = mouseY - particles[i].y
          const dist = Math.hypot(dx, dy)
          if (dist < 130) {
            const alpha = (1 - dist / 130) * (isDark ? 0.35 : 0.25)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouseX, mouseY)
            ctx.strokeStyle = `${lineColor}${alpha})`
            ctx.lineWidth = 1.2
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId)
      } else {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
})

InteractiveBackground.displayName = 'InteractiveBackground'
