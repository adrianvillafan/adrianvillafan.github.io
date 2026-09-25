import React, { useEffect, useState, useRef } from 'react'
import { useInView } from 'motion/react'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = React.memo(
  ({ value, prefix = '', suffix = '', duration = 1.5 }) => {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-20px' })

    useEffect(() => {
      if (!isInView) return

      let startTime: number | null = null
      let animationFrameId: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

        // Easing out cubic: 1 - Math.pow(1 - progress, 3)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(easeOut * value))

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          setCount(value)
        }
      }

      animationFrameId = requestAnimationFrame(animate)

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId)
      }
    }, [isInView, value, duration])

    return (
      <span ref={ref} style={{ display: 'inline-block', fontVariantNumeric: 'tabular-nums' }}>
        {prefix}
        {count}
        {suffix}
      </span>
    )
  }
)

AnimatedCounter.displayName = 'AnimatedCounter'
