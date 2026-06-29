// GlitchText.tsx
// Componente de texto con efecto glitch cromático (split RGB cian/magenta).
// Las pseudo-capas y sus keyframes viven en GlitchText.module.css.
// El componente solo decide si aplica o no el módulo según prefers-reduced-motion.

import { useReducedMotion } from '../hooks/useReducedMotion'
import styles from './GlitchText.module.css'

// ── Tipos ────────────────────────────────────────────────────
interface GlitchTextProps {
  text: string
  /** Clases Tailwind adicionales de layout / color / tipografía */
  className?: string
  /** Etiqueta HTML a renderizar (semántica de heading) */
  as?: 'span' | 'h1' | 'h2' | 'h3'
}

// ── Componente ───────────────────────────────────────────────
export function GlitchText({ text, className = '', as = 'span' }: GlitchTextProps) {
  const reduced = useReducedMotion()
  const Tag = as

  return (
    <Tag
      // data-text es lo que leen los ::before/::after del módulo CSS
      // para duplicar el texto. Sin este atributo no hay efecto glitch.
      data-text={text}
      // Aplica la clase del módulo solo si el usuario no pidió reducir movimiento.
      // Si reduced=true, se renderiza como texto plano sin capas decorativas.
      className={`${reduced ? '' : styles.glitch} ${className}`}
    >
      {text}
    </Tag>
  )
}
