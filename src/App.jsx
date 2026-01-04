import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, Database, MapPin, GraduationCap, 
  ExternalLink, ArrowRight 
} from "lucide-react";

// --- IMPORT YOUR PHOTO HERE ---
// Ensure 'me.jpg' is inside the 'src' folder
import me from './me.jpg';

// --- UPDATED PROJECTS ---
const projects = [
  {
    title: "Reading Tracker System",
    desc: "A full-stack application to track reading habits and book progress.",
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

function App() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    // This connects to the Vercel backend.
    // It works perfectly when deployed online.
    fetch('/api/views', { method: 'POST' })
      .then(res => res.json())
      .then(data => setViews(data.count))
      .catch(err => console.log("Backend API not available locally"));
  }, []);

  return (
    <div className="app">
      
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <h2 style={{ fontWeight: 800 }}>Jashandeep<span className="gradient-text">.</span></h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#888' }}>
            <div className="status-dot"></div>
            <span>Available for work</span>
          </div>
        </div>
      </nav>

      <div className="container">
        
        {/* Hero Section */}
        <section className="hero">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* --- YOUR PROFILE PICTURE --- */}
            <img src={me} alt="Jashandeep Singh" className="profile-img" />

            <span className="badge">Full Stack MERN Developer</span>
            
            <h1>
              Hi, I'm <span className="gradient-text">Jashandeep Singh</span>
            </h1>
            
            <p>
              I am 21 years old and a developer from <b style={{color:'white'}}>Nawanshahr, Punjab</b>. 
              Currently studying <b style={{color:'white'}}>B.Tech CSE (6th Sem)</b> at <b style={{color:'white'}}>Lovely Professional University</b>.
            </p>
            
            <div className="btn-group">
              <a href="#projects" className="btn-primary">
                View Projects <ArrowRight size={18} />
              </a>
              <button className="btn-secondary">Contact Me</button>
            </div>
          </motion.div>
        </section>

        {/* Info Grid */}
        <section className="info-grid">
          <motion.div 
            className="card"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            <GraduationCap size={24} color="#a855f7" />
            <h3>Education</h3>
            <p>Lovely Professional University</p>
          </motion.div>
          <motion.div 
            className="card"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            <MapPin size={24} color="#3b82f6" />
            <h3>Location</h3>
            <p>Nawanshahr, Punjab</p>
          </motion.div>
          <motion.div 
            className="card"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            <Code2 size={24} color="#22c55e" />
            <h3>Tech Stack</h3>
            <p>MERN (React + Node)</p>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects">
          <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Live Projects</h2>
          {projects.map((proj, i) => (
            <motion.div 
              key={i}
              className="project-card"
              whileHover={{ y: -5 }}
            >
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{proj.title}</h3>
                <p style={{ color: '#a3a3a3', marginBottom: '20px' }}>{proj.desc}</p>
                <div style={{ display: 'flex' }}>
                  {proj.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
              <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: 'white', background:'#ffffff10', padding:'10px', borderRadius:'50%' }}>
                <ExternalLink size={20} />
              </a>
            </motion.div>
          ))}
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 Jashandeep Singh</p>
          <div className="db-stats">
            <Database size={14} color="#22c55e" />
            <span>DB Views: <strong style={{ color: 'white' }}>{views ?? "Loading..."}</strong></span>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;