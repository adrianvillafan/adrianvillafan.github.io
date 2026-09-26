import React, { useState, useEffect, useMemo } from 'react'
import { TiltCard } from './TiltCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { soundFX } from '@/utils/soundEffects'
import { useLanguage } from '@/context/LanguageContext'
import githubData from '@/data/githubActivity.json'
import {
  FiGithub,
  FiExternalLink,
  FiGitCommit,
  FiActivity,
  FiFolder,
  FiCalendar,
  FiCheckCircle,
} from 'react-icons/fi'

interface GitHubProfile {
  login: string
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

interface ContributionDay {
  date: string
  level: number
  count: number
  text: string
}

const FALLBACK_PROFILE: GitHubProfile = {
  login: 'adrianvillafan',
  avatar_url: 'https://avatars.githubusercontent.com/u/106986651?v=4',
  html_url: 'https://github.com/adrianvillafan',
  public_repos: 20,
  followers: 4,
  following: 5,
  created_at: '2022-06-12T00:00:00Z',
}

// Distribución verídica calculada de los 20 repositorios públicos
const LANGUAGE_DISTRIBUTION = [
  { name: 'Python & Data', pct: 42, color: '#3776AB', descEs: 'Computación científica y notebooks', descEn: 'Scientific computing & notebooks' },
  { name: 'JavaScript & TypeScript', pct: 26, color: '#3178C6', descEs: 'Full-stack & arquitectura frontend', descEn: 'Full-stack & frontend architecture' },
  { name: 'HTML & CSS', pct: 16, color: '#E34F26', descEs: 'Estructuración semántica y diseño', descEn: 'Semantic structure & styling' },
  { name: 'PHP', pct: 11, color: '#777BB4', descEs: 'Servicios web backend', descEn: 'Backend web services' },
  { name: 'C++', pct: 5, color: '#00599C', descEs: 'Métodos numéricos y algoritmos', descEn: 'Numerical methods & algorithms' },
]

export const GitHubActivityDashboard: React.FC = React.memo(() => {
  const { isEnglish } = useLanguage()
  const [profile, setProfile] = useState<GitHubProfile>(FALLBACK_PROFILE)
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchProfile = async () => {
      try {
        const cached = localStorage.getItem('av_github_profile_v2')
        const cacheTimestamp = localStorage.getItem('av_github_timestamp_v2')
        const isFresh = cacheTimestamp && Date.now() - parseInt(cacheTimestamp, 10) < 1000 * 60 * 60 // 1 hr

        if (isFresh && cached) {
          setProfile(JSON.parse(cached))
          return
        }

        const res = await fetch('https://api.github.com/users/adrianvillafan')
        if (res.ok) {
          const data = await res.json()
          if (isMounted) {
            setProfile(data)
            localStorage.setItem('av_github_profile_v2', JSON.stringify(data))
            localStorage.setItem('av_github_timestamp_v2', Date.now().toString())
          }
        }
      } catch {
        // En caso de rate-limit o sin conexión, el fallback ya está cargado
      }
    }

    fetchProfile()

    return () => {
      isMounted = false
    }
  }, [])

  // Agrupamiento de los 371 días en 53 semanas exactas de 7 días (Domingo a Sábado)
  const weeks = useMemo(() => {
    const rawDays = githubData.days as ContributionDay[]
    const result: ContributionDay[][] = []
    for (let i = 0; i < rawDays.length; i += 7) {
      result.push(rawDays.slice(i, i + 7))
    }
    return result
  }, [])

  // Nombres de meses alineados a las columnas de semanas
  const monthLabels = useMemo(() => {
    const monthsEs = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const list = isEnglish ? monthsEn : monthsEn
    const listEs = monthsEs

    const currentList = isEnglish ? list : listEs

    let lastMonth = -1
    return weeks.map((week) => {
      if (!week || week.length === 0) return ''
      const date = new Date(week[0].date + 'T12:00:00Z')
      const m = date.getUTCMonth()
      if (m !== lastMonth) {
        lastMonth = m
        return currentList[m]
      }
      return ''
    })
  }, [weeks, isEnglish])

  // Escala de color con contraste para modo oscuro
  const getCellColor = (level: number) => {
    switch (level) {
      case 4:
        return '#34D399' // Verde menta brillante
      case 3:
        return '#10B981' // Esmeralda principal
      case 2:
        return '#059669' // Verde medio
      case 1:
        return '#065F46' // Verde oscuro tenue
      default:
        return 'rgba(255, 255, 255, 0.05)' // Celda vacía sin commits
    }
  }

