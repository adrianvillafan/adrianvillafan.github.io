import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react'
import Lenis from 'lenis'

interface ScrollContextType {
  scrollY: number
  isScrolled: boolean
  scrollTo: (target: string | number) => void
  lenisInstance: Lenis | null
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Inicia Lenis para smooth scrolling tipo Apple
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Listener de scroll de Lenis
    const handleScroll = (e: any) => {
      const currentY = e.scroll || window.scrollY || 0
      setScrollY(currentY)
      setIsScrolled(currentY > 40)
    }

    lenis.on('scroll', handleScroll)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  const scrollTo = useCallback((target: string | number) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -70 })
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target)
        el?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' })
      }
    }
  }, [])

  const value = useMemo(
    () => ({
      scrollY,
      isScrolled,
      scrollTo,
      lenisInstance: lenisRef.current,
    }),
    [scrollY, isScrolled, scrollTo]
  )

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider')
  }
  return context
}
