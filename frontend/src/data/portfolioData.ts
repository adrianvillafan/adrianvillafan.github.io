import { ProjectItem, ExperienceItem, SkillCategory, CertificationItem } from '@/types'

export const personalInfo = {
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
  status: 'Disponible para nuevos proyectos & roles de alto impacto',
  heroTagline: 'Construyo plataformas web de alto rendimiento, microservicios resilientes y pipelines de datos inteligentes combinando rigor computacional e interfaces modernas.',
  about: {
    lead: 'Egresado de Computación Científica por la Universidad Nacional Mayor de San Marcos (UNMSM) con formación analítica y experiencia práctica en el ciclo completo de desarrollo de software end-to-end.',
    paragraphs: [
      'Mi trayectoria abarca desde el diseño de microservicios con Node.js, NestJS y PHP/Laravel, hasta el desarrollo de interfaces modernas y optimizadas con React y Next.js.',
      'Complemento el desarrollo full-stack con sólida experiencia en ingeniería de datos: pipelines ETL automatizados, web scraping avanzado con Playwright, visión computacional con OpenCV y OCR (Tesseract), modelado y optimización de bases de datos SQL y NoSQL, y despliegues en contenedores Docker sobre servidores Linux.',
      'Me apasiona la intersección entre ingeniería de software, escalabilidad y la inteligencia artificial (actualmente en proceso de certificación en Ingeniería de IA con IBM).'
    ],
    stats: [
      { label: 'Años de Experiencia', value: '+3', suffix: '' },
      { label: 'Plataformas & Integraciones', value: '+6', suffix: '' },
      { label: 'Enfoque de Rendimiento', value: '100%', suffix: '' },
    ]
  }
}

export const experiences: ExperienceItem[] = [
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
      'Limpieza y optimización de datos, automatización de pruebas QA y configuración de entornos en servidores Linux.'
    ],
    technologies: ['Node.js', 'Next.js', 'PHP', 'Angular', 'Microservicios', 'SMPP', 'Linux', 'SQL / NoSQL']
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
      'Soporte de entornos y despliegues productivos con Docker y Linux; refactorización orientada a mantenibilidad.'
    ],
    technologies: ['PHP', 'React', 'Python', 'Playwright', 'OpenAPI / Swagger', 'MySQL / MariaDB', 'Docker', 'Linux']
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
      'Frontend moderno con Next.js (TypeScript) y Laravel Livewire.'
    ],
    technologies: ['NestJS', 'Laravel', 'Next.js', 'TypeScript', 'MongoDB', 'MariaDB', 'Docker', 'ETL']
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
      'Optimización de tiempos de conciliación de pagos mediante automatización de flujos documentarios.'
    ],
    technologies: ['Python', 'OpenCV', 'Tesseract OCR', 'Pandas', 'SQL', 'Reportería Automatizada']
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
      'Manejo de base de datos SQL con control transaccional para resguardo de tesis y grados de posgrado.'
    ],
    technologies: ['React', 'Cloudscape Design', 'Node.js', 'Express', 'MinIO (Object Storage)', 'SQL']
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
      'Reconocido como Voluntario Destacado en 2023 por desempeño sobresaliente en logística, recursos y gestión de eventos académicos.'
    ],
    technologies: ['Liderazgo Técnico', 'Inteligencia Artificial', 'Gestión de Proyectos', 'Eventos Tech']
  }
]

