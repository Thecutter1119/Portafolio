import './index.css'
import { useEffect, useState } from 'react'
import Splash from './components/Splash'
import TypeWriter from './components/TypeWriter'
import ContactForm from './components/ContactForm'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [progress, setProgress] = useState(0)
  const [label, setLabel] = useState('Inicializando...')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let mounted = true
    const weights = { assets: 30, health: 20, profile: 25, projects: 25 }
    let acc = 0
    const bump = (w, l) => {
      acc += w
      if (!mounted) return
      setProgress(Math.min(100, Math.round(acc)))
      setLabel(l)
    }
    const preload = (urls) => Promise.all(urls.map(u => new Promise(r => { const img = new Image(); img.onload = img.onerror = () => r(); img.src = u })))
    const minMs = 1800
    const start = Date.now()
    ;(async () => {
      try {
        await preload(['/profile.svg'])
        bump(weights.assets, 'Cargando recursos')
      } catch { bump(weights.assets, 'Cargando recursos') }
      try {
        await fetch('http://localhost:3001/api/health').then(r => r.json())
        bump(weights.health, 'Conectando API')
      } catch { bump(weights.health, 'Conectando API') }
      try {
        await fetch('http://localhost:3001/api/profile').then(r => r.json())
        bump(weights.profile, 'Obteniendo perfil')
      } catch { bump(weights.profile, 'Obteniendo perfil') }
      try {
        await fetch('http://localhost:3001/api/projects').then(r => r.json())
        bump(weights.projects, 'Obteniendo proyectos')
      } catch { bump(weights.projects, 'Obteniendo proyectos') }
      const elapsed = Date.now() - start
      if (elapsed < minMs) await new Promise(r => setTimeout(r, minMs - elapsed))
      setDone(true)
      setTimeout(() => setShowSplash(false), 400)
    })()
    return () => { mounted = false }
  }, [])

  return (
    <>
      {showSplash && (
        <Splash progress={progress} label={label} done={done} onSkip={() => { setProgress(100); setDone(true); setShowSplash(false) }} />
      )}
      {!showSplash && (
        <div className="container">
      <div className="nav">
        <div className="brand">
          <svg className="shield" viewBox="0 0 24 24"><path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"/></svg>
          <span>John Esneider Marin</span>
        </div>
        <div>
          <a href="#sobre-mi">Perfil</a>
          <a href="#experiencia">Experiencia</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#contacto">Contacto</a>
        </div>
      </div>

      <section className="hero hero-full" id="perfil">
        <div>
          <h1 className="title title-gradient"><TypeWriter text="Hola, soy John" speed={60} delay={200} /></h1>
          <p className="subtitle role"><TypeWriter text="Desarrollador Junior" speed={55} delay={1200} /></p>
          <p className="intro">Soy estudiante de desarrollo de software. Me apasiona crear, aprender y llevar mis ideas a la realidad, fiel creyente de “si lo puedes imaginar lo puedes programar”.</p>
          <div className="cta">
            <div className="orbs" style={{ marginLeft: 8 }}>
              <div className="orb" style={{ animationDelay: '0s' }}>
                <a href="https://github.com/Thecutter1119" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <img className="orb-img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" onError={(e)=>{e.currentTarget.src='/profile.svg'}} />
                </a>
              </div>
              <div className="orb" style={{ animationDelay: '0.3s' }}>
                <a href="https://www.linkedin.com/in/john-esneider-5ba956315" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <img className="orb-img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" onError={(e)=>{e.currentTarget.src='/profile.svg'}} />
                </a>
              </div>
              <div className="orb" style={{ animationDelay: '0.6s' }}>
                <a href="https://www.instagram.com/john_esneider11/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <img className="orb-img" src="https://cdn.simpleicons.org/instagram/ffffff" alt="Instagram" onError={(e)=>{e.currentTarget.src='/profile.svg'}} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="accent" />
          <p className="card-title">Stack</p>
          <p>React, Node, Python, Postgres, Prisma, Postman. Diseño UIs limpias y APIs confiables.</p>
          <div className="orb-field">
            <div className="orb" style={{ top: '10%', left: '8%', animationDelay: '0s' }}>
              <img className="orb-img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" onError={(e)=>{e.currentTarget.src='/vite.svg'}} />
            </div>
            <div className="orb" style={{ top: '35%', left: '30%', animationDelay: '0.4s' }}>
              <img className="orb-img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" onError={(e)=>{e.currentTarget.src='/profile.svg'}} />
            </div>
            <div className="orb" style={{ top: '18%', left: '60%', animationDelay: '0.8s' }}>
              <img className="orb-img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" alt="Node.js" onError={(e)=>{e.currentTarget.src='/profile.svg'}} />
            </div>
            <div className="orb" style={{ top: '55%', left: '8%', animationDelay: '1.2s' }}>
              <img className="orb-img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" onError={(e)=>{e.currentTarget.src='/profile.svg'}} />
            </div>
            <div className="orb" style={{ top: '60%', left: '45%', animationDelay: '1.6s' }}>
              <img className="orb-img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" onError={(e)=>{e.currentTarget.src='/vite.svg'}} />
            </div>
            <div className="orb" style={{ top: '10%', left: '78%', animationDelay: '2.0s' }}>
              <img className="orb-img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" alt="Postman" onError={(e)=>{e.currentTarget.src='/profile.svg'}} />
            </div>
            <div className="orb" style={{ top: '70%', left: '75%', animationDelay: '2.4s' }}>
              <img className="orb-img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="Postgres" onError={(e)=>{e.currentTarget.src='/profile.svg'}} />
            </div>
          </div>
        </div>
      </section>

      <section id="sobre-mi" className="panel" style={{ marginTop: 20 }}>
        <div className="accent" />
        <div className="avatar">
          <img
            className="avatar-img"
            src="https://res.cloudinary.com/dnb2sff83/image/upload/yo_ykgreh.jpg"
            alt="Foto de perfil de John Esneider Marin"
            onError={(e) => { e.currentTarget.src = '/profile.svg' }}
          />
        </div>
        <p className="card-title">Sobre mí</p>
        <p>Soy desarrollador Junior apasionado por la tecnología, por aprender nuevas tecnologías y por trabajar en equipo. Aprendo rápido y me interesa la ciberseguridad, enfocado en crear soluciones seguras y confiables. Me gusta integrar frontend y backend con buenas prácticas y observabilidad.</p>
      </section>

      <section id="experiencia" className="grid">
        <div className="panel">
          <p className="card-title">Experiencia</p>
          <p>Estudiante de 6.º semestre de Desarrollo de Software • Universidad del Valle</p>
          <p>Proyectos académicos y personales orientados a calidad, seguridad y buenas prácticas.</p>
        </div>
        <div className="panel">
          <p className="card-title">Habilidades</p>
          <div className="skills">
            <span className="tech">Frontend</span>
            <span className="tech">Backend</span>
            <span className="tech">React</span>
            <span className="tech">Node</span>
            <span className="tech">Python</span>
            <span className="tech">Postgres</span>
            <span className="tech">Prisma</span>
            <span className="tech">AWS</span>
            <span className="tech">Kali Linux</span>
            <span className="tech">Nmap</span>
            <span className="tech">Postman</span>
            <span className="tech">GitHub</span>
          </div>
        </div>
        <div className="panel">
          <p className="card-title">Contacto</p>
          <p>jhonsneidermarin@gmail.com</p>
        </div>
      </section>

      <section id="proyectos" className="panel" style={{ marginTop: 20 }}>
        <p className="card-title">Rentago</p>
        <p>Plataforma de alquiler en línea. Preview embebido abajo; si no carga, abre el sitio directamente.</p>
        <div className="preview">
          <iframe
            className="preview-frame"
            src="https://rentago.online"
            title="Rentago Preview"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
          <div className="preview-fallback">
            No se ve el preview? Abre
            <a href="https://rentago.online" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 6 }}>rentago.online</a>
          </div>
        </div>
      </section>

      <section id="contacto" className="panel" style={{ marginTop: 20 }}>
        <p className="card-title">Contacto</p>
        <p>Envíame un mensaje y te responderé cuanto antes.</p>
        <div style={{ maxWidth: 640 }}>
          <ContactForm />
        </div>
      </section>
      <footer className="footer">
        <span>© {new Date().getFullYear()} John Esneider Marin • Portafolio</span>
      </footer>
    </div>
      )}
    </>
  )
}

export default App
