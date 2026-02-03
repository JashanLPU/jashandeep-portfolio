import { useEffect, useState, useRef } from "react";
import { 
  motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate 
} from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Sun, Moon, Menu, X, Code2, Cpu, Globe, 
  Award, Zap, BookOpen, Layers, Terminal 
} from "lucide-react";

import me from './me.jpg'; 

// --- ADVANCED DATA ---

const projects = [
  {
    title: "Vyom Clothing System",
    sub: "Digital Fashion Store",
    desc: "A premium black & white themed e-commerce experience. Features a minimalist UI, dynamic product cart, secure Stripe checkout, and a seamless shopping journey designed for modern brands.",
    tech: ["React.js", "Commerce.js", "Stripe", "Minimal UI"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    // Fashion/Clothing Image
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop", 
    themeClass: "vyom-theme"
  },
  {
    title: "Story Verse (Reading Tracker)",
    sub: "The Reader's Companion",
    desc: "A magical library management system. Track your reading progress, write chapter summaries, and rate your collection in an interface inspired by ancient wizarding archives.",
    tech: ["MERN Stack", "MongoDB", "JWT Auth", "Book API"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    // Harry Potter / Library Image
    img: "https://images.unsplash.com/photo-1507842217343-583bb7260b66?q=80&w=1000&auto=format&fit=crop",
    themeClass: "hp-theme"
  },
  {
    title: "Business Card Generator",
    sub: "Next-Gen Identity Tool",
    desc: "Create vibrant, professional digital identities in seconds. Features real-time customization, QR code integration, and instant PDF export for the modern professional.",
    tech: ["React + Vite", "Tailwind", "QR Code", "Canvas API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    // Abstract Colorful Tech Image
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    themeClass: "" // Uses default glass theme
  }
];

const skillsData = [
  { icon: <Terminal size={30} />, category: "Core Languages", skills: ["C", "C++", "Java", "Python", "JavaScript"] },
  { icon: <Layers size={30} />, category: "Frontend Magic", skills: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"] },
  { icon: <Cpu size={30} />, category: "Backend Power", skills: ["Node.js", "Express", "MongoDB", "REST APIs"] },
  { icon: <Zap size={30} />, category: "Pro Tools", skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel"] }
];

const certifications = [
  { name: "Interpersonal Communication", issuer: "Rice University", date: "Jan 2026", img: "/cert1.jpg" },
  { name: "Generative AI Master", issuer: "Infosys Springboard", date: "Aug 2025", img: "/cert2.jpg" },
  { name: "Computational Theory", issuer: "Infosys Springboard", date: "Aug 2025", img: "/cert3.jpg" }
];

const education = [
  { school: "Lovely Professional University", degree: "B.Tech CSE (Full Stack Specialization)", year: "2023 - Present", score: "CGPA: 6.8", desc: "Building scalable web apps and mastering algorithms." },
  { school: "Dr. Asanand Arya Model School", degree: "Senior Secondary (12th)", year: "2022", score: "88.6%", desc: "Physics, Chemistry, Math." },
  { school: "St. Joseph's Convent School", degree: "Matriculation (10th)", year: "2021", score: "83.8%", desc: "Foundation in Computer Applications." }
];

// --- 3D TILT COMPONENT ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`glass-panel ${className || ''}`}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Typewriter Effect
  const [text, setText] = useState("");
  const fullText = "Full Stack Developer.";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

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
      
      {/* Dynamic Background */}
      <div className="background-canvas">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* Progress Bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)', scaleX, transformOrigin: "0%", zIndex: 2000 }} />

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        style={{ 
          position: 'fixed', width: '100%', height: '80px', zIndex: 100, 
          backdropFilter: 'blur(15px)', background: 'var(--glass-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%'
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1px' }}>
          Jashandeep<span className="gradient-text">.</span>
        </h2>
        
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {['About', 'Skills', 'Projects', 'Education', 'Contact'].map(item => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())} 
              className="nav-btn"
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1rem', cursor: 'pointer', fontWeight: 600, transition: 'color 0.3s' }}
            >
              {item}
            </button>
          ))}
          <motion.button 
            onClick={toggleTheme} 
            whileHover={{ scale: 1.1, rotate: 180 }}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
          >
             {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </motion.button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-nav" style={{ background: 'none', border: 'none', color: 'var(--text-primary)' }}>
           {menuOpen ? <X/> : <Menu/>}
        </button>
      </motion.nav>

      {/* 1. HERO SECTION */}
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '80px', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 20px' }}>
          
          {/* Profile Image with Animated Rings */}
          <motion.div 
             initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 1.5 }}
             style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 40px' }}
          >
            <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '2px dashed var(--accent)', animation: 'spin 10s linear infinite' }}></div>
            <img 
              src={me} 
              alt="Jashandeep" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--bg-color)', boxShadow: '0 0 60px var(--accent-glow)' }} 
            />
          </motion.div>
          
          <motion.h1 
             initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
             style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}
          >
            I am a <span className="gradient-text">{text}</span>
            <span style={{ animation: 'blink 1s infinite' }}>|</span>
          </motion.h1>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 40px' }}>
            Transforming complex problems into beautiful, scalable, and high-performance web applications using the MERN Stack.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent)' }}
                style={{ padding: '16px 40px', borderRadius: '50px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <Download size={20} /> Download CV
              </motion.button>
            </a>
          </div>
        </div>
      </section>

      {/* 2. SKILLS (Floating Chips) */}
      <section id="skills" style={{ padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}>Technical Arsenal</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {skillsData.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel"
                style={{ padding: '30px' }}
              >
                <div style={{ color: 'var(--accent)', marginBottom: '20px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{cat.category}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {cat.skills.map(skill => (
                    <span key={skill} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROJECTS (THEME SPECIFIC CARDS) */}
      <section id="projects" style={{ padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '80px', textAlign: 'center' }}>Featured Works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '150px' }}>
            {projects.map((proj, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-100px" }}
                style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', gap: '60px', alignItems: 'center' }}
              >
                {/* 3D TILT IMAGE CARD */}
                <div style={{ flex: 1 }}>
                  <TiltCard className={proj.themeClass}>
                    <div style={{ overflow: 'hidden', borderRadius: '16px', position: 'relative' }}>
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, black, transparent)', opacity: 0.3 }}></div>
                       <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                    </div>
                  </TiltCard>
                </div>
                
                {/* TEXT CONTENT */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{proj.title}</h3>
                  <h4 style={{ color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '20px', fontWeight: '600' }}>{proj.sub}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '30px' }}>{proj.desc}</p>
                  
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
                    {proj.tech.map(t => (
                      <span key={t} className="tech-tag" style={{ border: '1px solid var(--glass-border)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem' }}>{t}</span>
                    ))}
                  </div>
                  
                  <a href={proj.link} target="_blank" style={{ textDecoration: 'none' }}>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      style={{ background: 'var(--text-primary)', color: 'var(--bg-color)', padding: '12px 30px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      Visit Live Site <ExternalLink size={18} />
                    </motion.button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CERTIFICATES (Horizontal Scroll) */}
      <section id="certificates" style={{ padding: '100px 0' }}>
         <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '60px' }}>Certifications</h2>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '40px', paddingBottom: '40px', scrollBehavior: 'smooth' }}>
              {certifications.map((cert, i) => (
                <motion.div 
                   key={i} 
                   whileHover={{ scale: 1.02 }}
                   className="glass-panel"
                   style={{ minWidth: '600px', flexShrink: 0, overflow: 'hidden' }}
                >
                   <div style={{ height: '350px', background: '#000' }}>
                      <img src={cert.img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                   </div>
                   <div style={{ padding: '30px' }}>
                      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.8rem' }}>{cert.name}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{cert.issuer} | {cert.date}</p>
                   </div>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* 5. EDUCATION TIMELINE */}
      <section id="education" style={{ padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', position: 'relative' }}>
          <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '80px' }}>Education Timeline</h2>
          <div className="timeline-line"></div>
          {education.map((edu, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-50px" }}
              style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '60px', position: 'relative' }}
            >
              <div className="timeline-dot" style={{ position: 'absolute', left: '50%', top: '0', transform: 'translate(-50%, 0)', zIndex: 10 }}></div>
              <div className="glass-panel" style={{ width: '45%', padding: '30px' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{edu.year}</span>
                <h3 style={{ fontSize: '1.4rem', margin: '10px 0' }}>{edu.school}</h3>
                <h4 style={{ opacity: 0.8, fontWeight: 'normal' }}>{edu.degree}</h4>
                <p style={{ fontSize: '0.95rem', marginTop: '10px', color: 'var(--text-secondary)' }}>{edu.desc}</p>
                <div style={{ marginTop: '10px', fontWeight: '800' }}>{edu.score}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CONTACT FOOTER */}
      <section id="contact" style={{ padding: '100px 0 150px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '80px 40px' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Let's Build Something.</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '50px' }}>
              I am currently available for full-time roles and freelance projects.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <a href="mailto:jashandeep20445@gmail.com" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.1 }} style={{ padding: '18px 40px', borderRadius: '50px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center', cursor: 'pointer' }}>
                  <Mail /> Email Me
                </motion.button>
              </a>
              <a href="https://linkedin.com/in/jashan23" target="_blank" style={{ textDecoration: 'none' }}>
                 <motion.button whileHover={{ scale: 1.1 }} style={{ padding: '18px 40px', borderRadius: '50px', background: 'transparent', color: 'var(--text-primary)', border: '2px solid var(--text-primary)', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center', cursor: 'pointer' }}>
                  <Linkedin /> LinkedIn
                </motion.button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default App;