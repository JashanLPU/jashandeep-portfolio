import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion"; 
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Menu, X, Phone, BookOpen, Award, Zap 
} from "lucide-react";

import me from './me.jpg'; 

// --- DATA ---
const projects = [
  {
    title: "Vyom Clothing System",
    sub: "Live E-Commerce",
    desc: "A modern e-commerce platform with secure payments and cart logic.",
    tech: "React, Vite, Commerce.js",
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    img: "https://placehold.co/600x400/111/FFF?text=Vyom+Project" 
  },
  {
    title: "Reading Tracker System",
    sub: "Live Utility Tool",
    desc: "Track reading habits, book progress, and personalized notes.",
    tech: "React, Node.js, MongoDB",
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    img: "https://placehold.co/600x400/222/FFF?text=Reading+Tracker" 
  },
  {
    title: "Business Card Generator",
    sub: "Live Dynamic Tool",
    desc: "Create and customize digital business cards instantly.",
    tech: "React, Vite, Tailwind",
    link: "https://business-card-generator-mddw.vercel.app/",
    img: "https://placehold.co/600x400/333/FFF?text=Card+Generator" 
  }
];

const certifications = [
  { name: "Interpersonal Communication", issuer: "Rice University", date: "Jan 2026", img: "/cert1.jpg" },
  { name: "Generative AI Master", issuer: "Infosys", date: "Aug 2025", img: "/cert2.jpg" },
  { name: "Computational Theory", issuer: "Infosys", date: "Aug 2025", img: "/cert3.jpg" }
];

const achievements = [
  "Completed Tree-Plantation Initiative with Ek Noor Sewa Sevi Sanstha.",
  "Developed 'Civic Pulse' - A Public Grievance Management System.",
  "Built 'Iron Core' - An AI-integrated Gym Guidance Website."
];

