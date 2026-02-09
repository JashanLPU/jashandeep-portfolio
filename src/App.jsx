import { useEffect, useState } from "react";
import { 
  motion, useScroll, useSpring 
} from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Code, Database, Layout, Smartphone, Moon, Sun, ChevronRight
} from "lucide-react";

import me from './me.jpg'; 

// --- YOUR DATA (PRESERVED) ---
const education = [
  { 
    school: "Lovely Professional University", 
    degree: "B.Tech CSE (Full Stack)", 
    year: "2023 - Present",
    score: "CGPA: 6.8"
  },
  { 
    school: "Dr. Asanand Arya Model School", 
    degree: "Senior Secondary (12th)", 
    year: "2022",
    score: "88.6%"
  },
  { 
    school: "St. Joseph's Convent School", 
    degree: "Matriculation (10th)", 
    year: "2021",
    score: "83.8%"
  }
];

const projects = [
  {
    title: "Vyom Clothing",
    type: "E-Commerce",
    desc: "Premium fashion store with minimalist UI. Features dynamic product cart, secure Stripe checkout, and Commerce.js integration.",
    tech: ["React.js", "Commerce.js", "Stripe"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    // Using a placeholder if your specific image fails, but you can revert to yours
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Story Verse",
    type: "Library System",
    desc: "A library management system to track reading progress, write chapter summaries, and rate your book collection.",
    tech: ["MongoDB", "Express", "React", "Node"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Biz-ID Generator",
    type: "Professional Tool",
    desc: "Create digital identities in seconds. Features real-time customization, QR code integration, and PDF export.",
    tech: ["React", "Vite", "Canvas API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800"
  }
];

const skills = [
  { icon: <Code size={24}/>, cat: "Languages", items: "Java, C++, JavaScript, Python" },
  { icon: <Layout size={24}/>, cat: "Frontend", items: "React.js, Tailwind, HTML/CSS" },
  { icon: <Database size={24}/>, cat: "Backend", items: "Node.js, Express, MongoDB, MySQL" },
  { icon: <Smartphone size={24}/>, cat: "Tools", items: "Git, GitHub, VS Code, Postman" }
];

function App() {
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    document.body.className = theme === "dark" ? "" : "light-mode";
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  return (
    <div className="app">
      {/* Scroll Progress Bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)', scaleX, transformOrigin: "0%", zIndex: 2000 }} />

      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="nav-logo">Jashan<span style={{color: 'var(--accent)'}}>.dev</span></div>
        <button onClick={toggleTheme} className="theme-btn">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>

      <div className="container">
        {/* --- HERO SECTION --- */}
        <section className="hero">
          <div style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '60px', width: '100%' }}>
            <div style={{ flex: '1 1 500px' }}>
              <div style={{ marginBottom: '16px', color: 'var(--accent)', fontWeight: 600, letterSpacing: '1px' }}>
                FULL STACK DEVELOPER
              </div>
              <h1>Building Digital Products, Brands, and Experiences.</h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px' }}>
                Hi, I'm Jashandeep. I build accessible, pixel-perfect, and performant web applications using the MERN stack.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="#projects" className="btn btn-primary">
                  View Work <ChevronRight size={18} />
                </a>
                <a href="/resume.pdf" download className="btn btn-outline">
                  <Download size={18} /> Resume
                </a>
              </div>
            </div>
            
            <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
               <img src={me} alt="Jashandeep" className="hero-img" />
            </div>
          </div>
        </section>

        {/* --- SKILLS SECTION --- */}
        <section style={{ padding: '100px 0' }}>
           <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>Technical Skills</h2>
           <div className="grid-layout">
             {skills.map((s, i) => (
               <div key={i} className="card">
                 <div style={{ color: 'var(--accent)', marginBottom: '16px' }}>{s.icon}</div>
                 <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{s.cat}</h3>
                 <p style={{ color: 'var(--text-secondary)' }}>{s.items}</p>
               </div>
             ))}
           </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" style={{ padding: '100px 0' }}>
           <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>Featured Projects</h2>
           <div className="grid-layout" style={{ gridTemplateColumns: '1fr' }}>
             {projects.map((p, i) => (
               <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>
                 <div style={{ flex: '1 1 400px', height: '300px' }}>
                   <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
                 <div style={{ flex: '1 1 400px', padding: '40px' }}>
                   <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>{p.type}</span>
                   <h3 style={{ fontSize: '2rem', margin: '8px 0 16px' }}>{p.title}</h3>
                   <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{p.desc}</p>
                   
                   <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                     {p.tech.map(t => (
                       <span key={t} style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.9rem' }}>{t}</span>
                     ))}
                   </div>

                   <a href={p.link} target="_blank" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
                     Visit Live Site <ExternalLink size={16} />
                   </a>
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* --- EDUCATION TIMELINE --- */}
        <section style={{ padding: '100px 0' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>Education</h2>
          <div style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '40px' }}>
            {education.map((edu, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: '48px' }}>
                <div style={{ position: 'absolute', left: '-49px', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--accent)', border: '4px solid var(--bg-color)' }}></div>
                <div style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '4px' }}>{edu.year}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{edu.degree}</h3>
                <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{edu.school}</div>
                <div style={{ fontWeight: 500 }}>{edu.score}</div>
              </div>
            ))}
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Let's work together.</h2>
          <p style={{ marginBottom: '40px' }}>Open for opportunities.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
             <a href="mailto:jashandeep20445@gmail.com" className="btn btn-primary">
               <Mail size={18} /> Email Me
             </a>
             <a href="https://linkedin.com/in/jashan23" target="_blank" className="btn btn-outline">
               <Linkedin size={18} /> LinkedIn
             </a>
          </div>
          <div style={{ marginTop: '60px', fontSize: '0.9rem', opacity: 0.6 }}>
            © 2026 Jashandeep. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;