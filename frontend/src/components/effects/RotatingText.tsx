import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface RotatingTextProps {
  words: string[]
  interval?: number
  className?: string
  style?: React.CSSProperties
}

export const RotatingText: React.FC<RotatingTextProps> = React.memo(
  ({ words, interval = 3000, className = '', style }) => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length)
      }, interval)

      return () => clearInterval(timer)
    }, [words.length, interval])

    return (
      <span
        style={{
          display: 'inline-block',
          position: 'relative',
          overflow: 'hidden',
          verticalAlign: 'bottom',
          minWidth: '280px',
          height: '1.4em',
          ...style,
        }}
        className={className}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-block',
              position: 'absolute',
              left: 0,
              right: 0,
              color: 'var(--accent-light)',
              fontWeight: 600,
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    )
  }
)

RotatingText.displayName = 'RotatingText'
