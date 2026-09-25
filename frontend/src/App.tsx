import React, { lazy, Suspense } from 'react'
import { AppProviders } from '@/context/AppProviders'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { SectionFallback } from '@/components/ui/SectionFallback'
import { InteractiveBackground } from '@/components/effects/InteractiveBackground'
import { CustomCursor } from '@/components/effects/CustomCursor'
import { InteractiveTerminal } from '@/components/effects/InteractiveTerminal'

// 🔷 MICRO-FRONTENDS: Cada sección se carga bajo demanda (lazy-loaded)
const Hero = lazy(() => import('@/sections/hero/Hero'))
const About = lazy(() => import('@/sections/about/About'))
const Experience = lazy(() => import('@/sections/experience/Experience'))
const Projects = lazy(() => import('@/sections/projects/Projects'))
const Skills = lazy(() => import('@/sections/skills/Skills'))
const Contact = lazy(() => import('@/sections/contact/Contact'))

function App() {
  return (
    <AppProviders>
      {/* Noise texture overlay */}
      <div className="noise-bg" />

      {/* 🌌 Fondo interactivo de constelaciones & spotlight reactivo al cursor */}
      <InteractiveBackground />

      {/* 🎯 Cursor magnético dinámico con física de resorte */}
      <CustomCursor />

      {/* 💻 Terminal Unix CLI interactivo embebido */}
      <InteractiveTerminal />

      {/* Fixed Navbar with blur */}
      <Navbar />

      <main>
        {/* Hero section */}
        <Suspense fallback={<SectionFallback height="80vh" />}>
          <Hero />
        </Suspense>

        {/* About section */}
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        {/* Experience timeline */}
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>

        {/* Projects showcase */}
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        {/* Skills & Tech stack */}
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        {/* Contact section */}
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </AppProviders>
  )
}

export default App
