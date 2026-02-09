import { useEffect, useState, useRef } from "react";
import { 
  motion, useScroll, useSpring, useTransform, useMotionValue, AnimatePresence 
} from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Cpu, Zap, Globe, Terminal, PlayCircle
} from "lucide-react";

import me from './me.jpg'; 

// --- DATA: RESTORED & ENHANCED ---
const education = [
  { 
    level: "LEVEL 03", 
    title: "Bachelor of Technology (CSE)", 
    place: "Lovely Professional University", 
    stats: "CGPA: 6.8", 
    year: "2023 - PRESENT",
    desc: "Specialization in Full Stack Web Development."
  },
  { 
    level: "LEVEL 02", 
    title: "Senior Secondary (12th)", 
    place: "Dr. Asanand Arya Model School", 
    stats: "Score: 88.6%", 
    year: "2022",
    desc: "Focus on Physics, Chemistry, and Mathematics."
  },
  { 
    level: "LEVEL 01", 
    title: "Matriculation (10th)", 
    place: "St. Joseph's Convent School", 
    stats: "Score: 83.8%", 
    year: "2021",
    desc: "Foundation in Computer Science basics."
  }
];

const projects = [
  {
    title: "Vyom Clothing",
    sub: "E-Commerce Engine",
    tech: ["React.js", "Commerce.js", "Stripe"],
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop",
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/"
  },
  {
    title: "Story Verse",
    sub: "Archive System",
    tech: ["MERN Stack", "MongoDB", "JWT"],
    img: "https://images.unsplash.com/photo-1507842217121-ad0773cf4a0f?q=80&w=1000&auto=format&fit=crop",
    link: "https://reading-tracker-system1-vkbm.vercel.app/"
  },
  {
    title: "Biz-ID Gen",
    sub: "Identity Fabricator",
    tech: ["React + Vite", "Canvas API"],
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    link: "https://business-card-generator-mddw.vercel.app/"
  }
];

const skills = [
  { icon: <Terminal size={20}/>, name: "C / C++ / Java" },
  { icon: <Globe size={20}/>, name: "React / Vite" },
  { icon: <Cpu size={20}/>, name: "Node / Mongo" },
  { icon: <Zap size={20}/>, name: "Tailwind / Motion" }
];

