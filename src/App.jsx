import { useEffect, useState } from "react";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Sun, Moon, Menu, X, Phone, BookOpen 
} from "lucide-react";

import me from './me.jpg'; 

// --- DATA CONFIGURATION ---

const skillsData = [
  { category: "Languages", skills: "C, C++, Java, Python, PHP" },
  { category: "Frontend", skills: "HTML, CSS, React, Tailwind, Vite" },
  { category: "Backend", skills: "Node.js, Express.js" },
  { category: "Tools", skills: "Canva, VS Code, Github, Notepad++" },
  { category: "Soft Skills", skills: "Adaptability, Communication, Creativity" }
];

const projects = [
  {
    title: "Vyom Clothing System",
    sub: "Live E-Commerce",
    desc: "A modern e-commerce platform for clothing with cart, checkout, and payment integration.",
    tech: "React, Vite, Commerce.js",
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    img: "https://placehold.co/600x300/111/FFF?text=Vyom+Clothing" 
  },
  {
    title: "Reading Tracker System",
    sub: "Live Utility Tool",
    desc: "A full-stack application to track reading habits, book progress, and personalized notes.",
    tech: "React, Node.js, MongoDB",
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    img: "https://placehold.co/600x300/222/FFF?text=Reading+Tracker" 
  },
  {
    title: "Business Card Generator",
    sub: "Live Dynamic Tool",
    desc: "A tool to create and customize digital business cards instantly with downloadable options.",
    tech: "React, Vite, Tailwind",
    link: "https://business-card-generator-mddw.vercel.app/",
    img: "https://placehold.co/600x300/333/FFF?text=Card+Generator" 
  }
];

const certifications = [
  { 
    name: "Interpersonal Communication for Engineering Leaders", 
    issuer: "Rice University (Coursera)",
    date: "Jan 28, 2026",
    img: "/cert1.jpg" // Make sure this is a real screenshot in public folder
  },
  { 
    name: "Master Generative AI & Generative AI Tools", 
    issuer: "Infosys Springboard",
    date: "Aug 11, 2025",
    img: "/cert2.jpg" 
  },
  { 
    name: "Computational Theory: Language Principle & Finite Automata", 
    issuer: "Infosys Springboard",
    date: "Aug 05, 2025",
    img: "/cert3.jpg" 
  }
];

const achievements = [
  "Completed Tree-Plantation Initiative with Ek Noor Sewa Sevi Sanstha (Aug 2025).",
  "Developed 'Civic Pulse' - A Public Grievance Management System (PHP/MySQL).",
  "Built 'Iron Core' - An AI-integrated Gym Guidance Website."
];

