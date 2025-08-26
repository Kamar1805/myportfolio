import React, { useEffect, useState, useRef } from 'react';
import './home.css';

const statsData = [
  { label: 'Projects Delivered', value: 24, suffix: '' },
  { label: 'Years Experience', value: 3, suffix: '+' },
  { label: 'Ready To Work', value: 100, suffix: '%' },
];

const skillsData = [
  { name: 'React / Frontend Engineering', level: 90 },
  { name: 'Node.js / APIs', level: 80 },
  { name: 'AI Tooling & Automation', level: 85 },
  { name: 'System Design Basics', level: 70 },
  { name: 'Problem Solving', level: 88 },
];

const projectsData = [
  {
    id: 1,
    title: 'Tourify (Co‑founder)',
    description: 'Travel discovery platform enhancing trip planning with modern UX & scalable architecture.',
    stack: ['React', 'Node', 'API'],
    mediaType: 'image',
    media: '/assets/projects/tourify.png',
    link: '#',
  },
  {
    id: 2,
    title: 'QueueTrackr (Founder)',
    description: 'Smart queue + workflow automation platform leveraging AI to optimize operations.',
    stack: ['React', 'Automation', 'AI'],
    mediaType: 'video',
    media: '/assets/projects/queuetrackr-demo.mp4',
    link: '#',
  },
  {
    id: 3,
    title: 'AI Workflow Automations',
    description: 'Custom agent + tooling pipelines that cut repetitive tasks and boost productivity.',
    stack: ['AI', 'LLM', 'Integrations'],
    mediaType: 'image',
    media: '/assets/projects/automation.png',
    link: '#',
  },
];

const testimonialsData = [
  {
    name: 'Founder, Startup X',
    quote: 'Kamar shipped a prototype to production-quality in record time with clean, scalable code.',
  },
  {
    name: 'Product Lead, SaaS Co.',
    quote: 'Blend of engineering depth + AI automation mindset. Huge productivity unlock.',
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

const AnimatedCounter = ({ value, suffix = '', duration = 1600 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
            const start = performance.now();
            const animate = now => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);
  return (
    <div ref={ref} className="stat">
      <span className="stat-inline-value">
        {count}{suffix}
      </span>
    </div>
  );
};

const ProgressBar = ({ level }) => {
  const barRef = useRef(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.style.setProperty('--target', level + '%');
          el.classList.add('fill');
          obs.disconnect();
        }
      });
    }, { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [level]);
  return (
    <div className="progress">
      <div
        ref={barRef}
        className="progress-bar"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span className="progress-label">{level}%</span>
      </div>
    </div>
  );
};

