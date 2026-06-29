import { motion } from 'motion/react'
import { Mail, Github, Linkedin, MessageCircle, FileDown } from 'lucide-react'
import { useT } from '../i18n/I18nContext'
import { SectionTitle } from './SectionTitle'

// ⚠️ Gonzalo: reemplazar por el número real antes de publicar (spec §10).
const WHATSAPP_NUMBER = '56957995516'

// Activar cuando se decida enlazar el CV (spec §6.5 / §10).
// Poner el PDF en /public/cv.pdf y cambiar este flag a true.
const CV_ENABLED = false
const CV_URL = '/cv.pdf'

interface ContactLink {
  icon: typeof Mail
  label: string
  href: string
  accent: 'cyan' | 'magenta'
}

export function Contact() {
  const t = useT()

  const links: ContactLink[] = [
    {
      icon: Mail,
      label: t('contact.email'),
      href: 'mailto:steppesgonzalo@gmail.com',
      accent: 'cyan',
    },
    {
      icon: Github,
      label: t('contact.github'),
      href: 'https://github.com/gsttps',
      accent: 'cyan',
    },
    {
      icon: Linkedin,
      label: t('contact.linkedin'),
      href: 'https://www.linkedin.com/in/gonzalo-steppes-10759529b/',
      accent: 'cyan',
    },
    {
      icon: MessageCircle,
      label: t('contact.whatsapp'),
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      accent: 'magenta',
    },
  ]

  return (
    <section id="contacto" className="bg-bg-elevated/30 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionTitle kicker={t('contact.kicker')} title={t('contact.title')} />

        <div className="grid gap-4 sm:grid-cols-2">
          {links.map(({ icon: Icon, label, href, accent }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`${
                accent === 'magenta' ? 'neon-border-magenta' : 'neon-border-cyan'
              } group flex items-center gap-4 rounded-lg bg-bg-elevated/60 px-5 py-4`}
            >
              <Icon
                className={
                  accent === 'magenta' ? 'text-neon-magenta' : 'text-neon-cyan'
                }
                size={24}
              />
              <span className="font-mono text-text-primary">{label}</span>
            </motion.a>
          ))}
        </div>

        {/* Slot de CV — activar poniendo CV_ENABLED = true (spec §6.5) */}
        {CV_ENABLED && (
          <div className="mt-8 flex justify-center">
            <a
              href={CV_URL}
              download
              className="neon-border-cyan font-display flex items-center gap-2 rounded-md bg-bg-elevated/60 px-6 py-3 text-sm tracking-wider uppercase"
            >
              <FileDown size={18} /> {t('contact.cv')}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
