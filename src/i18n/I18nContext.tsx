import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import es from './es.json'
import en from './en.json'

export type Lang = 'es' | 'en'

const dictionaries = { es, en } as const
const STORAGE_KEY = 'gsttps.lang'

type Dict = typeof es

interface I18nValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  /** Resuelve una clave anidada por puntos, ej. t('hero.tagline'). */
  t: (key: string) => string
  /** Diccionario completo del idioma activo (para datos como projects/skills). */
  dict: Dict
}

const I18nContext = createContext<I18nValue | null>(null)

function resolve(dict: Dict, key: string): string {
  const value = key
    .split('.')
    .reduce<unknown>((acc, part) => {
      if (acc && typeof acc === 'object' && part in acc) {
        return (acc as Record<string, unknown>)[part]
      }
      return undefined
    }, dict)

  if (typeof value === 'string') return value
  // Fallback visible para detectar claves faltantes en desarrollo.
  return key
}

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'es'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'es' || stored === 'en') return stored
  return 'es' // idioma por defecto (spec §7)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggleLang = useCallback(
    () => setLangState((prev) => (prev === 'es' ? 'en' : 'es')),
    [],
  )

  const value = useMemo<I18nValue>(() => {
    const dict = dictionaries[lang]
    return {
      lang,
      setLang,
      toggleLang,
      t: (key: string) => resolve(dict, key),
      dict,
    }
  }, [lang, setLang, toggleLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>')
  return ctx
}

// eslint-disable-next-line react-refresh/only-export-components
export function useT(): (key: string) => string {
  return useI18n().t
}