function App() {
  const [views, setViews] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => setTheme(curr => curr === "dark" ? "light" : "dark");

  useEffect(() => {
    document.body.className = theme === "dark" ? "" : "light-mode";
  }, [theme]);

  useEffect(() => {
    fetch('/api/views', { method: 'POST' })
      .then(res => res.ok ? res.json() : { count: "..." })
      .then(data => setViews(data.count))
      .catch(() => console.log("Backend offline locally"));
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="app">
      
      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <h2 style={{ fontWeight: 800, fontSize: '1.5rem', margin: 0 }}>
          Jashandeep<span className="gradient-text">.</span>
        </h2>

        <div className="nav-links">
          <button onClick={() => scrollTo('about')} className="nav-btn">About</button>
          <button onClick={() => scrollTo('resume')} className="nav-btn">Resume</button>
          <button onClick={() => scrollTo('skills')} className="nav-btn">Skills</button>
          <button onClick={() => scrollTo('projects')} className="nav-btn">Projects</button>
          <button onClick={() => scrollTo('certifications')} className="nav-btn">Certificates</button>
          <button onClick={() => scrollTo('achievements')} className="nav-btn">Achievements</button>
          <button onClick={() => scrollTo('contact')} className="nav-btn">Contact</button>
          
          <button onClick={toggleTheme} className="nav-btn">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-dropdown">
          <button onClick={() => scrollTo('about')} className="nav-btn">About</button>
          <button onClick={() => scrollTo('resume')} className="nav-btn">Resume</button>
          <button onClick={() => scrollTo('skills')} className="nav-btn">Skills</button>
          <button onClick={() => scrollTo('projects')} className="nav-btn">Projects</button>
          <button onClick={() => scrollTo('certifications')} className="nav-btn">Certificates</button>
          <button onClick={() => scrollTo('achievements')} className="nav-btn">Achievements</button>
          <button onClick={() => scrollTo('contact')} className="nav-btn">Contact</button>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>

        {/* 1. ABOUT ME */}
        <section id="about" className="section-card" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
            <img src={me} alt="Jashandeep Singh" className="profile-img" />
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Hi, I’m Jashandeep Singh</h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                A <strong>B.Tech Computer Science</strong> student at <strong>Lovely Professional University</strong>. 
                I focus on building scalable applications and have a solid foundation in both front-end and back-end development.
              </p>
              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', fontSize: '0.95rem' }}>
                <span style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <Phone size={16} color="var(--accent)"/> +91 62837 57858
                </span>
                <span style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <Mail size={16} color="var(--accent)"/> Jashandeep20445@gmail.com
                </span>
                <span style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <Linkedin size={16} color="var(--accent)"/> <a href="https://linkedin.com/in/jashan23" target="_blank" style={{ color: 'inherit', textDecoration:'none' }}>/in/jashan23</a>
                </span>
                <span style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <Github size={16} color="var(--accent)"/> <a href="https://github.com/JashanLPU" target="_blank" style={{ color: 'inherit', textDecoration:'none' }}>/JashanLPU</a>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. RESUME */}
        <section id="resume" className="section-card" style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px' }}>
            2. Resume
          </h2>
          <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>
            Check out my full professional background, education, and experience.
          </p>
          <a href="/resume.pdf" download style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '15px 35px', background: 'var(--text-primary)', color: 'var(--bg-color)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
            <Download size={22} /> Download My CV
          </a>
        </section>

        {/* 3. SKILLS */}
        <section id="skills" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block' }}>
            3. Skills & Technologies
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Category</th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>
                {skillsData.map((item, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 'bold' }}>{item.category}</td>
                    <td>{item.skills}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. PROJECTS */}
        <section id="projects" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block' }}>
            4. Projects
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '20px' }}>
            {projects.map((proj, i) => (
              <div key={i} style={{ background: 'var(--bg-color)', border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden' }}>
                {/* Project Image */}
                <div style={{ height: '180px', background: '#222', backgroundImage: `url(${proj.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: '0 0 5px 0' }}>{proj.title}</h3>
                    <a href={proj.link} target="_blank"><ExternalLink size={18} color="var(--accent)"/></a>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '15px' }}>{proj.sub}</p>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '15px' }}>{proj.desc}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 'bold' }}>Tech: {proj.tech}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CERTIFICATIONS (BIG PICTURES) */}
        <section id="certifications" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block', marginBottom: '30px' }}>
            5. Certifications
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ 
                border: '1px solid var(--glass-border)', 
                borderRadius: '12px', 
                overflow: 'hidden',
                background: 'var(--bg-color)'
              }}>
                {/* LARGE Cert Image */}
                <div style={{ width: '100%', borderBottom: '1px solid var(--glass-border)' }}>
                   <img src={cert.img} alt={cert.name} style={{ width:'100%', display: 'block' }} />
                </div>
                
                <div style={{ padding: '20px' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>{cert.name}</h3>
                  <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-secondary)' }}>
                    <strong>Issued By:</strong> {cert.issuer}
                  </p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '1rem', color: 'var(--accent)' }}>
                    <strong>Date:</strong> {cert.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. ACHIEVEMENTS */}
        <section id="achievements" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px' }}>
            6. Achievements
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {achievements.map((item, i) => (
              <li key={i} style={{ 
                background: 'rgba(34, 197, 94, 0.1)', 
                borderLeft: '5px solid #22c55e', 
                padding: '20px', 
                marginBottom: '15px',
                borderRadius: '0 8px 8px 0',
                fontSize: '1.05rem'
              }}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 7. CONTACT */}
        <section id="contact" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px' }}>
            7. Contact Me
          </h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href="mailto:Jashandeep20445@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)', padding: '20px', border: '1px solid var(--glass-border)', borderRadius: '8px', flex: 1, minWidth: '250px', justifyContent: 'center', background: 'var(--bg-color)' }}>
              <Mail size={24} className="text-blue-500"/> Email Me
            </a>
            <a href="https://linkedin.com/in/jashan23" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)', padding: '20px', border: '1px solid var(--glass-border)', borderRadius: '8px', flex: 1, minWidth: '250px', justifyContent: 'center', background: 'var(--bg-color)' }}>
              <Linkedin size={24} className="text-blue-700"/> LinkedIn
            </a>
            <a href="https://github.com/JashanLPU" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)', padding: '20px', border: '1px solid var(--glass-border)', borderRadius: '8px', flex: 1, minWidth: '250px', justifyContent: 'center', background: 'var(--bg-color)' }}>
              <Github size={24} className="text-purple-500"/> GitHub
            </a>
          </div>
        </section>

      </div>
      
      {/* FOOTER */}
      <footer style={{ textAlign: 'center', background: 'var(--table-header)', padding: '30px', marginTop: '50px' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>© 2026 Jashandeep Singh</p>
        <div style={{ fontSize: '0.85rem', marginTop: '10px', opacity: 0.7 }}>
          <Database size={12} style={{ display: 'inline', marginRight: '5px' }} /> 
          Database Views: {views ?? "..."}
        </div>
      </footer>

    </div>
  );
}

export default App;