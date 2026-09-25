# Portafolio Profesional • Adrian Marcel Villafan Virhuez

> **Full Stack Developer & Data Engineer**  
> *Bachiller en Computación Científica — Universidad Nacional Mayor de San Marcos (UNMSM)*  
> Especializado en arquitecturas web reactivas de alto rendimiento, ingeniería de datos end-to-end, modelos algorítmicos y aplicaciones impulsadas por IA.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?logo=github)](https://adrianvillafan.github.io)

---

## 🌐 Visión General del Proyecto

Este repositorio alberga el sitio web y portafolio interactivo de **Adrian Marcel Villafan Virhuez**, diseñado bajo estándares de alta fidelidad visual, rendimiento fluido de 60fps, accesibilidad, y soporte bilingüe completo (**Español** e **Inglés**).

### Características Destacadas
- ⚡ **Single Page Application (SPA)** reactiva construida con **React 19** y **TypeScript**.
- 🌐 **Soporte Multilingüe (i18n)**: Alternancia fluida e instantánea entre Español e Inglés sin recargas mediante `LanguageContext`.
- 🌓 **Sistema de Temas Dinámico**: Modo Oscuro (*Cyberpunk/Slate Glass*) y Modo Claro (*Clean Minimal*) persistente en `localStorage`.
- 💻 **Terminal Interactivo CLI**: Emulador de shell Unix en navegador con comandos interactivos (`help`, `about`, `skills`, `projects`, `exp`, `certs`, `contact`, `cv`, `clear`, `matrix`).
- 📜 **Modal de Vista Previa Oficial de Diplomas**: Visualizador ceremonial de credenciales universitarias (UNMSM, Universidad del Pacífico) y certificaciones internacionales (Anthropic, IBM, Rimac Seguros, Atlassian, CertiProf, Coursera, LinkedIn Learning) con sellos oficiales de alta resolución.
- 📄 **Visor de CV Integrado**: Modal interactivo para previsualizar el currículum vitae en PDF con opción de descarga directa en un clic.
- 🎛️ **Efectos Microinteractivos**: 
  - Tarjetas con perspectiva 3D basada en física de puntero (`TiltCard`).
  - Marquesinas infinitas de tecnologías (`TechMarquee`).
  - Efectos de sonido sutiles con Web Audio API (`soundEffects.ts`).
  - Desplazamiento suave con **Lenis Scroll**.
  - Animaciones orquestadas con **Motion (Framer Motion v13)** y **GSAP**.

---

## 🏛️ Arquitectura del Repositorio

El proyecto utiliza una **arquitectura desacoplada y directa** optimizada para despliegues en **GitHub Pages** sin requerir pipelines de CI/CD lentos ni servidores adicionales:

```
adrianvillafan.github.io/
├── frontend/                     # Código fuente SPA (React 19 + TypeScript + Vite)
│   ├── public/                   # Activos estáticos servidos en desarrollo
│   │   └── images/               # Sellos y logos oficiales en SVG y PNG
│   ├── src/
│   │   ├── components/           # Componentes modulares
│   │   │   ├── effects/          # TiltCard, Terminal, Modales, Marquee, Canvas, etc.
│   │   │   └── ui/               # Botones, Insignias (Badge), Navbar, etc.
│   │   ├── context/              # Context Providers (Language, Theme, Sound, CvModal)
│   │   ├── data/
│   │   │   └── portfolioData.ts  # ⭐ DICCIONARIO BILINGÜE CENTRALIZADO (ES / EN)
│   │   ├── hooks/                # Custom Hooks (usePortfolioData, useSectionObserver)
│   │   ├── sections/             # Secciones de la página (Hero, About, Experience, Projects, Skills, Contact)
│   │   ├── styles/               # Tokens de diseño y estilos globales
│   │   ├── types/                # Interfaces y contratos de tipos TypeScript
│   │   └── utils/                # Efectos de audio (Web Audio API) y helpers
│   ├── package.json              # Scripts y dependencias del frontend
│   └── vite.config.ts            # Configuración de compilación outDir: '../'
│
├── assets/                       # Bundle compilado de producción (JS, CSS, Chunks)
├── images/                       # Logos institucionales accesibles en producción
├── index.html                    # Entry point de producción en la raíz
├── cv-adrian-villafan.pdf        # Documento CV oficial para visualización y descarga
├── .nojekyll                     # Deshabilita el procesamiento de Jekyll en GitHub Pages
└── .gitignore                    # Exclusiones de Git (node_modules, .agents, etc.)
    ├── hooks.json                # Hook de ciclo de vida (Git-Guard)
    ├── rules/                    # Reglas activas de arquitectura
    └── scripts/                  # Scripts de validación del hook
```

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Core** | React 19, TypeScript 6, Vite 8 |
| **Estilos** | CSS Vanilla Moderno, CSS Custom Properties (Variables de Diseño), Glassmorphism |
| **Animaciones** | Motion (`motion/react` v13), GSAP 3, Lenis Smooth Scroll |
| **Iconografía** | React Icons (`Fi` Feather, `Si` SimpleIcons, `Fa` FontAwesome) |
| **Audio** | Web Audio API sintetizada (sin dependencias de archivos de audio externos) |
| **Despliegue** | GitHub Pages con rutas relativas (`base: './'`) |

---

## 📋 Reglas Arquitectónicas y Directrices del Proyecto

### 1. ⛔ Restricción de Git
- **De la gestión de Git se encarga exclusiva y manualmente el usuario.**
- Los agentes y herramientas de asistencia tienen configurado un hook de protección (`.agents/hooks.json`) que bloquea la ejecución de comandos `git` para optimizar los ciclos de trabajo.

### 2. 🌐 Fuente Única de Verdad (`portfolioData.ts`)
- Toda la información mostrada en el portafolio (bio, experiencia laboral, proyectos, stack, educación y certificaciones) se encuentra centralizada en:
  [`frontend/src/data/portfolioData.ts`](frontend/src/data/portfolioData.ts)
- **Sincronización Estricta**: Cualquier edición o adición debe mantenerse tanto en el bloque de idioma español (`portfolioDictionary.es`) como en el de inglés (`portfolioDictionary.en`).

### 3. 📦 Gestión de Recursos y Compilación
- La compilación está configurada en `vite.config.ts` con `outDir: '../'` y `base: './'`.
- Al ejecutar `npm run build` en la carpeta `frontend/`, los archivos empaquetados (`index.html`, `assets/`) se generan directamente en la raíz del repositorio, listos para ser publicados en GitHub Pages.
- Los activos de imagen (`unmsm_seal.svg`, `upacifico.png`, `ibm_logo.svg`, `rimac_logo.png`, `certiprof_logo.png`) se mantienen sincronizados tanto en `frontend/public/images/` como en `images/` de la raíz.

### 4. 📜 Manejo de Credenciales y Licencias
- Las certificaciones con enlace de validación pública oficial incluyen su respectiva URL en `credentialUrl` con `hasExternalLink: true`.
- Las certificaciones sin enlace público en línea (ej. CertiProf) tienen `hasExternalLink: false` y son accesibles exclusivamente mediante el modal ceremonial en cliente (`DiplomaPreviewModal`), previniendo hipervínculos rotos.

### 5. 📁 Exclusión de Archivos Locales y Hooks (`.gitignore`)
- El directorio `.agents/` contiene las configuraciones locales de hooks y reglas del agente. Está estrictamente listado en `.gitignore` para no ser subido al repositorio público ni desplegado a producción.

---

## 🚀 Guía de Desarrollo Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) v18 o superior.
- [npm](https://www.npmjs.com/) v9 o superior.

### Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/adrianvillafan/adrianvillafan.github.io.git
   cd adrianvillafan.github.io/frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:7542](http://localhost:7542) en tu navegador.

4. **Compilar para producción**:
   ```bash
   npm run build
   ```
   *(Valida tipos con `tsc -b` y compila los bundles en la raíz del proyecto).*

5. **Verificar calidad de código**:
   ```bash
   npm run lint
   ```

---

## 👤 Contacto y Redes

- **Autor**: Adrian Marcel Villafan Virhuez
- **LinkedIn**: [linkedin.com/in/adrian-marcel-villafan-virhuez-42169923b](https://www.linkedin.com/in/adrian-marcel-villafan-virhuez-42169923b/)
- **GitHub**: [github.com/adrianvillafan](https://github.com/adrianvillafan)
- **Portafolio en Vivo**: [adrianvillafan.github.io](https://adrianvillafan.github.io/)