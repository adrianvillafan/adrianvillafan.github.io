import React from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { TiltCard } from '@/components/effects/TiltCard'
import { FiCpu, FiServer, FiDatabase, FiLayout } from 'react-icons/fi'

const categoryIcons = [
  <FiLayout key="0" size={22} color="var(--accent-light)" />,
  <FiServer key="1" size={22} color="#38bdf8" />,
  <FiCpu key="2" size={22} color="#34d399" />,
  <FiDatabase key="3" size={22} color="#fbbf24" />,
]

const categoryGlows = [
  'rgba(99, 102, 241, 0.16)',
  'rgba(56, 189, 248, 0.16)',
  'rgba(52, 211, 153, 0.16)',
  'rgba(251, 191, 36, 0.16)',
]

// Item individual memoizado con micro-hover
const SkillPill: React.FC<{ name: string; level: string; highlight?: boolean }> = React.memo(
  ({ name, level, highlight }) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.7rem 0.95rem',
          borderRadius: '10px',
          background: highlight ? 'rgba(99, 102, 241, 0.1)' : 'var(--pill-bg)',
          border: highlight
            ? '1px solid rgba(99, 102, 241, 0.28)'
            : '1px solid var(--border-subtle)',
          transition: 'all 0.2s ease',
        }}
      >
        <span
          style={{
            fontSize: '0.88rem',
            fontWeight: highlight ? 700 : 500,
            color: highlight ? 'var(--text-primary)' : 'var(--text-secondary)',
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: '0.74rem',
            color: highlight ? 'var(--accent-light)' : 'var(--text-muted)',
            fontWeight: 500,
          }}
        >
          {level}
        </span>
      </div>
    )
  }
)

SkillPill.displayName = 'SkillPill'

const Skills: React.FC = () => {
  const sectionRef = useSectionObserver('skills')
  const { personalInfo, skillCategories } = usePortfolioData()

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="skills"
      className="section"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container">
        <SectionTitle
          badge={personalInfo.skills.badge}
          title={personalInfo.skills.title}
          subtitle={personalInfo.skills.subtitle}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              style={{ height: '100%' }}
            >
              <TiltCard
                maxTilt={6}
                glowColor={categoryGlows[catIdx % categoryGlows.length]}
                style={{ height: '100%' }}
              >
                <div
                  style={{
                    padding: '1.75rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                >
                  {/* Category Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {categoryIcons[catIdx % categoryIcons.length]}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {category.name}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.35,
                        }}
                      >
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    {category.skills.map((skill, i) => (
                      <SkillPill
                        key={i}
                        name={skill.name}
                        level={skill.level}
                        highlight={skill.highlight}
                      />
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default React.memo(Skills)
