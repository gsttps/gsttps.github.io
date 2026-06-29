// BootIntro.tsx
// Secuencia de arranque tipo terminal (spec §6.1).
//
// Flujo:
//   1. Pantalla negra — typewriter escribe las líneas del boot
//   2. Al terminar, pausa breve → se activa el flash glitch
//   3. Flash dura ~0.4 s → overlay sale con fade → onDone()
//
// Primera visita de la sesión: corre el flujo completo.
// Visitas siguientes (sessionStorage bootSeen=1): onDone() directo.
// prefers-reduced-motion: muestra las líneas sin tipeo y cierra rápido.
//
// Estilos de animación: BootIntro.module.css
// Estilos de layout/color: clases Tailwind inline

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTypewriter } from '../hooks/useTypewriter'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useT } from '../i18n/I18nContext'
import styles from './BootIntro.module.css'

// ── Constantes ───────────────────────────────────────────────
// Líneas que escribe el typewriter. Mantenlas cortas y crípticas
// para el efecto visual — no son texto de usuario, son "teatro" técnico.
const BOOT_LINES = [
  '> initializing profile...',
  '> loading gsttps_dev...',
  '> access granted_',
]

const SESSION_KEY = 'gsttps.bootSeen'

// ── Helper exportado ─────────────────────────────────────────
/** Indica si la intro ya se mostró en esta sesión de navegador. */
export function bootAlreadySeen(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1'
}

// ── Props ────────────────────────────────────────────────────
interface BootIntroProps {
  /** Callback que se llama cuando termina la transición de salida. */
  onDone: () => void
}

// ── Componente ───────────────────────────────────────────────
export function BootIntro({ onDone }: BootIntroProps) {
  const reduced = useReducedMotion()
  const t = useT()

  // Estados de la secuencia: tipeo → flash → cierre
  const [flashing, setFlashing] = useState(false)
  const [closing,  setClosing]  = useState(false)

  // ── Fase 1: tipeo ────────────────────────────────────────
  // El efecto de tipeo es una animación SUAVE → siempre activa.
  // (Lo FUERTE es el flash glitch del final, que sí respeta reduced.)
  const { output, done } = useTypewriter(BOOT_LINES, {
    instant: false,
    onDone: useCallback(() => {
      // Pausa antes del flash: más larga en modo normal (600 ms),
      // prácticamente inmediata con reduced-motion (200 ms)
      window.setTimeout(() => setFlashing(true), reduced ? 200 : 600)
    }, [reduced]),
  })

  // ── Fase 2: flash → cierre ───────────────────────────────
  useEffect(() => {
    if (!flashing) return
    // El flash dura la animación glitch-flash (0.42 s) + margen
    const id = window.setTimeout(() => setClosing(true), reduced ? 120 : 420)
    return () => window.clearTimeout(id)
  }, [flashing, reduced])

  // ── Fase 3: notifica fin, marca sesión ───────────────────
  useEffect(() => {
    if (!closing) return
    sessionStorage.setItem(SESSION_KEY, '1')
    // Espera a que termine el fade-out de Framer Motion (500 ms)
    const id = window.setTimeout(onDone, 500)
    return () => window.clearTimeout(id)
  }, [closing, onDone])

  // ── Skip ─────────────────────────────────────────────────
  function skip() {
    sessionStorage.setItem(SESSION_KEY, '1')
    onDone()
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <AnimatePresence>
      {!closing && (
        // Overlay negro que cubre toda la pantalla durante la intro
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-base"
        >
          {/* Flash glitch — solo cuando flashing=true y sin reduced-motion.
              El div usa la clase .flash del módulo CSS que contiene el
              keyframe glitch-flash y el background cian-magenta.        */}
          {flashing && !reduced && (
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 z-10 mix-blend-screen ${styles.flash}`}
            />
          )}

          {/* Bloque de terminal: líneas tipeadas */}
          <div className="w-full max-w-xl px-8 text-left font-mono">
            {output.map((line, i) => (
              <p
                key={i}
                className={`text-base sm:text-xl ${
                  // La última línea ("access granted") recibe el glow cian
                  line.includes('access granted')
                    ? 'text-neon-cyan text-glow-cyan'
                    : 'text-text-primary'
                }`}
              >
                {line}
                {/* Cursor parpadeante: solo en la última línea visible mientras escribe */}
                {!done && i === output.length - 1 && (
                  <span className={styles.cursor} />
                )}
              </p>
            ))}
          </div>

          {/* Botón skip — accesible con teclado, discreto visualmente */}
          <button
            onClick={skip}
            className="absolute bottom-6 right-6 font-mono text-xs tracking-widest uppercase text-text-secondary transition-colors hover:text-neon-cyan"
          >
            {t('a11y.skipIntro')} →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
