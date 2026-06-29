import { motion } from 'motion/react'
import { Hammer } from 'lucide-react'
import { projects } from '../data/projects'
import { useT } from '../i18n/I18nContext'
import { SectionTitle } from './SectionTitle'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const t = useT()

  return (
    <section id="proyectos" className="bg-bg-elevated/30 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle kicker={t('projects.kicker')} title={t('projects.title')} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

          {/* Card "más proyectos en camino" — extensible (spec §6.3) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: projects.length * 0.1 }}
            className="neon-border-magenta flex flex-col items-center justify-center gap-3 rounded-lg border-dashed bg-bg-elevated/40 p-8 text-center"
          >
            <Hammer className="text-neon-magenta" size={32} />
            <h3 className="font-display text-text-primary text-lg font-semibold">
              {t('projects.soonTitle')}
            </h3>
            <p className="text-text-secondary text-sm">{t('projects.soonDesc')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
