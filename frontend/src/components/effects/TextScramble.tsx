import React, { useState, useEffect, useRef, useCallback } from 'react'

const GLYPHS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~01'

interface TextScrambleProps {
  text: string
  className?: string
  style?: React.CSSProperties
  speed?: number
  scrambleOnHover?: boolean
  triggerOnMount?: boolean
}

export const TextScramble: React.FC<TextScrambleProps> = React.memo(
  ({
    text,
    className = '',
    style,
    speed = 30,
    scrambleOnHover = true,
    triggerOnMount = true,
  }) => {
    const [displayText, setDisplayText] = useState(text)
    const isScramblingRef = useRef(false)
    const intervalRef = useRef<number | null>(null)

    const scramble = useCallback(() => {
      if (isScramblingRef.current) return
      isScramblingRef.current = true

      let iteration = 0
      const maxIterations = text.length

      if (intervalRef.current) clearInterval(intervalRef.current)

      intervalRef.current = window.setInterval(() => {
        setDisplayText(() =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < iteration) return text[index]
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join('')
        )

        iteration += 1 / 2

        if (iteration >= maxIterations) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setDisplayText(text)
          isScramblingRef.current = false
        }
      }, speed)
    }, [text, speed])

    useEffect(() => {
      setDisplayText(text)
      if (triggerOnMount) {
        scramble()
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, [text, triggerOnMount, scramble])

    return (
      <span
        onMouseEnter={scrambleOnHover ? scramble : undefined}
        className={className}
        style={{
          display: 'inline-block',
          fontFamily: 'inherit',
          ...style,
        }}
      >
        {displayText}
      </span>
    )
  }
)

TextScramble.displayName = 'TextScramble'
