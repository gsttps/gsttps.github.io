import { motion } from 'motion/react'
import { ShieldCheck, Cpu, Crosshair, type LucideIcon } from 'lucide-react'
import { skillCategories, type SkillCategory } from '../data/skills'
import { useI18n } from '../i18n/I18nContext'
import { SectionTitle } from './SectionTitle'

// Mapa de iconos lucide referenciables desde skills.ts con el prefijo 'lucide:'.
// Para añadir uno nuevo: impórtalo arriba y agrégalo aquí con su clave.
const LUCIDE_MAP: Record<string, LucideIcon> = {
  crosshair: Crosshair,
}

export function Skills() {
  const { t } = useI18n()

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionTitle kicker={t('skills.kicker')} title={t('skills.title')} />

      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category, i) => (
          <CategoryCard key={category.id} category={category} index={i} />
        ))}
      </div>
    </section>
  )
}

function CategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const { t, lang } = useI18n()
  const isSecurity = category.accent === 'magenta'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`${
        isSecurity ? 'neon-border-magenta md:col-span-2' : 'neon-border-cyan'
      } rounded-lg bg-bg-elevated/60 p-6`}
    >
      <div className="mb-5 flex items-center justify-between gap-2">
        <h3
          className={`font-display flex items-center gap-2 text-lg font-semibold ${
            isSecurity ? 'text-neon-magenta' : 'text-text-primary'
          }`}
        >
          {isSecurity ? <ShieldCheck size={20} /> : <Cpu size={20} />}
          {t(`skills.categories.${category.id}`)}
        </h3>
        {isSecurity && (
          <span className="font-mono rounded-full border border-neon-magenta/50 px-3 py-1 text-[10px] tracking-widest text-neon-magenta uppercase">
            {t('skills.securityNote')}
          </span>
        )}
      </div>

      <ul className="flex flex-wrap gap-3">
        {category.skills.map((skill) => {
          // Nombre según idioma (name_en solo si está definido)
          const label = lang === 'en' && skill.name_en ? skill.name_en : skill.name

          // Resuelve el ícono lucide si el icon usa el prefijo 'lucide:'
          const lucideKey = skill.icon?.startsWith('lucide:')
            ? skill.icon.slice('lucide:'.length)
            : null
          const LucideGlyph = lucideKey ? LUCIDE_MAP[lucideKey] : null
          const accentColor = isSecurity ? 'text-neon-magenta' : 'text-neon-cyan'

          return (
            <li
              key={skill.name}
              className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                isSecurity
                  ? 'border-neon-magenta/25 text-text-primary hover:border-neon-magenta'
                  : 'border-neon-cyan/20 text-text-primary hover:border-neon-cyan'
              } bg-bg-base/50`}
            >
              {LucideGlyph ? (
                // Ícono lucide (ej. herramientas de seguridad ofensiva → crosshair)
                <LucideGlyph size={16} className={accentColor} />
              ) : skill.icon ? (
                // Ícono devicon coloreado (CDN)
                <i className={`${skill.icon} colored text-xl`} aria-hidden="true" />
              ) : (
                // Fallback genérico
                <ShieldCheck size={16} className={accentColor} />
              )}
              <span className="font-mono">{label}</span>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}