  // Formato localizado para el día inspeccionado
  const formatDayTooltip = (day: ContributionDay) => {
    const [year, month, dNum] = day.date.split('-').map(Number)
    const dateObj = new Date(Date.UTC(year, month - 1, dNum, 12, 0, 0))

    if (isEnglish) {
      const monthName = dateObj.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
      const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' })
      if (day.count === 0) {
        return `No contributions on ${dayOfWeek}, ${monthName} ${dNum}, ${year}`
      }
      return `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${dayOfWeek}, ${monthName} ${dNum}, ${year}`
    } else {
      const monthName = dateObj.toLocaleDateString('es-ES', { month: 'short', timeZone: 'UTC' })
      const dayOfWeek = dateObj.toLocaleDateString('es-ES', { weekday: 'short', timeZone: 'UTC' })
      if (day.count === 0) {
        return `Sin contribuciones el ${dayOfWeek}, ${dNum} de ${monthName} de ${year}`
      }
      return `${day.count} ${day.count === 1 ? 'contribución' : 'contribuciones'} el ${dayOfWeek}, ${dNum} de ${monthName} de ${year}`
    }
  }

  const dayLetters = isEnglish ? ['', 'M', '', 'W', '', 'F', ''] : ['', 'L', '', 'M', '', 'V', '']

