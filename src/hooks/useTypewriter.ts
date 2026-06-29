import { useEffect, useRef, useState } from 'react'

interface TypewriterOptions {
  /** Velocidad por carácter, en ms. */
  speed?: number
  /** Pausa entre líneas, en ms. */
  lineDelay?: number
  /** Si es true, muestra todo de inmediato (reduced motion). */
  instant?: boolean
  /** Se llama una vez que termina de escribir todas las líneas. */
  onDone?: () => void
}

/**
 * Escribe un arreglo de líneas carácter por carácter, estilo terminal.
 * Devuelve las líneas ya "tipeadas" hasta el momento y si terminó.
 */
export function useTypewriter(
  lines: string[],
  { speed = 38, lineDelay = 420, instant = false, onDone }: TypewriterOptions = {},
) {
  const [output, setOutput] = useState<string[]>(instant ? lines : [])
  const [done, setDone] = useState(instant)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    if (instant) {
      setOutput(lines)
      setDone(true)
      onDoneRef.current?.()
      return
    }

    setOutput([])
    setDone(false)

    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    let lineIndex = 0
    let charIndex = 0

    const tick = () => {
      if (cancelled) return
      const current = lines[lineIndex] ?? ''

      if (charIndex <= current.length) {
        setOutput((prev) => {
          const next = prev.slice(0, lineIndex)
          next[lineIndex] = current.slice(0, charIndex)
          return next
        })
        charIndex += 1
        timers.push(setTimeout(tick, speed))
      } else if (lineIndex < lines.length - 1) {
        lineIndex += 1
        charIndex = 0
        timers.push(setTimeout(tick, lineDelay))
      } else {
        setDone(true)
        onDoneRef.current?.()
      }
    }

    timers.push(setTimeout(tick, 300))

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
    // lines se trata como estable (constante del componente)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instant, speed, lineDelay])

  return { output, done }
}