const ScrollReveal = ({ as: Tag = 'div', className = '', children, delay = 0 }) => {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) {
      if (el) el.classList.add('revealed');
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('revealed');
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, reduced]);
  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle dark/light theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
  }, [menuOpen]);

  const handleNavClick = e => {
    if (e.target.closest('a[href^="#"]')) setMenuOpen(false);
  };

  return (
    <div id="top">
      <a href="#main" className="skip-link">Skip to content</a>

      <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
        <div className="nav-inner">
          <div className="logo">
            <span className="logo-accent">{'<'}</span>Kamar<span className="logo-accent">{'/>'}</span>
          </div>
          <nav
            id="primary-nav"
            className="main-nav"
            aria-label="Primary navigation"
            onClick={handleNavClick}
          >
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
            <div className="mobile-only nav-cta-stack">
              <a className="btn primary small" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="btn secondary small" href="#contact">Contact</a>
            </div>
          </nav>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="btn btn-outline small hire-btn" href="#contact">Hire Me</a>
            <button
              className={`hamburger ${menuOpen ? 'active' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-controls="primary-nav"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              <span />
              <span />
              <span />
              <span className="hamburger-glow" />
            </button>
          </div>
        </div>
        <div className="nav-overlay" role="presentation" onClick={() => setMenuOpen(false)} />
      </header>

      <main id="main">
        {/* HERO */}
        <section id="hero" className="hero">
          <div className="hero-head-row">
            <ScrollReveal as="h1" className="hero-title">
              Rapid, scalable & intelligent web development.
              
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <img className="hero-photo" src="/new.JPG" alt="Kamar portrait" />
            </ScrollReveal>
          </div>

          <ScrollReveal as="div" delay={140} className="hero-sub">
            <p className="hero-para">
              focused on rapid prototyping, speed and shipping clean,
                production‑ready features fast. Web Applications, Websites or anything  tech related.. just hit me up, let's work.
                I'm open to any kind of work
            </p>
            <p className="hero-tagline">
              Just your regular tech bro with cool plugins... I promise, I&apos;ll do it better than others.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200} className="hero-cta">
            <a className="btn primary" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              Connect on LinkedIn
            </a>
            <a className="btn secondary" href="#contact">
              Contact Me
            </a>
          </ScrollReveal>

          {/* Desktop / tablet stat pills */}
          <ScrollReveal delay={260} className="stats-row desktop-stats">
            {statsData.map(s => (
              <div key={s.label} className="stat-block">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
                <span className="stat-label-inline">{s.label}</span>
              </div>
            ))}
          </ScrollReveal>

          {/* Ultra–condensed single‑line stats for small mobile */}
          <ScrollReveal delay={260} className="stats-inline-mobile">
            <span><strong>24</strong> Projects • <strong>3+</strong> Years • <strong>100%</strong> Ready</span>
          </ScrollReveal>
        </section>

        {/* ABOUT */}
        
        <section id="about" className="about section">
  
          <div className="section-head">
            <br />
            <br /> <br /> <br />
            <h2> About Me</h2><div className="section-accent" />
          </div>
          <div className="about-grid about-grid-refined">
            <ScrollReveal className="about-text">
              {/* Inline image only for mobile (floats right beside first lines) */}
              <img className="about-inline-photo" src="/work.jpg" alt="Kamar" />
              <p>
                Hello! I&apos;m <strong>Kamar</strong> — a tech‑savvy problem solver and AI enthusiast.
                Co‑founder of <strong>Tourify</strong> and founder of <strong>QueueTrackr</strong>.
              </p>
              <p>
                I turn complex ideas into simple, engaging software and automate the boring stuff so
                teams can move faster. I care about clarity, measurable impact and maintainable velocity.
              </p>
              <p>
                Open to <strong>freelance</strong>, <strong>internships</strong>, and roles where speed,
                learning and ownership matter.
              </p>
              <div className="about-actions">
                <a className="btn primary" href="#contact">Let’s Collaborate</a>
                <a className="btn btn-outline" href="/assets/Abubakar_Kamarudeen_Resume.pdf" download>
                  Download Resume
                </a>
              </div>
            </ScrollReveal>
            {/* Desktop / tablet media (hidden on small screens) */}
            <ScrollReveal className="about-media slim-media" delay={120}>
              <div className="futuristic-frame compact-frame">
                <img src="/work.jpg" alt="Kamar working" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="skills section">
          <div className="section-head">
            <h2>Skills</h2><div className="section-accent" />
          </div>
          <div className="skills-list">
            {skillsData.map((s, i) => (
              <ScrollReveal key={s.name} className="skill-item" delay={i * 70}>
                <div className="skill-header">
                  <span>{s.name}</span>
                  <span className="skill-level">{s.level}%</span>
                </div>
                <ProgressBar level={s.level} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="projects section">
          <div className="section-head">
            <h2>Projects</h2><div className="section-accent" />
          </div>
          <div className="projects-list">
            {projectsData.map((p, i) => (
              <ScrollReveal key={p.id} className="project-card" delay={i * 120}>
                <div className="project-media">
                  {p.mediaType === 'video'
                    ? <video src={p.media} autoPlay muted loop playsInline />
                    : <img src={p.media} alt={p.title} />}
                </div>
                <div className="project-info">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="stack">
                    {p.stack.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <a href={p.link} className="btn small secondary">View</a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="testimonials section">
          <div className="section-head">
            <h2>Testimonials</h2><div className="section-accent" />
          </div>
          <div className="testimonial-grid">
            {testimonialsData.map((t, i) => (
              <ScrollReveal key={i} className="testimonial-card" delay={i * 100}>
                <p className="quote">“{t.quote}”</p>
                <div className="author">— {t.name}</div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact section">
          <div className="section-head">
            <h2>Contact</h2><div className="section-accent" />
          </div>
          <ScrollReveal className="contact-inner">
            <p className="contact-intro">
              Have a project, need rapid prototyping, or want to automate workflows? Let’s talk.
            </p>
            <form
              className="contact-form"
              onSubmit={e => {
                e.preventDefault();
                alert('Form submission placeholder. Connect backend later.');
              }}
            >
              <div className="form-row">
                <label>
                  Name
                  <input name="name" type="text" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" required />
                </label>
              </div>
              <label>
                Message
                <textarea name="message" required rows={5} />
              </label>
              <button type="submit" className="btn primary wide">Send Message</button>
            </form>
            <div className="alt-contact">
              <span>Email: <a href="mailto:yourname@example.com">yourname@example.com</a></span>
              <span>LinkedIn: <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">Profile</a></span>
            </div>
          </ScrollReveal>
        </section>

        <footer className="site-footer">
          <p>&copy; {new Date().getFullYear()} Kamar. Built with React. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}