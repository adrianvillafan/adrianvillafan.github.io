import { useEffect, useRef } from 'react'
import { useActiveSection, SectionId } from '@/context/SectionContext'

export const useSectionObserver = (sectionId: SectionId, threshold = 0.35) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { setActiveSection } = useActiveSection()

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId)
        }
      },
      {
        threshold,
        rootMargin: '-80px 0px -20% 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [sectionId, threshold, setActiveSection])

  return sectionRef
}
