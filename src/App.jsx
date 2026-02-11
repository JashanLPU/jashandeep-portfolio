import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles, AdaptiveDpr } from "@react-three/drei";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Mail, Linkedin, Download, ExternalLink, Terminal, Code, Database, Cpu, Github, MapPin, Phone, Trophy, BookOpen } from "lucide-react";
import './App.css';

// Assets (Ensure these exist in your src folder or update paths)
import me from './me.jpg'; 
import cert1 from './cert1.jpg'; 
import cert2 from './cert2.jpg'; 
import cert3 from './cert3.jpg';

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">JASHAN.DEV</div>
    <div className="nav-links">
      <a href="#about" className="nav-item">About</a>
      <a href="#skills" className="nav-item">Skills</a>
      <a href="#projects" className="nav-item">Projects</a>
      <a href="#education" className="nav-item">Education</a>
      <a href="#contact" className="nav-item">Contact</a>
    </div>
  </nav>
);

const ThemedButton = ({ href, children, icon: Icon }) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="btn-themed"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {Icon && <Icon size={16} />} {children}
  </motion.a>
);

// --- 3D TILT CARD ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
    >
      <div className="tilt-content">{children}</div>
    </motion.div>
  );
};

// --- LIQUID TRANSITION (Subtle) ---
const LiquidTransition = ({ isTransitioning }) => (
  <AnimatePresence>
    {isTransitioning && (
      <>
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="water-ripple">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
          </filter>
        </svg>
        <div className="liquid-overlay">
          <motion.div
            className="liquid-blob"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{ width: "200vmax", height: "200vmax", opacity: 1 }}
            exit={{ width: "200vmax", height: "200vmax", opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </div>
      </>
    )}
  </AnimatePresence>
);

// --- ULTRA SMOOTH REVEAL (Spring Physics) ---
const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    viewport={{ once: false, amount: 0.1 }}
    transition={{ 
      type: "spring",
      stiffness: 40,  
      damping: 15,    
      delay: delay
    }}
  >
    {children}
  </motion.div>
);

