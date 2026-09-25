import React from 'react'
import { ThemeProvider } from './ThemeContext'
import { ScrollProvider } from './ScrollContext'
import { SectionProvider } from './SectionContext'

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <ScrollProvider>
        <SectionProvider>{children}</SectionProvider>
      </ScrollProvider>
    </ThemeProvider>
  )
}
