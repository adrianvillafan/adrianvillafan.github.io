import React from 'react'
import { useScroll } from '@/context/ScrollContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export const Footer: React.FC = React.memo(() => {
  const { scrollTo } = useScroll()
  const { personalInfo } = usePortfolioData()
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        padding: '3rem 0 2rem 0',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              {personalInfo.name}
            </h3>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                marginTop: '0.2rem',
              }}
            >
              {personalInfo.title} • {personalInfo.degree}
            </p>
          </div>

          {/* Social Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--pill-bg)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
              }}
            >
              <FiGithub size={18} />
            </a>

            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--pill-bg)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
              }}
            >
              <FiLinkedin size={18} />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--pill-bg)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
              }}
            >
              <FiMail size={18} />
            </a>

            <a
              href={personalInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--pill-bg)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
              }}
            >
              <FaWhatsapp size={18} />
            </a>

            {/* Back to top button */}
            <button
              onClick={() => scrollTo(0)}
              aria-label="Volver arriba"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--accent-light)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                marginLeft: '0.5rem',
              }}
            >
              <FiArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}
        >
          <p>© {currentYear} Adrian Marcel Villafan Virhuez. {personalInfo.footer.rights}</p>
          <p>{personalInfo.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'
