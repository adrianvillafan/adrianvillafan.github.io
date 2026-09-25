import React from 'react'
import { ThemeProvider } from './ThemeContext'
import { ScrollProvider } from './ScrollContext'
import { SectionProvider } from './SectionContext'
import { LanguageProvider } from './LanguageContext'
import { ToastProvider } from './ToastContext'

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <ScrollProvider>
            <SectionProvider>{children}</SectionProvider>
          </ScrollProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
