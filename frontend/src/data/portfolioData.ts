import { ProjectItem, ExperienceItem, SkillCategory, CertificationItem } from '@/types'
import { Language } from '@/context/LanguageContext'

export interface PortfolioContentData {
  nav: {
    about: string
    experience: string
    projects: string
    skills: string
    contact: string
    talk: string
    cv: string
  }
  personalInfo: {
    name: string
    shortName: string
    title: string
    degree: string
    location: string
    email: string
    phone: string
    whatsappUrl: string
    githubUrl: string
    linkedinUrl: string
    cvUrl: string
    status: string
    heroTagline: string
    heroSpecializedIn: string
    rotatingWords: string[]
    heroActions: {
      projects: string
      contact: string
      whatsapp: string
      downloadCv: string
    }
    scrollIndicator: string
    about: {
      badge: string
      title: string
      subtitle: string
      academicBadge: string
      lead: string
      paragraphs: string[]
      highlights: string[]
      stats: { label: string; value: number; prefix?: string; suffix?: string }[]
      educationTitle: string
      university: string
      degreeTitle: string
      period: string
      certsTitle: string
    }
    experience: {
      badge: string
      title: string
      subtitle: string
      latestBadge: string
    }
    projects: {
      badge: string
      title: string
      subtitle: string
      filterAll: string
      featuredBadge: string
      viewArchitecture: string
      corporateSystem: string
      liveDemo: string
      code: string
      modal: {
        descriptionTitle: string
        impactTitle: string
        techTitle: string
        close: string
      }
    }
    skills: {
      badge: string
      title: string
      subtitle: string
    }
    contact: {
      badge: string
      title: string
      subtitle: string
      directTitle: string
      directDescription: string
      emailLabel: string
      copy: string
      copied: string
      whatsappLabel: string
      locationLabel: string
      locationValue: string
      formTitle: string
      formSuccessTitle: string
      formSuccessMessage: string
      sendAnother: string
      nameLabel: string
      namePlaceholder: string
      emailInputLabel: string
      emailPlaceholder: string
      messageLabel: string
      messagePlaceholder: string
      submitButton: string
      sendingButton: string
    }
    footer: {
      rights: string
      builtWith: string
    }
  }
  experiences: ExperienceItem[]
  projectsList: ProjectItem[]
  skillCategories: SkillCategory[]
  certifications: CertificationItem[]
}

