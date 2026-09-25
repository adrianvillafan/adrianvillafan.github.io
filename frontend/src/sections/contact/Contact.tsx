import React, { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { personalInfo } from '@/data/portfolioData'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { TiltCard } from '@/components/effects/TiltCard'
import { Button } from '@/components/ui/Button'
import { FiMail, FiMapPin, FiSend, FiCheck, FiCopy } from 'react-icons/fi'
import { FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa'

const Contact: React.FC = () => {
  const sectionRef = useSectionObserver('contact')
  const [copied, setCopied] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const subject = encodeURIComponent(`Contacto de Portafolio: ${formData.name}`)
      const body = encodeURIComponent(
        `Hola Adrian,\n\nMi nombre es ${formData.name} (${formData.email}).\n\nMensaje:\n${formData.message}`
      )
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
      setFormSubmitted(true)
    },
    [formData]
  )

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="contact"
      className="section"
    >
      <div className="container">
        <SectionTitle
          badge="Contacto"
          title="¿Listo para Construir Algo Extraordinario?"
          subtitle="Estoy disponible para nuevos proyectos, consultorías o integración a equipos de ingeniería de alto impacto."
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
                  Información Directa
                </h3>
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '2rem',
                  }}
                >
                  Conversemos sobre tu visión, requerimientos técnicos o desafíos de ingeniería. Puedes escribirme directamente a través de cualquiera de estos canales:
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
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)',
                      gap: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <FiMail size={18} color="var(--accent-light)" />
                      <div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Email</div>
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
                      title="Copiar correo"
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
                      <span>{copied ? 'Copiado' : 'Copiar'}</span>
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
                        WhatsApp Directo
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
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <FiMapPin size={18} color="var(--accent-light)" />
                    <div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Ubicación</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {personalInfo.location} (Modalidad Remota / Híbrida)
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
                  Envíame un Mensaje
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
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 600 }}>¡Mensaje Listo!</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '380px' }}>
                      Se ha abierto tu cliente de correo para enviar la comunicación directamente a {personalInfo.email}.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setFormSubmitted(false)}
                      style={{ marginTop: '0.5rem' }}
                    >
                      Enviar otro mensaje
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
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Juan Pérez"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.04)',
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
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tu@correo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.04)',
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
                        Mensaje / Proyecto
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Cuéntame sobre tu proyecto, consulta o requerimiento técnico..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.04)',
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
                      icon={<FiSend size={16} />}
                    >
                      Enviar Mensaje
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
