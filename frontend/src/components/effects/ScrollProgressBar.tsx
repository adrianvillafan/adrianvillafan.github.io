import React from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

export const ScrollProgressBar: React.FC = React.memo(() => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2.5px',
        background: 'linear-gradient(90deg, #6366f1 0%, #38bdf8 50%, #34d399 100%)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 100001,
        boxShadow: '0 0 10px rgba(99, 102, 241, 0.65)',
        pointerEvents: 'none',
      }}
    />
  )
})

ScrollProgressBar.displayName = 'ScrollProgressBar'
