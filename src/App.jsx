import { useEffect, useState, useRef } from "react";
import { 
  motion, useScroll, useSpring, useTransform, useVelocity, AnimatePresence 
} from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Sun, Moon, Menu, X, Code2, Cpu, Globe, 
  Zap, Layers, Terminal, Sparkles, Workflow, ArrowRight 
} from "lucide-react";

import me from './me.jpg'; 

// --- ANIMATION WRAPPER ---
const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// --- OPTIMIZED CUSTOM CURSOR ---
const CustomCursor = () => {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const addHover = () => cursor.classList.add("hovered");
    const removeHover = () => cursor.classList.remove("hovered");

    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button, .project-card, .glass-panel").forEach(el => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button, .project-card, .glass-panel").forEach(el => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

// --- DATA ---
const skillsData = [
  { icon: <Terminal size={24} />, category: "Core Languages", skills: ["C", "C++", "Java", "Python", "JavaScript"] },
  { icon: <Layers size={24} />, category: "Frontend", skills: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"] },
  { icon: <Cpu size={24} />, category: "Backend", skills: ["Node.js", "Express", "MongoDB", "REST APIs"] },
  { icon: <Zap size={24} />, category: "Tools", skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel"] }
];

const projects = [
  {
    title: "Vyom Clothing System",
    sub: "Digital Fashion Store",
    desc: "A premium black & white themed e-commerce experience. Features a minimalist UI, dynamic product cart, secure Stripe checkout, and a seamless shopping journey designed for modern brands.",
    tech: ["React.js", "Commerce.js", "Stripe", "Minimal UI"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop", 
    themeClass: "vyom-theme"
  },
  {
    title: "Story Verse",
    sub: "The Reader's Companion",
    desc: "A magical library management system. Track your reading progress, write chapter summaries, and rate your collection in an interface inspired by ancient archives.",
    tech: ["MERN Stack", "MongoDB", "JWT Auth", "Book API"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop",
    themeClass: "hp-theme"
  },
  {
    title: "Business Card Generator",
    sub: "Professional Identity Suite",
    desc: "Create vibrant, professional digital identities in seconds. Features real-time customization, QR code integration, and instant PDF export for the modern professional.",
    tech: ["React + Vite", "Tailwind", "QR Code", "Canvas API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop",
    themeClass: "" 
  }
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

// --- SCROLL VELOCITY COMPONENT ---
const ScrollVelocity = ({ children }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-2, 2]); 
  return <motion.div style={{ skewY: skew }}>{children}</motion.div>;
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
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
      <CustomCursor />
      <div className="noise-overlay"></div>

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
          {['About', 'Skills', 'Projects', 'Timeline', 'Contact'].map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '0.95rem', cursor: 'pointer', fontWeight: 600 }}>
              {item}
            </button>
          ))}
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
             {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-nav" style={{ display:'none', background: 'none', border: 'none', color: 'var(--text-primary)' }}>
           {menuOpen ? <X/> : <Menu/>}
        </button>

        {menuOpen && (
          <div style={{ position: 'absolute', top: '80px', left: 0, width: '100%', background: 'var(--bg-color)', padding: '20px', borderBottom: '1px solid var(--glass-border)' }}>
             {['About', 'Skills', 'Projects', 'Timeline', 'Contact'].map(item => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ display: 'block', width: '100%', padding: '15px 0', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.2rem', textAlign: 'left' }}>{item}</button>
             ))}
          </div>
        )}
      </motion.nav>

      {/* 1. HERO SECTION */}
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '80px' }}>
        <div className="container">
          <motion.div 
             initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 1.5 }}
             style={{ width: '250px', height: '250px', margin: '0 auto 40px', position: 'relative' }}
          >
             <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: 'var(--accent)', opacity: 0.15, filter: 'blur(40px)', animation: 'pulse 3s infinite' }}></div>
             <img src={me} alt="Jashandeep" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--bg-color)', position: 'relative' }} />
          </motion.div>
          
          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 6rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}>
            I am a <span className="gradient-text">{text}</span>
          </h1>
          
          <FadeIn delay={0.5}>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 50px' }}>
              Transforming ideas into scalable, high-performance web applications.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.8}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  style={{ padding: '18px 45px', borderRadius: '50px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                >
                  <Download size={20} /> Download CV
                </motion.button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. SKILLS */}
      <section id="skills" style={{ padding: '150px 0' }}>
        <div className="container">
          <FadeIn>
            <h2 style={{ fontSize: '3rem', marginBottom: '80px', textAlign: 'center' }}>Technical Arsenal</h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {skillsData.map((cat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-panel" style={{ padding: '40px' }}>
                  <div style={{ color: 'var(--accent)', marginBottom: '20px' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{cat.category}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {cat.skills.map(skill => (
                      <span key={skill} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '8px', fontSize: '0.9rem' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WORKFLOW */}
      <section style={{ padding: '150px 0' }}>
        <div className="container">
          <FadeIn>
            <h2 style={{ fontSize: '3rem', marginBottom: '80px', textAlign: 'center' }}>My Workflow</h2>
          </FadeIn>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
            {[
              { title: "Discover", desc: "Understanding the problem statement and requirements." },
              { title: "Design", desc: "Prototyping and architecture planning." },
              { title: "Develop", desc: "Clean coding with modern best practices." },
              { title: "Deploy", desc: "CI/CD integration and cloud hosting." }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="glass-panel" style={{ width: '250px', padding: '30px', textAlign: 'center' }}>
                  <div style={{ width: '50px', height: '50px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: 'bold' }}>{i+1}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROJECTS */}
      <ScrollVelocity>
        <section id="projects" style={{ padding: '150px 0' }}>
          <div className="container">
            <FadeIn>
              <h2 style={{ fontSize: '3rem', marginBottom: '100px', textAlign: 'center' }}>Featured Works</h2>
            </FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '150px' }}>
              {projects.map((proj, i) => (
                <FadeIn key={i}>
                  <div 
                    className="project-layout"
                    style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', gap: '60px', alignItems: 'center' }}
                  >
                    <div style={{ flex: 1, width: '100%' }}>
                      <div className={`glass-panel ${proj.themeClass}`} style={{ overflow: 'hidden', padding: '0', height: '400px' }}>
                         <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '2.8rem', marginBottom: '15px' }}>{proj.title}</h3>
                      <h4 style={{ color: 'var(--accent)', fontSize: '1.3rem', marginBottom: '25px', fontWeight: '600' }}>{proj.sub}</h4>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '35px', lineHeight: 1.7, fontSize: '1.15rem' }}>{proj.desc}</p>
                      
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '45px' }}>
                        {proj.tech.map(t => (
                          <span key={t} style={{ border: '1px solid var(--glass-border)', padding: '8px 18px', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>{t}</span>
                        ))}
                      </div>
                      
                      <a href={proj.link} target="_blank" style={{ textDecoration: 'none' }}>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          style={{ background: 'var(--text-primary)', color: 'var(--bg-color)', padding: '16px 35px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                        >
                          Visit Live Site <ExternalLink size={20} />
                        </motion.button>
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </ScrollVelocity>

      {/* 5. CERTIFICATES */}
      <section id="education" style={{ padding: '100px 0' }}>
         <FadeIn>
           <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}>Certifications</h2>
         </FadeIn>
         <div className="marquee-container">
            <div className="marquee-track">
               {[...certifications, ...certifications, ...certifications, ...certifications].map((cert, i) => (
                 <div key={i} className="glass-panel" style={{ minWidth: '500px', overflow: 'hidden', flexShrink: 0, padding: 0 }}>
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

      {/* 6. TIMELINE */}
      <section id="timeline" style={{ padding: '150px 0' }}>
        <div className="container" style={{ maxWidth: '900px', position: 'relative' }}>
          <FadeIn>
            <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '80px' }}>Academic Journey</h2>
          </FadeIn>
          <div className="timeline-line"></div>
          {education.map((edu, i) => (
            <FadeIn key={i}>
              <div 
                style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '60px', position: 'relative' }}
              >
                <div className="timeline-dot" style={{ position: 'absolute', left: '50%', top: '0', transform: 'translate(-50%, 0)', zIndex: 10, width:'20px', height:'20px', background:'var(--accent)', borderRadius:'50%', border:'4px solid var(--bg-color)' }}></div>
                <div className="glass-panel" style={{ width: '45%', padding: '35px' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.9rem' }}>{edu.year}</span>
                  <h3 style={{ fontSize: '1.5rem', margin: '10px 0' }}>{edu.school}</h3>
                  <h4 style={{ opacity: 0.8, fontSize: '1.1rem', fontWeight: 'normal' }}>{edu.degree}</h4>
                  <div style={{ marginTop: '15px', fontWeight: '800', fontSize: '1.1rem' }}>{edu.score}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 7. CONTACT */}
      <section id="contact" style={{ padding: '150px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <FadeIn>
            <div className="glass-panel" style={{ padding: '80px 40px' }}>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Let's Build Something.</h2>
              <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '50px' }}>
                I am currently available for full-time roles and freelance projects.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <a href="mailto:jashandeep20445@gmail.com" style={{ textDecoration: 'none' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    style={{ padding: '20px 45px', borderRadius: '50px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center', cursor: 'pointer' }}
                  >
                    <Mail size={22} /> Email Me
                  </motion.button>
                </a>
                <a href="https://linkedin.com/in/jashan23" target="_blank" style={{ textDecoration: 'none' }}>
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     style={{ padding: '20px 45px', borderRadius: '50px', background: 'transparent', color: 'var(--text-primary)', border: '2px solid var(--text-primary)', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center', cursor: 'pointer' }}
                   >
                    <Linkedin size={22} /> LinkedIn
                  </motion.button>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      
    </div>
  );
}

export default App;