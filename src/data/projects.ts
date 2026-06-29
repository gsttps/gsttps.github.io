// Proyectos data-driven. Para agregar uno nuevo basta con añadir
// un objeto a este arreglo — la UI se genera sola.

export interface Project {
  id: string
  title: string
  description_es: string
  description_en: string
  /** Slugs de devicon para los badges de stack, ej. 'react', 'python'. */
  stack: string[]
  github: string
  liveDemo?: string
  image?: string
}

export const projects: Project[] = [
  {
    id: 'sistema-cafeteria',
    title: 'sistema-cafeteria',
    // ⚠️ Afinar descripción con features reales + agregar screenshot.
    description_es:
      'Sistema de gestión para cafetería desarrollado con React en el frontend y FastAPI + PostgreSQL en el backend. Incluye administración de productos, pedidos e inventario.',
    description_en:
      'Cafeteria management system built with React on the frontend and FastAPI + PostgreSQL on the backend. Includes product, order, and inventory management.',
    stack: ['react', 'typescript', 'fastapi', 'postgresql'],
    github: 'https://github.com/gsttps/sistema-cafeteria',
    // liveDemo: '',
    // image: '/projects/sistema-cafeteria.png',
  },
  {
    id: 'prototipo-osint',
    title: 'Herramienta de Osint',
    // ⚠️ Afinar descripción con lo que hace realmente el proyecto.
    description_es:
      'Prototipo de herramienta OSINT (Open Source Intelligence) para reconocimiento pasivo. Automatiza la recolección de información pública sobre dominios, IPs y usuarios a partir de fuentes abiertas, orientado a prácticas de ciberseguridad y análisis de superficie de ataque.',
    description_en:
      'OSINT (Open Source Intelligence) prototype tool for passive reconnaissance. Automates the collection of public information about domains, IPs, and users from open sources — built for cybersecurity practice and attack surface analysis.',
    stack: ['python'],
    github: 'https://github.com/gsttps/prototipo-osint',
    // liveDemo: '',
    // image: '/projects/prototipo-osint.png',
  },
]
