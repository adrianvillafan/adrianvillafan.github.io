import React, { useMemo } from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { useScroll } from '@/context/ScrollContext'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { Button } from '@/components/ui/Button'
import { AuroraBackground } from '@/components/effects/AuroraBackground'
import { GridPattern } from '@/components/effects/GridPattern'
import { RotatingText } from '@/components/effects/RotatingText'
import { useToast } from '@/context/ToastContext'
import { useLanguage } from '@/context/LanguageContext'
import { FiArrowDown, FiCode, FiMail, FiFileText } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const Hero: React.FC = () => {
  const sectionRef = useSectionObserver('hero')
  const { scrollTo } = useScroll()
  const { personalInfo } = usePortfolioData()
  const { showToast } = useToast()
  const { isEnglish } = useLanguage()

  // Memoizar palabras rotativas
  const words = useMemo(() => personalInfo.rotatingWords, [personalInfo.rotatingWords])

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: 'calc(var(--header-height) + 3rem)',
        paddingBottom: '5rem',
        overflow: 'hidden',
      }}
    >
      {/* 🔷 EFECTO 1: Aurora Mesh Gradient animado con GPU */}
      <AuroraBackground />

      {/* 🔷 EFECTO 2: Grid sutil estilo Linear con fade radial */}
      <GridPattern size={52} opacity={0.65} />

      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Availability Badge con pulso de luz */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.45rem 1.15rem',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            marginBottom: '2rem',
            boxShadow: '0 0 25px rgba(99, 102, 241, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span
            style={{
              position: 'relative',
              display: 'flex',
              width: '8px',
              height: '8px',
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#34d399',
                opacity: 0.75,
                animation: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
              }}
            />
            <span
              style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '50%',
                width: '8px',
                height: '8px',
                background: '#10b981',
              }}
            />
          </span>
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              letterSpacing: '0.01em',
            }}
          >
            {personalInfo.status}
          </span>
        </motion.div>

        {/* Main Name with Apple/Linear Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2.75rem, 6.5vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            marginBottom: '1.25rem',
            background: 'var(--title-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            maxWidth: '900px',
          }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Subtitle with Dynamic Rotating / Morphing Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.6rem',
            fontSize: 'clamp(1.2rem, 2.8vw, 1.75rem)',
            marginBottom: '1.75rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{ fontWeight: 400 }}>{personalInfo.heroSpecializedIn}</span>
          {/* 🔷 EFECTO 3: Rotating Text Morphing */}
          <RotatingText words={words} interval={3200} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: '750px',
            lineHeight: 1.65,
            marginBottom: '2.75rem',
            fontWeight: 400,
          }}
        >
          {personalInfo.heroTagline}
        </motion.p>

        {/* Action Buttons con efectos interactivos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <Button
            size="lg"
            variant="primary"
            icon={<FiCode size={18} />}
            onClick={() => scrollTo('#projects')}
          >
            {personalInfo.heroActions.projects}
          </Button>

          <Button
            size="lg"
            variant="secondary"
            icon={<FiMail size={18} />}
            onClick={() => scrollTo('#contact')}
          >
            {personalInfo.heroActions.contact}
          </Button>

          <Button
            size="lg"
            variant="outline"
            icon={<FiFileText size={18} color="var(--accent-light)" />}
            onClick={() => {
              showToast(
                isEnglish ? 'Opening Adrian Villafan CV (PDF)... 📄' : 'Abriendo CV de Adrian Villafan (PDF)... 📄',
                'info',
                2500
              )
              window.open(personalInfo.cvUrl, '_blank')
            }}
          >
            {personalInfo.heroActions.downloadCv}
          </Button>

          <Button
            size="lg"
            variant="outline"
            icon={<FaWhatsapp size={18} color="#25D366" />}
            onClick={() => window.open(personalInfo.whatsappUrl, '_blank')}
          >
            {personalInfo.heroActions.whatsapp}
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            marginTop: '5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: '0.82rem',
            transition: 'color 0.2s',
          }}
          onClick={() => scrollTo('#about')}
        >
          <span>{personalInfo.scrollIndicator}</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <FiArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}

export default React.memo(Hero)
