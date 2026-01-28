import { useEffect, useState } from "react";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Database, Youtube, BookOpen, Sun, Moon, Menu, X 
} from "lucide-react";

import me from './me.jpg'; 

// --- DATA ---
const skillsData = [
  { category: "Programming Languages", skills: "Python (Advanced), Java, C++, JavaScript (Advanced)" },
  { category: "Frontend Development", skills: "HTML5 (Advanced), CSS3 (Advanced), Next.js (Intermediate)" },
  { category: "Backend Development", skills: "Node.js (Advanced), Express.js (Intermediate)" },
  { category: "Databases", skills: "MySQL (Intermediate), MongoDB" },
];

const projects = [
  {
    title: "Vyom Clothing System",
    sub: "E-Commerce Platform",
    desc: "Re-developed a clothing platform. Managed cart services, guaranteed secure payments.",
    tech: "React, Vite, Commerce.js",
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/"
  },
  {
    title: "Reading Tracker System",
    sub: "Personal Utility Tool",
    desc: "Created a live view dashboard for reading habits. Contains all book reports.",
    tech: "React, Node.js, MongoDB",
    link: "https://reading-tracker-system1-vkbm.vercel.app/"
  }
];

const experience = [
  {
    role: "Full Stack Developer (Freelance)",
    company: "Self-Employed",
    duration: "March 2024 - Present",
    points: [
      "Integrated secure payment gateways into e-commerce infrastructure.",
      "Enhanced user interface of web applications using React and Tailwind."
    ]
  },
  {
    role: "Web Development Intern",
    company: "Local Tech Firm",
    duration: "June 2023 - Aug 2023",
    points: [
      "Re-developed legacy code for performance optimization.",
      "Enabled users to interact with dynamic dashboards."
    ]
  }
];

const certifications = [
  "Complete Interview Preparation - GeeksforGeeks",
  "Full Stack Web Development - Udemy",
  "React JS Certification - HackerRank"
];

const achievements = [
  "One among Dean’s top 10% students at University.",
  "Secured 3rd rank in HACKOVERFLOW 5.0 (NIT Durgapur).",
  "Received 5-star rating in Problem Solving on HackerRank."
];

function App() {
  const [views, setViews] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  // Theme Toggle
  const toggleTheme = () => setTheme(curr => curr === "dark" ? "light" : "dark");

  useEffect(() => {
    document.body.className = theme === "dark" ? "" : "light-mode";
  }, [theme]);

  // DB View Counter
  useEffect(() => {
    fetch('/api/views', { method: 'POST' })
      .then(res => res.ok ? res.json() : { count: "..." })
      .then(data => setViews(data.count))
      .catch(() => console.log("Backend offline locally"));
  }, []);

  // Scroll Handler
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false); // Close mobile menu on click
    }
  };

  return (
    <div className="app">
      
      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <h2 style={{ fontWeight: 800, fontSize: '1.5rem', margin: 0 }}>
          Jashandeep<span className="gradient-text">.</span>
        </h2>

        {/* Desktop Menu */}
        <div className="nav-links">
          <button onClick={() => scrollTo('about')} className="nav-btn">About</button>
          <button onClick={() => scrollTo('skills')} className="nav-btn">Skills</button>
          <button onClick={() => scrollTo('projects')} className="nav-btn">Projects</button>
          <button onClick={() => scrollTo('experience')} className="nav-btn">Experience</button>
          <button onClick={() => scrollTo('contact')} className="nav-btn">Contact</button>
          
          <button onClick={toggleTheme} className="nav-btn">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="mobile-dropdown">
          <button onClick={() => scrollTo('about')} className="nav-btn">About</button>
          <button onClick={() => scrollTo('skills')} className="nav-btn">Skills</button>
          <button onClick={() => scrollTo('projects')} className="nav-btn">Projects</button>
          <button onClick={() => scrollTo('experience')} className="nav-btn">Experience</button>
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
              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.95rem' }}>
                <span>📞 +91 98765 43210</span>
                <span>📧 contact@jashandeep.dev</span>
                <span>🔗 linkedin.com/in/jashandeep</span>
                <span>🐱 github.com/JashanLPU</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SKILLS */}
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {projects.map((proj, i) => (
              <div key={i} style={{ background: 'var(--bg-color)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: '0 0 5px 0' }}>{proj.title}</h3>
                  <a href={proj.link} target="_blank"><ExternalLink size={18} color="var(--accent)"/></a>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '15px' }}>{proj.sub}</p>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '15px' }}>{proj.desc}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 'bold' }}>Tech: {proj.tech}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CERTIFICATIONS */}
        <section className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block' }}>
            4. Certifications & Courses
          </h2>
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            {certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </section>

        {/* 5. EXPERIENCE */}
        <section id="experience" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block' }}>
            5. Experience
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Role / Company</th>
                  <th>Roles and Responsibilities</th>
                </tr>
              </thead>
              <tbody>
                {experience.map((exp, i) => (
                  <tr key={i}>
                    <td>
                      <strong style={{ display: 'block', fontSize: '1.1rem' }}>{exp.company}</strong>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{exp.role}</span>
                      <br/>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>({exp.duration})</span>
                    </td>
                    <td>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {exp.points.map((pt, p) => <li key={p} style={{ marginBottom: '5px' }}>{pt}</li>)}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. ACHIEVEMENTS */}
        <section className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block' }}>
            6. Competitions & Achievements
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

        {/* 7. CONTACT / CONTENT */}
        <section id="contact" className="section-card">
          <h2 style={{ borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block' }}>
            7. Content Creation
          </h2>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)', padding: '15px', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
              <BookOpen size={24} className="text-blue-500"/> Tech Blog
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)', padding: '15px', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
              <Youtube size={24} className="text-red-500"/> YouTube Channel
            </a>
          </div>
        </section>

        {/* 8. RESUME */}
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