import { useEffect, useState } from "react";
import { 
  motion, useScroll, useSpring, useTransform, useMotionValue 
} from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Code2, Server, Database, Globe, ChevronRight
} from "lucide-react";

import me from './me.jpg'; 

// --- PROFESSIONAL DATA ---
const education = [
  { 
    degree: "B.Tech in Computer Science (Full Stack)", 
    school: "Lovely Professional University", 
    year: "2023 - Present",
    grade: "CGPA: 6.8",
    details: "Focus on MERN Stack, Data Structures & Algorithms."
  },
  { 
    degree: "Senior Secondary (Science)", 
    school: "Dr. Asanand Arya Model School", 
    year: "2022",
    grade: "88.6%",
    details: "Physics, Chemistry, Mathematics."
  },
  { 
    degree: "Matriculation", 
    school: "St. Joseph's Convent School", 
    year: "2021",
    grade: "83.8%",
    details: "Core Foundation."
  }
];

const projects = [
  {
    title: "Vyom Clothing",
    tag: "E-Commerce",
    desc: "A premium fashion platform featuring secure Stripe payments, real-time cart management, and a minimalist design system.",
    tech: ["React.js", "Commerce.js", "Stripe"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Story Verse",
    tag: "Content Management",
    desc: "A library management system allowing users to track reading progress, write summaries, and manage book collections.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Biz-ID Generator",
    tag: "Utility Tool",
    desc: "An instant business card generator using Canvas API to create and export professional digital identities with QR codes.",
    tech: ["React", "Vite", "Canvas API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800"
  }
];

const skills = [
  { icon: <Code2 size={24}/>, category: "Languages", list: "Java, C++, JavaScript, Python" },
  { icon: <Globe size={24}/>, category: "Frontend", list: "React.js, Tailwind, Framer Motion" },
  { icon: <Server size={24}/>, category: "Backend", list: "Node.js, Express, REST APIs" },
  { icon: <Database size={24}/>, category: "Database", list: "MongoDB, MySQL" }
];

// --- MODERN SWITCH COMPONENT ---
const ModernSwitch = ({ toggleTheme, theme }) => {
  const [dragging, setDragging] = useState(false);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 400, damping: 20 });
  const ropeHeight = useTransform(springY, [0, 200], [0, 200]);

  const handleDragEnd = (_, info) => {
    setDragging(false);
    if (info.offset.y > 80) {
      toggleTheme();
    }
    y.set(0); 
  };

  return (
    <div className="rope-container">
      {/* sleek wire */}
      <svg width="20" height="300" style={{ position: 'absolute', top: 0, overflow:'visible', pointerEvents:'none' }}>
         <motion.line 
           x1="10" y1="0" 
           x2="10" y2={ropeHeight} 
           stroke="var(--rope-color)" 
           strokeWidth="2" 
         />
      </svg>

      {/* modern capsule handle */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 150 }}
        dragElastic={0.1}
        onDragStart={() => setDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ 
          y: springY, 
          marginTop: ropeHeight, 
          cursor: 'grab',
          zIndex: 1000
        }}
      >
        <div style={{ 
          width: '12px', height: '40px', 
          background: theme === 'dark' ? '#334155' : '#e2e8f0', 
          border: '2px solid var(--text-primary)', 
          borderRadius: '20px',
          boxShadow: dragging ? '0 0 20px var(--accent)' : 'none',
          transition: 'box-shadow 0.3s'
        }}>
        </div>
      </motion.div>
    </div>
  );
};

// --- APP COMPONENT ---
function App() {
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    document.body.className = theme === "dark" ? "" : "light-mode";
  }, [theme]);

  return (
    <div className="app">
      {/* Backgrounds */}
      <div className="mesh-background"></div>
      <ModernSwitch theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
      
      {/* Progress Bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'var(--accent)', scaleX, transformOrigin: "0%", zIndex: 100 }} />

      {/* 1. HERO SECTION */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
        <div style={{ maxWidth: '1000px', display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '60px' }}>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
             style={{ flex: '1 1 500px' }}
          >
             <div style={{ display: 'inline-block', padding: '6px 12px', background: 'var(--accent-glow)', color: 'var(--accent)', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600', marginBottom: '20px' }}>
                Available for Hire
             </div>
             <h1>
               Creating Digital <br/>
               Experiences That Matter.
             </h1>
             <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', margin: '24px 0 40px', lineHeight: 1.6, maxWidth: '500px' }}>
               Hi, I'm Jashandeep. A Full Stack Developer specializing in building exceptional digital products with modern technologies.
             </p>
             
             <div style={{ display: 'flex', gap: '16px' }}>
                <a href="#projects" className="btn-primary">
                   View Projects <ChevronRight size={18} />
                </a>
                <a href="/resume.pdf" download className="btn-outline">
                   <Download size={18} /> Resume
                </a>
             </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
             style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}
          >
             <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: -4, background: 'linear-gradient(45deg, var(--accent), transparent)', borderRadius: '50%', opacity: 0.5, filter: 'blur(20px)' }}></div>
                <img src={me} alt="Profile" style={{ width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--card-bg)', position: 'relative' }} />
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SKILLS */}
      <section style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '50px', textAlign: 'center' }}>Technical Expertise</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
             {skills.map((s, i) => (
                <motion.div 
                  key={i} whileHover={{ y: -5 }} 
                  className="pro-card"
                  style={{ textAlign: 'center' }}
                >
                   <div style={{ color: 'var(--accent)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                   <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{s.category}</h3>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{s.list}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. PROJECTS */}
      <section id="projects" style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '60px' }}>Featured Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
             {projects.map((p, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="pro-card"
                  style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
                >
                   <div style={{ height: '300px', overflow: 'hidden' }}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                   </div>
                   <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>{p.tag}</span>
                      <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>{p.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>{p.desc}</p>
                      
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                         {p.tech.map(t => (
                           <span key={t} style={{ fontSize: '0.8rem', padding: '4px 12px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}>{t}</span>
                         ))}
                      </div>

                      <a href={p.link} target="_blank" className="btn-outline" style={{ width: 'fit-content' }}>
                         Visit Project <ExternalLink size={16} />
                      </a>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. EDUCATION */}
      <section style={{ padding: '100px 20px' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '50px', textAlign: 'center' }}>Education History</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
               {education.map((edu, i) => (
                  <motion.div 
                     key={i} 
                     whileHover={{ x: 10 }}
                     className="pro-card"
                     style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}
                  >
                     <div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{edu.degree}</h3>
                        <div style={{ color: 'var(--text-secondary)' }}>{edu.school}</div>
                        <div style={{ fontSize: '0.9rem', marginTop: '8px', opacity: 0.8 }}>{edu.details}</div>
                     </div>
                     <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--accent)' }}>{edu.year}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{edu.grade}</div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. FOOTER */}
      <footer style={{ padding: '80px 20px', textAlign: 'center', borderTop: '1px solid var(--card-border)' }}>
         <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Let's work together.</h2>
         <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Currently open for full-time opportunities and freelance projects.</p>
         
         <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="mailto:jashandeep20445@gmail.com" className="btn-primary">
              <Mail size={18} /> Email Me
            </a>
            <a href="https://linkedin.com/in/jashan23" target="_blank" className="btn-outline">
              <Linkedin size={18} /> LinkedIn
            </a>
         </div>

         <div style={{ marginTop: '80px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            © 2026 Jashandeep. All rights reserved.
         </div>
      </footer>

    </div>
  );
}

export default App;