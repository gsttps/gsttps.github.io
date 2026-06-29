// Scanlines.tsx
// Overlay global que emula el aspecto de monitor CRT:
//   · scanlines — franjas horizontales que bajan en loop
//   · vignette  — borde oscurecido que curva la mirada al centro
// Los estilos y keyframes viven en Scanlines.module.css.
// Si el usuario activó prefers-reduced-motion, no se renderiza nada.

import { useReducedMotion } from '../hooks/useReducedMotion'
import styles from './Scanlines.module.css'

export function Scanlines() {
  // Con reduced-motion activo estas capas desaparecen completamente.
  // No es suficiente con pausar la animación: la grilla de franjas
  // también es una distracción visual aunque esté estática.
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    // aria-hidden: son puramente decorativos, los lectores de pantalla
    // los ignoran por completo.
    <>
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.vignette}  aria-hidden="true" />
    </>
  )
}
