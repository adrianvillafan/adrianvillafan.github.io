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
    disabled,
    ...props
  }) => {
    return (
      <motion.button
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        disabled={disabled}
        className={`btn-ui btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
        style={{
          ...(style as any),
          opacity: disabled ? 0.65 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        {...props}
      >
        {children}
        {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
