import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Sun, Moon, Menu, X, Phone, Code2, Cpu, Globe, 
  Award, Briefcase, GraduationCap 
} from "lucide-react";

import me from './me.jpg'; 

// --- DATA ---
const skillsData = [
  { icon: <Code2 />, category: "Languages", skills: ["C", "C++", "Java", "Python", "PHP"] },
  { icon: <Globe />, category: "Frontend", skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Vite"] },
  { icon: <Cpu />, category: "Backend", skills: ["Node.js", "Express.js", "MongoDB", "SQL", "REST APIs"] },
  { icon: <Database />, category: "Tools", skills: ["Git & GitHub", "VS Code", "Canva", "Postman"] }
];

const projects = [
  {
    title: "Vyom Clothing System",
    sub: "Full-Stack E-Commerce",
    desc: "A complete shopping platform. Features include a dynamic product catalog, shopping cart logic, secure checkout integration, and an admin dashboard for inventory management.",
    tech: ["React", "Vite", "Commerce.js", "Stripe"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    img: "https://placehold.co/800x500/1a1a1a/FFF?text=Vyom+Shop+UI" 
  },
  {
    title: "Reading Tracker System",
    sub: "Personal Productivity Tool",
    desc: "An application designed to help users track their reading habits. Users can log books, write chapter summaries, rate titles, and view reading statistics over time.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    img: "https://placehold.co/800x500/111/FFF?text=Reading+Dashboard" 
  },
  {
    title: "Business Card Generator",
    sub: "Dynamic Web Tool",
    desc: "A creative tool allowing professionals to design digital business cards. Features real-time preview, QR code generation, and PDF download capabilities.",
    tech: ["React", "Tailwind CSS", "QR Code API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    img: "https://placehold.co/800x500/222/FFF?text=Card+Creator" 
  }
];

const certifications = [
  { name: "Interpersonal Communication", issuer: "Rice University", date: "Jan 2026", img: "/cert1.jpg" },
  { name: "Generative AI Master", issuer: "Infosys", date: "Aug 2025", img: "/cert2.jpg" },
  { name: "Computational Theory", issuer: "Infosys", date: "Aug 2025", img: "/cert3.jpg" }
];

const education = [
  { school: "Lovely Professional University", degree: "B.Tech CSE", year: "2023 - Present", score: "CGPA: 6.8 (Running)", desc: "Specializing in Full Stack Web Development." },
  { school: "Dr. Asanand Arya Model School", degree: "Intermediate (12th)", year: "2022", score: "88.6%", desc: "Focus on Physics, Chemistry, and Mathematics." },
  { school: "St. Joseph's Convent School", degree: "Matriculation (10th)", year: "2021", score: "83.8%", desc: "Foundation in Computer Applications." }
];

function App() {
  const [views, setViews] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]); // Parallax effect

  useEffect(() => {
    fetch('/api/views', { method: 'POST' })
      .then(res => res.ok ? res.json() : { count: "..." })
      .then(data => setViews(data.count))
      .catch(() => {});
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="bg-gradient-animate">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }}
        style={{ position: 'fixed', width: '100%', height: '80px', zIndex: 100, backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Jashan<span className="gradient-text">.</span></h2>
        <div className="desktop-nav" style={{ display: 'flex', gap: '30px' }}>
          {['About', 'Projects', 'Skills', 'Certificates', 'Contact'].map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1rem', cursor: 'pointer', opacity: 0.8 }}>{item}</button>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-nav" style={{ background: 'none', border: 'none', color: '#fff' }}>
           {menuOpen ? <X/> : <Menu/>}
        </button>
      </motion.nav>

      {/* 1. HERO SECTION (Full Screen Height) */}
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', paddingTop: '80px' }}>
        <div className="container">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 100 }}
            style={{ marginBottom: '40px' }}
          >
            <img src={me} alt="Profile" style={{ width: '250px', height: '250px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #a855f7', padding: '5px', background: 'rgba(255,255,255,0.1)' }} />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontSize: '4rem', fontWeight: 800, margin: '0 0 20px 0', lineHeight: 1.1 }}
          >
            I build <span className="gradient-text">Digital Experiences</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ fontSize: '1.4rem', color: '#9ca3af', maxWidth: '700px', margin: '0 auto 40px' }}
          >
            Hi, I'm <strong>Jashandeep Singh</strong>. A Full-Stack Developer transforming ideas into scalable, high-performance web applications.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
              <button style={{ padding: '18px 40px', fontSize: '1.1rem', fontWeight: 'bold', background: '#fff', color: '#000', border: 'none', borderRadius: '50px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <Download size={20} /> Download CV
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. EDUCATION TIMELINE (Increases Length) */}
      <section style={{ padding: '100px 0', position: 'relative' }}>
        <div className="container">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '80px' }}>
            My Journey
          </motion.h2>

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* The Line */}
            <div className="timeline-line"></div>
            
            {education.map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                style={{ 
                  display: 'flex', 
                  justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                  marginBottom: '60px',
                  position: 'relative'
                }}
              >
                {/* The Dot */}
                <div style={{ position: 'absolute', left: '50%', top: '0', width: '16px', height: '16px', background: '#a855f7', borderRadius: '50%', transform: 'translate(-50%, 0)', border: '4px solid #000', zIndex: 10 }}></div>

                {/* The Card */}
                <div className="glass-panel" style={{ width: '45%', padding: '30px' }}>
                  <span style={{ color: '#a855f7', fontWeight: 'bold', fontSize: '0.9rem' }}>{edu.year}</span>
                  <h3 style={{ margin: '10px 0', fontSize: '1.5rem' }}>{edu.school}</h3>
                  <h4 style={{ margin: '0 0 10px 0', color: '#ccc', fontWeight: 'normal' }}>{edu.degree}</h4>
                  <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>{edu.desc}</p>
                  <div style={{ marginTop: '15px', fontWeight: 'bold', color: '#fff' }}>{edu.score}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SKILLS (Grid of Cards) */}
      <section id="skills" style={{ padding: '100px 0' }}>
        <div className="container">
          <motion.h2 style={{ fontSize: '3rem', marginBottom: '60px' }}>Technical Arsenal</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {skillsData.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel"
                style={{ padding: '30px', borderTop: '4px solid #a855f7' }}
              >
                <div style={{ color: '#a855f7', marginBottom: '20px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{cat.category}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {cat.skills.map(skill => (
                    <span key={skill} style={{ padding: '8px 15px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.9rem' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROJECTS (Zig-Zag Layout) */}
      <section id="projects" style={{ padding: '100px 0' }}>
        <div className="container">
          <motion.h2 style={{ fontSize: '3rem', marginBottom: '80px' }}>Featured Works</motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
            {projects.map((proj, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                style={{ 
                  display: 'flex', 
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', // Zig Zag
                  gap: '60px',
                  alignItems: 'center'
                }}
              >
                {/* Image Side */}
                <div style={{ flex: 1 }}>
                  <div className="glass-panel" style={{ padding: '10px', overflow: 'hidden' }}>
                    <img 
                      src={proj.img} 
                      alt={proj.title} 
                      style={{ width: '100%', height: 'auto', borderRadius: '14px', transition: 'transform 0.5s' }} 
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                </div>
                
                {/* Text Side */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{proj.title}</h3>
                  <h4 style={{ color: '#a855f7', marginBottom: '20px', fontSize: '1.2rem' }}>{proj.sub}</h4>
                  <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '30px' }}>
                    {proj.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
                    {proj.tech.map(t => (
                       <span key={t} style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem', border: '1px solid #333', padding: '5px 15px', borderRadius: '20px' }}>{t}</span>
                    ))}
                  </div>
                  <a href={proj.link} target="_blank" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#a855f7', fontWeight: 'bold' }}>
                    View Live Project <ExternalLink size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CERTIFICATES (Horizontal Scroll) */}
      <section id="certificates" style={{ padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '60px' }}>Certifications</h2>
          <div style={{ 
             display: 'flex', overflowX: 'auto', gap: '40px', paddingBottom: '40px', 
             scrollbarWidth: 'thin', scrollbarColor: '#a855f7 transparent'
          }}>
            {certifications.map((cert, i) => (
              <motion.div 
                key={i}
                className="glass-panel"
                style={{ minWidth: '600px', flexShrink: 0, padding: '0', overflow: 'hidden' }}
              >
                <img src={cert.img} style={{ width: '100%', height: '350px', objectFit: 'contain', background: '#000' }} />
                <div style={{ padding: '30px' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '1.8rem' }}>{cert.name}</h3>
                  <p style={{ color: '#888', fontSize: '1.2rem' }}>{cert.issuer} • {cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" style={{ padding: '100px 0 150px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-panel" style={{ padding: '80px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Ready to Collaborate?</h2>
            <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '50px' }}>
              I am currently looking for Internship/Job opportunities. Drop me a message!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <a href="mailto:jashandeep20445@gmail.com" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '15px 35px', borderRadius: '30px', background: '#a855f7', color: '#fff', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center' }}>
                  <Mail /> Email Me
                </button>
              </a>
              <a href="https://linkedin.com/in/jashan23" target="_blank" style={{ textDecoration: 'none' }}>
                 <button style={{ padding: '15px 35px', borderRadius: '30px', background: 'transparent', color: '#fff', border: '1px solid #fff', fontSize: '1.1rem', fontWeight: 'bold', display:'flex', gap:'10px', alignItems:'center' }}>
                  <Linkedin /> LinkedIn
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ opacity: 0.6 }}>© 2026 Jashandeep Singh • {views ?? "..."} Profile Views</p>
      </footer>
      
    </div>
  );
}

export default App;