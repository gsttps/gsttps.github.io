import { useEffect, useState } from 'react'

/**
 * Devuelve `true` si el usuario pidió reducir el movimiento
 * (prefers-reduced-motion: reduce). Se usa para desactivar glitch,
 * scanlines y la escena Three.js (spec §9).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}
