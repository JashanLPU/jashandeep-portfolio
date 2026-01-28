import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Youtube, BookOpen, Sun, Moon 
} from "lucide-react";

import me from './me.jpg';

// --- DATA (Jashandeep's Details) ---
const skillsData = [
  { category: "Programming Languages", skills: "JavaScript (Advanced), C++, Python, Java" },
  { category: "Frontend Development", skills: "React (Advanced), Tailwind CSS, Vite, HTML5" },
  { category: "Backend Development", skills: "Node.js, Express.js, MongoDB (Mongoose)" },
  { category: "Tools & DevOps", skills: "Git, GitHub, Vercel, Postman" },
];

const projects = [
  {
    title: "Vyom Clothing System",
    desc: "A modern e-commerce platform for clothing with cart, checkout, and payment integration.",
    tech: "React, Vite, Commerce.js",
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/"
  },
  {
    title: "Reading Tracker System",
    desc: "A full-stack application to track reading habits, book progress, and personalized notes.",
    tech: "React, Node.js, MongoDB",
    link: "https://reading-tracker-system1-vkbm.vercel.app/" 
  },
  {
    title: "Business Card Generator",
    desc: "A dynamic tool to create and customize digital business cards instantly.",
    tech: "React, Vite, Tailwind",
    link: "https://business-card-generator-mddw.vercel.app/" 
  }
];

const experience = [
  {
    role: "Full Stack Developer (Freelance)",
    company: "Self-Employed",
    duration: "2024 - Present",
    desc: "Developed and deployed multiple full-stack applications including e-commerce platforms and tracking systems."
  },
  {
    role: "Web Development Intern",
    company: "Local Tech Firm (Example)",
    duration: "June 2023 - Aug 2023",
    desc: "Assisted in building responsive UI components using React.js and optimized database queries."
  }
];

const certifications = [
  "Full Stack Web Development - Udemy",
  "React JS Certification - HackerRank",
  "JavaScript Algorithms and Data Structures - freeCodeCamp"
];

const achievements = [
  "Secured 1st place in University Code-a-Thon 2024.",
  "Rated 5 stars in problem solving on HackerRank.",
  "Contributed to open-source React libraries on GitHub."
];

function App() {
  const [views, setViews] = useState(null);
  const [theme, setTheme] = useState("dark");

  // Toggle Theme Logic
  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    // Apply theme class to body
    document.body.className = theme === "dark" ? "" : "light-mode";
  }, [theme]);

  // DB View Counter
  useEffect(() => {
    fetch('/api/views', { method: 'POST' })
      .then(async (res) => {
        if (!res.ok) throw new Error("API Failed");
        return res.json();
      })
      .then(data => setViews(data.count))
      .catch(err => console.log("Backend not active locally"));
  }, []);

  return (
    <div className="app">
      
      {/* Navbar with Theme Toggle */}
      <nav style={{ 
        position: 'fixed', top: 0, width: '100%', 
        background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', 
        borderBottom: '1px solid var(--glass-border)', zIndex: 50 
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
          <h2 style={{ fontWeight: 800, margin: 0 }}>Jashandeep<span className="gradient-text">.</span></h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Theme Button */}
            <button 
              onClick={toggleTheme} 
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Available for hire</div>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '120px' }}>
        
        {/* 1. WELCOME / ABOUT ME */}
        <section id="about" style={{ marginBottom: '80px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <img src={me} alt="Jashandeep Singh" className="profile-img" />
            
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '20px' }}>
                Hi, I’m <span className="gradient-text">Jashandeep Singh</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                A <strong>B.Tech Computer Science</strong> student at <strong>Lovely Professional University</strong>, 
                specializing in <strong>Full-Stack Development</strong>. 
                I focus on building scalable applications and have a solid foundation in both front-end and back-end development[cite: 3, 4].
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Mail size={16}/> contact@jashandeep.dev</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Linkedin size={16}/> /in/jashandeep-singh</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Github size={16}/> github.com/JashanLPU</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. SKILLS (Table Format) */}
        <section id="skills" style={{ marginBottom: '80px' }}>
          <h2 style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '10px', marginBottom: '20px', display: 'inline-block' }}>2. Skills & Technologies</h2>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Category</th>
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
        <section id="projects" style={{ marginBottom: '80px' }}>
          <h2 style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '10px', marginBottom: '20px', display: 'inline-block' }}>3. Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {projects.map((proj, i) => (
              <motion.div key={i} className="card" whileHover={{ y: -5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>{proj.title}</h3>
                  <a href={proj.link} target="_blank" style={{ color: 'var(--accent)' }}><ExternalLink size={20}/></a>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>{proj.desc}</p>
                <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}><strong>Tech:</strong> {proj.tech}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. CERTIFICATIONS */}
        <section id="certifications" style={{ marginBottom: '80px' }}>
          <h2 style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '10px', marginBottom: '20px', display: 'inline-block' }}>4. Certifications & Courses</h2>
          <div className="card">
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              {certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. EXPERIENCE (Table Format) */}
        <section id="experience" style={{ marginBottom: '80px' }}>
          <h2 style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '10px', marginBottom: '20px', display: 'inline-block' }}>5. Experience</h2>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Role / Company</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {experience.map((exp, i) => (
                  <tr key={i}>
                    <td>
                      <strong style={{ display: 'block' }}>{exp.role}</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{exp.company} <br/> ({exp.duration})</span>
                    </td>
                    <td>{exp.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. ACHIEVEMENTS */}
        <section id="achievements" style={{ marginBottom: '80px' }}>
          <h2 style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '10px', marginBottom: '20px', display: 'inline-block' }}>6. Achievements</h2>
          <div className="card">
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {achievements.map((item, i) => (
                <li key={i} style={{ 
                  borderLeft: '4px solid #22c55e', 
                  padding: '10px 15px', 
                  margin: '10px 0',
                  background: 'var(--glass-bg)'
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. BLOG & CONTENT */}
        <section id="content" style={{ marginBottom: '80px' }}>
          <h2 style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '10px', marginBottom: '20px', display: 'inline-block' }}>7. Blog & Content</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href="#" className="card" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
              <BookOpen size={24} className="text-blue-500"/> Tech Blog
            </a>
            <a href="#" className="card" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
              <Youtube size={24} className="text-red-500"/> YouTube Channel
            </a>
          </div>
        </section>

        {/* 8. RESUME */}
        <section id="resume" style={{ textAlign: 'center', marginBottom: '100px', borderTop: '1px solid var(--glass-border)', paddingTop: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>8. Resume</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Download my detailed CV in PDF format[cite: 29].</p>
          <a href="/resume.pdf" download className="btn-primary">
            <Download size={20} /> Download Resume
          </a>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: 'center', borderTop: '1px solid var(--glass-border)', padding: '30px 0', color: 'var(--text-secondary)' }}>
          <p>© 2026 Jashandeep Singh | B.Tech CSE Portfolio</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--glass-bg)', padding: '5px 15px', borderRadius: '20px', marginTop: '10px' }}>
             <Database size={12} color="#22c55e" />
             <span style={{ fontSize: '0.8rem' }}>DB Views: <strong>{views ?? "..."}</strong></span>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;