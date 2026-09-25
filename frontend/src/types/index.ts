export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  category: 'Full Stack' | 'Data & AI' | 'Microservices & Cloud' | 'Systems & Automation'
  description: string
  impact: string
  tags: string[]
  featured?: boolean
  demoUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  previewType?: 'image' | 'interactive' | 'code'
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  period: string
  duration: string
  location: string
  companyType: string
  achievements: string[]
  technologies: string[]
}

export interface SkillCategory {
  name: string
  description: string
  skills: {
    name: string
    level: string
    iconKey: string
    highlight?: boolean
  }[]
}

export interface CertificationItem {
  id?: string
  title: string
  issuer: string
  year: string
  issueDate?: string
  credentialId?: string
  credentialUrl?: string
  skills?: string[]
  category?: string
  hasExternalLink?: boolean
}
