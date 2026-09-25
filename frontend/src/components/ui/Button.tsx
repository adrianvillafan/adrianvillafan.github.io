import React from 'react'
import { motion, HTMLMotionProps } from 'motion/react'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  children: React.ReactNode
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    variant = 'primary',
    size = 'md',
    icon,
    children,
    fullWidth = false,
    className = '',
    style,
    ...props
  }) => {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`btn-ui btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
        style={style as any}
        {...props}
      >
        {children}
        {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
