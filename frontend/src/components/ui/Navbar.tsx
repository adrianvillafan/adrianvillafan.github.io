import React, { useState, useCallback, useMemo } from 'react'
import { useScroll } from '@/context/ScrollContext'
import { useActiveSection, SectionId } from '@/context/SectionContext'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { Button } from './Button'
import { FiSun, FiMoon, FiMenu, FiX, FiGlobe } from 'react-icons/fi'

interface NavLink {
  id: SectionId
  label: string
}

export const Navbar: React.FC = React.memo(() => {
  const { isScrolled, scrollTo } = useScroll()
  const { activeSection } = useActiveSection()
  const { theme, toggleTheme } = useTheme()
  const { isEnglish, toggleLanguage } = useLanguage()
  const data = usePortfolioData()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Links dinámicos según idioma
  const navLinks: NavLink[] = useMemo(
    () => [
      { id: 'about', label: data.nav.about },
      { id: 'experience', label: data.nav.experience },
      { id: 'projects', label: data.nav.projects },
      { id: 'skills', label: data.nav.skills },
      { id: 'contact', label: data.nav.contact },
    ],
    [data.nav]
  )

  const handleNavClick = useCallback(
    (id: SectionId) => {
      scrollTo(`#${id}`)
      setMobileMenuOpen(false)
    },
    [scrollTo]
  )

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        background: isScrolled ? 'var(--bg-glass)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <button
          onClick={() => scrollTo(0)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '-0.02em',
          }}
        >
          <span
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.9rem',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)',
            }}
          >
            AV
          </span>
          <span>Adrian Villafan</span>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent-light)' : 'var(--text-secondary)',
                  position: 'relative',
                  padding: '0.4rem 0',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      borderRadius: '2px',
                      background: 'var(--accent-light)',
                    }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* Right Actions: Language Toggle + Theme Toggle + Contact CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
          }}
        >
          {/* 🌐 Selector de Idioma ES / EN */}
          <button
            onClick={toggleLanguage}
            title={isEnglish ? 'Switch to Spanish' : 'Cambiar a Inglés'}
            style={{
              padding: '0.38rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--pill-bg)',
              transition: 'all 0.2s ease',
            }}
          >
            <FiGlobe size={14} color="var(--accent-light)" />
            <span>{isEnglish ? 'EN' : 'ES'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--pill-bg)',
              transition: 'all 0.2s ease',
            }}
          >
            {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>

          <div className="desktop-cta" style={{ display: 'none' }}>
            <Button
              size="sm"
              variant="primary"
              onClick={() => handleNavClick('contact')}
            >
              {data.nav.talk}
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Abrir menú"
            className="mobile-toggle"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--pill-bg)',
            }}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            background: 'var(--bg-elevated)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                textAlign: 'left',
                padding: '0.6rem 0',
                fontSize: '1rem',
                color: activeSection === link.id ? 'var(--accent-light)' : 'var(--text-primary)',
                fontWeight: activeSection === link.id ? 600 : 400,
              }}
            >
              {link.label}
            </button>
          ))}
          <Button
            size="md"
            variant="primary"
            fullWidth
            onClick={() => handleNavClick('contact')}
          >
            {data.nav.talk}
          </Button>
        </div>
      )}

      {/* Responsive media query helper */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: block !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
})

Navbar.displayName = 'Navbar'
