import React, { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'motion/react'

export const CustomCursor: React.FC = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  // Motion values para el cursor
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Resortes fluidos para el anillo seguidor (física elástica estilo Linear)
  const springConfig = { damping: 26, stiffness: 340, mass: 0.5 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  const hoveredElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Desactivar en pantallas táctiles o si se prefiere movimiento reducido
    const touchQuery = window.matchMedia('(pointer: coarse)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (touchQuery.matches || reducedMotionQuery.matches) {
      setIsDisabled(true)
      return
    }

    const onPointerMove = (e: PointerEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      // Detección magnética sobre elementos interactivos
      const target = e.target as HTMLElement | null
      const interactiveEl = target?.closest(
        'button, a, input, textarea, [role="button"], .btn-ui, .interactive-card'
      ) as HTMLElement | null

      if (interactiveEl) {
        setIsHovered(true)
        hoveredElementRef.current = interactiveEl
      } else {
        setIsHovered(false)
        hoveredElementRef.current = null
      }
    }

    const onPointerDown = () => setIsClicking(true)
    const onPointerUp = () => setIsClicking(false)

    const onMouseLeave = () => {
      setIsVisible(false)
      setIsHovered(false)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [cursorX, cursorY, isVisible])

  if (isDisabled) return null

  const ringSize = isClicking ? 26 : isHovered ? 52 : 32
  const ringOffset = ringSize / 2

  return (
    <>
      {/* 🔷 Anillo exterior elástico con efecto magnético */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: -ringOffset,
          translateY: -ringOffset,
          borderRadius: '50%',
          border: isHovered
            ? '1.5px solid var(--accent-light)'
            : '1.5px solid rgba(129, 140, 248, 0.45)',
          background: isHovered
            ? 'rgba(99, 102, 241, 0.16)'
            : 'rgba(99, 102, 241, 0.03)',
          boxShadow: isHovered ? '0 0 20px rgba(99, 102, 241, 0.35)' : 'none',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.22s ease, height 0.22s ease, border-color 0.2s ease, background 0.2s ease, opacity 0.25s ease',
        }}
      />

      {/* 🔷 Punto central de precisión */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          width: 6,
          height: 6,
          translateX: -3,
          translateY: -3,
          borderRadius: '50%',
          background: isHovered ? 'var(--accent-light)' : '#ffffff',
          boxShadow: '0 0 8px var(--accent-light)',
          pointerEvents: 'none',
          zIndex: 100000,
          opacity: isVisible ? (isHovered ? 0.3 : 1) : 0,
          transition: 'opacity 0.2s ease, transform 0.15s ease',
          transform: isHovered ? 'scale(0.6)' : isClicking ? 'scale(0.8)' : 'scale(1)',
        }}
      />
    </>
  )
})

CustomCursor.displayName = 'CustomCursor'
