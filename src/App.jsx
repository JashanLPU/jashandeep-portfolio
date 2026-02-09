import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Code, Terminal, Database, Cpu, ChevronRight
} from "lucide-react";

import me from './me.jpg'; 

// --- YOUR DATA ---
const projects = [
  {
    title: "Vyom Clothing",
    type: "E-Commerce",
    desc: "A premium fashion store. Features a dynamic product cart, secure Stripe checkout, and Commerce.js integration for a seamless shopping experience.",
    tech: ["React.js", "Commerce.js", "Stripe"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    // Using a reliable placeholder image that fits the theme
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Story Verse",
    type: "Library System",
    desc: "A personal library assistant. Track reading progress, write chapter summaries, and rate your book collection in a digital archive.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Biz-ID Generator",
    type: "Professional Tool",
    desc: "Create professional digital identities in seconds. Real-time customization using Canvas API and instant PDF export.",
    tech: ["React", "Vite", "Canvas API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800"
  }
];

const education = [
  {
    school: "Lovely Professional University",
    degree: "B.Tech CSE (Full Stack)",
    year: "2023 - Present",
    score: "CGPA: 6.8"
  },
  {
    school: "Dr. Asanand Arya Model School",
    degree: "Senior Secondary (12th)",
    year: "2022",
    score: "88.6%"
  },
  {
    school: "St. Joseph's Convent School",
    degree: "Matriculation (10th)",
    year: "2021",
    score: "83.8%"
  }
];

const skills = [
  { 
    category: "Languages", 
    icon: <Terminal size={24}/>, 
    list: "Java, C++, JavaScript, Python" 
  },
  { 
    category: "Frontend", 
    icon: <Code size={24}/>, 
    list: "React.js, Tailwind CSS, HTML5, Framer Motion" 
  },
  { 
    category: "Backend", 
    icon: <Cpu size={24}/>, 
    list: "Node.js, Express, REST APIs" 
  },
  { 
    category: "Database & Tools", 
    icon: <Database size={24}/>, 
    list: "MongoDB, MySQL, Git, VS Code, Postman" 
  }
];

// --- ANIMATION HELPERS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function App() {
  return (
    <div className="app">
      <div className="bg-glow"></div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Jashandeep<span style={{color:'var(--accent)'}}>.</span></div>
        <div className="nav-links">
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#education" className="nav-link">Education</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="hero-content"
        >
          <div className="profile-container">
            <img src={me} alt="Jashandeep" className="profile-img" />
          </div>
          
          <h1>Building Digital Experiences That Matter.</h1>
          <p className="subtitle">
            Hi, I'm Jashandeep. I build accessible, pixel-perfect, and performant web applications using the MERN stack.
          </p>

          <div className="btn-group">
            <a href="#projects" className="btn btn-primary">
              View Work <ChevronRight size={18} />
            </a>
            <a href="/resume.pdf" download className="btn btn-secondary">
              <Download size={18} /> Download CV
            </a>
          </div>
        </motion.div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills">
        <h2 className="section-title">Technical <span>Expertise</span></h2>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid"
        >
          {skills.map((s, i) => (
            <motion.div variants={fadeInUp} key={i} className="card skill-card">
              <div className="skill-icon">{s.icon}</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{s.category}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{s.list}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects">
        <h2 className="section-title">Featured <span>Projects</span></h2>
        <div className="grid">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div className="project-img-wrapper">
                <img src={p.image} alt={p.title} className="project-img" />
              </div>
              <div className="card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.4rem' }}>{p.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>{p.type}</span>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', margin: '12px 0', fontSize: '0.95rem' }}>
                  {p.desc}
                </p>

                <div className="tags">
                  {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>

                <a href={p.link} target="_blank" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  Visit Live Site <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education">
        <h2 className="section-title">Education <span>History</span></h2>
        <div className="timeline">
          {education.map((edu, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="timeline-item"
            >
              <div className="timeline-dot"></div>
              <div style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '4px' }}>
                {edu.year}
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{edu.degree}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{edu.school}</p>
              <p style={{ fontWeight: 600, marginTop: '8px' }}>{edu.score}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '20px' }}>Let's work together.</h2>
        <p style={{ marginBottom: '40px' }}>Open for full-time opportunities.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '60px' }}>
          <a href="mailto:jashandeep20445@gmail.com" className="btn btn-primary">
            <Mail size={18} /> Email Me
          </a>
          <a href="https://linkedin.com/in/jashan23" target="_blank" className="btn btn-secondary">
            <Linkedin size={18} /> LinkedIn
          </a>
        </div>

        <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
          © 2026 Jashandeep. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;