import { useState } from 'react'
import { BootIntro, bootAlreadySeen } from './components/BootIntro'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Scanlines } from './components/Scanlines'
import { ScrollButtons } from './components/ScrollButtons'

export default function App() {
  // La intro solo corre en la primera visita de la sesión (spec §6.1).
  const [showIntro, setShowIntro] = useState(() => !bootAlreadySeen())

  return (
    <>
      {showIntro && <BootIntro onDone={() => setShowIntro(false)} />}

      <Scanlines />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />

      {/* Botón flotante para subir/bajar con scroll suave */}
      <ScrollButtons />
    </>
  )
}
