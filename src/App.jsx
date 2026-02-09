import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Code, Terminal, Database, Cpu, ChevronRight 
} from "lucide-react";
import './App.css';

// --- ASSETS ---
// Ensure these files are in your src folder or public folder as needed
import me from './me.jpg'; 
import cert1 from './cert1.jpg';
import cert2 from './cert2.jpg';
import cert3 from './cert3.jpg';

// --- DATA: FORMATTED STRICTLY PER UNIVERSITY DOC ---

const skills = [
  { 
    category: "Languages & Logic", 
    icon: <Terminal size={24} color="#d4af37"/>, 
    list: ["Java (Advanced)", "C++", "Python", "JavaScript (ES6+)"]
  },
  { 
    category: "Frontend Architecture", 
    icon: <Code size={24} color="#d4af37"/>, 
    list: ["React.js", "HTML5 (Semantic)", "CSS3 / Tailwind", "Framer Motion"]
  },
  { 
    category: "Backend & Systems", 
    icon: <Cpu size={24} color="#d4af37"/>, 
    list: ["Node.js", "Express", "REST API Design", "System Architecture"]
  },
  { 
    category: "Data Persistence", 
    icon: <Database size={24} color="#d4af37"/>, 
    list: ["MongoDB", "MySQL", "Git Version Control"]
  }
];

const projects = [
  {
    title: "Vyom Clothing",
    role: "Full-Stack E-Commerce",
    desc: "A premium fashion marketplace engineered for performance. Implements complex state management for cart functionality and integrates secure payment gateways.",
    tech: "React.js • Commerce.js • Stripe • CSS3",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/"
  },
  {
    title: "Story Verse",
    role: "Library Management System",
    desc: "A digital archive for bibliophiles. Features CRUD operations for book tracking, chapter summarization, and reading progress analytics.",
    tech: "MongoDB • Express • React • Node.js",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
    link: "https://reading-tracker-system1-vkbm.vercel.app/"
  },
  {
    title: "Biz-ID Generator",
    role: "Professional Tooling",
    desc: "Automated identity document generation system. Utilizes HTML5 Canvas API for real-time rendering and client-side PDF export logic.",
    tech: "React • Vite • Canvas API",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800",
    link: "https://business-card-generator-mddw.vercel.app/"
  }
];

// Certificates Array - Using the imported images
const certificateImages = [cert1, cert2, cert3];