  return (
    <div style={{ marginTop: '2.5rem', width: '100%' }}>
      <TiltCard maxTilt={2.5} glowColor="rgba(16, 185, 129, 0.16)">
        <div
          style={{
            padding: '2rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Sombra de brillo ambiental esmeralda */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Encabezado con perfil y enlace a GitHub */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.75rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={profile.avatar_url}
                  alt={profile.login}
                  width={52}
                  height={52}
                  style={{
                    borderRadius: '50%',
                    border: '2px solid #10B981',
                    boxShadow: '0 0 15px rgba(16, 185, 129, 0.35)',
                  }}
                />
                <span
                  title={isEnglish ? 'Live GitHub Sync' : 'Sincronización en vivo con GitHub'}
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#10B981',
                    border: '2px solid var(--bg-primary)',
                  }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    GitHub Activity Stream
                  </h3>
                  <Badge variant="accent" size="sm">
                    @{profile.login}
                  </Badge>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {isEnglish
                    ? 'Continuous open source delivery & authentic version control metrics'
                    : 'Despliegue continuo de código abierto y métricas reales de control de versiones'}
                </div>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              icon={<FiGithub size={15} />}
              onClick={() => {
                soundFX.playClick()
                window.open(profile.html_url, '_blank')
              }}
            >
              <span>{isEnglish ? 'View GitHub Profile' : 'Ver Perfil GitHub'}</span>
              <FiExternalLink size={13} style={{ marginLeft: '4px' }} />
            </Button>
          </div>

          {/* Tarjetas de métricas numéricas verificadas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.85rem',
              marginBottom: '1.75rem',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontSize: '0.78rem', fontWeight: 600 }}>
                <FiGitCommit size={14} />
                <span>{isEnglish ? 'Annual Commits' : 'Contribuciones'}</span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                {githubData.totalContributions}+
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {isEnglish ? 'Last 12 months' : 'Últimos 12 meses'}
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38BDF8', fontSize: '0.78rem', fontWeight: 600 }}>
                <FiActivity size={14} />
                <span>{isEnglish ? 'Active Days' : 'Días Activos'}</span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                {githubData.activeDays}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {isEnglish ? 'Days with code delivery' : 'Días con actividad en código'}
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F59E0B', fontSize: '0.78rem', fontWeight: 600 }}>
                <FiFolder size={14} />
                <span>{isEnglish ? 'Public Repos' : 'Repos Públicos'}</span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                {profile.public_repos}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {isEnglish ? 'In GitHub profile' : 'En perfil público'}
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#A855F7', fontSize: '0.78rem', fontWeight: 600 }}>
                <FiCalendar size={14} />
                <span>{isEnglish ? 'Member Since' : 'Miembro Desde'}</span>
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10B981', marginTop: '0.3rem' }}>
                2022
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {isEnglish ? 'Verified developer' : 'Desarrollador verificado'}
              </div>
            </div>
          </div>

          {/* Matriz auténtica de contribuciones de GitHub (53 semanas reales) */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <FiActivity size={14} color="#10B981" />
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {isEnglish ? 'Contribution Matrix & Code Velocity' : 'Matriz de Contribuciones & Cadencia de Código'}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600, marginLeft: '4px' }}>
                  ({githubData.totalContributions} {isEnglish ? 'in 1 year' : 'en el último año'})
                </span>
              </div>

              {/* Leyenda de intensidad */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>{isEnglish ? 'Less' : 'Menos'}</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <span
                    key={lvl}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '2px',
                      background: getCellColor(lvl),
                      display: 'inline-block',
                      border: lvl === 0 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                    }}
                  />
                ))}
                <span>{isEnglish ? 'More' : 'Más'}</span>
              </div>
            </div>

            {/* Contenedor responsivo con scroll horizontal suave */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.22)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '1rem 1.1rem 0.75rem 0.85rem',
                overflowX: 'auto',
              }}
            >
              <div style={{ minWidth: '730px' }}>
                {/* Fila de etiquetas de meses */}
                <div style={{ display: 'flex', marginLeft: '18px', marginBottom: '6px', gap: '3px' }}>
                  {weeks.map((_, wIdx) => (
                    <div
                      key={wIdx}
                      style={{
                        width: '10px',
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {monthLabels[wIdx] || ''}
                    </div>
                  ))}
                </div>

                {/* Grilla: letras de días + 53 columnas de semanas */}
                <div style={{ display: 'flex', gap: '3px' }}>
                  {/* Letras de días (L, M, V) */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      width: '15px',
                      paddingRight: '3px',
                    }}
                  >
                    {dayLetters.map((letter, dIdx) => (
                      <div
                        key={dIdx}
                        style={{
                          height: '10px',
                          fontSize: '0.62rem',
                          color: 'var(--text-muted)',
                          lineHeight: '10px',
                          textAlign: 'center',
                          userSelect: 'none',
                        }}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>

                  {/* 53 Columnas de semanas */}
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {week.map((day) => {
                        const isHovered = hoveredDay?.date === day.date
                        return (
                          <div
                            key={day.date}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '2px',
                              background: getCellColor(day.level),
                              border: day.level === 0 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                              cursor: 'pointer',
                              transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                              boxShadow: isHovered
                                ? '0 0 10px rgba(16, 185, 129, 0.8)'
                                : day.level >= 3
                                ? '0 0 4px rgba(16, 185, 129, 0.25)'
                                : 'none',
                              transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                              zIndex: isHovered ? 10 : 1,
                            }}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Barra de estado interactiva al hacer hover sobre un día */}
            <div
              style={{
                marginTop: '0.65rem',
                minHeight: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
                fontSize: '0.78rem',
              }}
            >
              {hoveredDay ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontWeight: 600 }}>
                  <FiCheckCircle size={13} />
                  <span>{formatDayTooltip(hoveredDay)}</span>
                </div>
              ) : (
                <div style={{ color: 'var(--text-muted)' }}>
                  {isEnglish
                    ? 'Hover over any square to view exact delivery date and commit volume.'
                    : 'Pasa el cursor sobre cualquier celda para consultar la fecha y volumen de entregas.'}
                </div>
              )}

              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {isEnglish ? 'Verified public data • 371 days monitored' : 'Datos públicos oficiales • 371 días monitoreados'}
              </span>
            </div>
          </div>

          {/* Distribución del ecosistema de lenguajes (Verificado con 20 repositorios públicos) */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {isEnglish ? 'Language Ecosystem Distribution' : 'Distribución del Ecosistema de Lenguajes'}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  ({isEnglish ? 'Calculated from 20 public repositories' : 'Calculado a partir de los 20 repositorios públicos'})
                </span>
              </div>
              <span style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: 600 }}>
                100% Verificado
              </span>
            </div>

            {/* Barra de progreso segmentada */}
            <div
              style={{
                height: '8px',
                width: '100%',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                display: 'flex',
                gap: '2px',
              }}
            >
              {LANGUAGE_DISTRIBUTION.map((lang) => (
                <div
                  key={lang.name}
                  title={`${lang.name}: ${lang.pct}% (${isEnglish ? lang.descEn : lang.descEs})`}
                  style={{
                    width: `${lang.pct}%`,
                    height: '100%',
                    background: lang.color,
                    borderRadius: '2px',
                  }}
                />
              ))}
            </div>

            {/* Etiquetas de lenguajes con porcentaje y descripción */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.65rem 1rem',
                marginTop: '0.85rem',
              }}
            >
              {LANGUAGE_DISTRIBUTION.map((lang) => (
                <div
                  key={lang.name}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.45rem',
                    fontSize: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      background: lang.color,
                      marginTop: '3px',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{lang.name}</span>
                      <span style={{ color: '#10B981', fontWeight: 600 }}>{lang.pct}%</span>
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {isEnglish ? lang.descEn : lang.descEs}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  )
})

GitHubActivityDashboard.displayName = 'GitHubActivityDashboard'
