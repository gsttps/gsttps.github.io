// Skills agrupados por categoría (spec §6.4).
// Editar este arreglo agrega/quita badges automáticamente.
//
// `icon` admite tres formatos:
//   · 'devicon-…'      → clase devicon (CDN), se renderiza coloreada
//   · 'lucide:nombre'  → ícono de lucide-react (ver LUCIDE_MAP en Skills.tsx)
//   · null             → fallback genérico (escudo)
//
// `name_en` es opcional: solo se usa cuando el nombre cambia entre idiomas
// (ej. "Herramientas de seguridad ofensiva" → "Offensive security tools").
// Los nombres de tecnologías (React, Python…) son neutros y no lo necesitan.

export interface Skill {
  name: string
  /** Nombre alternativo en inglés. Si se omite, se usa `name` en ambos idiomas. */
  name_en?: string
  icon: string | null
}

export interface SkillCategory {
  /** Clave de i18n: skills.categories.<id> */
  id: 'frontend' | 'backend' | 'databases' | 'tools' | 'security'
  /** Acento visual: las skills de seguridad usan magenta como "plus". */
  accent: 'cyan' | 'magenta'
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    accent: 'cyan',
    skills: [
      { name: 'React', icon: 'devicon-react-original' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain' },
      { name: 'Vite', icon: 'devicon-vitejs-plain' },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original' },
      { name: 'HTML5', icon: 'devicon-html5-plain' },
      { name: 'CSS3', icon: 'devicon-css3-plain' },
    ],
  },
  {
    id: 'backend',
    accent: 'cyan',
    skills: [
      { name: 'FastAPI', icon: 'devicon-fastapi-plain' },
      { name: 'Python', icon: 'devicon-python-plain' },
    ],
  },
  {
    id: 'databases',
    accent: 'cyan',
    skills: [
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
      { name: 'Oracle SQL', icon: 'devicon-oracle-original' },
    ],
  },
  {
    id: 'tools',
    accent: 'cyan',
    skills: [
      { name: 'Git', icon: 'devicon-git-plain' },
      { name: 'Linux (Arch)', icon: 'devicon-archlinux-plain' },
      // { name: 'Niri', icon: null },
      { name: 'GitHub', icon: 'devicon-github-original' },
    ],
  },
  {
    id: 'security',
    accent: 'magenta',
    skills: [
      { name: 'Bash', icon: 'devicon-bash-plain' },
      { name: 'Python', icon: 'devicon-python-plain' },
      {
        name: 'Herramientas de seguridad ofensiva',
        name_en: 'Offensive security tools',
        icon: 'lucide:crosshair',
      },
      { name: 'Google Cybersecurity Certificate', icon: 'devicon-google-plain' },
    ],
  },
]
