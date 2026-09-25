import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FiCheckCircle, FiInfo, FiAlertCircle, FiAlertTriangle, FiX } from 'react-icons/fi'

export type ToastType = 'success' | 'info' | 'error' | 'warning'

export interface ToastItem {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const getToastIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <FiCheckCircle size={18} color="#34d399" />
    case 'error':
      return <FiAlertCircle size={18} color="#f87171" />
    case 'warning':
      return <FiAlertTriangle size={18} color="#fbbf24" />
    case 'info':
    default:
      return <FiInfo size={18} color="#38bdf8" />
  }
}

const getToastGlow = (type: ToastType) => {
  switch (type) {
    case 'success':
      return 'rgba(52, 211, 153, 0.2)'
    case 'error':
      return 'rgba(248, 113, 113, 0.2)'
    case 'warning':
      return 'rgba(251, 191, 36, 0.2)'
    case 'info':
    default:
      return 'rgba(56, 189, 248, 0.2)'
  }
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration = 3500) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
      const newToast: ToastItem = { id, message, type, duration }

      setToasts((prev) => [...prev.slice(-3), newToast]) // Mantener máximo 4 visibles

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id)
        }, duration)
      }
    },
    [dismissToast]
  )

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast])

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Container de Toasts con AnimatePresence */}
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          maxWidth: '380px',
          width: 'calc(100vw - 3rem)',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence mode="sync">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.92, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                padding: '0.85rem 1.15rem',
                borderRadius: '14px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-active)',
                boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.45), 0 0 20px ${getToastGlow(toast.type)}`,
                backdropFilter: 'blur(16px)',
                color: 'var(--text-primary)',
              }}
              role="status"
              aria-live="polite"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  {getToastIcon(toast.type)}
                </div>
                <span
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    color: 'var(--text-primary)',
                  }}
                >
                  {toast.message}
                </span>
              </div>

              <button
                onClick={() => dismissToast(toast.id)}
                aria-label="Cerrar notificación"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--text-muted)',
                  borderRadius: '6px',
                  transition: 'color 0.2s',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <FiX size={15} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