// --- COMPONENT: HIGH DENSITY DUST ---
const GoldDust = () => {
  // Creating 50 particles for high density
  const particles = Array.from({ length: 50 });
  
  return (
    <div className="dust-container">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="dust-particle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            width: Math.random() * 3 + 1 + "px", // Varying sizes
            height: Math.random() * 3 + 1 + "px",
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * -100], // Float up
            x: [null, Math.random() * 50 - 25], // Slight drift
            opacity: [0, 0.6, 0], // Fade in/out
          }}
          transition={{
            duration: Math.random() * 5 + 5, // Slow float
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="app">
      <div className="golden-overlay"></div>
      <div className="scanlines"></div>
      <GoldDust />

      {/* 1. WELCOME / PROFILE */}
      <section className="hero">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={me} alt="Jashandeep Singh" className="hero-profile-img" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{ textAlign: 'center', maxWidth: '800px' }}
        >
          <h1>Jashandeep Singh</h1>
          <p className="serif-italic" style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '30px' }}>
            B.Tech Computer Science & Engineering
          </p>
          <p style={{ lineHeight: '1.8', color: '#ccc', fontSize: '1.1rem' }}>
            Hi, I’m Jashandeep. A student at <strong>Lovely Professional University</strong>, specializing in <span style={{color: '#fff'}}>Full-Stack Development</span>. I focus on building scalable applications and have a solid foundation in both front-end aesthetics and back-end logic.
          </p>

          <div style={{ marginTop: '50px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <a href="mailto:jashandeep20445@gmail.com" className="btn-gold">
              Contact Me <Mail size={18}/>
            </a>
            <a href="https://linkedin.com/in/jashan23" className="btn-gold">
              LinkedIn <Linkedin size={18}/>
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. SKILLS & TECHNOLOGIES */}
      <section id="skills">
        <div className="section-header">
          <h2>Skills & Technologies</h2>
          <span className="section-number">02</span>
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <motion.div 
              key={i}
              className="skill-category"
              whileHover={{ y: -10 }}
            >
              <div style={{ marginBottom: '15px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>{s.category}</h3>
              <ul style={{ listStyle: 'none' }}>
                {s.list.map((item, k) => (
                  <li key={k} style={{ padding: '5px 0', color: '#888', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. PROJECTS */}
      <section id="projects">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <span className="section-number">03</span>
        </div>
        
        {projects.map((p, i) => (
          <motion.div 
            key={i} 
            className="project-row"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ overflow: 'hidden', border: '1px solid #333' }}>
              <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="project-meta">
              <h3>{p.title}</h3>
              <p className="serif-italic" style={{ color: '#d4af37', marginBottom: '20px' }}>{p.role}</p>
              <p style={{ color: '#aaa', lineHeight: '1.7', marginBottom: '20px' }}>{p.desc}</p>
              <div style={{ marginBottom: '25px' }}>
                <span style={{ display:'block', fontSize:'0.8rem', color:'#666', marginBottom:'5px' }}>TECH STACK</span>
                <span style={{ color: '#fff' }}>{p.tech}</span>
              </div>
              <a href={p.link} target="_blank" className="btn-gold" style={{ fontSize: '0.8rem', padding: '10px 25px' }}>
                View Live <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 4. CERTIFICATIONS (INFINITE SCROLL) */}
      <section style={{ padding: '0', maxWidth: '100%' }}>
         <div style={{ padding: '0 5%', maxWidth: '1400px', margin: '0 auto' }}>
            <div className="section-header" style={{ marginTop: '100px' }}>
              <h2>Certifications</h2>
              <span className="section-number">04</span>
            </div>
         </div>
         
         {/* INFINITE MARQUEE WITH IMAGES */}
         <div className="marquee-wrapper">
           <div className="marquee-track">
             {/* We duplicate the images to create a seamless loop */}
             {[...certificateImages, ...certificateImages, ...certificateImages, ...certificateImages].map((img, index) => (
               <div key={index} className="cert-frame">
                 <img src={img} alt="Certificate" className="cert-img" />
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* 5. EXPERIENCE / EDUCATION */}
      <section id="education">
        <div className="section-header">
          <h2>Education</h2>
          <span className="section-number">05</span>
        </div>
        
        <div style={{ borderLeft: '2px solid #d4af37', paddingLeft: '40px' }}>
          <div style={{ marginBottom: '50px' }}>
             <h3 style={{ fontSize: '1.8rem' }}>B.Tech Computer Science</h3>
             <p className="serif-italic" style={{ fontSize: '1.2rem', color: '#888' }}>Lovely Professional University | 2023 - Present</p>
             <p style={{ marginTop: '10px', color: '#d4af37' }}>CGPA: 6.8</p>
          </div>
          <div style={{ marginBottom: '50px' }}>
             <h3 style={{ fontSize: '1.5rem' }}>Senior Secondary (12th)</h3>
             <p className="serif-italic" style={{ fontSize: '1.1rem', color: '#888' }}>Dr. Asanand Arya Model School | 2022</p>
             <p style={{ marginTop: '10px', color: '#d4af37' }}>Score: 88.6%</p>
          </div>
        </div>
      </section>

      {/* 8. RESUME & CONTACT */}
      <section style={{ textAlign: 'center', padding: '150px 0' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>Ready to Collaborate?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
           <a href="/resume.pdf" download className="btn-gold">
             Download Resume (PDF) <Download size={18} />
           </a>
        </div>
        <footer style={{ marginTop: '100px', color: '#444', fontSize: '0.9rem' }}>
          © 2026 Jashandeep Singh. All Rights Reserved.
        </footer>
      </section>

    </div>
  );
}

export default App;