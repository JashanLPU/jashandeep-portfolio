import { useEffect, useState } from "react";
import { 
  motion, useSpring, useTransform, useMotionValue, AnimatePresence 
} from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, 
  Code, Terminal, Database, Cpu, Home, User, Briefcase
} from "lucide-react";
import './App.css';

// Import your assets
import me from './me.jpg'; 
import cert1 from './cert1.jpg';
import cert2 from './cert2.jpg';
import cert3 from './cert3.jpg';

// --- ROPE SWITCH COMPONENT ---
const RopeSwitch = ({ toggleTheme }) => {
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 400, damping: 15 }); // Physics settings
  const [isPulled, setIsPulled] = useState(false);

  // Drag constraints
  const handleDragEnd = (_, info) => {
    if (info.offset.y > 100) { // If pulled down more than 100px
      toggleTheme();
      setIsPulled(true);
      setTimeout(() => setIsPulled(false), 200); // Reset "click" state
    }
    y.set(0); // Snap back to top
  };

  return (
    <div className="rope-container">
      {/* The Rope Line (Stretches) */}
      <motion.div 
        style={{ height: useTransform(springY, (val) => 150 + val), width: '2px', background: 'var(--text-secondary)' }} 
      />
      
      {/* The Handle (Draggable) */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 150 }}
        dragElastic={0.1} // Adds resistance
        onDragEnd={handleDragEnd}
        style={{ y: springY, touchAction: "none" }}
        className="rope-handle"
      >
        <div style={{ 
          width: '100%', height: '100%', background: 'var(--text-secondary)', 
          borderRadius: '4px 4px 12px 12px' 
        }} />
      </motion.div>
    </div>
  );
};

// --- DYNAMIC ISLAND NAVBAR COMPONENT ---
const DynamicNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="navbar-container">
      <motion.nav
        className="dynamic-island"
        initial={{ width: 120, height: 50 }}
        animate={{ 
          width: isHovered ? 450 : 120, // Morph width
          height: isHovered ? 60 : 50   // Morph height
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }} // Apple-like physics
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            // Collapsed State (Logo)
            <motion.div 
              key="logo"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              style={{ fontWeight: 'bold', fontFamily: 'Cinzel', color: 'var(--nav-text)' }}
            >
              JS.
            </motion.div>
          ) : (
            // Expanded State (Menu)
            <motion.div 
              key="menu"
              className="nav-links"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, pointerEvents: 'auto' }}
              transition={{ delay: 0.1 }}
            >
              <a href="#about" className="nav-item">Profile</a>
              <a href="#skills" className="nav-item">Arsenal</a>
              <a href="#projects" className="nav-item">Bounties</a>
              <a href="#contact" className="nav-item">Telegram</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [theme, setTheme] = useState("noir"); // 'noir' or 'frontier'

  const toggleTheme = () => {
    const newTheme = theme === "noir" ? "frontier" : "noir";
    setTheme(newTheme);
    // document.body.setAttribute('data-theme', newTheme); // Standard way
  };

  // Sync theme with body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Data
  const skills = [
    { cat: "Languages", icon: <Terminal/>, items: "Java, C++, Python, JS" },
    { cat: "Frontend", icon: <Code/>, items: "React, Tailwind, Framer" },
    { cat: "Backend", icon: <Cpu/>, items: "Node, Express, MongoDB" },
  ];

  const projects = [
    { title: "Vyom Clothing", desc: "Full Stack E-Commerce", tech: "React, Stripe", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" },
    { title: "Story Verse", desc: "Library Management", tech: "MERN Stack", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800" },
    { title: "Biz-ID Gen", desc: "Identity Tool", tech: "Canvas API", img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800" },
  ];

  const certs = [cert1, cert2, cert3];

  return (
    <div className="app">
      {/* 1. ROPE & NAV */}
      <RopeSwitch toggleTheme={toggleTheme} />
      <DynamicNavbar />

      {/* 2. HERO */}
      <section id="about" className="hero">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1.5 }}
        >
          <img src={me} alt="Profile" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        >
          Jashandeep Singh
        </motion.h1>
        
        <p className="serif-italic" style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>
          {theme === 'noir' ? "Architect of Digital Experiences" : "The Full Stack Drifter"}
        </p>

        <p style={{ maxWidth: '600px', margin: '20px 0', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          Specializing in scalable web architecture. Based at Lovely Professional University.
        </p>

        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="/resume.pdf" className="btn-main"><Download size={18}/> Resume</a>
          <a href="mailto:jashandeep20445@gmail.com" className="btn-main"><Mail size={18}/> Email</a>
        </div>
      </section>

      {/* 3. SKILLS */}
      <section id="skills" style={{ padding: '80px 10%' }}>
        <h2 style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)' }}>Technical Arsenal</h2>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <motion.div whileHover={{ y: -5 }} key={i} className="skill-card">
              <div style={{ color: 'var(--accent)', marginBottom: '10px' }}>{s.icon}</div>
              <h3>{s.cat}</h3>
              <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>{s.items}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. PROJECTS */}
      <section id="projects" style={{ padding: '80px 10%' }}>
        <h2 style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)' }}>Featured Bounties</h2>
        <div style={{ display: 'grid', gap: '60px' }}>
          {projects.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'center' }}
            >
              <img src={p.img} alt={p.title} style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border)' }} />
              <div>
                <h3 style={{ fontSize: '2rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--accent)', fontFamily: 'Playfair Display' }}>{p.tech}</p>
                <p style={{ margin: '15px 0', color: 'var(--text-secondary)' }}>{p.desc}</p>
                <button className="btn-main">Inspect <ExternalLink size={16}/></button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. CERTIFICATES MARQUEE */}
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Credentials</h2>
        <div className="marquee-wrapper">
          <div className="marquee-track">
             {[...certs, ...certs, ...certs].map((img, i) => (
               <img key={i} src={img} className="cert-img" alt="Certificate" />
             ))}
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer id="contact" style={{ textAlign: 'center', padding: '100px 0', background: 'var(--bg-core)' }}>
        <h2 style={{ fontSize: '3rem' }}>Ready to Ride?</h2>
        <p style={{ margin: '20px 0', color: 'var(--text-secondary)' }}>Open for opportunities.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Linkedin size={24} style={{ cursor: 'pointer', color: 'var(--accent)' }} />
          <Mail size={24} style={{ cursor: 'pointer', color: 'var(--accent)' }} />
        </div>
      </footer>
    </div>
  );
}

export default App;