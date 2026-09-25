import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { soundFX } from '@/utils/soundEffects'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  FiX,
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiCheckCircle,
  FiUser,
  FiBriefcase,
  FiAward,
} from 'react-icons/fi'

interface CvPreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CvPreviewModal: React.FC<CvPreviewModalProps> = React.memo(({ isOpen, onClose }) => {
  const { isEnglish } = useLanguage()
  const cvUrl = './cv-adrian-villafan.pdf'

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFX.playClick()
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      soundFX.playPop()
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundFX.playClick()
            onClose()
          }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(12px)',
          }}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '920px',
            height: '90vh',
            maxHeight: '900px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-active)',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65), 0 0 50px var(--accent-glow)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 151,
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '1.15rem 1.5rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-glass)',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                  flexShrink: 0,
                }}
              >
                <FiFileText size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3
                    id="cv-modal-title"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1.2,
                    }}
                  >
                    Curriculum Vitae — Adrian Villafan
                  </h3>
                  <Badge variant="accent" size="sm">
                    PDF 2025
                  </Badge>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {isEnglish
                    ? 'Full Stack Developer & Data Engineer • Scientific Computing (UNMSM)'
                    : 'Full Stack Developer & Data Engineer • Computación Científica (UNMSM)'}
                </p>
              </div>
            </div>

            {/* Actions: Download + Open in Tab + Close */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <a
                href={cvUrl}
                download="cv-adrian-villafan.pdf"
                onClick={() => soundFX.playSuccess()}
                style={{ textDecoration: 'none' }}
              >
                <Button size="sm" variant="primary" icon={<FiDownload size={15} />}>
                  {isEnglish ? 'Download PDF' : 'Descargar PDF'}
                </Button>
              </a>

              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                style={{ textDecoration: 'none' }}
              >
                <Button size="sm" variant="outline" icon={<FiExternalLink size={15} />}>
                  {isEnglish ? 'New Tab' : 'Abrir'}
                </Button>
              </a>

              <button
                onClick={() => {
                  soundFX.playClick()
                  onClose()
                }}
                aria-label="Cerrar vista previa"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--pill-bg)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div
            style={{
              flex: 1,
              width: '100%',
              background: '#18181b',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Embedded Iframe */}
            <iframe
              src={`${cvUrl}#toolbar=1&navpanes=0&scrollbar=1`}
              title="CV Adrian Villafan PDF Preview"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />

            {/* Fallback bar in case browser blocks inline PDF embedding */}
            <div
              style={{
                padding: '0.6rem 1.25rem',
                background: 'var(--bg-glass)',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiCheckCircle size={14} color="var(--accent-light)" />
                <span>
                  {isEnglish
                    ? 'Document verified & updated for 2025 recruitment'
                    : 'Documento oficial verificado y actualizado para procesos 2025'}
                </span>
              </div>
              <a
                href={cvUrl}
                download="cv-adrian-villafan.pdf"
                style={{
                  color: 'var(--accent-light)',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <FiDownload size={13} />
                <span>{isEnglish ? 'Direct Download (PDF)' : 'Descarga Directa (PDF)'}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
})

CvPreviewModal.displayName = 'CvPreviewModal'
