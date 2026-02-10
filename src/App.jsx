import React, { useEffect, useRef, useState } from "react";
import { 
  motion, AnimatePresence 
} from "framer-motion";
import { 
  Download, Mail, Linkedin, Terminal, Code, Cpu, ExternalLink 
} from "lucide-react";
import './App.css';

// --- ASSETS ---
import me from './me.jpg'; 
import cert1 from './cert1.jpg';
import cert2 from './cert2.jpg';
import cert3 from './cert3.jpg';

// --- PHYSICS ROPE COMPONENT (VERLET INTEGRATION) ---
const PhysicsRope = ({ toggleTheme }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Physics Configuration
    let width = 200;
    let height = 600; // Longer canvas to allow pulling down
    canvas.width = width;
    canvas.height = height;

    const gravity = 0.5;
    const friction = 0.98;
    const segmentLength = 20;
    const segmentCount = 10;
    const handleRadius = 15;
    
    // Rope State
    const points = [];
    for (let i = 0; i < segmentCount; i++) {
      points.push({
        x: width / 2,
        y: i * segmentLength,
        oldx: width / 2,
        oldy: i * segmentLength,
        pinned: i === 0 // Pin the top point
      });
    }

    let isDragging = false;
    let dragX = 0;
    let dragY = 0;
    let themeTriggered = false;

    // --- MOUSE / TOUCH HANDLERS ---
    const onDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      // Check if clicking near the handle (last point)
      const lastPoint = points[points.length - 1];
      const dist = Math.sqrt((mouseX - lastPoint.x)**2 + (mouseY - lastPoint.y)**2);
      
      if (dist < 40) { // Hitbox size
        isDragging = true;
        dragX = mouseX;
        dragY = mouseY;
      }
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragX = clientX - rect.left;
      dragY = clientY - rect.top;
    };

    const onUp = () => {
      if (isDragging) {
        // Check trigger condition (Pulling down far enough)
        const lastPoint = points[points.length - 1];
        if (lastPoint.y > (segmentCount * segmentLength) + 100) {
           toggleTheme();
           themeTriggered = true;
           setTimeout(() => themeTriggered = false, 500);
        }
      }
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onDown);
    canvas.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);

    // --- PHYSICS LOOP ---
    const update = () => {
      // 1. Verlet Integration (Move points)
      for (let i = 0; i < points.length; i++) {
        let p = points[i];
        if (p.pinned) continue;

        // If dragging last point, override physics
        if (i === points.length - 1 && isDragging) {
          p.x = dragX;
          p.y = dragY;
          continue;
        }

        let vx = (p.x - p.oldx) * friction;
        let vy = (p.y - p.oldy) * friction;

        p.oldx = p.x;
        p.oldy = p.y;
        p.x += vx;
        p.y += vy;
        p.y += gravity;
      }

      // 2. Constraints (Stick length)
      for (let i = 0; i < 5; i++) { // Iterate a few times for stability
        for (let j = 0; j < points.length - 1; j++) {
          let p1 = points[j];
          let p2 = points[j + 1];
          
          let dx = p2.x - p1.x;
          let dy = p2.y - p1.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let difference = segmentLength - distance;
          let percent = difference / distance / 2;
          let offsetX = dx * percent;
          let offsetY = dy * percent;

          if (!p1.pinned) {
            p1.x -= offsetX;
            p1.y -= offsetY;
          }
          if (j + 1 !== points.length - 1 || !isDragging) {
            p2.x += offsetX;
            p2.y += offsetY;
          }
        }
      }
    };

    // --- RENDER LOOP ---
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Get colors from CSS vars
      const style = getComputedStyle(document.body);
      const ropeColor = style.getPropertyValue('--rope-color').trim() || '#8B4513';
      const ropeAccent = style.getPropertyValue('--rope-accent').trim() || '#CD853F';

      // Draw Rope
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        // Draw quadratic curve for smoothness
        const xc = (points[i].x + points[i-1].x) / 2;
        const yc = (points[i].y + points[i-1].y) / 2;
        ctx.quadraticCurveTo(points[i-1].x, points[i-1].y, xc, yc);
      }
      ctx.lineTo(points[points.length-1].x, points[points.length-1].y);
      
      ctx.lineWidth = 4;
      ctx.strokeStyle = ropeColor;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Draw Rope Detail (Twist effect)
      ctx.lineWidth = 1;
      ctx.strokeStyle = ropeAccent;
      ctx.stroke();

      // Draw Handle (Knob)
      const end = points[points.length - 1];
      
      // Wood gradient for handle
      const grad = ctx.createRadialGradient(end.x, end.y, 2, end.x, end.y, handleRadius);
      grad.addColorStop(0, ropeAccent);
      grad.addColorStop(1, ropeColor);

      ctx.beginPath();
      ctx.arc(end.x, end.y, handleRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw "Pull" text if hovering near
      if (isDragging) {
         ctx.fillStyle = themeTriggered ? '#fff' : ropeColor;
         ctx.font = '12px Courier New';
         ctx.fillText(themeTriggered ? "SWITCHING!" : "PULL DOWN", end.x + 20, end.y + 5);
      }
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
    };
  }, []); // Re-run if toggleTheme changes not strictly needed here as we use callback

  return <canvas ref={canvasRef} className="rope-canvas-layer" />;
};