export const projects: ProjectItem[] = [
  {
    id: 'cybertesis-platform',
    title: 'Cybertesis Platform UNMSM',
    subtitle: 'Depósito Digital y Validación de Grados y Tesis',
    category: 'Full Stack',
    description: 'Plataforma oficial para la recepción, revisión, auditoría y depósito institucional de tesis de pregrado y posgrado en la Universidad Nacional Mayor de San Marcos.',
    impact: 'Implementó gestión documental robusta, flujos de aprobación y almacenamiento seguro con MinIO S3 y frontend con Cloudscape.',
    tags: ['React', 'Cloudscape', 'Express.js', 'MinIO S3', 'SQL', 'TypeScript'],
    featured: true,
    previewType: 'code'
  },
  {
    id: 'smart-ocr-pipeline',
    title: 'Automated Receipt OCR & Audit',
    subtitle: 'Motor de Visión Computacional para Comprobantes',
    category: 'Data & AI',
    description: 'Sistema inteligente de reconocimiento y verificación automática de comprobantes de pago bancarios para la conciliación en procesos de admisión y posgrado.',
    impact: 'Redujo sustancialmente la revisión manual mediante pre-procesamiento de imagen con OpenCV y extracción precisa con Tesseract y Pandas.',
    tags: ['Python', 'OpenCV', 'Tesseract OCR', 'Pandas', 'SQL Engine'],
    featured: true,
    previewType: 'interactive'
  },
  {
    id: 'restaurant-analytics-etl',
    title: 'Restaurant Analytics & Scraping ETL',
    subtitle: 'Pipeline de Analítica Operativa y Web Scraping',
    category: 'Systems & Automation',
    description: 'Pipeline automatizado de extracción de datos con Playwright headless, procesamiento ETL en Python y panel administrativo con React y PHP REST API.',
    impact: 'Monitoreo dinámico de datos de competidores y operaciones, automatización por cronjobs y documentación con OpenAPI Swagger.',
    tags: ['Playwright', 'Python', 'React', 'PHP REST', 'Docker', 'MariaDB'],
    featured: true,
    previewType: 'code'
  },
  {
    id: 'multichannel-microservices',
    title: 'Multi-Channel Microservices Hub',
    subtitle: 'Arquitectura de Mensajería & SMPP Concurrente',
    category: 'Microservices & Cloud',
    description: 'Módulos y microservicios para mensajería multicanal de alta disponibilidad, integración con protocolos SMPP y colas de eventos en tiempo real.',
    impact: 'Procesamiento resiliente de eventos, persistencia desacoplada y balanceo en servidores Linux.',
    tags: ['Node.js', 'Microservicios', 'SMPP', 'Next.js', 'Docker', 'Linux'],
    featured: true,
    previewType: 'code'
  }
]

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend Moderno',
    description: 'Interfaces interactivas, reactivas y orientadas al rendimiento',
    skills: [
      { name: 'React', level: 'Avanzado', iconKey: 'react', highlight: true },
      { name: 'Next.js', level: 'Avanzado', iconKey: 'nextjs', highlight: true },
      { name: 'TypeScript', level: 'Avanzado', iconKey: 'typescript', highlight: true },
      { name: 'JavaScript (ES6+)', level: 'Avanzado', iconKey: 'javascript' },
      { name: 'HTML5 / CSS3 / Animations', level: 'Avanzado', iconKey: 'css' },
      { name: 'Cloudscape & Tailwind UI', level: 'Intermedio-Avanzado', iconKey: 'ui' }
    ]
  },
  {
    name: 'Backend & Microservicios',
    description: 'APIs escalables, patrones resilientes y documentación formal',
    skills: [
      { name: 'Node.js / Express', level: 'Avanzado', iconKey: 'nodejs', highlight: true },
      { name: 'NestJS', level: 'Intermedio-Avanzado', iconKey: 'nestjs', highlight: true },
      { name: 'PHP (Nativo & Laravel)', level: 'Avanzado', iconKey: 'php', highlight: true },
      { name: 'REST APIs & OpenAPI/Swagger', level: 'Avanzado', iconKey: 'api' },
      { name: 'Microservicios & Protocolos (SMPP)', level: 'Intermedio', iconKey: 'microservices' }
    ]
  },
  {
    name: 'Data Engineering & AI',
    description: 'Pipelines ETL, automatización, computer vision y modelos',
    skills: [
      { name: 'Python', level: 'Avanzado', iconKey: 'python', highlight: true },
      { name: 'Pandas & Data Processing', level: 'Avanzado', iconKey: 'pandas' },
      { name: 'OpenCV & Tesseract OCR', level: 'Intermedio-Avanzado', iconKey: 'ocr', highlight: true },
      { name: 'Playwright (Web Scraping)', level: 'Avanzado', iconKey: 'scraping' },
      { name: 'Machine Learning / AI Engineering (IBM)', level: 'En formación continua', iconKey: 'ai' }
    ]
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
      { name: 'Git & CI/CD Workflows', level: 'Avanzado', iconKey: 'git' }
    ]
  }
]

export const certifications: CertificationItem[] = [
  {
    title: 'Databases and SQL for Data Science with Python',
    issuer: 'IBM / Coursera',
    year: '2025'
  },
  {
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM / Coursera',
    year: '2024'
  },
  {
    title: 'Inglés Avanzado (Communication Level)',
    issuer: 'Universidad del Pacífico',
    year: '2023 – 2024'
  },
  {
    title: 'Remote Worker Professional Certificate',
    issuer: 'CertiProf',
    year: '2022'
  },
  {
    title: 'Scrum Foundation Professional Certificate (SFPC)',
    issuer: 'CertiProf',
    year: '2022'
  }
]
