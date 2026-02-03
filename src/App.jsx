import { useEffect, useState, useRef } from "react";
import { 
  motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate 
} from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Sun, Moon, Menu, X, Code2, Cpu, Globe, 
  Award, Zap, CheckCircle 
} from "lucide-react";

import me from './me.jpg'; 

// --- DATA ---
const skillsData = [
  { icon: <Code2 />, category: "Languages", skills: ["C", "C++", "Java", "Python", "PHP"] },
  { icon: <Globe />, category: "Frontend", skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Vite"] },
  { icon: <Cpu />, category: "Backend", skills: ["Node.js", "Express.js", "MongoDB", "SQL", "REST APIs"] },
  { icon: <Database />, category: "Tools", skills: ["Git & GitHub", "VS Code", "Canva", "Postman"] }
];

const projects = [
  {
    title: "Vyom Clothing System",
    sub: "Full-Stack E-Commerce",
    desc: "A complete shopping platform. Features include a dynamic product catalog, shopping cart logic, secure checkout integration, and an admin dashboard.",
    tech: ["React", "Vite", "Commerce.js", "Stripe"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    img: "https://placehold.co/800x500/111/FFF?text=Vyom+UI" 
  },
  {
    title: "Reading Tracker System",
    sub: "Productivity Tool",
    desc: "An application designed to help users track their reading habits. Users can log books, write chapter summaries, rate titles, and view reading stats.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    img: "https://placehold.co/800x500/222/FFF?text=Reading+Dashboard" 
  },
  {
    title: "Business Card Generator",
    sub: "Dynamic Web Tool",
    desc: "A creative tool allowing professionals to design digital business cards. Features real-time preview, QR code generation, and PDF download.",
    tech: ["React", "Tailwind CSS", "QR Code API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    img: "https://placehold.co/800x500/333/FFF?text=Card+Creator" 
  }
];

const certifications = [
  { name: "Interpersonal Communication", issuer: "Rice University", date: "Jan 2026", img: "/cert1.jpg" },
  { name: "Generative AI Master", issuer: "Infosys", date: "Aug 2025", img: "/cert2.jpg" },
  { name: "Computational Theory", issuer: "Infosys", date: "Aug 2025", img: "/cert3.jpg" }
];

const education = [
  { school: "Lovely Professional University", degree: "B.Tech CSE", year: "2023 - Present", score: "CGPA: 6.8 (Running)", desc: "Specializing in Full Stack Web Development." },
  { school: "Dr. Asanand Arya Model School", degree: "Intermediate (12th)", year: "2022", score: "88.6%", desc: "Focus on Physics, Chemistry, and Mathematics." },
  { school: "St. Joseph's Convent School", degree: "Matriculation (10th)", year: "2021", score: "83.8%", desc: "Foundation in Computer Applications." }
];

// --- COMPONENTS ---

// 1. Tilt Card Component for Projects
const TiltCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{
        rotateY: useTransform(mouseX, [-200, 200], [-10, 10]),
        rotateX: useTransform(mouseY, [-200, 200], [10, -10]),
        transformStyle: "preserve-3d",
      }}
      className="glass-panel"
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

// 2. Typewriter Hook
const useTypewriter = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayText;
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const heroText = useTypewriter("Building Digital Experiences.", 100);

  // Toggle Theme Logic
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
        <div className="blob blob-3"></div>
      </div>

      {/* Scroll Progress */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)', scaleX, transformOrigin: "0%", zIndex: 2000 }} />

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }}
        style={{ 
          position: 'fixed', width: '100%', height: '80px', zIndex: 100, 
          backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--glass-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px',
          background: 'rgba(255,255,255,0.01)'
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Jashandeep<span className="gradient-text">.</span></h2>
        
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {['About', 'Projects', 'Skills', 'Certificates', 'Contact'].map(item => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())} 
              className="nav-btn"
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1rem', cursor: 'pointer', fontWeight: 500 }}
            >
              {item}
            </button>
          ))}
          {/* THEME TOGGLE */}
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
             {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-nav" style={{ background: 'none', border: 'none', color: 'var(--text-primary)' }}>
           {menuOpen ? <X/> : <Menu/>}
        </button>
      </motion.nav>

      {/* 1. HERO SECTION */}
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '80px' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div 
             initial={{ scale: 0, rotate: -20 }} 
             animate={{ scale: 1, rotate: 0 }} 
             transition={{ type: 'spring', stiffness: 100, duration: 0.8 }}
             style={{ marginBottom: '40px', display: 'inline-block' }}
          >
            <div style={{ position: 'relative' }}>
               <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', background: 'linear-gradient(45deg, var(--accent), #ec4899)', opacity: 0.7, filter: 'blur(20px)', zIndex: -1 }}></div>
               <img src={me} alt="Jashandeep" style={{ width: '250px', height: '250px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--accent)' }} />
            </div>
          </motion.div>
          
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, margin: '0 0 20px 0', lineHeight: 1.1 }}>
            {heroText}<span style={{ color: 'var(--accent)' }}>|</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 50px' }}
          >
            Full-Stack Developer | MERN Stack Specialist | Creative Thinker
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
          >
            <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent-glow)' }}
                whileTap={{ scale: 0.95 }}
                style={{ padding: '18px 40px', fontSize: '1.1rem', fontWeight: 'bold', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <Download size={20} /> Download CV
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. EDUCATION (Vertical Timeline) */}
      <section style={{ padding: '100px 0', position: 'relative' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '80px' }}>Education Journey</h2>
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div className="timeline-line"></div>
            {education.map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '60px', position: 'relative' }}
              >
                <div style={{ position: 'absolute', left: '50%', top: '0', width: '20px', height: '20px', background: 'var(--accent)', borderRadius: '50%', transform: 'translate(-50%, 0)', border: '4px solid var(--bg-color)', zIndex: 10 }}></div>
                <div className="glass-panel" style={{ width: '45%', padding: '30px' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{edu.year}</span>
                  <h3 style={{ margin: '10px 0', fontSize: '1.4rem' }}>{edu.school}</h3>
                  <h4 style={{ margin: '0 0 10px 0', opacity: 0.7 }}>{edu.degree}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{edu.desc}</p>
                  <div style={{ marginTop: '15px', fontWeight: 'bold' }}>{edu.score}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SKILLS */}
      <section id="skills" style={{ padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '60px' }}>Skills & Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {skillsData.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="glass-panel"
                style={{ padding: '30px', borderTop: '4px solid var(--accent)' }}
              >
                <div style={{ color: 'var(--accent)', marginBottom: '20px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{cat.category}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {cat.skills.map(skill => (
                    <span key={skill} style={{ padding: '8px 15px', background: 'var(--glass-border)', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROJECTS (3D Tilt & Zig-Zag) */}
      <section id="projects" style={{ padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '80px' }}>Featured Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
            {projects.map((proj, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', gap: '60px', alignItems: 'center' }}>
                {/* Image Side with Tilt */}
                <div style={{ flex: 1 }}>
                  <TiltCard>
                    <div style={{ overflow: 'hidden', borderRadius: '16px' }}>
                      <img src={proj.img} alt={proj.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                  </TiltCard>
                </div>
                {/* Text Side */}
                <div style={{ flex: 1 }}>
                  <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{proj.title}</h3>
                    <h4 style={{ color: 'var(--accent)', marginBottom: '20px', fontSize: '1.2rem' }}>{proj.sub}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '30px' }}>{proj.desc}</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
                      {proj.tech.map(t => <span key={t} style={{ border: '1px solid var(--glass-border)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem' }}>{t}</span>)}
                    </div>
                    <a href={proj.link} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none' }}>
                      View Project <ExternalLink size={20} />
                    </a>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CERTIFICATES (Horizontal Scroll) */}
      <section id="certificates" style={{ padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '60px' }}>Certifications</h2>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '40px', paddingBottom: '40px' }}>
            {certifications.map((cert, i) => (
              <motion.div 
                key={i}
                className="glass-panel"
                style={{ minWidth: '600px', flexShrink: 0, padding: '0', overflow: 'hidden' }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={cert.img} style={{ width: '100%', height: '350px', objectFit: 'contain', background: '#000' }} />
                <div style={{ padding: '30px' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '1.8rem' }}>{cert.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>{cert.issuer} • {cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" style={{ padding: '100px 0 150px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-panel" style={{ padding: '80px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Let's Work Together</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '50px' }}>
              I am open to freelance projects and job opportunities.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <a href="mailto:jashandeep20445@gmail.com" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.1 }} style={{ padding: '18px 40px', borderRadius: '50px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center', cursor: 'pointer' }}>
                  <Mail /> Email Me
                </motion.button>
              </a>
              <a href="https://linkedin.com/in/jashan23" target="_blank" style={{ textDecoration: 'none' }}>
                 <motion.button whileHover={{ scale: 1.1 }} style={{ padding: '18px 40px', borderRadius: '50px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--text-primary)', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center', cursor: 'pointer' }}>
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