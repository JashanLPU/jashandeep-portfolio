import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, Mail, Linkedin, Terminal, Code, Cpu, ExternalLink, Menu 
} from "lucide-react";
import './App.css';

// Assets
import me from './me.jpg'; 
import cert1 from './cert1.jpg';
import cert2 from './cert2.jpg';
import cert3 from './cert3.jpg';

// --- REALISTIC ROPE COMPONENT ---
const RealisticRope = ({ toggleTheme }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Canvas sizing (High DPI support)
    const setSize = () => {
      canvas.width = 300;
      canvas.height = window.innerHeight * 0.8;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Physics Constants
    const gravity = 0.6;
    const friction = 0.92; // Higher friction = less wobble
    const segments = 12;
    const segLen = 25; // Shorter segments for smoother curve
    
    // Rope State
    const points = [];
    for (let i = 0; i < segments; i++) {
      points.push({ x: 150, y: i * segLen, oldx: 150, oldy: i * segLen, pinned: i === 0 });
    }

    let isDragging = false;
    let dragX = 0, dragY = 0;
    
    // Interaction Handlers
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onDown = (e) => {
      const { x, y } = getPos(e);
      const last = points[segments - 1];
      // Hitbox: 50px radius (Generous for easy grabbing)
      const dist = Math.hypot(x - last.x, y - last.y);
      if (dist < 50) {
        isDragging = true;
        dragX = x; dragY = y;
      }
    };

    const onMove = (e) => {
      if (isDragging) {
        const { x, y } = getPos(e);
        dragX = x; dragY = y;
      }
    };

    const onUp = () => {
      if (isDragging) {
        const last = points[segments - 1];
        // Trigger Threshold: Pull down 100px past resting length
        if (last.y > (segments * segLen) + 100) {
          toggleTheme(); // ACTION
        }
      }
      isDragging = false;
    };

    // Listeners
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onDown);
    canvas.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);

    // --- ANIMATION LOOP ---
    const update = () => {
      // 1. Verlet Integration
      for (let i = 0; i < segments; i++) {
        let p = points[i];
        if (p.pinned) continue;
        
        if (i === segments - 1 && isDragging) {
          p.x = dragX; p.y = dragY; // Lock last point to mouse
          continue;
        }

        let vx = (p.x - p.oldx) * friction;
        let vy = (p.y - p.oldy) * friction;

        p.oldx = p.x; p.oldy = p.y;
        p.x += vx; p.y += vy + gravity;
      }

      // 2. Constraints (Resolve Stick Length)
      for (let k = 0; k < 5; k++) { // 5 iterations for stiffness
        for (let i = 0; i < segments - 1; i++) {
          let p1 = points[i];
          let p2 = points[i+1];
          let dx = p2.x - p1.x;
          let dy = p2.y - p1.y;
          let dist = Math.hypot(dx, dy);
          let diff = segLen - dist;
          let percent = diff / dist / 2;
          let offX = dx * percent;
          let offY = dy * percent;

          if (!p1.pinned) { p1.x -= offX; p1.y -= offY; }
          if (i + 1 !== segments - 1 || !isDragging) { p2.x += offX; p2.y += offY; }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const style = getComputedStyle(document.body);
      const mainColor = style.getPropertyValue('--rope-main').trim();
      const lightColor = style.getPropertyValue('--rope-light').trim();

      // Draw Braided Rope
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Base Rope
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < segments; i++) {
        // Curve through points
        const xc = (points[i].x + points[i-1].x) / 2;
        const yc = (points[i].y + points[i-1].y) / 2;
        ctx.quadraticCurveTo(points[i-1].x, points[i-1].y, xc, yc);
      }
      ctx.lineTo(points[segments-1].x, points[segments-1].y);
      ctx.strokeStyle = mainColor;
      ctx.stroke();

      // Texture (Twist Effect)
      ctx.strokeStyle = lightColor;
      ctx.lineWidth = 2;
      for (let i = 1; i < segments; i++) {
         let p1 = points[i-1];
         let p2 = points[i];
         let dx = p2.x - p1.x;
         let dy = p2.y - p1.y;
         let angle = Math.atan2(dy, dx);
         
         // Draw small diagonal dashes along the segment
         for(let j=0; j<segLen; j+=5) {
             let x = p1.x + (j * Math.cos(angle));
             let y = p1.y + (j * Math.sin(angle));
             
             ctx.beginPath();
             ctx.moveTo(x - 2, y + 2); // Diagonal offset
             ctx.lineTo(x + 2, y - 2);
             ctx.stroke();
         }
      }

      // Draw Heavy Knob Handle
      const end = points[segments-1];
      const knobGrad = ctx.createRadialGradient(end.x-5, end.y-5, 2, end.x, end.y, 20);
      knobGrad.addColorStop(0, '#DAA520'); // Gold highlight
      knobGrad.addColorStop(1, '#8B4513'); // Wood/Bronze shadow
      
      ctx.beginPath();
      ctx.arc(end.x, end.y, 12, 0, Math.PI*2);
      ctx.fillStyle = knobGrad;
      ctx.fill();
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };
    loop();
    
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <div className="rope-container">
       <canvas ref={canvasRef} className="rope-canvas" />
    </div>
  );
};

