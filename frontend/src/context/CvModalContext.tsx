import React, { createContext, useContext, useState, useCallback } from 'react'
import { CvPreviewModal } from '@/components/effects/CvPreviewModal'

interface CvModalContextValue {
  isOpen: boolean
  openCvModal: () => void
  closeCvModal: () => void
}

const CvModalContext = createContext<CvModalContextValue | undefined>(undefined)

export const CvModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openCvModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeCvModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <CvModalContext.Provider value={{ isOpen, openCvModal, closeCvModal }}>
      {children}
      <CvPreviewModal isOpen={isOpen} onClose={closeCvModal} />
    </CvModalContext.Provider>
  )
}

export const useCvModal = (): CvModalContextValue => {
  const context = useContext(CvModalContext)
  if (!context) {
    throw new Error('useCvModal must be used within a CvModalProvider')
  }
  return context
}
