import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  ArrowUpRight, Download, Mail, Linkedin, ChevronDown, 
  Code, Cpu, Globe, Award 
} from "lucide-react";
import './App.css';
import me from './me.jpg'; 

// --- DATA ---
const projects = [
  {
    title: "Vyom Clothing",
    role: "Full Stack Commerce",
    desc: "A premium fashion e-commerce platform. Engineered with dynamic cart states, secure Stripe payment gateways, and Commerce.js for inventory management.",
    tech: ["React", "Stripe", "Commerce.js"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Story Verse",
    role: "Library Architecture",
    desc: "A sophisticated digital library assistant. Allows users to track reading metrics, author chapter summaries, and manage a personal book archive.",
    tech: ["MongoDB", "Express", "Node.js"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Biz-ID Generator",
    role: "Digital Tooling",
    desc: "Professional identity generation tool. Leverages Canvas API for real-time rendering and PDF generation of business credentials.",
    tech: ["React", "Vite", "Canvas API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800"
  }
];

const certificates = [
  "Full Stack Development", "Data Structures & Algorithms", "React Advanced Patterns", 
  "Backend Architecture", "System Design", "UI/UX Fundamentals", "Database Management"
];

const education = [
  { school: "Lovely Professional University", degree: "B.Tech Computer Science", year: "2023 - Present", score: "CGPA: 6.8" },
  { school: "Dr. Asanand Arya Model School", degree: "Senior Secondary", year: "2022", score: "88.6%" },
  { school: "St. Joseph's Convent School", degree: "Matriculation", year: "2021", score: "83.8%" }
];

// --- COMPONENTS ---

// 1. Dust Particle System
const DustParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden h-full">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="dust"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight, 
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * -100], 
            opacity: [0, 0.5, 0],
          }}
          transition={{ 
            duration: Math.random() * 10 + 5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}
    </div>
  );
};

// 2. Infinite Scroll Marquee
const Marquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {[...certificates, ...certificates, ...certificates].map((cert, i) => (
          <div key={i} className="cert-item">
            <Award size={18} color="#cfa76e" /> {cert}
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="app">
      <div className="noise-overlay"></div>
      <div className="vignette"></div>

      {/* HERO */}
      <section className="hero">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="hero-bg" />
        <DustParticles />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ zIndex: 10 }}
        >
          <p>Jashandeep</p>
          <h1>Full Stack<br/>Developer</h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 1, duration: 1 }}
            style={{ height: '2px', background: '#9e1b1b', margin: '20px auto' }}
          />

          <p style={{ fontSize: '0.9rem', color: '#8c857b', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>
            Specializing in scalable web architecture and pixel-perfect interactive experiences.
          </p>
        </motion.div>

        <motion.div 
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown color="#cfa76e" size={30} />
        </motion.div>
      </section>

      {/* INFINITE SCROLL */}
      <Marquee />

      {/* ABOUT / PROFILE */}
      <section id="profile">
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={me} alt="Profile" style={{ width: '100%', borderRadius: '4px', filter: 'sepia(20%)' }} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '30px' }}>
              Engineering <br/><span style={{ color: '#cfa76e' }}>Digital Solutions</span>
            </h2>
            <p className="serif-text" style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.8', marginBottom: '30px' }}>
              I am a student at Lovely Professional University, driven by a passion for complex problem solving and system architecture. My approach combines the raw efficiency of backend logic with the elegance of modern frontend frameworks.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ padding: '20px', background: '#111', border: '1px solid #333' }}>
                <Code color="#cfa76e" size={24} />
                <h4 style={{ marginTop: '10px' }}>Frontend</h4>
                <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '5px' }}>React, Tailwind, Framer</p>
              </div>
              <div style={{ padding: '20px', background: '#111', border: '1px solid #333' }}>
                <Cpu color="#cfa76e" size={24} />
                <h4 style={{ marginTop: '10px' }}>Backend</h4>
                <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '5px' }}>Node, Express, Mongo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work">
        <h2 className="section-title">Selected Works <div className="line"></div></h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div style={{ overflow: 'hidden' }}>
                <img src={p.image} alt={p.title} className="project-image" />
              </div>
              <div style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '1.4rem' }}>{p.title}</h3>
                  <a href={p.link} target="_blank" style={{ color: '#cfa76e' }}><ArrowUpRight size={20} /></a>
                </div>
                <p style={{ color: '#8c857b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ background: '#080808' }}>
        <h2 className="section-title">Academic History <div className="line"></div></h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {education.map((edu, i) => (
            <motion.div 
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-dot"></div>
              <span style={{ color: '#9e1b1b', fontFamily: 'Cinzel', fontWeight: 'bold' }}>{edu.year}</span>
              <h3 style={{ fontSize: '1.5rem', marginTop: '5px', color: '#fff' }}>{edu.degree}</h3>
              <p style={{ color: '#8c857b', fontStyle: 'italic' }}>{edu.school}</p>
              <p style={{ marginTop: '10px', fontSize: '0.9rem', border: '1px solid #333', display: 'inline-block', padding: '5px 10px' }}>
                {edu.score}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 0', borderTop: '1px solid #222', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>Ready to Collaborate?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <a href="mailto:jashandeep20445@gmail.com" className="btn-gold">
            <Mail size={18} /> EMAIL ME
          </a>
          <a href="https://linkedin.com/in/jashan23" target="_blank" className="btn-gold">
            <Linkedin size={18} /> LINKEDIN
          </a>
          <a href="/resume.pdf" download className="btn-gold">
             <Download size={18} /> RESUME
          </a>
        </div>
        <p style={{ marginTop: '60px', color: '#444', fontSize: '0.8rem' }}>
          © 2026 Jashandeep. Designed with React & Framer Motion.
        </p>
      </footer>
    </div>
  );
}

export default App;