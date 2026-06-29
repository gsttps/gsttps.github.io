// Hero.tsx
// Sección principal del portfolio.
//
// Estructura:
//   · Fondo — escena Three.js lazy-loaded (HeroScene) o fallback estático
//   · Contenido — kicker, nombre con glitch, handle con cursor, tagline, CTAs
//   · Indicador de scroll — chevron animado (bounce Tailwind built-in)
//
// La escena 3D se habilita solo si:
//   · No hay prefers-reduced-motion
//   · La pantalla es > 640px (móvil recibe fondo estático por rendimiento)
// Con GPU integrada la densidad se reduce via prop lowPower.
//
// Estilos de animación: Hero.module.css
// Estilos de layout/color: clases Tailwind inline

import { Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useT } from '../i18n/I18nContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { GlitchText } from './GlitchText'
import styles from './Hero.module.css'

// La escena Three.js se importa de forma diferida para no bloquear
// la primera pintura — el componente pesa ~838 KB gzippeado.
const HeroScene = lazy(() =>
  import('./HeroScene').then((m) => ({ default: m.HeroScene })),
)

// Utilidad local: smooth-scroll a una sección por id
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// ── Componente ───────────────────────────────────────────────
export function Hero() {
  const t = useT()
  const reduced = useReducedMotion()

  // Estado de la escena 3D — se evalúa en el cliente después del mount
  const [enable3D, setEnable3D] = useState(false)
  const [lowPower, setLowPower] = useState(false)

  useEffect(() => {
    // narrow: en móvil se usa fondo estático (rendimiento + batería)
    // coarse: punteros táctiles también se consideran "mobile"
    const narrow = window.matchMedia('(max-width: 640px)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setLowPower(narrow || coarse)
    setEnable3D(!reduced && !narrow)
  }, [reduced])

  // ── Variantes de animación de entrada ────────────────────
  // Fades SUAVES → siempre activos (modelo híbrido). `reduced`
  // se reserva para los efectos FUERTES (escena 3D, glitch).
  const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }
  const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 } }

  // ── Render ───────────────────────────────────────────────
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ── Fondo ─────────────────────────────────────────
          z-index -10 para que quede detrás del contenido.
          El degradado garantiza legibilidad del texto sobre la escena. */}
      <div className="absolute inset-0 -z-10">
        {enable3D ? (
          // Suspense muestra el fondo estático mientras carga Three.js
          <Suspense fallback={<StaticBackdrop />}>
            <HeroScene lowPower={lowPower} />
          </Suspense>
        ) : (
          <StaticBackdrop />
        )}

        {/* Degradado vertical: base opaca abajo para que las secciones
            siguientes no se vean a través del fondo del Hero           */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/40 via-transparent to-bg-base" />
      </div>

      {/* ── Contenido central ─────────────────────────────── */}
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">

        {/* Kicker: rol profesional, estilo label de terminal */}
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-neon-cyan/80"
        >
          {t('hero.role')}
        </motion.p>

        {/* Nombre con efecto glitch — GlitchText gestiona el módulo CSS */}
        <GlitchText
          as="h1"
          text="Gonzalo Steppes"
          className="font-display text-5xl font-black tracking-tight text-text-primary sm:text-7xl"
        />

        {/* Handle con cursor de terminal parpadeante (Hero.module.css) */}
        <motion.p
          {...fadeIn}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 font-mono text-lg text-neon-magenta sm:text-2xl"
        >
          {/* Prompt estilo bash */}
          <span className="text-text-secondary">{'> '}</span>
          gsttps
          {/* El cursor se añade via ::after en Hero.module.css */}
          <span className={styles.cursor} />
        </motion.p>

        {/* Tagline bilingüe — se actualiza con el toggle ES/EN */}
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 max-w-2xl text-base text-text-secondary sm:text-lg"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* CTAs — scroll a las secciones principales */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* neon-border-cyan / magenta: utility global (globals.css) */}
          <button
            onClick={() => scrollTo('proyectos')}
            className="neon-border-cyan rounded-md bg-bg-elevated/60 px-6 py-3 font-display text-sm uppercase tracking-wider text-text-primary backdrop-blur-sm"
          >
            {t('hero.ctaProjects')}
          </button>
          <button
            onClick={() => scrollTo('contacto')}
            className="neon-border-magenta rounded-md bg-bg-elevated/60 px-6 py-3 font-display text-sm uppercase tracking-wider text-text-primary backdrop-blur-sm"
          >
            {t('hero.ctaContact')}
          </button>
        </motion.div>
      </div>

      {/* ── Indicador de scroll ───────────────────────────────
          aria-hidden + tabIndex=-1: puramente decorativo,
          el scroll también ocurre con los botones del navbar. */}
      <motion.button
        onClick={() => scrollTo('sobre-mi')}
        aria-hidden="true"
        tabIndex={-1}
        {...fadeIn}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neon-cyan/70"
      >
        {/* animate-bounce (suave) → siempre activo */}
        <ChevronDown className="animate-bounce" size={28} />
      </motion.button>
    </section>
  )
}

// ── Fondo estático ────────────────────────────────────────────
// Fallback para: móvil / reduced-motion / mientras carga Three.js.
// Usa clases Tailwind inline + la utility cyber-grid de globals.css.
function StaticBackdrop() {
  return (
    <div className="cyber-grid absolute inset-0 bg-bg-base">
      {/* Aureola magenta tenue centrada — da profundidad sin 3D */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,230,0.12),transparent_60%)]" />
      {/* Aureola cian desde abajo — imita el suelo del grid 3D */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(0,255,242,0.18),transparent_70%)]" />
    </div>
  )
}
