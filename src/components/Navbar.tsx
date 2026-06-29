import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, Globe } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'

const SECTIONS = [
  { id: 'sobre-mi', key: 'nav.about' },
  { id: 'proyectos', key: 'nav.projects' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'contacto', key: 'nav.contact' },
] as const

export function Navbar() {
  const { t, lang, toggleLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function go(id: string) {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-neon-cyan/15 bg-bg-base/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => go('hero')}
          className="font-display text-text-primary text-lg font-bold tracking-widest"
        >
          gs<span className="text-neon-cyan">ttps</span>
        </button>

        {/* Links desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className="font-mono text-text-secondary hover:text-neon-cyan text-sm tracking-wide transition-colors"
            >
              {t(s.key)}
            </button>
          ))}
          <LangToggle lang={lang} onToggle={toggleLang} label={t('a11y.toggleLang')} />
        </div>

        {/* Acciones mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <LangToggle lang={lang} onToggle={toggleLang} label={t('a11y.toggleLang')} />
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            className="text-text-primary"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Menú mobile desplegable */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-neon-cyan/15 bg-bg-base/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className="font-mono text-text-secondary hover:text-neon-cyan py-3 text-left text-sm tracking-wide transition-colors"
                >
                  {t(s.key)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function LangToggle({
  lang,
  onToggle,
  label,
}: {
  lang: string
  onToggle: () => void
  label: string
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={label}
      className="neon-border-cyan font-mono flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs tracking-widest"
    >
      <Globe size={14} className="text-neon-cyan" />
      <span className={lang === 'es' ? 'text-neon-cyan' : 'text-text-secondary'}>
        ES
      </span>
      <span className="text-text-secondary">/</span>
      <span className={lang === 'en' ? 'text-neon-cyan' : 'text-text-secondary'}>
        EN
      </span>
    </button>
  )
}
