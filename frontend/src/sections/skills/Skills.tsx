import React from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { TiltCard } from '@/components/effects/TiltCard'
import { soundFX } from '@/utils/soundEffects'
import { FiCpu, FiServer, FiDatabase, FiLayout, FiCheck } from 'react-icons/fi'
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiHtml5,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiPhp,
  SiLaravel,
  SiSwagger,
  SiPython,
  SiPandas,
  SiOpencv,
  SiPuppeteer,
  SiTensorflow,
  SiMariadb,
  SiMysql,
  SiMongodb,
  SiMinio,
  SiDocker,
  SiLinux,
  SiGit,
} from 'react-icons/si'

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

// Mapeo exhaustivo de logos oficiales de marca con sus colores exactos
const getTechBrand = (name: string, iconKey?: string): { icon: React.ReactNode; color: string } => {
  const key = (iconKey || name).toLowerCase()
  if (key.includes('react')) return { icon: <SiReact size={19} />, color: '#61DAFB' }
  if (key.includes('next')) return { icon: <SiNextdotjs size={19} />, color: 'var(--text-primary)' }
  if (key.includes('typescript')) return { icon: <SiTypescript size={19} />, color: '#3178C6' }
  if (key.includes('javascript')) return { icon: <SiJavascript size={19} />, color: '#F7DF1E' }
  if (key.includes('css') || key.includes('html')) return { icon: <SiHtml5 size={19} />, color: '#E34F26' }
  if (key.includes('tailwind') || key.includes('ui')) return { icon: <SiTailwindcss size={19} />, color: '#06B6D4' }
  if (key.includes('node')) return { icon: <SiNodedotjs size={19} />, color: '#5FA04E' }
  if (key.includes('nest')) return { icon: <SiNestjs size={19} />, color: '#E0234E' }
  if (key.includes('laravel')) return { icon: <SiLaravel size={19} />, color: '#FF2D20' }
  if (key.includes('php')) return { icon: <SiPhp size={19} />, color: '#777BB4' }
  if (key.includes('api') || key.includes('swagger')) return { icon: <SiSwagger size={19} />, color: '#85EA2D' }
  if (key.includes('python')) return { icon: <SiPython size={19} />, color: '#3776AB' }
  if (key.includes('pandas')) return { icon: <SiPandas size={19} />, color: '#38bdf8' }
  if (key.includes('opencv') || key.includes('ocr')) return { icon: <SiOpencv size={19} />, color: '#5C3EE8' }
  if (key.includes('scraping') || key.includes('playwright')) return { icon: <SiPuppeteer size={19} />, color: '#40B5A4' }
  if (key.includes('ai') || key.includes('learning')) return { icon: <SiTensorflow size={19} />, color: '#FF6F00' }
  if (key.includes('mariadb')) return { icon: <SiMariadb size={19} />, color: '#C0765A' }
  if (key.includes('mysql')) return { icon: <SiMysql size={19} />, color: '#4479A1' }
  if (key.includes('mongodb')) return { icon: <SiMongodb size={19} />, color: '#47A248' }
  if (key.includes('minio')) return { icon: <SiMinio size={19} />, color: '#C72C48' }
  if (key.includes('docker') || key.includes('microservices')) return { icon: <SiDocker size={19} />, color: '#2496ED' }
  if (key.includes('linux')) return { icon: <SiLinux size={19} />, color: '#FCC624' }
  if (key.includes('git')) return { icon: <SiGit size={19} />, color: '#F05032' }
  return { icon: <FiCpu size={19} />, color: 'var(--accent-light)' }
}

// Item individual con logo de marca, hover de color y feedback
const SkillPill: React.FC<{
  name: string
  level: string
  iconKey?: string
  highlight?: boolean
}> = React.memo(({ name, level, iconKey, highlight }) => {
  const brand = getTechBrand(name, iconKey)

  return (
    <div
      onMouseEnter={() => soundFX.playClick()}
      className="skill-pill-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.68rem 0.95rem',
        borderRadius: '10px',
        background: highlight ? 'rgba(99, 102, 241, 0.08)' : 'var(--pill-bg)',
        border: highlight
          ? '1px solid rgba(99, 102, 241, 0.28)'
          : '1px solid var(--border-subtle)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span
          style={{
            color: brand.color,
            display: 'flex',
            alignItems: 'center',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
          }}
        >
          {brand.icon}
        </span>
        <span
          style={{
            fontSize: '0.88rem',
            fontWeight: highlight ? 700 : 500,
            color: highlight ? 'var(--text-primary)' : 'var(--text-secondary)',
          }}
        >
          {name}
        </span>
      </div>
      <span
        style={{
          fontSize: '0.74rem',
          color: highlight ? 'var(--accent-light)' : 'var(--text-muted)',
          fontWeight: 600,
          background: highlight ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
          padding: highlight ? '0.15rem 0.45rem' : '0',
          borderRadius: '4px',
        }}
      >
        {level}
      </span>
    </div>
  )
})

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
                        iconKey={(skill as any).iconKey}
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

      <style>{`
        .skill-pill-item:hover {
          transform: translateX(4px);
          background: var(--bg-elevated) !important;
          border-color: var(--accent-light) !important;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.18);
        }
      `}</style>
    </section>
  )
}

export default React.memo(Skills)
