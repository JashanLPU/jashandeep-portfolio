import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion"; 
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Sun, Moon, Menu, X, Phone, BookOpen, Award, Zap 
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

// --- COMPONENTS ---

// 3D Card Wrapper
const Card3D = ({ children }) => {
  return (
    <motion.div
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100 }}
      style={{ perspective: 1000 }}
    >
      <div style={{ 
        background: 'var(--glass)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border)', 
        borderRadius: '20px', 
        overflow: 'hidden',
        boxShadow: '0 10px 40px -10px var(--shadow-color)',
        height: '100%'
      }}>
        {children}
      </div>
    </motion.div>
  );
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Theme Toggle Logic
  useEffect(() => {
    document.body.className = theme === "dark" ? "" : "light-mode";
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      
      {/* Scroll Progress Bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary)', scaleX, transformOrigin: "0%", zIndex: 2000 }} />

      {/* NAVBAR */}
      <nav style={{ 
        position: 'fixed', top: 0, width: '100%', height: '70px', 
        background: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(15px)', 
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '0 20px', borderBottom: '1px solid var(--border)' 
      }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.5rem', margin: 0 }}>
          Jashandeep<span className="gradient-text">.</span>
        </h2>
        
        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }} className="nav-desktop">
          {['About', 'Resume', 'Skills', 'Projects', 'Certificates', 'Contact'].map(item => (
            <motion.button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())}
              whileHover={{ scale: 1.1, color: 'var(--primary)' }}
              style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: '1rem', fontWeight: 500 }}
            >
              {item}
            </motion.button>
          ))}
          {/* THEME BUTTON */}
          <motion.button 
            onClick={toggleTheme}
            whileHover={{ rotate: 180 }}
            style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', marginLeft: '10px' }}
          >
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: 'var(--text)' }} className="nav-mobile">
           {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>

        {/* 1. HERO SECTION (CENTERED & FLOATING) */}
        <section id="about" style={{ marginBottom: '120px', textAlign: 'center' }}>
          
          <motion.div 
            className="floating"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1.5 }}
            style={{ marginBottom: '30px', display: 'inline-block' }}
          >
            <img 
              src={me} 
              alt="Profile" 
              style={{ 
                width: '220px', height: '220px', borderRadius: '50%', 
                border: '4px solid var(--primary)', objectFit: 'cover',
                boxShadow: '0 0 50px var(--glass-hover)'
              }} 
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '3.5rem', margin: '0 0 20px 0', lineHeight: 1.1 }}
          >
            Hi, I'm <span className="gradient-text">Jashandeep Singh</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}
          >
            A <strong>Full-Stack Developer</strong> specializing in building high-performance, scalable web applications with the <strong>MERN Stack</strong>.
          </motion.p>
        </section>

        {/* 2. RESUME BUTTON */}
        <motion.section 
          id="resume" 
          style={{ textAlign: 'center', marginBottom: '120px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px var(--primary)" }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                padding: '16px 45px', fontSize: '1.1rem', fontWeight: 'bold', 
                background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '50px', 
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' 
              }}
            >
              <Download size={20}/> Download Resume
            </motion.button>
          </a>
        </motion.section>

        {/* 3. SKILLS */}
        <section id="skills" style={{ marginBottom: '120px' }}>
          <motion.h2 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            style={{ fontSize: '2.5rem', borderLeft: '6px solid var(--primary)', paddingLeft: '20px', marginBottom: '40px' }}
          >
            3. Skills
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            {["C, C++, Java", "Python, PHP", "React, Tailwind", "Node.js, Express", "MongoDB, SQL", "Git, GitHub"].map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, background: 'var(--glass-hover)', borderColor: 'var(--primary)' }}
                style={{ 
                  padding: '25px', background: 'var(--glass)', 
                  borderRadius: '12px', textAlign: 'center', 
                  border: '1px solid var(--border)', cursor: 'default' 
                }}
              >
                <Zap size={24} color="var(--secondary)" style={{ marginBottom: '10px' }}/>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{skill}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. PROJECTS */}
        <section id="projects" style={{ marginBottom: '120px' }}>
          <motion.h2 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            style={{ fontSize: '2.5rem', borderLeft: '6px solid var(--primary)', paddingLeft: '20px', marginBottom: '40px' }}
          >
            4. Projects
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {projects.map((proj, i) => (
              <Card3D key={i}>
                <div style={{ height: '220px', background: '#000', overflow: 'hidden' }}>
                  <motion.img 
                    src={proj.img} alt={proj.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div style={{ padding: '30px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>{proj.title}</h3>
                      <a href={proj.link} target="_blank" style={{ color: 'var(--primary)' }}>
                        <ExternalLink size={24}/>
                      </a>
                   </div>
                   <p style={{ color: 'var(--text-dim)', marginBottom: '20px', lineHeight: 1.6 }}>{proj.desc}</p>
                   <span style={{ fontSize: '0.85rem', padding: '6px 12px', background: 'rgba(168, 85, 247, 0.15)', color: 'var(--primary)', borderRadius: '6px', fontWeight: 'bold' }}>
                     {proj.tech}
                   </span>
                </div>
              </Card3D>
            ))}
          </div>
        </section>

        {/* 5. CERTIFICATES (MANUAL SCROLL & HUGE) */}
        <section id="certificates" style={{ marginBottom: '120px' }}>
          <motion.h2 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            style={{ fontSize: '2.5rem', borderLeft: '6px solid var(--primary)', paddingLeft: '20px', marginBottom: '40px' }}
          >
            5. Certificates
          </motion.h2>
          
          {/* Horizontal Scroll Container */}
          <div className="horizontal-scroll-container">
            {certifications.map((cert, i) => (
              <motion.div 
                key={i} 
                className="certificate-card"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                style={{ 
                  minWidth: '600px', // HUGE Width
                  background: 'var(--glass)', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  border: '1px solid var(--border)',
                  scrollSnapAlign: 'center',
                  boxShadow: '0 20px 50px -20px var(--shadow-color)'
                }}
              >
                 <div style={{ height: '350px', background: '#111', overflow: 'hidden' }}>
                    <img src={cert.img} alt={cert.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                 </div>
                 <div style={{ padding: '30px' }}>
                   <h3 style={{ margin: '0 0 10px 0', fontSize: '1.8rem' }}>{cert.name}</h3>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', color: 'var(--text-dim)' }}>
                     <span><strong>Issuer:</strong> {cert.issuer}</span>
                     <span>{cert.date}</span>
                   </div>
                 </div>
              </motion.div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '10px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            (Scroll sideways to view more)
          </p>
        </section>

        {/* 6. ACHIEVEMENTS */}
        <section id="achievements" style={{ marginBottom: '120px' }}>
          <motion.h2 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            style={{ fontSize: '2.5rem', borderLeft: '6px solid var(--primary)', paddingLeft: '20px', marginBottom: '40px' }}
          >
            6. Achievements
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {achievements.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10, background: 'var(--glass-hover)' }}
                style={{ 
                  padding: '25px', background: 'var(--glass)', 
                  borderLeft: '5px solid #22c55e', borderRadius: '0 12px 12px 0',
                  display: 'flex', alignItems: 'center', gap: '20px',
                  boxShadow: '0 4px 20px var(--shadow-color)'
                }}
              >
                <Award size={32} color="#22c55e" />
                <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. CONTACT */}
        <section id="contact" style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', borderLeft: '6px solid var(--primary)', paddingLeft: '20px', marginBottom: '40px' }}>7. Contact Me</h2>
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            {[
              { icon: <Mail size={30}/>, text: "Email Me", link: "mailto:jashandeep20445@gmail.com" },
              { icon: <Linkedin size={30}/>, text: "LinkedIn", link: "https://linkedin.com/in/jashan23" },
              { icon: <Github size={30}/>, text: "GitHub", link: "https://github.com/JashanLPU" }
            ].map((contact, i) => (
              <motion.a 
                key={i} 
                href={contact.link} 
                target="_blank"
                whileHover={{ y: -10, borderColor: 'var(--primary)' }}
                style={{ 
                  flex: 1, minWidth: '250px', padding: '40px', 
                  background: 'var(--glass)', borderRadius: '20px', 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', 
                  textDecoration: 'none', color: 'var(--text)', border: '1px solid var(--border)',
                  boxShadow: '0 10px 30px var(--shadow-color)'
                }}
              >
                <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                  {contact.icon}
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{contact.text}</span>
              </motion.a>
            ))}
          </div>
        </section>

      </div>
      
      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '50px', background: 'var(--glass)', borderTop: '1px solid var(--border)' }}>
        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>© 2026 Jashandeep Singh</p>
      </footer>

    </div>
  );
}

export default App;