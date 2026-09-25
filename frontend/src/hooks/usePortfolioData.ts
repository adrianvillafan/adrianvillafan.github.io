import { useMemo } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { portfolioDictionary, PortfolioContentData } from '@/data/portfolioData'

export const usePortfolioData = (): PortfolioContentData => {
  const { language } = useLanguage()

  return useMemo(() => {
    return portfolioDictionary[language] || portfolioDictionary.es
  }, [language])
}
