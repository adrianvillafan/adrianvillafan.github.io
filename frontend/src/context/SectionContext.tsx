import React, { createContext, useContext, useState, useMemo, useCallback } from 'react'

export type SectionId = 'hero' | 'about' | 'experience' | 'projects' | 'skills' | 'contact'

interface SectionContextType {
  activeSection: SectionId
  setActiveSection: (id: SectionId) => void
}

const SectionContext = createContext<SectionContextType | undefined>(undefined)

export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSectionState] = useState<SectionId>('hero')

  const setActiveSection = useCallback((id: SectionId) => {
    setActiveSectionState(id)
  }, [])

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
    }),
    [activeSection, setActiveSection]
  )

  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
}

export const useActiveSection = (): SectionContextType => {
  const context = useContext(SectionContext)
  if (!context) {
    throw new Error('useActiveSection must be used within a SectionProvider')
  }
  return context
}
