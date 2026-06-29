// ScrollButtons.tsx
// Botón flotante (abajo-derecha) que cambia según la posición de scroll:
//   · Cerca del top  → flecha ABAJO  → lleva al final de la página
//   · Ya desplazado  → flecha ARRIBA → lleva al inicio de la página
//
// El cambio entre flechas usa AnimatePresence (fade + scale) para que
// una desaparezca y la otra aparezca con una animación suave.
// El scroll en sí es suave (behavior: 'smooth'), salvo con
// prefers-reduced-motion, donde es instantáneo para no marear.

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useT } from '../i18n/I18nContext'

// Umbral en píxeles a partir del cual se considera "desplazado hacia abajo".
const TOP_THRESHOLD = 300

export function ScrollButtons() {
  const t = useT()

  // atTop = true cuando el usuario está cerca del inicio de la página
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < TOP_THRESHOLD)
    onScroll() // estado inicial correcto al montar
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll suave: animación SUAVE → siempre activa (modelo híbrido)
  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const goBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })

  // Animaciones de entrada/salida de cada flecha
  const variants = {
    initial: { opacity: 0, scale: 0.5, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.5, y: 8 },
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* mode="wait": espera a que salga una flecha antes de entrar la otra */}
      <AnimatePresence mode="wait" initial={false}>
        {atTop ? (
          // ── Flecha ABAJO: lleva al final ──────────────────────
          <motion.button
            key="down"
            onClick={goBottom}
            aria-label={t('a11y.scrollBottom')}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="neon-border-cyan flex h-12 w-12 items-center justify-center rounded-full bg-bg-elevated/80 backdrop-blur-sm"
          >
            <ChevronDown size={22} className="text-neon-cyan" />
          </motion.button>
        ) : (
          // ── Flecha ARRIBA: lleva al inicio ────────────────────
          <motion.button
            key="up"
            onClick={goTop}
            aria-label={t('a11y.scrollTop')}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="neon-border-magenta flex h-12 w-12 items-center justify-center rounded-full bg-bg-elevated/80 backdrop-blur-sm"
          >
            <ChevronUp size={22} className="text-neon-magenta" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