const FloatAnim = ({ children, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

// --- VISIBLE INFINITE ROPE (Mobile Pull Fix) ---
const Rope = ({ onPull, theme }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Initial Size
    let width = 100;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => { 
        width = 100;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    window.addEventListener('resize', resize);
    
    let isDragging = false;
    let startX = 50; let startY = 0; 
    
    // DYNAMIC LENGTH LOGIC
    // Desktop = 150px. Mobile (<768px) = 300px to clear navbar.
    const getRestLength = () => window.innerWidth < 768 ? 300 : 150;
    
    let endX = 50; let endY = getRestLength(); 
    let velocityX = 0; let velocityY = 0;

    const animate = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const restLength = getRestLength();
      
      if (!isDragging) {
        const k = 0.05; 
        const damping = 0.88; 
        
        const forceX = (50 - endX) * k;
        const forceY = (restLength - endY) * k; // Pull to dynamic rest length
        velocityX += forceX; velocityY += forceY;
        velocityY += 0.4; 
        velocityX *= damping; velocityY *= damping;
        endX += velocityX; endY += velocityY;
      }

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      
      const color = getComputedStyle(document.documentElement).getPropertyValue('--rope-color').trim();
      ctx.lineWidth = 3; ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(endX, endY, 6, 0, Math.PI*2);
      ctx.fillStyle = color; ctx.fill();
      
      requestAnimationFrame(animate);
    };
    animate();

    const handleStart = (clientX, clientY) => {
       const rect = canvas.getBoundingClientRect();
       const x = clientX - rect.left;
       const y = clientY - rect.top;
       // HITBOX: Upper 400px to account for mobile length
       if (y < 400) {
          isDragging = true;
          endX = x; endY = y;
       }
    };

    const handleMove = (clientX, clientY) => {
       if(isDragging) {
          const rect = canvas.getBoundingClientRect();
          endX = clientX - rect.left;
          endY = clientY - rect.top;
          if(endY > (window.innerWidth < 768 ? 450 : 350)) { 
             onPull(); isDragging = false; 
          }
       }
    };

    const handleEnd = () => { isDragging = false; };

    const onMouseDown = (e) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();
    
    // PREVENT DEFAULT ON TOUCH to stop refresh/scroll
    const onTouchStart = (e) => {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e) => {
        e.preventDefault(); // STOP PULL TO REFRESH
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => handleEnd();

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, {passive: false});
    canvas.addEventListener('touchmove', onTouchMove, {passive: false});
    canvas.addEventListener('touchend', onTouchEnd);

    return () => {
       window.removeEventListener('mousedown', onMouseDown);
       window.removeEventListener('mousemove', onMouseMove);
       window.removeEventListener('mouseup', onMouseUp);
       window.removeEventListener('resize', resize);
       canvas.removeEventListener('touchstart', onTouchStart);
       canvas.removeEventListener('touchmove', onTouchMove);
       canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [onPull, theme]);

  return <div className="rope-anchor"><canvas ref={canvasRef} style={{width:'100%', height:'100%'}}/></div>
}

const Cursor = () => {
  const x=useRef(0); const y=useRef(0);
  useEffect(()=>{
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const onMove = (e) => {
        if(dot) dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        if(ring) ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return <><div id="cursor-dot" className="cursor-dot"/><div id="cursor-ring" className="cursor-ring"/></>
};

// --- APP ---
function App() {
  const [theme, setTheme] = useState("noir");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSwitch = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => { setTheme(t => t === 'noir' ? 'frontier' : 'noir'); }, 600);
    setTimeout(() => { setIsTransitioning(false); }, 1300);
  };

  useEffect(() => { document.body.setAttribute('data-theme', theme); }, [theme]);

  return (
    <div className="app">
      <Cursor />
      <div className="vignette-overlay" />
      <div className="noise-overlay" />
      <LiquidTransition isTransitioning={isTransitioning} />
      <Navbar />
      <Rope onPull={handleSwitch} theme={theme} />

      <div id="canvas-container">
        <Canvas dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <AdaptiveDpr pixelated />
            <Sparkles 
              count={theme === 'noir' ? 1000 : 600} 
              scale={25} size={theme === 'noir' ? 2 : 4} 
              speed={0.4} opacity={0.6} 
              color={theme === 'noir' ? "#d4af37" : "#b8860b"} 
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 1. HERO */}
      <section id="about">
        <Reveal>
          <div className="content-wrapper">
            <FloatAnim>
              <img src={me} className="profile-img" alt="Jashandeep Singh" />
            </FloatAnim>
            <h1>Jashandeep Singh</h1>
            <p style={{ color: 'var(--accent)', fontFamily: 'Cinzel', fontWeight: 'bold', letterSpacing: '4px', fontSize: '1.2rem', marginBottom:'30px' }}>
              FULL STACK ENGINEER
            </p>
            <p style={{maxWidth: '800px', margin: '0 auto'}}>
              B.Tech Computer Science student at <strong>Lovely Professional University</strong>.
              Specializing in <strong>Full-Stack Development</strong>, <strong>AI</strong>, and <strong>Cloud Computing</strong>.
              I build scalable, high-performance digital systems with robust architecture.
            </p>
            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginTop: '50px' }}>
              <ThemedButton href="/resume.pdf" icon={Download}>Download CV</ThemedButton>
              <ThemedButton href="#contact" icon={Mail}>Contact Me</ThemedButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. SKILLS */}
      <section id="skills">
        <Reveal><h2>Technical Skills</h2></Reveal>
        <div className="content-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
          
          <TiltCard className="skills-card">
            <h3 style={{ display:'flex', gap:'10px' }}><Terminal/> Languages</h3>
            <p>C, C++, Java, Python, PHP</p>
          </TiltCard>
          
          <TiltCard className="skills-card">
            <h3 style={{ display:'flex', gap:'10px' }}><Code/> Frontend</h3>
            <p>HTML, CSS, React.js, Tailwind, Framer Motion</p>
          </TiltCard>

          <TiltCard className="skills-card">
            <h3 style={{ display:'flex', gap:'10px' }}><Cpu/> Backend</h3>
            <p>Node.js, Express.js, PHP (XAMPP)</p>
          </TiltCard>

          <TiltCard className="skills-card">
            <h3 style={{ display:'flex', gap:'10px' }}><Database/> Tools</h3>
            <p>MySQL, MongoDB, GitHub, VS Code</p>
          </TiltCard>

        </div>
      </section>

      {/* 3. PROJECTS (UPDATED LINKS) */}
      <section id="projects">
        <Reveal><h2>Featured Projects</h2></Reveal>
        <div className="content-wrapper">
          
          {/* Vyom */}
          <Reveal>
            <div className="project-row">
              <div className="project-visual">
                <TiltCard>
                  <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" className="project-img" alt="Vyom" />
                </TiltCard>
              </div>
              <div className="project-info">
                <h3>Vyom Clothing</h3>
                <p style={{ fontWeight:'bold', color:'var(--text-main)', marginBottom:'10px' }}>E-Commerce Store</p>
                <p>
                  A premium fashion marketplace. Features dynamic cart management, 
                  secure Stripe payments, and a seamless shopping experience using Commerce.js.
                </p>
                <div style={{marginBottom:'25px'}}>
                  <span className="tech-badge">React</span><span className="tech-badge">Stripe</span><span className="tech-badge">Commerce.js</span>
                </div>
                {/* CLEAN LINK */}
                <ThemedButton href="https://vyom-clothing-system.vercel.app/" icon={ExternalLink}>Visit Store</ThemedButton>
              </div>
            </div>
          </Reveal>

          {/* Story Verse */}
          <Reveal>
            <div className="project-row" style={{flexDirection: 'row-reverse'}}>
              <div className="project-visual">
                <TiltCard>
                  <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800" className="project-img" alt="Story Verse" />
                </TiltCard>
              </div>
              <div className="project-info" style={{textAlign: 'right'}}>
                <h3>Story Verse</h3>
                <p style={{ fontWeight:'bold', color:'var(--text-main)', marginBottom:'10px' }}>Digital Library</p>
                <p>
                  A digital sanctuary for book lovers. Users can browse, purchase, and read books online.
                  Features tracking for reading progress and personal archives.
                </p>
                <div style={{marginBottom:'25px'}}>
                  <span className="tech-badge">MERN Stack</span><span className="tech-badge">Node.js</span><span className="tech-badge">MongoDB</span>
                </div>
                {/* CLEAN LINK */}
                <ThemedButton href="https://reading-tracker-system.vercel.app/" icon={ExternalLink}>Enter Library</ThemedButton>
              </div>
            </div>
          </Reveal>

          {/* VizCard */}
          <Reveal>
            <div className="project-row">
              <div className="project-visual">
                <TiltCard>
                  {/* Business Card Image */}
                  <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800" className="project-img" alt="VizCard" />
                </TiltCard>
              </div>
              <div className="project-info">
                <h3>VizCard</h3>
                <p style={{ fontWeight:'bold', color:'var(--text-main)', marginBottom:'10px' }}>Identity Generator</p>
                <p>
                  Professional tool for creating instant business cards. 
                  Leverages the Canvas API for real-time rendering and downloadable PDF exports.
                </p>
                <div style={{marginBottom:'25px'}}>
                  <span className="tech-badge">Canvas API</span><span className="tech-badge">React</span><span className="tech-badge">Vite</span>
                </div>
                {/* CLEAN LINK */}
                <ThemedButton href="https://business-card-generator.vercel.app/" icon={ExternalLink}>Create Card</ThemedButton>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 4. CERTIFICATES */}
      <section id="certs" style={{ width: '100%', padding: '120px 0' }}>
        <Reveal><h2>Certifications</h2></Reveal>
        <div className="marquee-wrapper">
          <div className="marquee-track">
             {[cert1, cert2, cert3, cert1, cert2, cert3].map((img, i) => (
                <img key={i} src={img} className="cert-item" alt="Certificate" />
             ))}
          </div>
        </div>
      </section>

      {/* 5. EDUCATION */}
      <section id="education">
        <Reveal><h2>Academic Journey</h2></Reveal>
        <div className="timeline">
          
          <Reveal>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <p style={{ color:'var(--accent)', fontWeight:'bold' }}>2023 - Present</p>
              <h3>B.Tech Computer Science</h3>
              <p style={{ color:'var(--text-main)', fontWeight:'bold' }}>Lovely Professional University</p>
              <p style={{ fontSize:'0.9rem' }}>CGPA: 6.8 | Punjab, India</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <p style={{ color:'var(--accent)', fontWeight:'bold' }}>2022 - 2023</p>
              <h3>Intermediate (12th)</h3>
              <p style={{ color:'var(--text-main)', fontWeight:'bold' }}>Dr. Asanand Arya Model School</p>
              <p style={{ fontSize:'0.9rem' }}>Percentage: 88.6% | Punjab, India</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <p style={{ color:'var(--accent)', fontWeight:'bold' }}>2020 - 2021</p>
              <h3>Matriculation (10th)</h3>
              <p style={{ color:'var(--text-main)', fontWeight:'bold' }}>St. Joseph's Convent School</p>
              <p style={{ fontSize:'0.9rem' }}>Percentage: 83.8% | Punjab, India</p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact">
        <Reveal>
          <h1>Contact Me</h1>
          <p>
            I am always open to discussing new projects, creative ideas, or opportunities.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', marginBottom: '50px', color: '#aaa' }}>
             <p style={{display:'flex', gap:'10px'}}><Phone size={18}/> +91 62837-57858</p>
             <p style={{display:'flex', gap:'10px'}}><MapPin size={18}/> Punjab, India</p>
          </div>
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <ThemedButton href="mailto:Jashandeep20445@gmail.com" icon={Mail}>Email Me</ThemedButton>
            <ThemedButton href="https://www.linkedin.com/in/jashan23" icon={Linkedin}>LinkedIn</ThemedButton>
            <ThemedButton href="https://github.com/JashanLPU" icon={Github}>GitHub</ThemedButton>
          </div>
          <p style={{ marginTop: '120px', opacity: 0.4, fontSize: '0.9rem' }}>
            © 2026 Jashandeep Singh. All Rights Reserved.
          </p>
        </Reveal>
      </section>

    </div>
  );
}

export default App;