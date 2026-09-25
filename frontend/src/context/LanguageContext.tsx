import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'

export type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  isEnglish: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es')

  useEffect(() => {
    const savedLang = localStorage.getItem('portfolio_lang') as Language | null
    if (savedLang === 'es' || savedLang === 'en') {
      setLanguageState(savedLang)
      document.documentElement.setAttribute('lang', savedLang)
    } else {
      const browserLang = navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
      setLanguageState(browserLang)
      document.documentElement.setAttribute('lang', browserLang)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
    if (language === 'en') {
      document.title = 'Adrian Villafan | Full Stack Developer & Data Engineer'
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Portfolio of Adrian Marcel Villafan Virhuez - Full Stack Developer & Data Engineer graduated from UNMSM. Specialized in React, Node.js, Python, microservices and automated ETL pipelines.'
        )
      }
    } else {
      document.title = 'Adrian Villafan | Full Stack Developer & Ingeniero de Datos'
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Portafolio profesional de Adrian Marcel Villafan Virhuez - Analista Programador Fullstack e Ingeniero de Datos egresado de Computación Científica en UNMSM.'
        )
      }
    }
  }, [language])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('portfolio_lang', lang)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === 'es' ? 'en' : 'es'
      localStorage.setItem('portfolio_lang', next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      isEnglish: language === 'en',
    }),
    [language, setLanguage, toggleLanguage]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
