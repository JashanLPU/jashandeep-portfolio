import { useEffect, useState } from "react";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Sun, Moon, Menu, X, Award, BookOpen, Phone 
} from "lucide-react";

import me from './me.jpg'; 

[cite_start]// --- 1. SKILLS (Extracted from JASHANDEEP SINGH.pdf) [cite: 83] ---
const skillsData = [
  { category: "Languages", skills: "C, C++, Java, Python, PHP" },
  { category: "Frontend", skills: "HTML, CSS, React, Tailwind, Vite" },
  { category: "Backend", skills: "Node.js, Express.js" },
  { category: "Tools & Platforms", skills: "Canva, VS Code, Github, Notepad++" },
  { category: "Soft Skills", skills: "Adaptability, Communication, Creativity" }
];

[cite_start]// --- 2. PROJECTS (3 Live Projects + 2 Academic from CV) [cite: 86-95] ---
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

[cite_start]// --- 3. CERTIFICATIONS (Extracted from uploaded PDFs) [cite: 37, 57, 70] ---
const certifications = [
  { 
    name: "Interpersonal Communication for Engineering Leaders", 
    issuer: "Rice University (Coursera)",
    date: "Jan 28, 2026",
    img: "/cert1.jpg" // Screenshot of Coursera WRLTNISUTPH9.pdf
  },
  { 
    name: "Master Generative AI & Generative AI Tools", 
    issuer: "Infosys Springboard",
    date: "Aug 11, 2025",
    img: "/cert2.jpg" // Screenshot of 1-7b6e8b11...pdf
  },
  { 
    name: "Computational Theory: Language Principle & Finite Automata", 
    issuer: "Infosys Springboard",
    date: "Aug 05, 2025",
    img: "/cert3.jpg" // Screenshot of 1-254c979c...pdf
  }
];

[cite_start]// --- 4. EDUCATION (Extracted from CV) [cite: 109-120] ---
const education = [
  {
    school: "Lovely Professional University",
    degree: "B.Tech - Computer Science & Engineering",
    score: "CGPA: 6.8 (Running)",
    year: "Aug 2023 - Present"
  },
  {
    school: "Dr. Asanand Arya Model Senior Secondary School",
    degree: "Intermediate (12th)",
    score: "Percentage: 88.6%",
    year: "2022"
  },
  {
    school: "St. Joseph's Convent School",
    degree: "Matriculation (10th)",
    score: "Percentage: 83.8%",
    year: "2021"
  }
];

[cite_start]// --- 5. ACHIEVEMENTS & ACADEMIC WORK [cite: 86, 91, 103] ---
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

  // View Counter
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
          <button onClick={() => scrollTo('skills')} className="nav-btn">Skills</button>
          <button onClick={() => scrollTo('projects')} className="nav-btn">Projects</button>
          <button onClick={() => scrollTo('certifications')} className="nav-btn">Certificates</button>
          <button onClick={() => scrollTo('education')} className="nav-btn">Education</button>
          
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
          <button onClick={() => scrollTo('skills')} className="nav-btn">Skills</button>
          <button onClick={() => scrollTo('projects')} className="nav-btn">Projects</button>
          <button onClick={() => scrollTo('certifications')} className="nav-btn">Certificates</button>
          <button onClick={() => scrollTo('education')} className="nav-btn">Education</button>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>

        [cite_start]{/* 1. ABOUT ME [cite: 85] */}
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

        {/* 2. SKILLS (Table Format from CV) */}
        <section id="skills" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block' }}>
            2. Skills & Technologies
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

        {/* 3. PROJECTS */}
        <section id="projects" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block' }}>
            3. Projects
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '20px' }}>
            {projects.map((proj, i) => (
              <div key={i} style={{ background: 'var(--bg-color)', border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden' }}>
                {/* Project Image */}
                <div style={{ height: '160px', background: '#222', backgroundImage: `url(${proj.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                
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

        {/* 4. CERTIFICATIONS (PDF Data) */}
        <section id="certifications" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px' }}>
            4. Certifications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ 
                border: '1px solid var(--glass-border)', 
                padding: '15px', 
                borderRadius: '8px', 
                display:'flex', 
                gap:'15px', 
                alignItems:'center',
                background: 'var(--bg-color)'
              }}>
                {/* Cert Image Thumbnail */}
                <div style={{ width: '80px', height: '60px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                   <img src={cert.img} alt="cert" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '0.95rem', lineHeight: '1.3' }}>{cert.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {cert.issuer}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent)' }}>{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. EDUCATION (CV Data) */}
        <section id="education" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px' }}>
            5. Education
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Institute / School</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {education.map((edu, i) => (
                  <tr key={i}>
                    <td>
                      <strong style={{ display: 'block', fontSize: '1.05rem' }}>{edu.school}</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Punjab, India</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 'bold' }}>{edu.degree}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{edu.score}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>{edu.year}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. ACHIEVEMENTS (CV Data) */}
        <section className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px' }}>
            6. Achievements & Activities
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {achievements.map((item, i) => (
              <li key={i} style={{ 
                background: 'rgba(34, 197, 94, 0.1)', 
                borderLeft: '5px solid #22c55e', 
                padding: '15px', 
                marginBottom: '10px',
                borderRadius: '0 5px 5px 0'
              }}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 7. CONTENT / BLOG (Placeholder) */}
        <section id="contact" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px' }}>
            7. Content Creation
          </h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)', padding: '15px', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
              <BookOpen size={24} className="text-blue-500"/> Tech Blog
            </a>
          </div>
        </section>

        {/* 8. RESUME DOWNLOAD */}
        <section style={{ textAlign: 'center', marginTop: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>8. Resume</h2>
          <a href="/resume.pdf" download style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 30px', background: 'var(--text-primary)', color: 'var(--bg-color)', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
            <Download size={20} /> Download Resume
          </a>
        </section>

      </div>
      
      {/* FOOTER */}
      <footer style={{ textAlign: 'center', background: 'var(--table-header)', padding: '20px', marginTop: '50px' }}>
        <p>© 2026 Jashandeep Singh</p>
        <div style={{ fontSize: '0.8rem', marginTop: '5px', opacity: 0.7 }}>
          <Database size={10} style={{ display: 'inline', marginRight: '5px' }} /> 
          Database Views: {views ?? "..."}
        </div>
      </footer>

    </div>
  );
}

export default App;