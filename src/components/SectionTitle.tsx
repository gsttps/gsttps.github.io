import { motion } from 'motion/react'

interface SectionTitleProps {
  kicker: string
  title: string
}

/** Encabezado de sección consistente: kicker monoespaciado + título display.
    El fade-in de entrada es una animación SUAVE → siempre activa (modelo
    híbrido), no se desactiva con prefers-reduced-motion. */
export function SectionTitle({ kicker, title }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <p className="font-mono text-neon-cyan/80 mb-2 text-sm tracking-widest">
        {kicker}
      </p>
      <h2 className="font-display text-text-primary text-3xl font-bold tracking-tight sm:text-5xl">
        {title}
        <span className="text-neon-magenta">.</span>
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-neon-cyan to-transparent" />
    </motion.div>
  )
}
