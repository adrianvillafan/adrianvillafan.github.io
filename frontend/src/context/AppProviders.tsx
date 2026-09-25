import React from 'react'
import { ThemeProvider } from './ThemeContext'
import { ScrollProvider } from './ScrollContext'
import { SectionProvider } from './SectionContext'
import { LanguageProvider } from './LanguageContext'

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ScrollProvider>
          <SectionProvider>{children}</SectionProvider>
        </ScrollProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