// --- DYNAMIC NAVBAR ---
const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="navbar-container">
      <motion.div 
        className="dynamic-island"
        animate={{ width: hovered ? 500 : 120, height: 50 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence mode="wait">
          {!hovered ? (
            <motion.div 
              key="logo"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ fontFamily: 'Cinzel', fontWeight: 'bold' }}
            >
              JS.
            </motion.div>
          ) : (
            <motion.div 
              key="menu" 
              className="nav-links"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <a href="#about" className="nav-item">About</a>
              <a href="#skills" className="nav-item">Skills</a>
              <a href="#projects" className="nav-item">Projects</a>
              <a href="#contact" className="nav-item">Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [theme, setTheme] = useState("noir");

  const toggleTheme = () => {
    const newTheme = theme === "noir" ? "frontier" : "noir";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Data
  const projects = [
    { title: "Vyom Clothing", role: "E-Commerce", desc: "React, Stripe, Commerce.js", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" },
    { title: "Story Verse", role: "Library System", desc: "MERN Stack, Analytics", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800" },
    { title: "Biz-ID Gen", role: "Tools", desc: "Canvas API, PDF Gen", img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800" },
  ];

  return (
    <div className="app">
      {/* 3D PHYSICS ROPE */}
      <PhysicsRope toggleTheme={toggleTheme} />
      
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section id="about" className="hero">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
          <img src={me} alt="Profile" />
        </motion.div>
        
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Jashandeep Singh</h1>
          <p style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', color: 'var(--accent)', fontSize: '1.2rem' }}>
            {theme === 'noir' ? "High-Performance Systems Architect" : "The Full Stack Gunslinger"}
          </p>
          <div style={{ marginTop: '30px' }}>
            <a href="/resume.pdf" className="btn-gold"><Download size={18} style={{marginRight:8}}/> Download CV</a>
          </div>
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ borderTop: '1px solid var(--border)' }}>
        <h2 style={{ marginBottom: '40px' }}>02. Skills Arsenal</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
           <div style={{ padding: '20px', background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
              <Terminal size={32} color="var(--accent)"/>
              <h3 style={{ fontSize: '1.2rem', margin: '15px 0' }}>Languages</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Java, C++, Python, JavaScript</p>
           </div>
           <div style={{ padding: '20px', background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
              <Code size={32} color="var(--accent)"/>
              <h3 style={{ fontSize: '1.2rem', margin: '15px 0' }}>Frontend</h3>
              <p style={{ color: 'var(--text-secondary)' }}>React, Tailwind, Framer</p>
           </div>
           <div style={{ padding: '20px', background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
              <Cpu size={32} color="var(--accent)"/>
              <h3 style={{ fontSize: '1.2rem', margin: '15px 0' }}>Backend</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Node.js, Express, MongoDB</p>
           </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <h2 style={{ marginBottom: '40px' }}>03. Featured Bounties</h2>
        <div style={{ display: 'grid', gap: '50px' }}>
          {projects.map((p, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 50 }} 
               whileInView={{ opacity: 1, y: 0 }}
               style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'center' }}
             >
               <img src={p.img} alt={p.title} style={{ width: '100%', borderRadius: '4px', filter: 'grayscale(50%)' }} />
               <div>
                 <h3 style={{ fontSize: '2rem' }}>{p.title}</h3>
                 <p style={{ color: 'var(--accent)', fontFamily: 'Playfair Display' }}>{p.role}</p>
                 <p style={{ margin: '15px 0', color: 'var(--text-secondary)' }}>{p.desc}</p>
               </div>
             </motion.div>
          ))}
        </div>
      </section>

      {/* CERTIFICATES */}
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>04. Credentials</h2>
        <div className="marquee-wrapper">
          <div className="marquee-track">
             {[cert1, cert2, cert3, cert1, cert2, cert3].map((img, i) => (
               <div key={i} className="cert-frame">
                 <img src={img} className="cert-img" alt="Cert" />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{ textAlign: 'center', padding: '100px 0', background: 'var(--bg-core)' }}>
        <h2 style={{ fontSize: '2.5rem' }}>Send a Telegram?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
          <Mail size={24} style={{ cursor: 'pointer', color: 'var(--accent)' }}/>
          <Linkedin size={24} style={{ cursor: 'pointer', color: 'var(--accent)' }}/>
        </div>
        <p style={{ marginTop: '50px', opacity: 0.5 }}>© 2026 Jashandeep Singh</p>
      </footer>
    </div>
  );
}

export default App;