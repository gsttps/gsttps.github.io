import { useT } from '../i18n/I18nContext'

export function Footer() {
  const t = useT()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-neon-cyan/10 bg-bg-base">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-center">
        <p className="font-mono text-text-secondary text-xs">
          {t('footer.builtWith')}
        </p>
        <p className="font-mono text-text-secondary/70 text-xs">
          © {year} Gonzalo Steppes ·{' '}
          <span className="text-neon-cyan">gsttps</span> · {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
