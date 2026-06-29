# Portfolio — Gonzalo Steppes (`gsttps`)

Portfolio personal con identidad **cyberpunk / hacker**, bilingüe (ES/EN), single-page.
Frontend Developer · React · TypeScript · Ciberseguridad.

## Stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`, tokens en `src/index.css` con `@theme`)
- **motion** (Framer Motion) — animaciones y transiciones
- **React Three Fiber + drei + three** — escena 3D del Hero
- **i18n custom** — React Context + `src/i18n/{es,en}.json`
- **lucide-react** + **devicon** (CDN) — iconos y badges de stack

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de producción -> dist/
npm run preview  # sirve el build
```

## Estructura

```
src/
  components/   UI: BootIntro, Navbar, Hero, HeroScene, About, Projects, Skills, Contact, Footer…
  data/         projects.ts · skills.ts   (contenido data-driven, fácil de extender)
  i18n/         I18nContext.tsx + es.json / en.json
  hooks/        useReducedMotion · useTypewriter
  index.css     design tokens + efectos (glitch, scanlines, glow)
```

Para **agregar un proyecto**: añade un objeto a `src/data/projects.ts`.
Para **agregar/editar skills**: edita `src/data/skills.ts`.
Para **editar textos**: `src/i18n/es.json` y `src/i18n/en.json`.

## Accesibilidad / performance

- Respeta `prefers-reduced-motion`: desactiva glitch, scanlines y la escena 3D.
- La escena Three.js se carga de forma diferida (lazy) y se desactiva en pantallas pequeñas
  / punteros táctiles, con un fondo estático como fallback.

## Pendientes antes de publicar

- [ ] **WhatsApp**: reemplazar `WHATSAPP_NUMBER` en `src/components/Contact.tsx` por el número real.
- [ ] **CV**: poner el PDF en `public/cv.pdf` y cambiar `CV_ENABLED = true` en `Contact.tsx`.
- [ ] **sistema-cafeteria**: afinar descripción y agregar screenshot (`image`) en `projects.ts`.
- [ ] Agregar nuevos proyectos al avanzar en el roadmap.

## Despliegue (GitHub Pages)

> ⏸️ Pendiente de activar. Cuando se quiera publicar:

1. En `vite.config.ts`, dejar `base: '/'` para un repo de usuario (`gsttps.github.io`)
   o cambiar a `base: '/nombre-repo/'` para un repo de proyecto.
2. Crear el workflow de GitHub Actions (`build` + `actions/deploy-pages`).
3. Activar Pages → *Source: GitHub Actions* en la configuración del repo.
