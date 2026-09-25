import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ProjectItem } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { FiX, FiCheckCircle, FiExternalLink, FiGithub, FiLayers } from 'react-icons/fi'

interface ProjectModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = React.memo(({ project, onClose }) => {
  if (!project) return null

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '650px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-active)',
            borderRadius: '20px',
            padding: '2.25rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 40px var(--accent-glow)',
            zIndex: 101,
            maxHeight: '85vh',
            overflowY: 'auto',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <FiX size={18} />
          </button>

          {/* Header */}
          <div style={{ marginBottom: '1.25rem' }}>
            <Badge variant="accent" size="sm">
              {project.category}
            </Badge>
            <h2
              style={{
                fontSize: '1.65rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginTop: '0.6rem',
                marginBottom: '0.25rem',
              }}
            >
              {project.title}
            </h2>
            <div style={{ fontSize: '0.95rem', color: 'var(--accent-light)', fontWeight: 500 }}>
              {project.subtitle}
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
                marginBottom: '0.4rem',
              }}
            >
              Descripción General
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {project.description}
            </p>
          </div>

          {/* Impact */}
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              borderRadius: '12px',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--accent-light)',
                marginBottom: '0.25rem',
              }}
            >
              <FiCheckCircle size={16} />
              <span>Impacto y Resultados Clave</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {project.impact}
            </p>
          </div>

          {/* Technologies */}
          <div style={{ marginBottom: '2rem' }}>
            <h4
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
                marginBottom: '0.6rem',
              }}
            >
              Stack Tecnológico Aplicado
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tags.map((tag, i) => (
                <Badge key={i} variant="default" size="md">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.25rem',
            }}
          >
            {project.demoUrl && (
              <Button
                size="md"
                variant="primary"
                icon={<FiExternalLink size={16} />}
                onClick={() => window.open(project.demoUrl, '_blank')}
              >
                Ver Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button
                size="md"
                variant="secondary"
                icon={<FiGithub size={16} />}
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                Ver Código
              </Button>
            )}
            <Button size="md" variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
})

ProjectModal.displayName = 'ProjectModal'