// --- COMPONENT: PHYSICS ROPE LIGHT ---
const RopeLight = ({ toggleTheme, theme }) => {
  const [dragging, setDragging] = useState(false);
  
  // Motion values for spring physics
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 600, damping: 10 });
  const ropeHeight = useTransform(springY, [0, 300], [0, 300]);

  const handleDragEnd = (_, info) => {
    setDragging(false);
    if (info.offset.y > 100) {
      toggleTheme(); // Trigger theme switch
    }
    y.set(0); // Snap back
  };

  return (
    <div className="rope-container">
      {/* The Rope SVG - Always Visible */}
      <svg width="40" height="400" style={{ position: 'absolute', top: 0, overflow:'visible', pointerEvents:'none' }}>
         <motion.line 
           x1="20" y1="0" 
           x2="20" y2={ropeHeight} 
           stroke={theme === 'dark' ? '#555' : '#333'} 
           strokeWidth="4" 
           style={{ translateY: 0 }} // Start slightly off screen
         />
      </svg>

      {/* The Handle / Bulb */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 200 }}
        dragElastic={0.2}
        onDragStart={() => setDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ 
          y: springY, 
          marginTop: ropeHeight, // Push down by rope length
          cursor: 'grab',
          zIndex: 1000
        }}
      >
        <div style={{ 
          width: '30px', height: '50px', 
          background: theme === 'dark' ? '#222' : '#fff', 
          border: '3px solid var(--accent)', 
          borderRadius: '10px 10px 30px 30px',
          boxShadow: dragging ? '0 0 50px var(--accent)' : '0 0 10px var(--accent)',
          display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom:'5px'
        }}>
           <div style={{ width: '8px', height: '10px', background: 'var(--accent)', borderRadius: '50%' }}></div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [start, setStart] = useState(false);
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    document.body.className = theme === "dark" ? "" : "light-mode";
  }, [theme]);

  // --- START SCREEN (PRESS ENTER) ---
  if (!start) {
    return (
      <div className="start-screen" onClick={() => setStart(true)}>
        <motion.h1 
          animate={{ opacity: [0.5, 1, 0.5] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
          className="glitch" 
          data-text="SYSTEM READY"
          style={{ fontSize: '4rem', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'Orbitron' }}
        >
          SYSTEM READY
        </motion.h1>
        <p style={{ color: '#fff', fontFamily: 'monospace', marginTop: '20px' }}>
          [ CLICK TO INITIALIZE INTERFACE ]
        </p>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="cyber-grid"></div>
      <RopeLight theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
      
      {/* PROGRESS BAR */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)', scaleX, transformOrigin: "0%", zIndex: 100 }} />

      {/* --- HERO: CHARACTER SELECT --- */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
        <div className="container" style={{ maxWidth: '1000px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '50px' }}>
          
          {/* Avatar / Holo-Display */}
          <motion.div 
             initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
             style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}
          >
             <div style={{ position: 'relative', width: '300px', height: '300px' }}>
               <div style={{ position: 'absolute', inset: 0, border: '2px solid var(--accent)', borderRadius: '50%', borderStyle: 'dashed', animation: 'spin 10s linear infinite' }}></div>
               <img src={me} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '5px solid var(--bg-color)' }} />
               <div style={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#000', padding: '5px 15px', fontFamily: 'Orbitron', fontWeight: 'bold' }}>
                  LVL. 23 DEV
               </div>
             </div>
          </motion.div>

          {/* Intro Text */}
          <motion.div 
             initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
             style={{ flex: '1 1 400px' }}
          >
             <div className="level-badge">CLASS: FULL STACK</div>
             <h1 className="glitch" data-text="JASHANDEEP" style={{ fontSize: '4rem', margin: '10px 0', lineHeight: 0.9 }}>
               JASHANDEEP
             </h1>
             <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontFamily: 'monospace', marginBottom: '30px' }}>
               > Initializing portfolio protocol...<br/>
               > Loading assets: React, Node, Creative Design...<br/>
               > Status: <span style={{ color: 'var(--accent)' }}>ONLINE</span>
             </p>
             
             <div style={{ display: 'flex', gap: '15px' }}>
                <a href="/resume.pdf" download className="hud-panel" style={{ padding: '10px 30px', cursor: 'pointer', textDecoration: 'none', color: 'var(--text-primary)', display:'flex', gap:'10px' }}>
                   <Download size={18} /> SAVE_DATA (CV)
                </a>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- SKILLS: ATTRIBUTES --- */}
      <section style={{ padding: '100px 0' }}>
         <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 className="glitch" data-text="ATTRIBUTES" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '50px', fontFamily: 'Orbitron' }}>ATTRIBUTES</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
               {skills.map((s, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.1, borderColor: 'var(--accent)' }}
                    className="hud-panel" 
                    style={{ minWidth: '200px', textAlign: 'center' }}
                  >
                     <div style={{ color: 'var(--accent)', marginBottom: '10px' }}>{s.icon}</div>
                     <div style={{ fontFamily: 'Orbitron', fontSize: '1.1rem' }}>{s.name}</div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- PROJECTS: QUEST LOG --- */}
      <section style={{ padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
           <h2 className="glitch" data-text="QUEST LOG" style={{ fontSize: '3rem', marginBottom: '50px', fontFamily: 'Orbitron' }}>QUEST LOG</h2>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              {projects.map((p, i) => (
                 <motion.div key={i} whileHover={{ y: -10 }} className="hud-panel" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ height: '200px', overflow: 'hidden', borderBottom: '1px solid var(--glass-border)' }}>
                       <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '20px' }}>
                       <div className="level-badge" style={{ marginBottom: '10px' }}>COMPLETED</div>
                       <h3 style={{ fontFamily: 'Orbitron', margin: '0 0 5px 0' }}>{p.title}</h3>
                       <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>{p.sub}</p>
                       <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                          {p.tech.map(t => <span key={t} style={{ fontSize: '0.7rem', border: '1px solid #555', padding: '2px 8px' }}>{t}</span>)}
                       </div>
                       <a href={p.link} target="_blank" style={{ color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                          LAUNCH <ExternalLink size={14} />
                       </a>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* --- EDUCATION: STORY MODE TIMELINE --- */}
      <section style={{ padding: '100px 0', position: 'relative' }}>
         <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
            <h2 className="glitch" data-text="STORY MODE" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '80px', fontFamily: 'Orbitron' }}>STORY MODE</h2>
            
            <div style={{ position: 'relative', borderLeft: '2px solid var(--glass-border)', paddingLeft: '50px' }}>
               {education.map((edu, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     style={{ marginBottom: '60px', position: 'relative' }}
                  >
                     {/* Node Dot */}
                     <div style={{ position: 'absolute', left: '-59px', top: '0', width: '16px', height: '16px', background: 'var(--accent)', borderRadius: '50%', border: '4px solid var(--bg-color)', boxShadow: '0 0 10px var(--accent)' }}></div>
                     
                     <div className="hud-panel">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                           <span style={{ color: 'var(--accent)', fontFamily: 'Orbitron', fontSize: '1.2rem' }}>{edu.level}</span>
                           <span style={{ fontFamily: 'monospace', opacity: 0.7 }}>{edu.year}</span>
                        </div>
                        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.5rem' }}>{edu.title}</h3>
                        <h4 style={{ margin: '0 0 15px 0', color: 'var(--text-secondary)', fontWeight: 'normal' }}>{edu.place}</h4>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderLeft: '3px solid var(--accent)' }}>
                           <div style={{ fontWeight: 'bold' }}>{edu.stats}</div>
                           <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{edu.desc}</div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- FOOTER: SYSTEM END --- */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '40px 0', textAlign: 'center', fontFamily: 'monospace', color: '#555' }}>
         <div style={{ marginBottom: '10px' }}>END OF LINE_</div>
         <div>DESIGNED BY JASHANDEEP // 2026</div>
      </footer>

    </div>
  );
}

export default App;