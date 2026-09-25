import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'
import { useScroll } from '@/context/ScrollContext'
import { FiTerminal, FiX, FiCornerDownLeft, FiMaximize2, FiMinimize2 } from 'react-icons/fi'

interface CommandEntry {
  command: string
  output: React.ReactNode
}

export const InteractiveTerminal: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<CommandEntry[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [cmdList, setCmdList] = useState<string[]>([])
  const [isMaximized, setIsMaximized] = useState(false)

  const { personalInfo, experiences, projectsList, skillCategories } = usePortfolioData()
  const { language, toggleLanguage, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { scrollTo } = useScroll()

  const inputRef = useRef<HTMLInputElement | null>(null)
  const outputContainerRef = useRef<HTMLDivElement | null>(null)

  const isEs = language === 'es'

  // Mensaje de bienvenida inicial
  const getWelcomeMessage = useCallback(
    () => (
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}>
        <p style={{ color: '#34d399', fontWeight: 600 }}>
          {isEs
            ? '¡Bienvenido a la terminal de Adrian Villafan! (UNMSM Scientific Computing OS v2.0)'
            : 'Welcome to Adrian Villafan CLI! (UNMSM Scientific Computing OS v2.0)'}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
          {isEs
            ? 'Escribe "help" para ver los comandos disponibles o presiona los atajos rápidos.'
            : 'Type "help" to see available commands or click the quick pills below.'}
        </p>
      </div>
    ),
    [isEs]
  )

  // Inicializar bienvenida al abrir
  useEffect(() => {
    if (isOpen && history.length === 0) {
      setHistory([{ command: '', output: getWelcomeMessage() }])
    }
  }, [isOpen, history.length, getWelcomeMessage])

  // Scroll automático hacia el final del output
  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight
    }
  }, [history])

  // Atajo de teclado global: Ctrl + K o `
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Foco automático en el input al abrir el modal
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const executeCommand = useCallback(
    (rawCmd: string) => {
      const trimmed = rawCmd.trim()
      const parts = trimmed.split(' ')
      const mainCmd = parts[0].toLowerCase()

      if (!trimmed) return

      // Registrar comando en historial de flechas arriba/abajo
      setCmdList((prev) => [...prev, trimmed])
      setHistoryIndex(-1)

      let output: React.ReactNode = null

      switch (mainCmd) {
        case 'help':
          output = (
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.4rem', fontSize: '0.85rem' }}>
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>whoami</span>
              <span>{isEs ? 'Resumen biográfico y académico' : 'Profile bio & academic background'}</span>

              <span style={{ color: '#38bdf8', fontWeight: 600 }}>skills</span>
              <span>{isEs ? 'Stack tecnológico clasificado por áreas' : 'Tech stack categorized by domain'}</span>

              <span style={{ color: '#38bdf8', fontWeight: 600 }}>projects</span>
              <span>{isEs ? 'Lista de proyectos y plataformas desarrolladas' : 'List of engineering projects'}</span>

              <span style={{ color: '#38bdf8', fontWeight: 600 }}>experience</span>
              <span>{isEs ? 'Trayectoria profesional en IntiCo e Inteligo' : 'Work experience history'}</span>

              <span style={{ color: '#38bdf8', fontWeight: 600 }}>contact</span>
              <span>{isEs ? 'Información y enlaces directos de contacto' : 'Direct contact channels & links'}</span>

              <span style={{ color: '#38bdf8', fontWeight: 600 }}>theme</span>
              <span>{isEs ? 'Alterna entre modo claro y oscuro' : 'Toggle light/dark theme'}</span>

              <span style={{ color: '#38bdf8', fontWeight: 600 }}>lang [es|en]</span>
              <span>{isEs ? 'Cambia el idioma del sistema' : 'Change portfolio language'}</span>

              <span style={{ color: '#38bdf8', fontWeight: 600 }}>goto [sec]</span>
              <span>{isEs ? 'Navega a: hero, about, experience, projects, skills, contact' : 'Scroll to a section'}</span>

              <span style={{ color: '#38bdf8', fontWeight: 600 }}>cv / resume</span>
              <span>{isEs ? 'Abre o descarga el CV en formato PDF' : 'Open or download resume (PDF)'}</span>

              <span style={{ color: '#38bdf8', fontWeight: 600 }}>clear</span>
              <span>{isEs ? 'Limpia la pantalla de la consola' : 'Clear terminal output'}</span>

              <span style={{ color: '#38bdf8', fontWeight: 600 }}>exit</span>
              <span>{isEs ? 'Cierra la ventana del terminal' : 'Close terminal window'}</span>
            </div>
          )
          break

        case 'whoami':
          output = (
            <div style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
              <p style={{ color: 'var(--accent-light)', fontWeight: 700, fontSize: '1rem' }}>
                {personalInfo.name}
              </p>
              <p style={{ color: '#34d399' }}>{personalInfo.title}</p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                {personalInfo.degree} — {personalInfo.location}
              </p>
              <p style={{ marginTop: '0.4rem', color: 'var(--text-muted)' }}>
                {personalInfo.about.lead}
              </p>
            </div>
          )
          break

        case 'skills':
          output = (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              {skillCategories.map((cat, idx) => (
                <div key={idx}>
                  <span style={{ color: '#fbbf24', fontWeight: 600 }}>[{cat.name}]: </span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          )
          break

        case 'projects':
          output = (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              {projectsList.map((p, idx) => (
                <div key={idx} style={{ padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>#{p.id}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{p.title}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-light)' }}>({p.category})</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    {p.subtitle}
                  </p>
                  <p style={{ color: '#38bdf8', fontSize: '0.78rem', marginTop: '0.15rem' }}>
                    Stack: {p.tags.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          )
          break

        case 'experience':
          output = (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              {experiences.map((exp) => (
                <div key={exp.id} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '0.75rem' }}>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                    {exp.role} <span style={{ color: 'var(--accent-light)' }}>@ {exp.company}</span>
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {exp.period} • {exp.location}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '0.25rem' }}>
                    {exp.achievements[0]}
                  </p>
                </div>
              ))}
            </div>
          )
          break

        case 'contact':
          output = (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.86rem' }}>
              <p>
                <span style={{ color: 'var(--text-muted)' }}>Email: </span>
                <a href={`mailto:${personalInfo.email}`} style={{ color: 'var(--accent-light)', textDecoration: 'underline' }}>
                  {personalInfo.email}
                </a>
              </p>
              <p>
                <span style={{ color: 'var(--text-muted)' }}>WhatsApp: </span>
                <a href={personalInfo.whatsappUrl} target="_blank" rel="noreferrer" style={{ color: '#34d399', textDecoration: 'underline' }}>
                  {personalInfo.phone}
                </a>
              </p>
              <p>
                <span style={{ color: 'var(--text-muted)' }}>LinkedIn: </span>
                <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>
                  {personalInfo.linkedinUrl}
                </a>
              </p>
              <p>
                <span style={{ color: 'var(--text-muted)' }}>GitHub: </span>
                <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" style={{ color: '#a78bfa', textDecoration: 'underline' }}>
                  {personalInfo.githubUrl}
                </a>
              </p>
            </div>
          )
          break

        case 'theme':
          toggleTheme()
          output = (
            <span style={{ color: '#34d399' }}>
              {isEs ? `Tema cambiado exitosamente a: ${theme === 'dark' ? 'claro' : 'oscuro'}` : `Theme switched to: ${theme === 'dark' ? 'light' : 'dark'}`}
            </span>
          )
          break

        case 'lang':
        case 'language':
          if (parts[1] === 'es') {
            setLanguage('es')
            output = <span style={{ color: '#34d399' }}>Idioma establecido en Español.</span>
          } else if (parts[1] === 'en') {
            setLanguage('en')
            output = <span style={{ color: '#34d399' }}>Language set to English.</span>
          } else {
            toggleLanguage()
            output = (
              <span style={{ color: '#34d399' }}>
                {isEs ? 'Idioma alternado a Inglés.' : 'Language switched to Spanish.'}
              </span>
            )
          }
          break

        case 'goto':
          const target = parts[1]?.toLowerCase()
          if (['hero', 'about', 'experience', 'projects', 'skills', 'contact'].includes(target)) {
            scrollTo(`#${target}`)
            output = <span style={{ color: '#34d399' }}>{isEs ? `Desplazando hacia #${target}...` : `Scrolling to #${target}...`}</span>
            setIsOpen(false)
          } else {
            output = (
              <span style={{ color: '#f87171' }}>
                {isEs ? 'Sección no válida. Usa: hero, about, experience, projects, skills, contact' : 'Invalid section. Try: hero, about, experience, projects, skills, contact'}
              </span>
            )
          }
          break

        case 'sudo':
          output = (
            <span style={{ color: '#fbbf24' }}>
              {isEs
                ? '⚠️ Permiso denegado: Este incidente será reportado al decano de Computación Científica en UNMSM 🤖'
                : '⚠️ Permission denied: This incident will be reported to UNMSM Scientific Computing root administrator 🤖'}
            </span>
          )
          break

        case 'clear':
          setHistory([])
          setInputVal('')
          return

        case 'exit':
        case 'quit':
          setIsOpen(false)
          return

        case 'cv':
        case 'resume':
          window.open(personalInfo.cvUrl, '_blank')
          output = (
            <div style={{ fontSize: '0.85rem', color: '#34d399', lineHeight: 1.5 }}>
              <p>📄 {isEs ? 'Abriendo Curriculum Vitae de Adrian Villafan (PDF)...' : 'Opening Adrian Villafan Resume (PDF)...'}</p>
              <a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#38bdf8', textDecoration: 'underline', marginTop: '0.3rem', display: 'inline-block' }}
              >
                {personalInfo.cvUrl}
              </a>
            </div>
          )
          break

        default:
          output = (
            <span style={{ color: '#f87171' }}>
              {isEs
                ? `Comando no reconocido: "${trimmed}". Escribe "help" para ver los comandos disponibles.`
                : `Command not recognized: "${trimmed}". Type "help" for a list of commands.`}
            </span>
          )
      }

      setHistory((prev) => [...prev, { command: trimmed, output }])
      setInputVal('')
    },
    [
      isEs,
      personalInfo,
      skillCategories,
      projectsList,
      experiences,
      theme,
      toggleTheme,
      setLanguage,
      toggleLanguage,
      scrollTo,
    ]
  )

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdList.length > 0) {
        const nextIdx = historyIndex === -1 ? cmdList.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(nextIdx)
        setInputVal(cmdList[nextIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cmdList.length > 0 && historyIndex !== -1) {
        const nextIdx = historyIndex + 1
        if (nextIdx >= cmdList.length) {
          setHistoryIndex(-1)
          setInputVal('')
        } else {
          setHistoryIndex(nextIdx)
          setInputVal(cmdList[nextIdx])
        }
      }
    }
  }

  const quickCommands = ['whoami', 'skills', 'projects', 'cv', 'experience', 'contact', 'clear']

  return (
    <>
      {/* 🔷 Botón flotante para abrir Terminal en la esquina inferior izquierda */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir terminal CLI"
        title="Abrir CLI Terminal (Ctrl + K o ~)"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '1.5rem',
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.65rem 1rem',
          borderRadius: '9999px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-active)',
          color: 'var(--accent-light)',
          fontSize: '0.82rem',
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35), 0 0 15px rgba(99, 102, 241, 0.2)',
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
        }}
      >
        <FiTerminal size={16} />
        <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>Terminal CLI</span>
        <span
          style={{
            fontSize: '0.68rem',
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.08)',
            color: 'var(--text-muted)',
          }}
        >
          Ctrl+K
        </span>
      </motion.button>

      {/* 🔷 Modal de Terminal Unix */}
      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.72)',
                backdropFilter: 'blur(10px)',
              }}
            />

            {/* Window Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: isMaximized ? '96vw' : '720px',
                height: isMaximized ? '90vh' : '520px',
                background: 'rgba(10, 15, 29, 0.94)',
                border: '1px solid rgba(99, 102, 241, 0.35)',
                borderRadius: '16px',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(99, 102, 241, 0.25)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: 99999,
                color: '#e2e8f0',
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              }}
            >
              {/* Terminal Title Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  userSelect: 'none',
                }}
              >
                {/* Traffic lights */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span
                    onClick={() => setIsOpen(false)}
                    title="Cerrar"
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#f87171',
                      cursor: 'pointer',
                      display: 'inline-block',
                    }}
                  />
                  <span
                    onClick={() => setIsOpen(false)}
                    title="Minimizar"
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#fbbf24',
                      cursor: 'pointer',
                      display: 'inline-block',
                    }}
                  />
                  <span
                    onClick={() => setIsMaximized((prev) => !prev)}
                    title="Maximizar"
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#34d399',
                      cursor: 'pointer',
                      display: 'inline-block',
                    }}
                  />
                </div>

                {/* Title */}
                <div style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FiTerminal size={14} color="#34d399" />
                  <span>adrian@unmsm-lab: ~ (zsh)</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                  <button
                    onClick={() => setIsMaximized((prev) => !prev)}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}
                    title={isMaximized ? 'Restaurar' : 'Maximizar'}
                  >
                    {isMaximized ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}
                    title="Cerrar"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>

              {/* Terminal Quick Command Pills */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(0, 0, 0, 0.25)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  overflowX: 'auto',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: '0.74rem', color: '#64748b', marginRight: '0.2rem' }}>
                  {isEs ? 'Atajos:' : 'Quick:'}
                </span>
                {quickCommands.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    style={{
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      background: 'rgba(99, 102, 241, 0.12)',
                      border: '1px solid rgba(99, 102, 241, 0.25)',
                      color: 'var(--accent-light)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Output Scrollable Area */}
              <div
                ref={outputContainerRef}
                style={{
                  flex: 1,
                  padding: '1rem',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  fontSize: '0.88rem',
                }}
              >
                {history.map((entry, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {entry.command && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                        <span style={{ color: '#34d399' }}>adrian@unmsm:~$</span>
                        <span style={{ color: '#ffffff', fontWeight: 600 }}>{entry.command}</span>
                      </div>
                    )}
                    <div style={{ paddingLeft: entry.command ? '1.25rem' : '0' }}>{entry.output}</div>
                  </div>
                ))}
              </div>

              {/* Input Command Line */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.85rem 1rem',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                  adrian@unmsm:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDownInput}
                  placeholder={isEs ? 'Escribe un comando (ej: whoami, skills, projects)...' : 'Type a command (e.g. whoami, skills, projects)...'}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#ffffff',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                  }}
                />
                <button
                  onClick={() => executeCommand(inputVal)}
                  aria-label="Ejecutar comando"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Enter"
                >
                  <FiCornerDownLeft size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
})

InteractiveTerminal.displayName = 'InteractiveTerminal'
