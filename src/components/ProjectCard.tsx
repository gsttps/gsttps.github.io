import { motion } from 'motion/react'
import { Github, ExternalLink } from 'lucide-react'
import type { Project } from '../data/projects'
import { useI18n } from '../i18n/I18nContext'

// slug del stack -> { clase devicon, etiqueta legible }
const STACK_META: Record<string, { icon: string; label: string }> = {
  react: { icon: 'devicon-react-original colored', label: 'React' },
  typescript: { icon: 'devicon-typescript-plain colored', label: 'TypeScript' },
  javascript: { icon: 'devicon-javascript-plain colored', label: 'JavaScript' },
  fastapi: { icon: 'devicon-fastapi-plain colored', label: 'FastAPI' },
  python: { icon: 'devicon-python-plain colored', label: 'Python' },
  postgresql: { icon: 'devicon-postgresql-plain colored', label: 'PostgreSQL' },
  mongodb: { icon: 'devicon-mongodb-plain colored', label: 'MongoDB' },
  tailwindcss: { icon: 'devicon-tailwindcss-original colored', label: 'Tailwind' },
  vite: { icon: 'devicon-vitejs-plain colored', label: 'Vite' },
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang, t } = useI18n()
  const description = lang === 'es' ? project.description_es : project.description_en

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="neon-border-cyan group flex flex-col overflow-hidden rounded-lg bg-bg-elevated/60"
    >
      {/* Imagen / placeholder */}
      <div className="relative h-44 overflow-hidden border-b border-neon-cyan/15">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="cyber-grid flex h-full w-full items-center justify-center bg-bg-base">
            <span className="font-mono text-neon-cyan/40 text-4xl">{'</>'}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-mono text-text-primary text-lg font-semibold">
          <span className="text-neon-magenta">~/</span>
          {project.title}
        </h3>

        <p className="text-text-secondary mt-3 flex-1 text-sm leading-relaxed">
          {description}
        </p>

        {/* Badges de stack */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((slug) => {
            const meta = STACK_META[slug]
            return (
              <li
                key={slug}
                className="font-mono flex items-center gap-1.5 rounded border border-neon-cyan/20 bg-bg-base/60 px-2 py-1 text-xs text-text-secondary"
              >
                {meta?.icon && <i className={`${meta.icon} text-sm`} aria-hidden="true" />}
                {meta?.label ?? slug}
              </li>
            )
          })}
        </ul>

        {/* Links */}
        <div className="mt-5 flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-neon-cyan flex items-center gap-1.5 text-sm transition-colors"
          >
            <Github size={16} /> {t('projects.viewCode')}
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-neon-magenta flex items-center gap-1.5 text-sm transition-colors"
            >
              <ExternalLink size={16} /> {t('projects.liveDemo')}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
