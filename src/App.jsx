import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  ChevronRight, Terminal, Cpu, Globe, Layers 
} from "lucide-react";

import me from './me.jpg'; 

const projects = [
  {
    title: "Vyom Clothing",
    type: "E-Commerce",
    desc: "A premium minimalist fashion store. Features Stripe payments and a custom cart engine.",
    tech: ["React.js", "Commerce.js", "Stripe"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Story Verse",
    type: "Library App",
    desc: "Track your reading journey. Write summaries, rate books, and manage your digital shelf.",
    tech: ["MongoDB", "Express", "React", "Node"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Biz-ID Gen",
    type: "Tool",
    desc: "Instant professional identity generator. Create ID cards with QR codes and download as PDF.",
    tech: ["React", "Canvas API", "Vite"],
    link: "https://business-card-generator-mddw.vercel.app/",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800"
  }
];

const skills = [
  { icon: <Terminal size={20}/>, title: "Languages", items: "Java, C++, JavaScript, Python" },
  { icon: <Layers size={20}/>, title: "Frontend", items: "React.js, Tailwind, Framer Motion" },
  { icon: <Cpu size={20}/>, title: "Backend", items: "Node.js, Express, MongoDB" },
  { icon: <Globe size={20}/>, title: "Tools", items: "Git, Vercel, Postman, VS Code" }
];

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="app">
      {/* 1. BACKGROUND */}
      <div className="aurora-bg"></div>
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'var(--accent)', scaleX, transformOrigin: "0%", zIndex: 200 }} />

      {/* 2. NAVBAR */}
      <nav>
        <div className="logo">Jashan<span style={{color:'var(--accent)'}}>.dev</span></div>
        <a href="mailto:jashandeep20445@gmail.com" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize:'0.9rem' }}>
          Contact
        </a>
      </nav>

      {/* 3. CENTERED HERO (Fixes the photo issue) */}
      <section className="hero-section">
        <motion.div 
           initial={{ opacity: 0, y: 30 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ duration: 0.8 }}
           className="hero-container"
        >
           {/* THE CIRCLE PHOTO FRAME */}
           <div className="profile-frame">
             <img src={me} alt="Jashandeep" className="profile-img" />
           </div>

           <h1 className="hero-title">
             Building Digital <br/> Experiences.
           </h1>
           
           <p className="hero-sub">
             Hi, I'm Jashandeep. A Full Stack Developer building accessible, pixel-perfect, and performant web applications.
           </p>

           <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
              <a href="#projects" className="btn btn-primary">
                View Work <ChevronRight size={18} />
              </a>
              <a href="/resume.pdf" download className="btn btn-secondary">
                <Download size={18} /> CV
              </a>
           </div>
        </motion.div>
      </section>

      {/* 4. SKILLS */}
      <section style={{ padding: '100px 0' }}>
         <h2 className="section-title">&lt;Skills /&gt;</h2>
         <div className="grid">
            {skills.map((s, i) => (
               <motion.div 
                 key={i} whileHover={{ y: -5 }}
                 className="glass-card" style={{ padding: '30px' }}
               >
                  <div style={{ color: 'var(--accent)', marginBottom: '15px' }}>{s.icon}</div>
                  <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{s.items}</p>
               </motion.div>
            ))}
         </div>
      </section>

      {/* 5. PROJECTS */}
      <section id="projects" style={{ padding: '100px 0' }}>
         <h2 className="section-title">&lt;Projects /&gt;</h2>
         <div className="grid">
            {projects.map((p, i) => (
               <motion.div 
                 key={i} whileHover={{ y: -5 }}
                 className="glass-card"
               >
                  <div style={{ height: '250px', overflow: 'hidden' }}>
                     <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '30px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{p.title}</h3>
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '2px 8px', borderRadius: '4px' }}>
                           {p.type}
                        </span>
                     </div>
                     <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem' }}>{p.desc}</p>
                     
                     <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '25px' }}>
                        {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                     </div>

                     <a href={p.link} target="_blank" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: 600 }}>
                        View Live <ExternalLink size={16} />
                     </a>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* 6. EDUCATION & FOOTER */}
      <section style={{ padding: '100px 0', textAlign: 'center' }}>
         <h2 className="section-title">&lt;Education /&gt;</h2>
         <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '30px', textAlign: 'left', maxWidth: '600px', width: '90%' }}>
            {[
              { year: "2023-Present", title: "B.Tech CSE", place: "Lovely Professional University" },
              { year: "2022", title: "Senior Secondary", place: "Dr. Asanand Arya Model School" }
            ].map((e, i) => (
               <div key={i} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '20px' }}>
                  <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{e.year}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '5px' }}>{e.title}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{e.place}</div>
               </div>
            ))}
         </div>
      </section>

      <footer>
         <p>© 2026 Jashandeep. Built with React & Motion.</p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <a href="https://linkedin.com/in/jashan23" target="_blank" style={{ color: 'var(--text-secondary)' }}><Linkedin size={20} /></a>
            <a href="mailto:jashandeep20445@gmail.com" style={{ color: 'var(--text-secondary)' }}><Mail size={20} /></a>
         </div>
      </footer>
    </div>
  );
}

export default App;