// --- 3D CARD COMPONENT ---
const Card3D = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
      style={{ perspective: 1000 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div style={{ 
        background: 'rgba(255,255,255,0.03)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        borderRadius: '16px', 
        overflow: 'hidden',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
      }}>
        {children}
      </div>
    </motion.div>
  );
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      
      {/* Progress Bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: '#a855f7', scaleX, transformOrigin: "0%", zIndex: 2000 }} />

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', height: '70px', background: 'rgba(3,0,20,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.5rem', margin: 0 }}>Jashandeep<span className="gradient-text">.</span></h2>
        
        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '20px' }} className="nav-desktop">
          {['About', 'Resume', 'Skills', 'Projects', 'Certificates', 'Contact'].map(item => (
            <motion.button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())}
              whileHover={{ scale: 1.1, color: '#a855f7' }}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem' }}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#fff' }} className="nav-mobile">
           {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '120px', paddingBottom: '50px', paddingLeft:'20px', paddingRight:'20px' }}>

        {/* 1. HERO SECTION (With Floating Animation) */}
        <section id="about" style={{ marginBottom: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap' }}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img 
                src={me} 
                alt="Profile" 
                style={{ width: '200px', height: '200px', borderRadius: '50%', border: '4px solid #a855f7', objectFit: 'cover' }}
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </motion.div>
            
            <div style={{ flex: 1 }}>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '3rem', margin: '0 0 20px 0', lineHeight: 1.2 }}
              >
                Hi, I'm <span className="gradient-text">Jashandeep Singh</span>
              </motion.h1>
              <p style={{ fontSize: '1.2rem', color: '#9ca3af', lineHeight: 1.6 }}>
                A <strong>Full-Stack Developer</strong> and <strong>B.Tech CSE Student</strong> from Punjab. 
                I build high-performance, scalable web applications using the MERN stack.
              </p>
            </div>
          </div>
        </section>

        {/* 2. RESUME BUTTON (Pulse Effect) */}
        <motion.section 
          id="resume" 
          style={{ textAlign: 'center', marginBottom: '100px' }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
        >
          <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              style={{ 
                padding: '15px 40px', fontSize: '1.2rem', fontWeight: 'bold', 
                background: '#a855f7', color: 'white', border: 'none', borderRadius: '50px', 
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' 
              }}
            >
              <Download /> Download Resume
            </motion.button>
          </a>
        </motion.section>

        {/* 3. SKILLS (Staggered Grid) */}
        <section id="skills" style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '2rem', borderLeft: '5px solid #a855f7', paddingLeft: '15px', marginBottom: '30px' }}>3. Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              "C, C++, Java", "Python, PHP", "React, Tailwind", "Node.js, Express", "MongoDB, SQL", "Git, GitHub"
            ].map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Zap size={20} color="#ec4899" style={{ marginBottom: '10px' }}/>
                <div style={{ fontWeight: 'bold' }}>{skill}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. PROJECTS (3D Tilt Cards) */}
        <section id="projects" style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '2rem', borderLeft: '5px solid #a855f7', paddingLeft: '15px', marginBottom: '30px' }}>4. Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {projects.map((proj, i) => (
              <Card3D key={i}>
                <div style={{ height: '200px', background: '#000' }}>
                  <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '25px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3 style={{ margin: '0 0 10px 0' }}>{proj.title}</h3>
                      <a href={proj.link} target="_blank" style={{ color: '#a855f7' }}><ExternalLink /></a>
                   </div>
                   <p style={{ color: '#9ca3af', marginBottom: '15px' }}>{proj.desc}</p>
                   <span style={{ fontSize: '0.8rem', padding: '5px 10px', background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', borderRadius: '5px' }}>{proj.tech}</span>
                </div>
              </Card3D>
            ))}
          </div>
        </section>

        {/* 5. CERTIFICATES (Endless Scroll Marquee) */}
        <section id="certificates" style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '2rem', borderLeft: '5px solid #a855f7', paddingLeft: '15px', marginBottom: '30px' }}>5. Certificates</h2>
          
          <div className="marquee-container">
            <div className="marquee-track">
              {/* Duplicate array 4 times to ensure seamless loop */}
              {[...certifications, ...certifications, ...certifications, ...certifications].map((cert, i) => (
                <div key={i} style={{ minWidth: '350px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                   <img src={cert.img} alt={cert.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                   <div style={{ padding: '15px' }}>
                     <h4 style={{ margin: '0 0 5px 0' }}>{cert.name}</h4>
                     <p style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af' }}>{cert.issuer}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. ACHIEVEMENTS (Slide In) */}
        <section id="achievements" style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '2rem', borderLeft: '5px solid #a855f7', paddingLeft: '15px', marginBottom: '30px' }}>6. Achievements</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {achievements.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
                whileHover={{ x: 20, background: 'rgba(255,255,255,0.1)' }}
                style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid #22c55e', borderRadius: '0 10px 10px 0' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                   <Award color="#22c55e"/>
                   <span>{item}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. CONTACT (Grid) */}
        <section id="contact" style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2rem', borderLeft: '5px solid #a855f7', paddingLeft: '15px', marginBottom: '30px' }}>7. Contact Me</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { icon: <Mail />, text: "Email Me", link: "mailto:jashandeep20445@gmail.com", color: "blue" },
              { icon: <Linkedin />, text: "LinkedIn", link: "https://linkedin.com/in/jashan23", color: "blue" },
              { icon: <Github />, text: "GitHub", link: "https://github.com/JashanLPU", color: "purple" }
            ].map((contact, i) => (
              <motion.a 
                key={i} 
                href={contact.link} 
                target="_blank"
                whileHover={{ scale: 1.05, y: -5 }}
                style={{ flex: 1, minWidth: '200px', padding: '30px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {contact.icon}
                <span style={{ fontWeight: 'bold' }}>{contact.text}</span>
              </motion.a>
            ))}
          </div>
        </section>

      </div>
      
      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p style={{ opacity: 0.7 }}>© 2026 Jashandeep Singh. Built with React & Framer Motion.</p>
      </footer>

    </div>
  );
}

export default App;