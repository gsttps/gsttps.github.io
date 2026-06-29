import { motion } from 'motion/react'
import { MapPin, GraduationCap, Code2, ShieldCheck } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { SectionTitle } from './SectionTitle'

export function About() {
  const { t, dict } = useI18n()

  const facts = [
    { icon: MapPin, value: dict.about.facts.location },
    { icon: GraduationCap, value: dict.about.facts.study },
    { icon: Code2, value: dict.about.facts.focus },
    { icon: ShieldCheck, value: dict.about.facts.security },
  ]

  return (
    <section id="sobre-mi" className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <SectionTitle kicker={t('about.kicker')} title={t('about.title')} />

      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary space-y-5 text-base leading-relaxed sm:text-lg"
        >
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          {facts.map(({ icon: Icon, value }) => (
            <li
              key={value}
              className="neon-border-cyan flex items-center gap-3 rounded-md bg-bg-elevated/60 px-4 py-3"
            >
              <Icon className="text-neon-cyan shrink-0" size={20} />
              <span className="font-mono text-text-primary text-sm">{value}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
