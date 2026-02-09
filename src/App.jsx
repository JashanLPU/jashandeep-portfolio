/* --- App.jsx --- */
import { useEffect, useState, useRef } from "react";
import { 
  motion, useScroll, useSpring, useTransform, useVelocity, 
  useMotionValue, useAnimationFrame, AnimatePresence 
} from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Terminal, Layers, Cpu, Zap, X, Menu, Play
} from "lucide-react";

import me from './me.jpg'; 

// --- 1. THE HANGING ROPE LIGHT SWITCH ---
const LightSwitch = ({ theme, toggleTheme }) => {
  const [isDragging, setIsDragging] = useState(false);
  const y = useMotionValue(0);
  // Spring physics for the rope bounce
  const springY = useSpring(y, { stiffness: 400, damping: 15 });
  
  // Calculate rope length based on pull
  const height = useTransform(springY, [0, 200], [80, 280]); 

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    if (info.offset.y > 100) {
      toggleTheme();
      // Play a click sound effect here if you have one
    }
    y.set(0); // Snap back
  };

  return (
    <div style={{ position: 'fixed', top: 0, right: '8%', zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* The Rope Line */}
      <motion.div 
        style={{ 
          width: '2px', 
          height: height, 
          background: 'var(--rope-color)',
          transformOrigin: 'top center'
        }} 
      />
      
      {/* The Handle / Bulb */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 200 }}
        dragElastic={0.1} // Makes it feel heavy
        whileHover={{ scale: 1.1, cursor: 'grab' }}
        whileTap={{ scale: 0.9, cursor: 'grabbing' }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ 
          y: springY, 
          width: '20px', 
          height: '40px', 
          borderRadius: '10px',
          background: theme === 'dark' ? '#333' : '#fff',
          border: '2px solid var(--accent)',
          boxShadow: `0 0 ${isDragging ? 40 : 10}px var(--accent)`,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
          position: 'relative', top: '-2px'
        }}
      >
          {/* Bulb filament */}
          <div style={{ width: '4px', height: '8px', background: 'var(--accent)', marginBottom: '5px', borderRadius: '2px' }}></div>
      </motion.div>
    </div>
  );
};