// --- DYNAMIC ISLAND NAVBAR ---
const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="navbar-wrapper">
      <motion.nav 
        className="dynamic-island"
        initial={{ width: 120 }}
        animate={{ width: isExpanded ? 500 : 120 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
         <AnimatePresence mode="wait">
            {!isExpanded ? (
               <motion.div 
                 key="logo"
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 style={{ fontWeight: 800, fontSize: '1.2rem', fontFamily: 'Cinzel' }}
               >
                 JS.
               </motion.div>
            ) : (
               <motion.div 
                 key="menu"
                 className="nav-content"
                 initial={{ opacity: 0, scale: 0.95 }} 
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
               >
                  <a href="#about" className="nav-link">ABOUT</a>
                  <a href="#skills" className="nav-link">ARSENAL</a>
                  <a href="#projects" className="nav-link">BOUNTIES</a>
                  <a href="#contact" className="nav-link">CONTACT</a>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.nav>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [theme, setTheme] = useState("noir");

  const toggleTheme = () => {
    // Play sound effect here if desired
    setTheme(prev => prev === "noir" ? "frontier" : "noir");
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Project Data
  const projects = [
    { title: "Vyom Clothing", role: "E-Commerce", desc: "React, Stripe, Commerce.js", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" },
    { title: "Story Verse", role: "Library System", desc: "MERN Stack, Analytics", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800" },
    { title: "Biz-ID Gen", role: "Tools", desc: "Canvas API, PDF Gen", img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800" },
  ];

  return (
    <div className="app">
      {/* REAL ROPE (Interactive) */}
      <RealisticRope toggleTheme={toggleTheme} />
      
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section id="about" className="hero">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.8 }}
        >
          <img src={me} alt="Profile" />
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>Jashandeep Singh</h1>
          <p style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--accent)' }}>
            {theme === 'noir' ? "Architect of Digital Systems" : "The Full Stack Drifter"}
          </p>
          <div style={{ marginTop: '30px' }}>
             <a href="/resume.pdf" className="btn-primary"><Download size={18} /> Download Dossier</a>
          </div>
        </motion.div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" style={{ borderTop: '1px solid var(--border)' }}>
        <h2 style={{ marginBottom: '40px' }}>Technical Arsenal</h2>
        <div className="skills-grid">
           {["Languages", "Frontend", "Backend", "Database"].map((item, i) => (
             <motion.div key={i} whileHover={{ y: -5 }} className="skill-card">
               <Terminal size={32} color="var(--accent)" style={{ marginBottom: 15 }} />
               <h3 style={{ fontSize: '1.2rem', marginBottom: 10 }}>{item}</h3>
               <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                 Java, Python, React, Node.js, MongoDB...
               </p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects">
        <h2 style={{ marginBottom: '40px' }}>Featured Bounties</h2>
        <div style={{ display: 'grid', gap: '60px' }}>
           {projects.map((p, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px', alignItems: 'center' }}
             >
               <img src={p.img} alt={p.title} style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--border)' }} />
               <div>
                  <h3 style={{ fontSize: '2rem' }}>{p.title}</h3>
                  <p style={{ color: 'var(--accent)', fontFamily: 'Playfair Display', fontStyle: 'italic' }}>{p.role}</p>
                  <p style={{ margin: '15px 0', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{p.desc}</p>
                  <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '10px 25px' }}>
                    View Source <ExternalLink size={14} />
                  </button>
               </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* CERTIFICATES MARQUEE */}
      <section>
         <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Credentials</h2>
         <div className="marquee-container">
           <div className="marquee-track">
              {[cert1, cert2, cert3, cert1, cert2, cert3].map((img, i) => (
                <div key={i} className="cert-frame">
                   <img src={img} className="cert-img" alt="Certificate" />
                </div>
              ))}
           </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{ textAlign: 'center', padding: '100px 0', background: 'var(--bg-core)' }}>
         <h2 style={{ fontSize: '2.5rem' }}>Let's Collaborate</h2>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
           <Linkedin size={28} style={{ cursor: 'pointer', color: 'var(--accent)' }}/>
           <Mail size={28} style={{ cursor: 'pointer', color: 'var(--accent)' }}/>
         </div>
         <p style={{ marginTop: '40px', opacity: 0.5, fontSize: '0.9rem' }}>
           © 2026 Jashandeep Singh. All Rights Reserved.
         </p>
      </footer>
    </div>
  );
}

export default App;