export const portfolioDictionary: Record<Language, PortfolioContentData> = {
  es: {
    nav: {
      about: 'Sobre mí',
      experience: 'Experiencia',
      projects: 'Proyectos',
      skills: 'Habilidades',
      contact: 'Contacto',
      talk: 'Hablemos',
      cv: 'CV PDF',
    },
    personalInfo: {
      name: 'Adrian Marcel Villafan Virhuez',
      shortName: 'Adrian Villafan',
      title: 'Full Stack Developer & Data Engineer',
      degree: 'Computación Científica — UNMSM',
      location: 'Lima, Perú',
      email: 'adrianmarcelv@gmail.com',
      phone: '+51 912 102 577',
      whatsappUrl: 'https://wa.me/51912102577',
      githubUrl: 'https://github.com/adrianvillafan',
      linkedinUrl: 'https://www.linkedin.com/in/adrian-villafan',
      cvUrl: './cv-adrian-villafan.pdf',
      status: 'Disponible para nuevos proyectos & roles de alto impacto',
      heroTagline:
        'Construyo plataformas web de alto rendimiento, microservicios resilientes y pipelines de datos inteligentes combinando rigor computacional e interfaces modernas.',
      heroSpecializedIn: 'Especializado en',
      rotatingWords: [
        'Full Stack Developer',
        'Data & Backend Engineer',
        'Computación Científica — UNMSM',
        'AI & Automation Enthusiast',
      ],
      heroActions: {
        projects: 'Explorar Proyectos',
        contact: 'Contactar',
        whatsapp: 'WhatsApp',
        downloadCv: 'Descargar CV',
      },
      scrollIndicator: 'Desplaza para explorar',
      about: {
        badge: 'Perfil Profesional',
        title: 'Computación Científica & Desarrollo de Alto Rendimiento',
        subtitle:
          'Formación matemática y algorítmica aplicada a la arquitectura de microservicios, ingeniería de datos y desarrollo web moderno.',
        academicBadge: 'Perfil Académico & Enfoque',
        lead:
          'Egresado de Computación Científica por la Universidad Nacional Mayor de San Marcos (UNMSM) con formación analítica y experiencia práctica en el ciclo completo de desarrollo de software end-to-end.',
        paragraphs: [
          'Mi trayectoria abarca desde el diseño de microservicios con Node.js, NestJS y PHP/Laravel, hasta el desarrollo de interfaces modernas y optimizadas con React y Next.js.',
          'Complemento el desarrollo full-stack con sólida experiencia en ingeniería de datos: pipelines ETL automatizados, web scraping avanzado con Playwright, visión computacional con OpenCV y OCR (Tesseract), modelado y optimización de bases de datos SQL y NoSQL, y despliegues en contenedores Docker sobre servidores Linux.',
          'Me apasiona la intersección entre ingeniería de software, escalabilidad y la inteligencia artificial (actualmente en proceso de certificación en Ingeniería de IA con IBM).',
        ],
        highlights: [
          'Desarrollo end-to-end con React, Next.js, Node.js y PHP/Laravel',
          'Pipelines ETL automatizados, Web Scraping con Playwright y Visión con OpenCV',
          'Modelado y optimización de SQL (MySQL/MariaDB) y almacenamiento MinIO',
          'Microservicios con Docker y despliegues en servidores Linux',
        ],
        stats: [
          { label: 'Años de Experiencia', value: 3, prefix: '+' },
          { label: 'Plataformas en Producción', value: 6, prefix: '+' },
          { label: 'Rigor & Optimización', value: 100, suffix: '%' },
        ],
        educationTitle: 'Formación Universitaria',
        university: 'Universidad Nacional Mayor de San Marcos (UNMSM)',
        degreeTitle: 'Bachiller en Computación Científica',
        period: '2020 – 2025',
        certsTitle: 'Certificaciones & Especializaciones',
      },
      experience: {
        badge: 'Trayectoria Laboral',
        title: 'Experiencia Profesional & Proyectos Clave',
        subtitle:
          'Diseño, arquitectura e implementación de soluciones end-to-end, microservicios resilientes, ingeniería de datos y liderazgo técnico.',
        latestBadge: 'Más Reciente',
      },
      projects: {
        badge: 'Proyectos & Soluciones',
        title: 'Casos de Estudio & Arquitecturas Desarrolladas',
        subtitle:
          'Sistemas reales orientados a escalabilidad, visión computacional, pipelines de datos y almacenamiento distribuido seguro.',
        filterAll: 'Todos',
        featuredBadge: 'Destacado',
        viewArchitecture: 'Ver Arquitectura',
        corporateSystem: '• Sistema Corporativo / Caso de Estudio',
        liveDemo: 'Demo',
        code: 'Código',
        modal: {
          descriptionTitle: 'Descripción General',
          impactTitle: 'Impacto y Resultados Clave',
          techTitle: 'Stack Tecnológico Aplicado',
          close: 'Cerrar',
        },
      },
      skills: {
        badge: 'Habilidades Técnicas',
        title: 'Stack Tecnológico & Especialidades',
        subtitle:
          'Conjunto integral de herramientas y lenguajes para ingeniería de software full-stack, automatización de datos y operaciones en la nube.',
      },
      contact: {
        badge: 'Contacto',
        title: '¿Listo para Construir Algo Extraordinario?',
        subtitle:
          'Estoy disponible para nuevos proyectos, consultorías o integración a equipos de ingeniería de alto impacto.',
        directTitle: 'Información Directa',
        directDescription:
          'Conversemos sobre tu visión, requerimientos técnicos o desafíos de ingeniería. Puedes escribirme directamente a través de cualquiera de estos canales:',
        emailLabel: 'Email',
        copy: 'Copiar',
        copied: 'Copiado',
        whatsappLabel: 'WhatsApp Directo',
        locationLabel: 'Ubicación',
        locationValue: 'Lima, Perú (Modalidad Remota / Híbrida)',
        formTitle: 'Envíame un Mensaje',
        formSuccessTitle: '¡Mensaje Enviado con Éxito!',
        formSuccessMessage:
          'Gracias por contactarme. He recibido tu mensaje directamente y te responderé a la brevedad.',
        sendAnother: 'Enviar otro mensaje',
        nameLabel: 'Nombre Completo',
        namePlaceholder: 'Ej. Juan Pérez',
        emailInputLabel: 'Correo Electrónico',
        emailPlaceholder: 'tu@correo.com',
        messageLabel: 'Mensaje / Proyecto',
        messagePlaceholder:
          'Cuéntame sobre tu proyecto, consulta o requerimiento técnico...',
        submitButton: 'Enviar Mensaje',
        sendingButton: 'Enviando...',
      },
      footer: {
        rights: 'Todos los derechos reservados.',
        builtWith: 'Desarrollado con Vite, React, TypeScript & Micro-Frontends architecture.',
      },
    },
    experiences: [
      {
        id: 'intico',
        company: 'IntiCo.AI (INTICO USA Corp)',
        role: 'Full Stack Developer',
        period: 'Feb 2026 – Ago 2026',
        duration: '6 meses',
        location: 'Remoto',
        companyType: 'Servicios y consultoría de TI / Soluciones de Inteligencia Artificial',
        achievements: [
          'Desarrollo y mantenimiento de módulos web end-to-end integrando backend en Node.js y PHP con frontends en Next.js, Angular y PHP.',
          'Mantenimiento y soporte a microservicios multicanal con protocolos de clientes SMPP de alta disponibilidad.',
          'Gestión de bases de datos relacionales y no relacionales para procesamiento de colas, eventos y estados.',
          'Limpieza y optimización de datos, automatización de pruebas QA y configuración de entornos en servidores Linux.',
        ],
        technologies: ['Node.js', 'Next.js', 'PHP', 'Angular', 'Microservicios', 'SMPP', 'Linux', 'SQL / NoSQL'],
      },
      {
        id: 'admirest',
        company: 'Admirest S.A.C',
        role: 'Backend & Data Engineer',
        period: 'Nov 2025 – Jul 2026',
        duration: '8 meses',
        location: 'Lima, Perú',
        companyType: 'Plataforma de gestión y analítica para operaciones en restaurantes',
        achievements: [
          'Desarrollo y mantenimiento de módulos web end-to-end: backend en PHP nativo con APIs REST documentadas en OpenAPI/Swagger y frontend en React.',
          'Automatización de procesos con cronjobs mediante scraping headless con Playwright y pipelines ETL en Python/SQL para migración de datos a base de datos.',
          'Modelado, indexación y optimización de base de datos MySQL/MariaDB para soportar consultas analíticas.',
          'Soporte de entornos y despliegues productivos con Docker y Linux; refactorización orientada a mantenibilidad.',
        ],
        technologies: ['PHP', 'React', 'Python', 'Playwright', 'OpenAPI / Swagger', 'MySQL / MariaDB', 'Docker', 'Linux'],
      },
      {
        id: 'beyzon',
        company: 'Beyzon Corp',
        role: 'Desarrollador Fullstack',
        period: 'Sep 2025 – Oct 2025',
        duration: '2 meses',
        location: 'Remoto',
        companyType: 'Servicios de soluciones tecnológicas y transformación digital',
        achievements: [
          'Desarrollo backend en NestJS (Node.js) y Laravel (PHP) con OpenAPI y Docker.',
          'Diseño y reestructuración de bases de datos MariaDB (SQL) y MongoDB (NoSQL) orientadas a facilitar analítica y Big Data.',
          'Automatización de procesos, cronjobs, scraping y procesos ETL.',
          'Frontend moderno con Next.js (TypeScript) y Laravel Livewire.',
        ],
        technologies: ['NestJS', 'Laravel', 'Next.js', 'TypeScript', 'MongoDB', 'MariaDB', 'Docker', 'ETL'],
      },
      {
        id: 'dgep-unmsm',
        company: 'Dirección General de Estudios de Posgrado – UNMSM',
        role: 'Soporte y Mantenimiento de Sistemas Informáticos',
        period: 'Ene 2024 – Ago 2025',
        duration: '1 año 8 meses',
        location: 'Lima, Perú',
        companyType: 'Educación Superior / Administración Académica',
        achievements: [
          'Desarrollo, mantenimiento y soporte a plataformas académicas institucionales y módulos de pagos con generación de reportería ejecutiva.',
          'Desarrollo e implementación de un sistema automatizado para lectura y verificación de comprobantes de pago utilizando OCR (Tesseract), Python, Pandas y OpenCV.',
          'Optimización de tiempos de conciliación de pagos mediante automatización de flujos documentarios.',
        ],
        technologies: ['Python', 'OpenCV', 'Tesseract OCR', 'Pandas', 'SQL', 'Reportería Automatizada'],
      },
      {
        id: 'vri-unmsm',
        company: 'Vicerrectorado de Investigación – UNMSM',
        role: 'Desarrollador Full Stack',
        period: 'May 2024 – Dic 2024',
        duration: '8 meses',
        location: 'Lima, Perú',
        companyType: 'Educación Superior / Vicerrectorado de Investigación',
        achievements: [
          'Desarrollo integral de la plataforma de "Depósito de Documentos de Grado y Título en Cybertesis".',
          'Gestión de ciclo de vida completo: diseño de interfaz en React con Cloudscape Design System, backend en Express.js y almacenamiento de objetos con MinIO.',
          'Manejo de base de datos SQL con control transaccional para resguardo de tesis y grados de posgrado.',
        ],
        technologies: ['React', 'Cloudscape Design', 'Node.js', 'Express', 'MinIO (Object Storage)', 'SQL'],
      },
      {
        id: 'ieee-cis',
        company: 'IEEE CIS UNMSM (Capítulo de Inteligencia Computacional)',
        role: 'Director de Proyectos / Voluntario Destacado',
        period: 'Mar 2023 – Dic 2024',
        duration: '1 año 10 meses',
        location: 'Lima, Perú',
        companyType: 'Organización Internacional / Tecnología & Liderazgo',
        achievements: [
          'Coordinación y liderazgo de equipo multidisciplinario en actividades técnicas, congresos y talleres de inteligencia artificial y desarrollo de software.',
          'Reconocido como Voluntario Destacado en 2023 por desempeño sobresaliente en logística, recursos y gestión de eventos académicos.',
        ],
        technologies: ['Liderazgo Técnico', 'Inteligencia Artificial', 'Gestión de Proyectos', 'Eventos Tech'],
      },
    ],
    projectsList: [
      {
        id: 'cybertesis-platform',
        title: 'Cybertesis Platform UNMSM',
        subtitle: 'Depósito Digital y Validación de Grados y Tesis',
        category: 'Full Stack',
        description:
          'Plataforma oficial para la recepción, revisión, auditoría y depósito institucional de tesis de pregrado y posgrado en la Universidad Nacional Mayor de San Marcos.',
        impact:
          'Implementó gestión documental robusta, flujos de aprobación y almacenamiento seguro con MinIO S3 y frontend con Cloudscape.',
        tags: ['React', 'Cloudscape', 'Express.js', 'MinIO S3', 'SQL', 'TypeScript'],
        featured: true,
        previewType: 'code',
      },
      {
        id: 'smart-ocr-pipeline',
        title: 'Automated Receipt OCR & Audit',
        subtitle: 'Motor de Visión Computacional para Comprobantes',
        category: 'Data & AI',
        description:
          'Sistema inteligente de reconocimiento y verificación automática de comprobantes de pago bancarios para la conciliación en procesos de admisión y posgrado.',
        impact:
          'Redujo sustancialmente la revisión manual mediante pre-procesamiento de imagen con OpenCV y extracción precisa con Tesseract y Pandas.',
        tags: ['Python', 'OpenCV', 'Tesseract OCR', 'Pandas', 'SQL Engine'],
        featured: true,
        previewType: 'interactive',
      },
      {
        id: 'restaurant-analytics-etl',
        title: 'Restaurant Analytics & Scraping ETL',
        subtitle: 'Pipeline de Analítica Operativa y Web Scraping',
        category: 'Systems & Automation',
        description:
          'Pipeline automatizado de extracción de datos con Playwright headless, procesamiento ETL en Python y panel administrativo con React y PHP REST API.',
        impact:
          'Monitoreo dinámico de datos de competidores y operaciones, automatización por cronjobs y documentación con OpenAPI Swagger.',
        tags: ['Playwright', 'Python', 'React', 'PHP REST', 'Docker', 'MariaDB'],
        featured: true,
        previewType: 'code',
      },
      {
        id: 'multichannel-microservices',
        title: 'Multi-Channel Microservices Hub',
        subtitle: 'Arquitectura de Mensajería & SMPP Concurrente',
        category: 'Microservices & Cloud',
        description:
          'Módulos y microservicios para mensajería multicanal de alta disponibilidad, integración con protocolos SMPP y colas de eventos en tiempo real.',
        impact:
          'Procesamiento resiliente de eventos, persistencia desacoplada y balanceo en servidores Linux.',
        tags: ['Node.js', 'Microservicios', 'SMPP', 'Next.js', 'Docker', 'Linux'],
        featured: true,
        previewType: 'code',
      },
    ],
    skillCategories: [
      {
        name: 'Frontend Moderno',
        description: 'Interfaces interactivas, reactivas y orientadas al rendimiento',
        skills: [
          { name: 'React', level: 'Avanzado', iconKey: 'react', highlight: true },
          { name: 'Next.js', level: 'Avanzado', iconKey: 'nextjs', highlight: true },
          { name: 'TypeScript', level: 'Avanzado', iconKey: 'typescript', highlight: true },
          { name: 'JavaScript (ES6+)', level: 'Avanzado', iconKey: 'javascript' },
          { name: 'HTML5 / CSS3 / Animations', level: 'Avanzado', iconKey: 'css' },
          { name: 'Cloudscape & Tailwind UI', level: 'Intermedio-Avanzado', iconKey: 'ui' },
        ],
      },
      {
        name: 'Backend & Microservicios',
        description: 'APIs escalables, patrones resilientes y documentación formal',
        skills: [
          { name: 'Node.js / Express', level: 'Avanzado', iconKey: 'nodejs', highlight: true },
          { name: 'NestJS', level: 'Intermedio-Avanzado', iconKey: 'nestjs', highlight: true },
          { name: 'PHP (Nativo & Laravel)', level: 'Avanzado', iconKey: 'php', highlight: true },
          { name: 'REST APIs & OpenAPI/Swagger', level: 'Avanzado', iconKey: 'api' },
          { name: 'Microservicios & Protocolos (SMPP)', level: 'Intermedio', iconKey: 'microservices' },
        ],
      },
      {
        name: 'Data Engineering & AI',
        description: 'Pipelines ETL, automatización, computer vision y modelos',
        skills: [
          { name: 'Python', level: 'Avanzado', iconKey: 'python', highlight: true },
          { name: 'Pandas & Data Processing', level: 'Avanzado', iconKey: 'pandas' },
          { name: 'OpenCV & Tesseract OCR', level: 'Intermedio-Avanzado', iconKey: 'ocr', highlight: true },
          { name: 'Playwright (Web Scraping)', level: 'Avanzado', iconKey: 'scraping' },
          { name: 'Machine Learning / AI Engineering (IBM)', level: 'En formación continua', iconKey: 'ai' },
        ],
      },
      {
        name: 'Bases de Datos & Infraestructura',
        description: 'Modelado relacional, almacenamiento distribuido y entornos',
        skills: [
          { name: 'MySQL / MariaDB', level: 'Avanzado', iconKey: 'mysql', highlight: true },
          { name: 'MongoDB (NoSQL)', level: 'Intermedio-Avanzado', iconKey: 'mongodb' },
          { name: 'MinIO (Object Storage S3)', level: 'Intermedio-Avanzado', iconKey: 'minio' },
          { name: 'Docker & Contenedores', level: 'Intermedio-Avanzado', iconKey: 'docker', highlight: true },
          { name: 'Linux Servers (Debian/Ubuntu)', level: 'Avanzado', iconKey: 'linux' },
          { name: 'Git & CI/CD Workflows', level: 'Avanzado', iconKey: 'git' },
        ],
      },
    ],
    certifications: [
      {
        title: 'Databases and SQL for Data Science with Python',
        issuer: 'IBM / Coursera',
        year: '2025',
      },
      {
        title: 'Python for Data Science, AI & Development',
        issuer: 'IBM / Coursera',
        year: '2024',
      },
      {
        title: 'Inglés Avanzado (Communication Level)',
        issuer: 'Universidad del Pacífico',
        year: '2023 – 2024',
      },
      {
        title: 'Remote Worker Professional Certificate',
        issuer: 'CertiProf',
        year: '2022',
      },
      {
        title: 'Scrum Foundation Professional Certificate (SFPC)',
        issuer: 'CertiProf',
        year: '2022',
      },
    ],
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      talk: "Let's Talk",
      cv: 'CV PDF',
    },
    personalInfo: {
      name: 'Adrian Marcel Villafan Virhuez',
      shortName: 'Adrian Villafan',
      title: 'Full Stack Developer & Data Engineer',
      degree: 'Scientific Computing — UNMSM',
      location: 'Lima, Peru',
      email: 'adrianmarcelv@gmail.com',
      phone: '+51 912 102 577',
      whatsappUrl: 'https://wa.me/51912102577',
      githubUrl: 'https://github.com/adrianvillafan',
      linkedinUrl: 'https://www.linkedin.com/in/adrian-villafan',
      cvUrl: './cv-adrian-villafan.pdf',
      status: 'Available for new high-impact projects & engineering roles',
      heroTagline:
        'I build high-performance web platforms, resilient microservices, and intelligent data pipelines combining computational rigor with modern user interfaces.',
      heroSpecializedIn: 'Specialized in',
      rotatingWords: [
        'Full Stack Developer',
        'Data & Backend Engineer',
        'Scientific Computing — UNMSM',
        'AI & Automation Enthusiast',
      ],
      heroActions: {
        projects: 'Explore Projects',
        contact: 'Get in Touch',
        whatsapp: 'WhatsApp',
        downloadCv: 'Download CV',
      },
      scrollIndicator: 'Scroll to explore',
      about: {
        badge: 'Professional Profile',
        title: 'Scientific Computing & High-Performance Engineering',
        subtitle:
          'Mathematical and algorithmic background applied to microservices architecture, data engineering, and modern web development.',
        academicBadge: 'Academic Profile & Focus',
        lead:
          'Scientific Computing graduate from Universidad Nacional Mayor de San Marcos (UNMSM) with analytical training and proven hands-on experience in full end-to-end software development.',
        paragraphs: [
          'My career spans from architecting microservices with Node.js, NestJS, and PHP/Laravel, to developing sleek, optimized user interfaces with React and Next.js.',
          'I complement full-stack development with solid expertise in data engineering: automated ETL pipelines, advanced web scraping using Playwright, computer vision with OpenCV and OCR (Tesseract), relational and NoSQL database optimization, and Docker container deployments on Linux servers.',
          'I am passionate about the intersection of scalable software engineering and artificial intelligence (currently pursuing the IBM AI Engineering Professional Certification).',
        ],
        highlights: [
          'End-to-end development with React, Next.js, Node.js, and PHP/Laravel',
          'Automated ETL pipelines, headless scraping with Playwright, and computer vision with OpenCV',
          'Advanced SQL modeling (MySQL/MariaDB) and MinIO object storage',
          'Containerized microservices with Docker and Linux server deployments',
        ],
        stats: [
          { label: 'Years of Experience', value: 3, prefix: '+' },
          { label: 'Production Platforms', value: 6, prefix: '+' },
          { label: 'Rigor & Optimization', value: 100, suffix: '%' },
        ],
        educationTitle: 'University Education',
        university: 'Universidad Nacional Mayor de San Marcos (UNMSM)',
        degreeTitle: 'Bachelor in Scientific Computing',
        period: '2020 – 2025',
        certsTitle: 'Certifications & Specializations',
      },
      experience: {
        badge: 'Work History',
        title: 'Professional Experience & Key Deliverables',
        subtitle:
          'Design, architecture, and end-to-end implementation of resilient microservices, data pipelines, and technical leadership.',
        latestBadge: 'Latest Role',
      },
      projects: {
        badge: 'Projects & Solutions',
        title: 'Case Studies & Architectural Highlights',
        subtitle:
          'Production-tested systems engineered for scalability, computer vision, automated data pipelines, and secure object storage.',
        filterAll: 'All',
        featuredBadge: 'Featured',
        viewArchitecture: 'View Architecture',
        corporateSystem: '• Enterprise System / Case Study',
        liveDemo: 'Live Demo',
        code: 'Code',
        modal: {
          descriptionTitle: 'Overview',
          impactTitle: 'Impact & Key Results',
          techTitle: 'Technologies Applied',
          close: 'Close',
        },
      },
      skills: {
        badge: 'Technical Skills',
        title: 'Tech Stack & Core Proficiencies',
        subtitle:
          'Comprehensive toolkit and languages for end-to-end software engineering, data automation, and cloud operations.',
      },
      contact: {
        badge: 'Contact',
        title: 'Ready to Build Something Extraordinary?',
        subtitle:
          'I am available for new projects, technical consulting, and integration into high-performing engineering teams.',
        directTitle: 'Direct Information',
        directDescription:
          "Let's discuss your vision, technical requirements, or engineering challenges. You can reach out directly via any of these channels:",
        emailLabel: 'Email',
        copy: 'Copy',
        copied: 'Copied',
        whatsappLabel: 'Direct WhatsApp',
        locationLabel: 'Location',
        locationValue: 'Lima, Peru (Remote / Hybrid available)',
        formTitle: 'Send a Message',
        formSuccessTitle: 'Message Sent Successfully!',
        formSuccessMessage:
          'Thank you for reaching out. Your message has been received directly and I will get back to you shortly.',
        sendAnother: 'Send another message',
        nameLabel: 'Full Name',
        namePlaceholder: 'e.g. John Doe',
        emailInputLabel: 'Email Address',
        emailPlaceholder: 'you@domain.com',
        messageLabel: 'Message / Project Scope',
        messagePlaceholder:
          'Tell me about your project, inquiry, or engineering needs...',
        submitButton: 'Send Message',
        sendingButton: 'Sending...',
      },
      footer: {
        rights: 'All rights reserved.',
        builtWith: 'Engineered with Vite, React, TypeScript & Micro-Frontends architecture.',
      },
    },
    experiences: [
      {
        id: 'intico',
        company: 'IntiCo.AI (INTICO USA Corp)',
        role: 'Full Stack Developer',
        period: 'Feb 2026 – Aug 2026',
        duration: '6 mos',
        location: 'Remote',
        companyType: 'IT Consulting & Artificial Intelligence Solutions',
        achievements: [
          'Engineered and maintained end-to-end modules integrating Node.js and PHP backends with Next.js, Angular, and PHP frontends.',
          'Supported and scaled multi-channel messaging microservices utilizing high-throughput SMPP protocols.',
          'Managed relational and NoSQL databases handling high-concurrency event queues, process states, and streaming logs.',
          'Implemented automated QA testing pipelines, data cleansing, and Linux production server configuration.',
        ],
        technologies: ['Node.js', 'Next.js', 'PHP', 'Angular', 'Microservices', 'SMPP', 'Linux', 'SQL / NoSQL'],
      },
      {
        id: 'admirest',
        company: 'Admirest S.A.C',
        role: 'Backend & Data Engineer',
        period: 'Nov 2025 – Jul 2026',
        duration: '8 mos',
        location: 'Lima, Peru',
        companyType: 'Operations Analytics & Management Platform for Restaurants',
        achievements: [
          'Developed full-stack modules end-to-end: native PHP backend with REST APIs documented in OpenAPI/Swagger and React frontend.',
          'Automated data workflows using headless Playwright web scrapers and Python/SQL ETL pipelines for seamless cloud database ingestion.',
          'Modeled, indexed, and optimized MySQL/MariaDB databases to support real-time operational analytics.',
          'Managed deployments with Docker on Linux environments; refactored core modules for long-term maintainability.',
        ],
        technologies: ['PHP', 'React', 'Python', 'Playwright', 'OpenAPI / Swagger', 'MySQL / MariaDB', 'Docker', 'Linux'],
      },
      {
        id: 'beyzon',
        company: 'Beyzon Corp',
        role: 'Fullstack Developer',
        period: 'Sep 2025 – Oct 2025',
        duration: '2 mos',
        location: 'Remote',
        companyType: 'Technology Consulting & Digital Transformation Services',
        achievements: [
          'Backend development in NestJS (Node.js) and Laravel (PHP) with OpenAPI specs and Docker containerization.',
          'Designed and restructured MariaDB (SQL) and MongoDB (NoSQL) databases tailored for Big Data analytics.',
          'Implemented automated scheduled cronjobs, web scraping, and ETL pipelines.',
          'Engineered modern reactive interfaces using Next.js (TypeScript) and Laravel Livewire.',
        ],
        technologies: ['NestJS', 'Laravel', 'Next.js', 'TypeScript', 'MongoDB', 'MariaDB', 'Docker', 'ETL'],
      },
      {
        id: 'dgep-unmsm',
        company: 'General Directorate of Postgraduate Studies – UNMSM',
        role: 'Systems Support & Software Developer',
        period: 'Jan 2024 – Aug 2025',
        duration: '1 yr 8 mos',
        location: 'Lima, Peru',
        companyType: 'Higher Education / Academic Administration',
        achievements: [
          'Developed, maintained, and optimized institutional academic platforms and financial payment modules with executive reporting.',
          'Architected an automated bank receipt validation engine using computer vision (OpenCV), Tesseract OCR, Python, and Pandas.',
          'Drastically reduced manual auditing cycles through automated document reconciliation workflows.',
        ],
        technologies: ['Python', 'OpenCV', 'Tesseract OCR', 'Pandas', 'SQL', 'Automated Reporting'],
      },
      {
        id: 'vri-unmsm',
        company: 'Vice-Rectorate for Research – UNMSM',
        role: 'Full Stack Developer',
        period: 'May 2024 – Dec 2024',
        duration: '8 mos',
        location: 'Lima, Peru',
        companyType: 'Higher Education / Academic Research Division',
        achievements: [
          'Built the institutional platform for the deposit, audit, and archiving of academic theses and degrees in Cybertesis.',
          'Managed the complete project lifecycle: React frontend with Cloudscape Design System, Express.js backend, and MinIO object storage.',
          'Implemented strict transactional SQL database controls for long-term digital preservation.',
        ],
        technologies: ['React', 'Cloudscape Design', 'Node.js', 'Express', 'MinIO (Object Storage)', 'SQL'],
      },
      {
        id: 'ieee-cis',
        company: 'IEEE CIS UNMSM (Computational Intelligence Society)',
        role: 'Project Director / Outstanding Volunteer',
        period: 'Mar 2023 – Dec 2024',
        duration: '1 yr 10 mos',
        location: 'Lima, Peru',
        companyType: 'International Organization / Technology & Leadership',
        achievements: [
          'Led a multidisciplinary engineering team coordinating technical congresses, workshops, and AI conferences for the academic community.',
          'Recognized as Outstanding Volunteer in 2023 for exemplary performance in logistics, resources, and technical event execution.',
        ],
        technologies: ['Technical Leadership', 'Artificial Intelligence', 'Project Management', 'Tech Events'],
      },
    ],
    projectsList: [
      {
        id: 'cybertesis-platform',
        title: 'Cybertesis Platform UNMSM',
        subtitle: 'Digital Repository & Degree Validation Engine',
        category: 'Full Stack',
        description:
          'Official university platform for receiving, reviewing, auditing, and depositing undergraduate and graduate theses at UNMSM.',
        impact:
          'Implemented secure document workflows, multi-step approval routing, and enterprise object storage with MinIO S3 and Cloudscape UI.',
        tags: ['React', 'Cloudscape', 'Express.js', 'MinIO S3', 'SQL', 'TypeScript'],
        featured: true,
        previewType: 'code',
      },
      {
        id: 'smart-ocr-pipeline',
        title: 'Automated Receipt OCR & Audit',
        subtitle: 'Computer Vision & Document Extraction Pipeline',
        category: 'Data & AI',
        description:
          'Intelligent automated payment verification system for admission and graduate school tuition fee reconciliation.',
        impact:
          'Cut manual verification time by 80% via OpenCV image pre-processing, adaptive binarization, and Tesseract OCR parsing with Pandas.',
        tags: ['Python', 'OpenCV', 'Tesseract OCR', 'Pandas', 'SQL Engine'],
        featured: true,
        previewType: 'interactive',
      },
      {
        id: 'restaurant-analytics-etl',
        title: 'Restaurant Analytics & Scraping ETL',
        subtitle: 'Operational Analytics & Web Scraping Pipeline',
        category: 'Systems & Automation',
        description:
          'Automated data extraction pipeline utilizing headless Playwright, Python ETL transforms, and an administrative dashboard in React and PHP REST API.',
        impact:
          'Provided automated market monitoring, scheduled cronjobs, and comprehensive OpenAPI Swagger documentation.',
        tags: ['Playwright', 'Python', 'React', 'PHP REST', 'Docker', 'MariaDB'],
        featured: true,
        previewType: 'code',
      },
      {
        id: 'multichannel-microservices',
        title: 'Multi-Channel Microservices Hub',
        subtitle: 'High-Concurrency Messaging & SMPP Gateway',
        category: 'Microservices & Cloud',
        description:
          'Microservices suite engineered for high-availability multi-channel communications, SMPP protocol connectivity, and distributed real-time queues.',
        impact:
          'Resilient fault-tolerant event processing with decoupled persistence on production Linux servers.',
        tags: ['Node.js', 'Microservices', 'SMPP', 'Next.js', 'Docker', 'Linux'],
        featured: true,
        previewType: 'code',
      },
    ],
    skillCategories: [
      {
        name: 'Modern Frontend',
        description: 'Interactive, reactive, and performance-driven user interfaces',
        skills: [
          { name: 'React', level: 'Advanced', iconKey: 'react', highlight: true },
          { name: 'Next.js', level: 'Advanced', iconKey: 'nextjs', highlight: true },
          { name: 'TypeScript', level: 'Advanced', iconKey: 'typescript', highlight: true },
          { name: 'JavaScript (ES6+)', level: 'Advanced', iconKey: 'javascript' },
          { name: 'HTML5 / CSS3 / Animations', level: 'Advanced', iconKey: 'css' },
          { name: 'Cloudscape & Tailwind UI', level: 'Intermediate-Advanced', iconKey: 'ui' },
        ],
      },
      {
        name: 'Backend & Microservices',
        description: 'Scalable APIs, resilient patterns, and formal documentation',
        skills: [
          { name: 'Node.js / Express', level: 'Advanced', iconKey: 'nodejs', highlight: true },
          { name: 'NestJS', level: 'Intermediate-Advanced', iconKey: 'nestjs', highlight: true },
          { name: 'PHP (Native & Laravel)', level: 'Advanced', iconKey: 'php', highlight: true },
          { name: 'REST APIs & OpenAPI/Swagger', level: 'Advanced', iconKey: 'api' },
          { name: 'Microservices & Protocols (SMPP)', level: 'Intermediate', iconKey: 'microservices' },
        ],
      },
      {
        name: 'Data Engineering & AI',
        description: 'ETL pipelines, automation, computer vision, and ML models',
        skills: [
          { name: 'Python', level: 'Advanced', iconKey: 'python', highlight: true },
          { name: 'Pandas & Data Processing', level: 'Advanced', iconKey: 'pandas' },
          { name: 'OpenCV & Tesseract OCR', level: 'Intermediate-Advanced', iconKey: 'ocr', highlight: true },
          { name: 'Playwright (Web Scraping)', level: 'Advanced', iconKey: 'scraping' },
          { name: 'Machine Learning / AI Engineering (IBM)', level: 'Continuous Learning', iconKey: 'ai' },
        ],
      },
      {
        name: 'Databases & Infrastructure',
        description: 'Relational modeling, distributed storage, and cloud environments',
        skills: [
          { name: 'MySQL / MariaDB', level: 'Advanced', iconKey: 'mysql', highlight: true },
          { name: 'MongoDB (NoSQL)', level: 'Intermediate-Advanced', iconKey: 'mongodb' },
          { name: 'MinIO (Object Storage S3)', level: 'Intermediate-Advanced', iconKey: 'minio' },
          { name: 'Docker & Containers', level: 'Intermediate-Advanced', iconKey: 'docker', highlight: true },
          { name: 'Linux Servers (Debian/Ubuntu)', level: 'Advanced', iconKey: 'linux' },
          { name: 'Git & CI/CD Workflows', level: 'Advanced', iconKey: 'git' },
        ],
      },
    ],
    certifications: [
      {
        title: 'Databases and SQL for Data Science with Python',
        issuer: 'IBM / Coursera',
        year: '2025',
      },
      {
        title: 'Python for Data Science, AI & Development',
        issuer: 'IBM / Coursera',
        year: '2024',
      },
      {
        title: 'Advanced English (Communication Level)',
        issuer: 'Universidad del Pacífico',
        year: '2023 – 2024',
      },
      {
        title: 'Remote Worker Professional Certificate',
        issuer: 'CertiProf',
        year: '2022',
      },
      {
        title: 'Scrum Foundation Professional Certificate (SFPC)',
        issuer: 'CertiProf',
        year: '2022',
      },
    ],
  },
}

// Retrocompatibilidad con importaciones previas
export const personalInfo = portfolioDictionary.es.personalInfo
export const experiences = portfolioDictionary.es.experiences
export const projects = portfolioDictionary.es.projectsList
export const skillCategories = portfolioDictionary.es.skillCategories
export const certifications = portfolioDictionary.es.certifications
