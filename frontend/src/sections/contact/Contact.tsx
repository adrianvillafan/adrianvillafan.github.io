import React, { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { useToast } from '@/context/ToastContext'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { TiltCard } from '@/components/effects/TiltCard'
import { Button } from '@/components/ui/Button'
import { FiMail, FiMapPin, FiSend, FiCheck, FiCopy, FiLoader } from 'react-icons/fi'
import { FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa'

const Contact: React.FC = () => {
  const sectionRef = useSectionObserver('contact')
  const { personalInfo } = usePortfolioData()
  const { showToast } = useToast()
  const [copied, setCopied] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    const isEs = personalInfo.contact.copied === 'Copiado'
    showToast(
      isEs ? '¡Correo copiado al portapapeles! 📋' : 'Email copied to clipboard! 📋',
      'success',
      2500
    )
    setTimeout(() => setCopied(false), 2000)
  }, [personalInfo.email, personalInfo.contact.copied, showToast])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      const isEs = personalInfo.contact.copied === 'Copiado'

      try {
        const accessKey =
          (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY ||
          'b18f8e8f-7d9a-4c2e-83d1-portfoliodemo'

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Nuevo mensaje de ${formData.name} (Portafolio Adrian Villafan)`,
            from_name: formData.name,
          }),
        })

        const result = await response.json()

        if (result.success) {
          setFormSubmitted(true)
          showToast(
            isEs ? '¡Mensaje enviado con éxito! 🚀' : 'Message sent successfully! 🚀',
            'success',
            4000
          )
        } else {
          // Si el access key no está activado aún, fallback limpio y seguro a mailto
          console.info('Web3Forms response, fallback to mailto:', result)
          const subject = encodeURIComponent(`Contacto Portafolio: ${formData.name}`)
          const body = encodeURIComponent(
            `Hola Adrian,\n\nMi nombre es ${formData.name} (${formData.email}).\n\nMensaje:\n${formData.message}`
          )
          window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
          setFormSubmitted(true)
          showToast(
            isEs
              ? 'Abriendo cliente de correo para envío seguro ✉️'
              : 'Opening email client for secure delivery ✉️',
            'info',
            3500
          )
        }
      } catch (err) {
        console.error('Submission network error, fallback to mailto:', err)
        const subject = encodeURIComponent(`Contacto Portafolio: ${formData.name}`)
        const body = encodeURIComponent(
          `Hola Adrian,\n\nMi nombre es ${formData.name} (${formData.email}).\n\nMensaje:\n${formData.message}`
        )
        window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
        setFormSubmitted(true)
        showToast(
          isEs
            ? 'Abriendo tu cliente de correo ✉️'
            : 'Opening your email client ✉️',
          'info',
          3500
        )
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, personalInfo.email, personalInfo.contact.copied, showToast]
  )

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="contact"
      className="section"
    >
      <div className="container">
        <SectionTitle
          badge={personalInfo.contact.badge}
          title={personalInfo.contact.title}
          subtitle={personalInfo.contact.subtitle}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard maxTilt={5}>
              <div style={{ padding: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {personalInfo.contact.directTitle}
                </h3>
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '2rem',
                  }}
                >
                  {personalInfo.contact.directDescription}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    marginBottom: '2rem',
                  }}
                >
                  {/* Email con botón de copiar */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.9rem 1.15rem',
                      background: 'var(--pill-bg)',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)',
                      gap: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <FiMail size={18} color="var(--accent-light)" />
                      <div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {personalInfo.contact.emailLabel}
                        </div>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          style={{
                            fontSize: '0.92rem',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                          }}
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      title={personalInfo.contact.copy}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: copied ? '#34d399' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.78rem',
                        border: '1px solid var(--border-subtle)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                      <span>{copied ? personalInfo.contact.copied : personalInfo.contact.copy}</span>
                    </button>
                  </div>

                  {/* WhatsApp Directo */}
                  <a
                    href={personalInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.9rem 1.15rem',
                      background: 'rgba(37, 211, 102, 0.06)',
                      borderRadius: '12px',
                      border: '1px solid rgba(37, 211, 102, 0.25)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <FaWhatsapp size={22} color="#25D366" />
                    <div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {personalInfo.contact.whatsappLabel}
                      </div>
                      <div style={{ fontSize: '0.94rem', fontWeight: 600, color: '#34d399' }}>
                        {personalInfo.phone}
                      </div>
                    </div>
                  </a>

                  {/* Ubicación */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.9rem 1.15rem',
                      background: 'var(--pill-bg)',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <FiMapPin size={18} color="var(--accent-light)" />
                    <div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {personalInfo.contact.locationLabel}
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {personalInfo.contact.locationValue}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={<FaLinkedin size={15} />}
                    onClick={() => window.open(personalInfo.linkedinUrl, '_blank')}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={<FaGithub size={15} />}
                    onClick={() => window.open(personalInfo.githubUrl, '_blank')}
                  >
                    GitHub
                  </Button>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Formulario Interactivo */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <TiltCard maxTilt={5}>
              <div style={{ padding: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {personalInfo.contact.formTitle}
                </h3>

                {formSubmitted ? (
                  <div
                    style={{
                      padding: '2.5rem 1rem',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.85rem',
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#34d399',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FiCheck size={26} />
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                      {personalInfo.contact.formSuccessTitle}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '380px' }}>
                      {personalInfo.contact.formSuccessMessage}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setFormSubmitted(false)}
                      style={{ marginTop: '0.5rem' }}
                    >
                      {personalInfo.contact.sendAnother}
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.82rem',
                          fontWeight: 500,
                          color: 'var(--text-secondary)',
                          marginBottom: '0.45rem',
                        }}
                      >
                        {personalInfo.contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={personalInfo.contact.namePlaceholder}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '10px',
                          background: 'var(--input-bg)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.92rem',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.82rem',
                          fontWeight: 500,
                          color: 'var(--text-secondary)',
                          marginBottom: '0.45rem',
                        }}
                      >
                        {personalInfo.contact.emailInputLabel}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={personalInfo.contact.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '10px',
                          background: 'var(--input-bg)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.92rem',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.82rem',
                          fontWeight: 500,
                          color: 'var(--text-secondary)',
                          marginBottom: '0.45rem',
                        }}
                      >
                        {personalInfo.contact.messageLabel}
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder={personalInfo.contact.messagePlaceholder}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '10px',
                          background: 'var(--input-bg)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.92rem',
                          outline: 'none',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="primary"
                      fullWidth
                      disabled={isSubmitting}
                      icon={
                        isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            style={{ display: 'inline-flex' }}
                          >
                            <FiLoader size={16} />
                          </motion.div>
                        ) : (
                          <FiSend size={16} />
                        )
                      }
                    >
                      {isSubmitting
                        ? personalInfo.contact.sendingButton
                        : personalInfo.contact.submitButton}
                    </Button>
                  </form>
                )}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(Contact)