// --- 2. 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={className}
      >
        <div style={{ transform: "translateZ(50px)" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- DATA ---
const skillsData = [
  { icon: <Terminal size={30} />, category: "Core Languages", skills: ["C", "C++", "Java", "Python", "JavaScript"] },
  { icon: <Layers size={30} />, category: "Frontend", skills: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"] },
  { icon: <Cpu size={30} />, category: "Backend", skills: ["Node.js", "Express", "MongoDB", "REST APIs"] },
  { icon: <Zap size={30} />, category: "Tools", skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel"] }
];

const projects = [
  {
    title: "Vyom Clothing",
    sub: "E-Commerce",
    desc: "Premium fashion store with minimalist UI and Stripe integration.",
    tech: ["React.js", "Commerce.js"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Story Verse",
    sub: "Library System",
    desc: "Magical library management to track progress and write summaries.",
    tech: ["MERN Stack", "MongoDB"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "ID Generator",
    sub: "Identity Suite",
    desc: "Generate professional business cards with QR codes instantly.",
    tech: ["React", "Canvas API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop"
  }
];

// --- APP COMPONENT ---
function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [menuOpen, setMenuOpen] = useState(false);

  // Initial System Boot Sequence
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
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

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#00ff9d', fontFamily: 'monospace' }}>
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ width: '50px', height: '50px', border: '4px solid #00ff9d', borderTop: '4px solid transparent', borderRadius: '50%', marginBottom: '20px' }}
      />
      <h2>INITIALIZING SYSTEM...</h2>
      <p>LOADING ASSETS_</p>
    </div>
  );

  return (
    <div className="app">
      {/* GLOBAL UI ELEMENTS */}
      <div className="grid-bg"></div>
      <div className="vignette"></div>
      <div className="scanlines"></div>
      <LightSwitch theme={theme} toggleTheme={toggleTheme} />

      {/* CUSTOM CURSOR */}
      <CustomCursor />

      {/* SCROLL PROGRESS */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)', scaleX, transformOrigin: "0%", zIndex: 2000 }} />

      {/* HUD NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }}
        style={{ 
          position: 'fixed', width: '100%', height: '80px', zIndex: 100, 
          backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--glass-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%'
        }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:'10px'}}>
           <Terminal size={24} color="var(--accent)"/>
           <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin:0 }}>Jashan<span style={{color:'var(--accent)'}}>.dev</span></h2>
        </div>
        
        <div className="desktop-nav" style={{ display: 'flex', gap: '30px' }}>
          {['About', 'Skills', 'Projects', 'Contact'].map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '0.9rem', cursor: 'pointer', fontFamily:'Space Grotesk', textTransform:'uppercase' }}>
              [{item}]
            </button>
          ))}
        </div>
      </motion.nav>

      {/* 1. HERO SECTION */}
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '80px', position: 'relative' }}>
        <div className="container">
          <TiltCard className="glass-panel" style={{ display: 'inline-block', borderRadius: '50%', padding: '10px', background: 'transparent', border: 'none' }}>
             <motion.div 
               initial={{ scale: 0 }} animate={{ scale: 1 }}
               style={{ width: '250px', height: '250px', borderRadius: '50%', border: '4px solid var(--accent)', padding: '5px', position: 'relative' }}
             >
                <div style={{ position: 'absolute', inset: 0, border: '1px dashed var(--accent)', borderRadius: '50%', animation: 'spin 10s linear infinite' }}></div>
                <img src={me} alt="Jashandeep" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} />
             </motion.div>
          </TiltCard>
          
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 7rem)', margin: '30px 0', lineHeight: 0.9 }}>
            FULL STACK <br/> <span className="gradient-text">OPERATOR</span>
          </h1>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px', fontFamily: 'monospace' }}>
             // SYSTEM STATUS: ONLINE <br/>
             // MISSION: TRANSFORMING IDEAS INTO SCALABLE APPLICATIONS
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
             <a href="/resume.pdf" download className="hud-btn" style={{ padding: '15px 40px', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Download size={18} /> Initialize CV
             </a>
          </div>
        </div>
      </section>

      {/* 2. SKILLS GRID */}
      <section id="skills" style={{ padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}>:: ARMORY ::</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {skillsData.map((cat, i) => (
              <TiltCard key={i} className="glass-panel" style={{ padding: '0' }}>
                 <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ color: 'var(--accent)', marginBottom: '20px' }}>{cat.icon}</div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>{cat.category}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {cat.skills.map(skill => (
                        <span key={skill} style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                 </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROJECTS DECK */}
      <section id="projects" style={{ padding: '100px 0' }}>
          <div className="container">
            <h2 style={{ fontSize: '3rem', marginBottom: '100px', textAlign: 'center' }}>:: MISSIONS ::</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
              {projects.map((proj, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', gap: '50px', alignItems: 'center' }}>
                    <div style={{ flex: 1.5 }}>
                        <TiltCard className="glass-panel" style={{ padding: 0 }}>
                            <div style={{ height: '350px', overflow: 'hidden', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', zIndex: 1 }}></div>
                                <img src={proj.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </TiltCard>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{proj.title}</h3>
                        <div style={{ color: 'var(--accent)', fontFamily: 'monospace', marginBottom: '20px' }}>// {proj.sub}</div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: 1.6 }}>{proj.desc}</p>
                        <a href={proj.link} target="_blank" className="hud-btn" style={{ padding: '12px 30px', display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration:'none' }}>
                            EXECUTE <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* 4. CONTACT */}
      <section id="contact" style={{ padding: '150px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <TiltCard className="glass-panel">
             <div style={{ padding: '60px' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>LINK ESTABLISHED?</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
                  Available for freelance contracts and full-time operations.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                  <a href="mailto:jashandeep20445@gmail.com" className="hud-btn" style={{ padding: '15px 40px', textDecoration:'none', display:'flex', gap:'10px' }}>
                    <Mail size={20} /> SEND PACKET
                  </a>
                  <a href="https://linkedin.com/in/jashan23" target="_blank" className="hud-btn" style={{ padding: '15px 40px', textDecoration:'none', display:'flex', gap:'10px' }}>
                    <Linkedin size={20} /> NETWORK
                  </a>
                </div>
             </div>
          </TiltCard>
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: '20px', color: '#555', fontFamily: 'monospace', fontSize: '0.8rem' }}>
         SYSTEM VERSION 2.0 // DESIGNED BY JASHANDEEP
      </div>
    </div>
  );
}

// Custom Cursor Logic
const CustomCursor = () => {
  const cursorRef = useRef(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const moveCursor = (e) => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);
  return <div ref={cursorRef} className="custom-cursor" />;
};

export default App;