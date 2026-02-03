import { useEffect, useState, useRef } from "react";
import { 
  motion, useScroll, useSpring, useMotionValue, useTransform, useVelocity 
} from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Sun, Moon, Menu, X, Code2, Cpu, Globe, 
  Zap, Layers, Terminal, ArrowRight, Sparkles 
} from "lucide-react";

import me from './me.jpg'; 

// --- DATA ---
const projects = [
  {
    title: "Vyom Clothing System",
    sub: "Digital Fashion Store",
    desc: "A premium black & white themed e-commerce experience. Features a minimalist UI, dynamic product cart, secure Stripe checkout, and a seamless shopping journey.",
    tech: ["React.js", "Commerce.js", "Stripe", "Minimal UI"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    // Fashion Image (Corrected)
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop", 
    themeClass: "vyom-theme"
  },
  {
    title: "Story Verse",
    sub: "The Reader's Companion",
    desc: "A magical library management system. Track your reading progress, write chapter summaries, and rate your collection in an interface inspired by ancient archives.",
    tech: ["MERN Stack", "MongoDB", "JWT Auth", "Book API"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    // Old Library Image (Corrected & Reliable)
    img: "https://images.unsplash.com/photo-1507842217343-583bb7260b66?q=80&w=1000&auto=format&fit=crop",
    themeClass: "hp-theme"
  },
  {
    title: "Business Card Generator",
    sub: "Professional Identity Suite",
    desc: "Create vibrant, professional digital identities in seconds. Features real-time customization, QR code integration, and instant PDF export.",
    tech: ["React + Vite", "Tailwind", "QR Code", "Canvas API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    // Designer Workspace Image (Corrected - No Perfume!)
    img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1000&auto=format&fit=crop",
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

// --- 1. SPOTLIGHT CARD (HOVER GLOW) ---
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => { setOpacity(1); };
  const handleBlur = () => { setOpacity(0); };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className={`spotlight-card ${className}`}
      style={{ "--mouse-x": `${position.x}px`, "--mouse-y": `${position.y}px` }}
    >
      {children}
    </div>
  );
};

// --- 2. MAGNETIC BUTTON ---
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

// --- 3. 3D TILT CARD ---
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
      className={`spotlight-card ${className || ''}`}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};

// --- 4. VELOCITY SCROLL ---
const VelocityScroll = ({ children }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-2, 2]); 
  return <motion.div style={{ skewY: skew }}>{children}</motion.div>;
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Parallax Text
  const y2 = useTransform(scrollY, [0, 500], [0, -100]); // Parallax Image

  // Custom Cursor Logic
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    const interactiveElements = document.querySelectorAll("a, button, .spotlight-card");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
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

  // Text Reveal Animation
  const text = "Full Stack Developer";
  const letters = Array.from(text);

  return (
    <>
      <motion.div
        className={`custom-cursor ${isHovering ? "hovered" : ""}`}
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      <div className="noise-overlay"></div>

      <div className="app">
        
        {/* NAVBAR */}
        <motion.nav 
          initial={{ y: -100 }} animate={{ y: 0 }} transition={{ delay: 0.5 }}
          style={{ 
            position: 'fixed', width: '100%', height: '80px', zIndex: 100, 
            backdropFilter: 'blur(10px)', background: 'rgba(0,0,0,0.01)', borderBottom: '1px solid var(--glass-border)',
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

        {/* 1. HERO SECTION (Parallax) */}
        <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '80px', position: 'relative', overflow:'hidden' }}>
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            
            <motion.div 
               style={{ y: y2, width: '250px', height: '250px', margin: '0 auto 40px', position: 'relative' }}
               initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 1.5 }}
            >
               <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: 'radial-gradient(circle, var(--accent), transparent 70%)', opacity: 0.2, filter: 'blur(30px)' }}></div>
               <img src={me} alt="Jashandeep" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--bg-color)', position: 'relative' }} />
            </motion.div>
            
            <motion.div style={{ y: y1 }}>
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap' }}>
                {letters.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="gradient-text"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 50px' }}
              >
                Transforming ideas into scalable, high-performance web applications using the MERN Stack.
              </motion.p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
                  <MagneticButton 
                    style={{ padding: '18px 45px', borderRadius: '50px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)' }}
                  >
                    <Download size={20} /> Download CV
                  </MagneticButton>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. SKILLS (Spotlight Grid) */}
        <section id="skills" style={{ padding: '100px 0' }}>
          <div className="container">
            <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}>Technical Arsenal</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px' }}>
              {skillsData.map((cat, i) => (
                <SpotlightCard key={i} className="glass-panel" style={{ padding: '40px' }}>
                  <div style={{ color: 'var(--accent)', marginBottom: '20px' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{cat.category}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {cat.skills.map(skill => (
                      <span key={skill} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* 3. PROJECTS (Velocity Skew + 3D Tilt) */}
        <VelocityScroll>
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
                    <div style={{ flex: 1, width: '100%' }}>
                      <TiltCard className={proj.themeClass}>
                        <div style={{ overflow: 'hidden', borderRadius: '16px', height: '400px' }}>
                           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', opacity: 0.4 }}></div>
                           <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </TiltCard>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '2.8rem', marginBottom: '15px', lineHeight: 1.1 }}>{proj.title}</h3>
                      <h4 style={{ color: 'var(--accent)', fontSize: '1.3rem', marginBottom: '25px', fontWeight: '600' }}>{proj.sub}</h4>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '35px', lineHeight: 1.7, fontSize: '1.15rem' }}>{proj.desc}</p>
                      
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '45px' }}>
                        {proj.tech.map(t => (
                          <span key={t} style={{ border: '1px solid var(--glass-border)', padding: '8px 18px', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>{t}</span>
                        ))}
                      </div>
                      
                      <a href={proj.link} target="_blank" style={{ textDecoration: 'none' }}>
                        <MagneticButton 
                          style={{ background: 'var(--text-primary)', color: 'var(--bg-color)', padding: '16px 35px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                        >
                          Visit Live Site <ExternalLink size={20} />
                        </MagneticButton>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </VelocityScroll>

        {/* 4. CERTIFICATES (Endless Marquee) */}
        <section id="education" style={{ padding: '100px 0' }}>
           <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}>Certifications</h2>
           <div className="marquee-container">
              <div className="marquee-track">
                 {[...certifications, ...certifications, ...certifications, ...certifications].map((cert, i) => (
                   <div key={i} className="spotlight-card" style={{ minWidth: '500px', flexShrink: 0 }}>
                      <div style={{ height: '300px', background: '#000', overflow: 'hidden' }}>
                         <img src={cert.img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ padding: '30px' }}>
                         <h3 style={{ margin: '0 0 5px 0', fontSize: '1.5rem' }}>{cert.name}</h3>
                         <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{cert.issuer}</p>
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
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ margin: "-50px" }}
                style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '80px', position: 'relative' }}
              >
                <div className="timeline-dot" style={{ position: 'absolute', left: '50%', top: '0', transform: 'translate(-50%, 0)', zIndex: 10, width:'20px', height:'20px', background:'var(--accent)', borderRadius:'50%', border:'4px solid var(--bg-color)' }}></div>
                <SpotlightCard style={{ width: '45%', padding: '35px' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.9rem' }}>{edu.year}</span>
                  <h3 style={{ fontSize: '1.5rem', margin: '10px 0' }}>{edu.school}</h3>
                  <h4 style={{ opacity: 0.8, fontSize: '1.1rem', fontWeight: 'normal' }}>{edu.degree}</h4>
                  <div style={{ marginTop: '15px', fontWeight: '800', fontSize: '1.1rem' }}>{edu.score}</div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. CONTACT */}
        <section id="contact" style={{ padding: '100px 0 150px 0' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
            <SpotlightCard style={{ padding: '80px 40px' }}>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Let's Build Something.</h2>
              <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '50px' }}>
                I am currently available for full-time roles and freelance projects.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <a href="mailto:jashandeep20445@gmail.com" style={{ textDecoration: 'none' }}>
                  <MagneticButton style={{ padding: '20px 45px', borderRadius: '50px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center', cursor: 'pointer' }}>
                    <Mail size={22} /> Email Me
                  </MagneticButton>
                </a>
                <a href="https://linkedin.com/in/jashan23" target="_blank" style={{ textDecoration: 'none' }}>
                   <MagneticButton style={{ padding: '20px 45px', borderRadius: '50px', background: 'transparent', color: 'var(--text-primary)', border: '2px solid var(--text-primary)', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center', cursor: 'pointer' }}>
                    <Linkedin size={22} /> LinkedIn
                  </MagneticButton>
                </a>
              </div>
            </SpotlightCard>
          </div>
        </section>
        
      </div>
    </>
  );
}

export default App;