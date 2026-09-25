import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { projects } from '@/data/portfolioData'
import { ProjectItem } from '@/types'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { TiltCard } from '@/components/effects/TiltCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProjectModal } from './ProjectModal'
import { FiExternalLink, FiGithub, FiCheckCircle, FiInfo } from 'react-icons/fi'

type FilterCategory = 'Todos' | 'Full Stack' | 'Data & AI' | 'Microservices & Cloud' | 'Systems & Automation'

const filterCategories: FilterCategory[] = [
  'Todos',
  'Full Stack',
  'Data & AI',
  'Microservices & Cloud',
  'Systems & Automation',
]

// ProjectCard memoizado con 3D Tilt
const ProjectCard: React.FC<{
  project: ProjectItem
  index: number
  onOpenDetails: (project: ProjectItem) => void
}> = React.memo(({ project, index, onOpenDetails }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{ height: '100%' }}
    >
      <TiltCard maxTilt={6} style={{ height: '100%' }}>
        <div
          style={{
            padding: '1.75rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem',
          }}
        >
          <div>
            {/* Top header: Category & Featured tag */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <Badge variant="accent" size="sm">
                {project.category}
              </Badge>
              {project.featured && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#38bdf8',
                    background: 'rgba(56, 189, 248, 0.1)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    fontWeight: 500,
                  }}
                >
                  Destacado
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <h3
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.3rem',
                lineHeight: 1.25,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--accent-light)',
                fontWeight: 500,
                marginBottom: '1rem',
              }}
            >
              {project.subtitle}
            </p>

            {/* Description */}
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}
            >
              {project.description}
            </p>

            {/* Impact highlight */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                padding: '0.75rem 0.85rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.25rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.45,
              }}
            >
              <FiCheckCircle size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{project.impact}</span>
            </div>
          </div>

          <div>
            {/* Tech Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
                marginBottom: '1.25rem',
              }}
            >
              {project.tags.map((tag, i) => (
                <Badge key={i} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <Button
                size="sm"
                variant="outline"
                icon={<FiInfo size={14} />}
                onClick={() => onOpenDetails(project)}
              >
                Ver Arquitectura
              </Button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {project.demoUrl && (
                  <Button
                    size="sm"
                    variant="primary"
                    icon={<FiExternalLink size={14} />}
                    onClick={() => window.open(project.demoUrl, '_blank')}
                  >
                    Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={<FiGithub size={14} />}
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    Código
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
})

ProjectCard.displayName = 'ProjectCard'

const Projects: React.FC = () => {
  const sectionRef = useSectionObserver('projects')
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('Todos')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const handleFilterChange = useCallback((cat: FilterCategory) => {
    setActiveCategory(cat)
  }, [])

  const handleOpenDetails = useCallback((project: ProjectItem) => {
    setSelectedProject(project)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setSelectedProject(null)
  }, [])

  // Filtrado memoizado
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Todos') return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="projects"
      className="section"
    >
      <div className="container">
        <SectionTitle
          badge="Proyectos & Soluciones"
          title="Casos de Estudio & Arquitecturas Desarrolladas"
          subtitle="Sistemas reales orientados a escalabilidad, visión computacional, pipelines de datos y almacenamiento distribuido seguro."
        />

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '3rem',
          }}
        >
          {filterCategories.map((cat) => {
            const isSelected = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                style={{
                  padding: '0.45rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.2s ease',
                  background: isSelected
                    ? 'var(--accent)'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  border: isSelected
                    ? '1px solid var(--accent-light)'
                    : '1px solid var(--border-subtle)',
                  boxShadow: isSelected
                    ? '0 0 15px rgba(99, 102, 241, 0.3)'
                    : 'none',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onOpenDetails={handleOpenDetails}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Modal de detalles arquitectónicos */}
        <ProjectModal project={selectedProject} onClose={handleCloseDetails} />
      </div>
    </section>
  )
}

export default React.memo(Projects)
