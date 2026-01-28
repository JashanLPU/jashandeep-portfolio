import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, Database, MapPin, GraduationCap, 
  ExternalLink, ArrowRight, Download, FileText, 
  Award, Layers, Trophy, Mail, Linkedin, Github 
} from "lucide-react";

// --- IMPORT YOUR PHOTO ---
import me from './me.jpg';

// --- DATA CONFIGURATION ---

const projects = [
  {
    title: "Vyom Clothing System",
    desc: "A modern e-commerce platform for clothing with cart, checkout, and payment integration.",
    tags: ["React", "Vite", "Commerce"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/"
  },
  {
    title: "Reading Tracker System",
    desc: "A full-stack application to track reading habits, book progress, and personalized notes.",
    tags: ["React", "Node.js", "MongoDB"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/" 
  },
  {
    title: "Business Card Generator",
    desc: "A dynamic tool to create and customize digital business cards instantly.",
    tags: ["React", "Vite", "Tailwind"],
    link: "https://business-card-generator-mddw.vercel.app/" 
  }
];

const certifications = [
  { name: "Full Stack Web Development", issuer: "Udemy", link: "#" },
  { name: "React JS Certification", issuer: "HackerRank", link: "#" },
  // Add more certifications here
];

const achievements = [
  { title: "Hackathon Winner", desc: "Secured 1st place in University Code-a-Thon 2024." },
  { title: "5 Star Coder", desc: "Rated 5 stars in problem solving on HackerRank." },
  { title: "Open Source", desc: "Contributed to multiple React libraries on GitHub." }
];

function App() {
  const [views, setViews] = useState(null);

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
      
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <h2 style={{ fontWeight: 800 }}>Jashandeep<span className="gradient-text">.</span></h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#888' }}>
            <div className="status-dot"></div>
            <span>Available for hire</span>
          </div>
        </div>
      </nav>

      <div className="container">
        
        {/* 1. ABOUT ME */}
        <section className="hero" style={{ paddingBottom: '40px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={me} alt="Jashandeep Singh" className="profile-img" />

            <span className="badge">Full Stack Developer</span>
            
            <h1 style={{ marginBottom: '20px' }}>
              Building scalable <br />
              <span className="gradient-text">Web Applications.</span>
            </h1>
            
            <p style={{ maxWidth: '700px' }}>
              I am a passionate software engineer based in <b style={{color:'white'}}>Punjab, India</b>. 
              I specialize in the MERN stack (MongoDB, Express, React, Node.js) and building high-performance 
              digital experiences for global clients.
            </p>
          </motion.div>
        </section>

        {/* 2. RESUME */}
        <section style={{ marginBottom: '80px' }}>
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            style={{ padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>My Resume</h3>
              <p style={{ color: '#888' }}>Download my CV to view my detailed work history and qualifications.</p>
            </div>
            <a href="/resume.pdf" download className="btn-primary" style={{ cursor: 'pointer' }}>
              <Download size={18} /> Download CV
            </a>
          </motion.div>
        </section>

        {/* 3. SKILLS */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', display:'flex', alignItems:'center', gap:'10px' }}>
            <Layers size={28} className="text-purple-500"/> Technical Skills
          </h2>
          <div className="info-grid">
            <motion.div className="card" whileHover={{ y: -5 }}>
              <Code2 size={24} color="#3b82f6" />
              <h3>Frontend</h3>
              <p>React, Next.js, Tailwind, Vite, Redux</p>
            </motion.div>
            <motion.div className="card" whileHover={{ y: -5 }}>
              <Database size={24} color="#22c55e" />
              <h3>Backend</h3>
              <p>Node.js, Express, MongoDB, Mongoose, REST API</p>
            </motion.div>
            <motion.div className="card" whileHover={{ y: -5 }}>
              <GraduationCap size={24} color="#a855f7" />
              <h3>Core</h3>
              <p>Data Structures, Algorithms, JavaScript (ES6+), Git</p>
            </motion.div>
          </div>
        </section>

        {/* 4. PROJECTS */}
        <section id="projects" style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Featured Work</h2>
          {projects.map((proj, i) => (
            <motion.div 
              key={i}
              className="project-card"
              whileHover={{ y: -5 }}
            >
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{proj.title}</h3>
                <p style={{ color: '#a3a3a3', marginBottom: '20px' }}>{proj.desc}</p>
                <div style={{ display: 'flex', gap:'10px' }}>
                  {proj.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
              <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: 'white', background:'#ffffff10', padding:'12px', borderRadius:'50%' }}>
                <ExternalLink size={20} />
              </a>
            </motion.div>
          ))}
        </section>

        {/* 5. CERTIFICATIONS */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', display:'flex', alignItems:'center', gap:'10px' }}>
            <Award size={28} className="text-yellow-500"/> Certifications
          </h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            {certifications.map((cert, i) => (
              <motion.a 
                key={i}
                href={cert.link}
                target="_blank"
                className="card"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}
                whileHover={{ x: 5, borderColor: '#a855f7' }}
              >
                <div>
                  <h4 style={{ color: 'white', fontSize: '1.1rem' }}>{cert.name}</h4>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>Issued by {cert.issuer}</span>
                </div>
                <ExternalLink size={16} color="#666" />
              </motion.a>
            ))}
          </div>
        </section>

        {/* 6. ACHIEVEMENTS (New) */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', display:'flex', alignItems:'center', gap:'10px' }}>
            <Trophy size={28} className="text-orange-500"/> Achievements
          </h2>
          <div className="info-grid">
            {achievements.map((item, i) => (
              <motion.div 
                key={i} 
                className="card" 
                whileHover={{ y: -5 }}
                style={{ borderColor: 'rgba(249, 115, 22, 0.2)' }}
              >
                <h3 style={{ color: '#fb923c' }}>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. CONTACT (New) */}
        <section id="contact" style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Get In Touch</h2>
          <div style={{ padding: '40px', background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Let's Work Together</h3>
            <p style={{ color: '#888', marginBottom: '30px', maxWidth:'500px', margin:'0 auto 30px' }}>
              I am currently available for freelance projects and full-time opportunities. 
              Let's build something amazing.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <a href="mailto:contact@jashandeep.dev" className="btn-primary" style={{ minWidth: '160px', justifyContent:'center' }}>
                <Mail size={18} /> Email Me
              </a>
              <a href="https://linkedin.com/in/your-profile" target="_blank" className="btn-secondary" style={{ minWidth: '160px', justifyContent:'center', display:'flex', alignItems:'center', gap:'8px' }}>
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href="https://github.com/JashanLPU" target="_blank" className="btn-secondary" style={{ minWidth: '160px', justifyContent:'center', display:'flex', alignItems:'center', gap:'8px' }}>
                <Github size={18} /> GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 Jashandeep Singh. All rights reserved.</p>
          <div className="db-stats">
            <Database size={14} color="#22c55e" />
            <span>Profile Views: <strong style={{ color: 'white' }}>{views ?? "..."}</strong></span>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;