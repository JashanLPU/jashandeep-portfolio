import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Make sure framer-motion is installed
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Sun, Moon, Menu, X, Phone, BookOpen, Award 
} from "lucide-react";

import me from './me.jpg'; 

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// --- DATA ---
const skillsData = [
  { category: "Languages", skills: "C, C++, Java, Python, PHP" },
  { category: "Frontend", skills: "HTML, CSS, React, Tailwind, Vite" },
  { category: "Backend", skills: "Node.js, Express.js" },
  { category: "Tools", skills: "Canva, VS Code, Github, Notepad++" },
  { category: "Soft Skills", skills: "Adaptability, Communication, Creativity" }
];

const projects = [
  {
    title: "Vyom Clothing System",
    sub: "Live E-Commerce",
    desc: "A modern e-commerce platform for clothing with cart, checkout, and payment integration.",
    tech: "React, Vite, Commerce.js",
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    img: "https://placehold.co/600x400/111/FFF?text=Vyom+Clothing" // Placeholder - Replace with screenshot
  },
  {
    title: "Reading Tracker System",
    sub: "Live Utility Tool",
    desc: "A full-stack application to track reading habits, book progress, and personalized notes.",
    tech: "React, Node.js, MongoDB",
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    img: "https://placehold.co/600x400/222/FFF?text=Reading+Tracker" 
  },
  {
    title: "Business Card Generator",
    sub: "Live Dynamic Tool",
    desc: "A tool to create and customize digital business cards instantly with downloadable options.",
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
  "Completed Tree-Plantation Initiative with Ek Noor Sewa Sevi Sanstha (Aug 2025).",
  "Developed 'Civic Pulse' - A Public Grievance Management System (PHP/MySQL).",
  "Built 'Iron Core' - An AI-integrated Gym Guidance Website."
];

function App() {
  const [views, setViews] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => setTheme(curr => curr === "dark" ? "light" : "dark");

  useEffect(() => {
    document.body.className = theme === "dark" ? "" : "light-mode";
  }, [theme]);

  useEffect(() => {
    fetch('/api/views', { method: 'POST' })
      .then(res => res.ok ? res.json() : { count: "..." })
      .then(data => setViews(data.count))
      .catch(() => console.log("Backend offline locally"));
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="app">
      
      {/* --- NAVBAR --- */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ fontWeight: 800, fontSize: '1.5rem', margin: 0 }}>
          Jashandeep<span className="gradient-text">.</span>
        </h2>

        <div className="nav-links" style={{ display: 'flex', gap: '20px' }}>
          {['About', 'Resume', 'Skills', 'Projects', 'Certificates', 'Contact'].map((item) => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="nav-btn">
              {item}
            </button>
          ))}
          <button onClick={toggleTheme} className="nav-btn">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none' }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* --- MAIN CONTENT --- */}
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>

        {/* 1. HERO / ABOUT ME */}
        <motion.section 
          id="about" 
          className="glass-card" 
          style={{ padding: '50px', marginBottom: '60px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div style={{ display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'wrap' }}>
            <motion.img 
              src={me} 
              alt="Jashandeep Singh" 
              className="profile-img" 
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div style={{ flex: 1 }}>
              <motion.h1 
                style={{ fontSize: '3rem', marginBottom: '15px', lineHeight: 1.2 }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hi, I’m <span className="gradient-text">Jashandeep Singh</span>
              </motion.h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '25px' }}>
                A <strong>B.Tech Computer Science</strong> student at <strong>Lovely Professional University</strong>. 
                I specialize in building <strong>scalable web applications</strong> using the MERN stack.
              </p>
              
              <motion.div 
                style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
              >
                 {/* Contact Pills */}
                 {[
                   { icon: <Mail size={18}/>, text: "Email Me", href: "mailto:jashandeep20445@gmail.com" },
                   { icon: <Linkedin size={18}/>, text: "LinkedIn", href: "https://linkedin.com/in/jashan23" },
                   { icon: <Github size={18}/>, text: "GitHub", href: "https://github.com/JashanLPU" }
                 ].map((link, i) => (
                   <motion.a 
                      key={i} 
                      href={link.href} 
                      target="_blank"
                      variants={scaleIn}
                      whileHover={{ scale: 1.05, backgroundColor: "var(--glass-border)" }}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '10px', 
                        padding: '10px 20px', borderRadius: '30px', 
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-primary)', textDecoration: 'none',
                        background: 'rgba(255,255,255,0.02)'
                      }}
                   >
                     {link.icon} {link.text}
                   </motion.a>
                 ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 2. RESUME */}
        <motion.section 
          id="resume" 
          style={{ textAlign: 'center', marginBottom: '80px' }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px var(--accent-glow)" }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                padding: '15px 40px', fontSize: '1.2rem', fontWeight: 'bold', 
                background: 'var(--accent)', color: '#fff', border: 'none', 
                borderRadius: '50px', cursor: 'pointer', display: 'inline-flex', gap: '10px', alignItems: 'center'
              }}
            >
              <Download size={24} /> Download CV
            </motion.button>
          </a>
        </motion.section>

        {/* 3. SKILLS */}
        <section id="skills" style={{ marginBottom: '80px' }}>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            style={{ fontSize: '2rem', marginBottom: '30px', borderLeft: '5px solid var(--accent)', paddingLeft: '15px' }}
          >
            3. Skills & Technologies
          </motion.h2>
          
          <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {skillsData.map((item, i) => (
                  <motion.tr 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ borderBottom: '1px solid var(--glass-border)' }}
                  >
                    <td style={{ padding: '20px', fontWeight: 'bold', width: '30%', background: 'rgba(255,255,255,0.02)' }}>{item.category}</td>
                    <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>{item.skills}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. PROJECTS (3D CARDS) */}
        <section id="projects" style={{ marginBottom: '80px' }}>
          <motion.h2 
             initial={{ opacity: 0, x: -20 }} 
             whileInView={{ opacity: 1, x: 0 }} 
             style={{ fontSize: '2rem', marginBottom: '30px', borderLeft: '5px solid var(--accent)', paddingLeft: '15px' }}
          >
            4. Projects
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {projects.map((proj, i) => (
              <motion.div 
                key={i} 
                className="glass-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10, rotateX: 5, rotateY: 5, zIndex: 10 }}
                style={{ overflow: 'hidden', perspective: '1000px' }}
              >
                {/* Project Image */}
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <motion.img 
                    src={proj.img} 
                    alt={proj.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                <div style={{ padding: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{proj.title}</h3>
                    <a href={proj.link} target="_blank" style={{ color: 'var(--accent)' }}>
                      <ExternalLink size={22}/>
                    </a>
                  </div>
                  <span style={{ fontSize: '0.85rem', background: 'rgba(168, 85, 247, 0.1)', color: 'var(--accent)', padding: '5px 10px', borderRadius: '5px' }}>
                    {proj.sub}
                  </span>
                  <p style={{ color: 'var(--text-secondary)', margin: '15px 0', lineHeight: '1.5' }}>{proj.desc}</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Using: {proj.tech}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. CERTIFICATES (ENDLESS SCROLL MARQUEE) */}
        <section id="certificates" style={{ marginBottom: '80px', overflow: 'hidden' }}>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            style={{ fontSize: '2rem', marginBottom: '30px', borderLeft: '5px solid var(--accent)', paddingLeft: '15px' }}
          >
            5. Certificates
          </motion.h2>

          <div className="marquee-container">
            {/* We duplicate the list to make the scroll seamless */}
            <div className="marquee-track">
              {[...certifications, ...certifications, ...certifications].map((cert, i) => (
                <div 
                  key={i} 
                  className="glass-card"
                  style={{ 
                    minWidth: '350px', 
                    height: '280px', 
                    padding: '0', 
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                   <img src={cert.img} alt={cert.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                   <div style={{ padding: '15px' }}>
                      <h4 style={{ margin: '0 0 5px 0', whiteSpace: 'normal', fontSize: '1.1rem' }}>{cert.name}</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <span>{cert.issuer}</span>
                        <span>{cert.date}</span>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. ACHIEVEMENTS */}
        <section id="achievements" style={{ marginBottom: '80px' }}>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            style={{ fontSize: '2rem', marginBottom: '30px', borderLeft: '5px solid var(--accent)', paddingLeft: '15px' }}
          >
            6. Achievements
          </motion.h2>

          <div style={{ display: 'grid', gap: '15px' }}>
            {achievements.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                className="glass-card"
                style={{ 
                  padding: '20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '20px',
                  borderLeft: '5px solid #22c55e',
                  borderRadius: '5px'
                }}
              >
                <Award size={24} color="#22c55e" />
                <span style={{ fontSize: '1.1rem' }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. CONTACT */}
        <section id="contact" style={{ marginBottom: '60px' }}>
          <motion.div 
            className="glass-card" 
            style={{ padding: '50px', textAlign: 'center' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Let's Work Together</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
              I am currently available for freelance projects and full-time opportunities.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <a href="mailto:jashandeep20445@gmail.com" style={{ textDecoration: 'none' }}>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  style={{ padding: '15px 30px', borderRadius: '30px', border: 'none', background: 'var(--accent)', color: '#fff', fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                >
                  <Mail /> Email Me
                </motion.button>
              </a>
              <a href="https://linkedin.com/in/jashan23" target="_blank" style={{ textDecoration: 'none' }}>
                <motion.button 
                   whileHover={{ scale: 1.1 }}
                   style={{ padding: '15px 30px', borderRadius: '30px', border: '1px solid var(--accent)', background: 'transparent', color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                >
                  <Linkedin /> LinkedIn
                </motion.button>
              </a>
            </div>
          </motion.div>
        </section>

      </div>
      
      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
        <p style={{ margin: 0, fontWeight: 'bold', opacity: 0.8 }}>© 2026 Jashandeep Singh</p>
        <div style={{ fontSize: '0.85rem', marginTop: '10px', opacity: 0.5 }}>
          <Database size={12} style={{ display: 'inline', marginRight: '5px' }} /> 
          Database Views: {views ?? "..."}
        </div>
      </footer>

    </div>
  );
}

export default App;