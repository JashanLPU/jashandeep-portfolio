import { useEffect, useState, useRef } from "react";
import { 
  motion, useScroll, useSpring, useMotionValue, useTransform 
} from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Sun, Moon, Menu, X, Code2, Cpu, Globe, 
  Zap, Layers, Terminal 
} from "lucide-react";

import me from './me.jpg'; 

// --- DATA ---
const projects = [
  {
    title: "Vyom Clothing System",
    sub: "Digital Fashion Store",
    desc: "A premium black & white themed e-commerce experience. Features a minimalist UI, dynamic product cart, secure Stripe checkout, and a seamless shopping journey designed for modern brands.",
    tech: ["React.js", "Commerce.js", "Stripe", "Minimal UI"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    // Fashion Image (Black & White aesthetic)
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop", 
    themeClass: "vyom-theme"
  },
  {
    title: "Story Verse",
    sub: "The Reader's Companion",
    desc: "A magical library management system. Track your reading progress, write chapter summaries, and rate your collection in an interface inspired by ancient archives.",
    tech: ["MERN Stack", "MongoDB", "JWT Auth", "Book API"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    // NEW: Reliable "Dark Academia" Library Image
    img: "https://images.unsplash.com/photo-1507842217343-583bb7260b66?q=80&w=1000&auto=format&fit=crop",
    themeClass: "hp-theme"
  },
  {
    title: "Business Card Generator",
    sub: "Professional Identity Suite",
    desc: "Create vibrant, professional digital identities in seconds. Features real-time customization, QR code integration, and instant PDF export for the modern professional.",
    tech: ["React + Vite", "Tailwind", "QR Code", "Canvas API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    // NEW: Clean Professional Business Cards Image
    img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop",
    themeClass: "" 
  }
];

const skillsData = [
  { icon: <Terminal size={24} />, category: "Core Languages", skills: ["C", "C++", "Java", "Python", "JavaScript"] },
  { icon: <Layers size={24} />, category: "Frontend", skills: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"] },
  { icon: <Cpu size={24} />, category: "Backend", skills: ["Node.js", "Express", "MongoDB", "REST APIs"] },
  { icon: <Zap size={24} />, category: "Tools", skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel"] }
];

const certifications = [
  { name: "Interpersonal Communication", issuer: "Rice University", date: "Jan 2026", img: "/cert1.jpg" },
  { name: "Generative AI Master", issuer: "Infosys Springboard", date: "Aug 2025", img: "/cert2.jpg" },
  { name: "Computational Theory", issuer: "Infosys Springboard", date: "Aug 2025", img: "/cert3.jpg" }
];

const education = [
  { school: "Lovely Professional University", degree: "B.Tech CSE (Full Stack)", year: "2023 - Present", score: "CGPA: 6.8" },
  { school: "Dr. Asanand Arya Model School", degree: "Senior Secondary (12th)", year: "2022", score: "88.6%" },
  { school: "St. Joseph's Convent School", degree: "Matriculation (10th)", year: "2021", score: "83.8%" }
];

// --- MAGNETIC BUTTON COMPONENT ---
const MagneticButton = ({ children, onClick, className, style }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </motion.button>
  );
};

// --- 3D TILT COMPONENT ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

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
  const [text, setText] = useState("");
  const fullText = "Full Stack Developer.";

  // Mouse Spotlight Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      
      {/* Cinematic Noise & Spotlight */}
      <div className="noise-overlay"></div>
      <div className="spotlight-overlay"></div>

      {/* Progress Bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)', scaleX, transformOrigin: "0%", zIndex: 2000 }} />

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }}
        style={{ 
          position: 'fixed', width: '100%', height: '80px', zIndex: 100, 
          backdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.01)', borderBottom: '1px solid var(--glass-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%'
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Jashandeep<span className="gradient-text">.</span></h2>
        
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {['About', 'Skills', 'Projects', 'Education', 'Contact'].map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '0.95rem', cursor: 'pointer', fontWeight: 600 }}>
              {item}
            </button>
          ))}
          <MagneticButton onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
             {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </MagneticButton>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-nav" style={{ display:'none', background: 'none', border: 'none', color: 'var(--text-primary)' }}>
           {menuOpen ? <X/> : <Menu/>}
        </button>

        {menuOpen && (
          <div style={{ position: 'absolute', top: '80px', left: 0, width: '100%', background: 'var(--bg-color)', padding: '20px', borderBottom: '1px solid var(--glass-border)' }}>
             {['About', 'Skills', 'Projects', 'Education', 'Contact'].map(item => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ display: 'block', width: '100%', padding: '15px 0', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.2rem', textAlign: 'left' }}>{item}</button>
             ))}
          </div>
        )}
      </motion.nav>

      {/* 1. HERO SECTION */}
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '80px', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          
          <motion.div 
             initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 1.5 }}
             style={{ width: '250px', height: '250px', margin: '0 auto 40px', position: 'relative' }}
          >
             {/* Glowing Pulse */}
             <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: 'var(--accent)', opacity: 0.2, filter: 'blur(30px)', animation: 'pulse 3s infinite' }}></div>
             <img 
               src={me} 
               alt="Jashandeep" 
               style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--bg-color)', position: 'relative' }} 
             />
          </motion.div>
          
          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}>
            I am a <span className="gradient-text">{text}</span>
          </h1>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 50px' }}>
            Transforming ideas into scalable, high-performance web applications using the MERN Stack.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
              <MagneticButton 
                style={{ padding: '18px 40px', borderRadius: '50px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <Download size={18} /> Download CV
              </MagneticButton>
            </a>
          </div>
        </div>
      </section>

      {/* 2. SKILLS */}
      <section id="skills" style={{ padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}>Technical Arsenal</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
            {skillsData.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-panel"
                style={{ padding: '35px' }}
              >
                <div style={{ color: 'var(--accent)', marginBottom: '15px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>{cat.category}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.skills.map(skill => (
                    <span key={skill} style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '8px', fontSize: '0.85rem' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROJECTS */}
      <section id="projects" style={{ padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '100px', textAlign: 'center' }}>Featured Works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '150px' }}>
            {projects.map((proj, i) => (
              <motion.div 
                key={i}
                className="project-layout"
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-50px" }}
                style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', gap: '60px', alignItems: 'center' }}
              >
                {/* 3D TILT CARD */}
                <div style={{ flex: 1, width: '100%' }}>
                  <TiltCard className={proj.themeClass}>
                    <div style={{ overflow: 'hidden', borderRadius: '16px', height: '350px' }}>
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', opacity: 0.4 }}></div>
                       <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </TiltCard>
                </div>
                
                {/* INFO */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{proj.title}</h3>
                  <h4 style={{ color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '20px', fontWeight: '600' }}>{proj.sub}</h4>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: 1.7, fontSize: '1.1rem' }}>{proj.desc}</p>
                  
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
                    {proj.tech.map(t => (
                      <span key={t} style={{ border: '1px solid var(--glass-border)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                  
                  <a href={proj.link} target="_blank" style={{ textDecoration: 'none' }}>
                    <MagneticButton 
                      style={{ background: 'var(--text-primary)', color: 'var(--bg-color)', padding: '14px 30px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      Visit Live Site <ExternalLink size={18} />
                    </MagneticButton>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CERTIFICATES (ENDLESS SCROLL) */}
      <section id="education" style={{ padding: '100px 0' }}>
         <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}>Certifications</h2>
         <div className="marquee-container">
            <div className="marquee-track">
               {[...certifications, ...certifications, ...certifications, ...certifications].map((cert, i) => (
                 <div 
                   key={i} 
                   className="glass-panel cert-card"
                   style={{ minWidth: '450px', overflow: 'hidden', flexShrink: 0 }}
                 >
                    <div style={{ height: '280px', background: '#000', overflow: 'hidden' }} className="cert-img">
                       <img src={cert.img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ padding: '25px' }}>
                       <h3 style={{ margin: '0 0 5px 0', fontSize: '1.4rem' }}>{cert.name}</h3>
                       <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{cert.issuer}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. EDUCATION TIMELINE */}
      <section style={{ padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '900px', position: 'relative' }}>
          <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '80px' }}>Academic Journey</h2>
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
                <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.9rem' }}>{edu.year}</span>
                <h3 style={{ fontSize: '1.4rem', margin: '8px 0' }}>{edu.school}</h3>
                <h4 style={{ opacity: 0.8, fontSize: '1rem', fontWeight: 'normal' }}>{edu.degree}</h4>
                <div style={{ marginTop: '15px', fontWeight: '800', fontSize: '1rem' }}>{edu.score}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" style={{ padding: '100px 0 150px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <div className="glass-panel" style={{ padding: '80px 40px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Let's Build Something.</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '50px' }}>
              I am currently available for full-time roles and freelance projects.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <a href="mailto:jashandeep20445@gmail.com" style={{ textDecoration: 'none' }}>
                <MagneticButton style={{ padding: '18px 40px', borderRadius: '50px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center', cursor: 'pointer' }}>
                  <Mail size={20} /> Email Me
                </MagneticButton>
              </a>
              <a href="https://linkedin.com/in/jashan23" target="_blank" style={{ textDecoration: 'none' }}>
                 <MagneticButton style={{ padding: '18px 40px', borderRadius: '50px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--text-primary)', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center', cursor: 'pointer' }}>
                  <Linkedin size={20} /> LinkedIn
                </MagneticButton>
              </a>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default App;