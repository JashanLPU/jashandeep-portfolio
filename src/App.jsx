import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Download, ExternalLink, Mail, Linkedin, Github, 
  Terminal, Database, Cpu, Skull, Map, Crosshair, Scroll
} from "lucide-react";
import './App.css';
import me from './me.jpg'; 

// --- DATA FROM YOUR FILES ---
const projects = [
  {
    title: "Vyom Clothing",
    type: "E-Commerce Frontier",
    desc: "A premium outpost for fashion. Features dynamic trading (cart), secure Stripe bounties, and Commerce.js integration.",
    tech: ["React.js", "Commerce.js", "Stripe"],
    link: "https://vyom-clothing-system-qrdb-fhzonb1k3-jashabdeeps-projects.vercel.app/",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Story Verse",
    type: "The Archive",
    desc: "A journal for your tales. Track reading progress, write chapter summaries, and chronicle your book collection.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://reading-tracker-system1-vkbm.vercel.app/",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Biz-ID Generator",
    type: "Identification",
    desc: "Forge new identities. Create professional digital papers in seconds using Canvas API and instant PDF export.",
    tech: ["React", "Vite", "Canvas API"],
    link: "https://business-card-generator-mddw.vercel.app/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800"
  }
];

const education = [
  { school: "Lovely Professional University", degree: "B.Tech CSE", year: "2023 - Present", score: "CGPA: 6.8" },
  { school: "Dr. Asanand Arya Model School", degree: "Senior Secondary", year: "2022", score: "88.6%" },
  { school: "St. Joseph's Convent School", degree: "Matriculation", year: "2021", score: "83.8%" }
];

const skills = [
  { category: "Languages", icon: <Terminal size={20}/>, list: "Java, C++, JavaScript, Python" },
  { category: "Frontend", icon: <Map size={20}/>, list: "React.js, Tailwind, HTML5, Framer Motion" },
  { category: "Backend", icon: <Cpu size={20}/>, list: "Node.js, Express, REST APIs" },
  { category: "Database", icon: <Database size={20}/>, list: "MongoDB, MySQL, Git" }
];

// --- ANIMATION VARIANTS ---
const revealVariant = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const posterVariant = {
  hidden: { rotate: -10, opacity: 0, y: 100 },
  visible: { 
    rotate: -2, 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", bounce: 0.4, duration: 1.2 } 
  }
};

function App() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Parallax

  return (
    <div className="app">
      {/* ATMOSPHERE LAYERS */}
      <div className="grain-overlay"></div>
      <div className="vignette"></div>

      {/* HERO SECTION */}
      <header className="hero-section">
        <motion.div style={{ y: yBg }} className="hero-bg-layer" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={revealVariant}
          className="hero-content"
        >
          <div style={{display:'flex', justifyContent:'center', gap:'1rem', marginBottom:'1rem'}}>
            <Skull size={32} color="#8a0303" />
            <Skull size={32} color="#8a0303" />
          </div>
          <h1 className="hero-title">Jashandeep</h1>
          <p className="hero-subtitle">FULL STACK OUTLAW</p>
          <p className="typewriter" style={{marginTop:'1rem', color:'#d4c5a9'}}>
            // Building digital experiences that matter
          </p>

          <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
             <a href="#bounties" className="btn-western btn-primary-red">
               See Bounties <Crosshair size={18} />
             </a>
             <a href="/resume.pdf" download className="btn-western">
               Dossier (CV) <Download size={18} />
             </a>
          </div>
        </motion.div>
      </header>

      {/* WANTED SECTION (ABOUT) */}
      <section id="about" style={{ background: '#121212' }}>
        <div className="grid" style={{ alignItems: 'center' }}>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={posterVariant}
            className="wanted-poster"
          >
            <h2 className="wanted-header">WANTED</h2>
            <img src={me} alt="Jashandeep" className="poster-img" />
            <p className="typewriter" style={{fontSize:'1.2rem', fontWeight:'bold'}}>
              DEAD OR ALIVE
            </p>
            <p style={{marginTop:'10px', fontSize:'0.9rem', fontStyle:'italic'}}>
              For crimes of exceptional coding and pixel-perfect design.
            </p>
          </motion.div>

          <div style={{ padding: '0 40px' }}>
            <h2 className="section-header" style={{textAlign:'left'}}>The Drifter's Story</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc' }}>
              Howdy. I'm Jashandeep. I ride through the valley of the MERN stack, building accessible and performant web applications. 
              From the front-end deserts of <span style={{color: '#cda85d'}}>React</span> to the back-end mountains of <span style={{color: '#cda85d'}}>Node.js</span>, 
              I've honed my skills to deliver quality software.
            </p>
            <br/>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc' }}>
              Currently stationed at <strong>Lovely Professional University</strong>, sharpening my aim in Computer Science.
            </p>
          </div>

        </div>
      </section>

      {/* SKILLS (ARSENAL) */}
      <section id="arsenal" style={{ background: '#0f0f0f' }}>
        <div className="section-header">
          <h2>The Arsenal</h2>
          <p className="typewriter" style={{color:'#888'}}>Tools of the Trade</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {skills.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="ammo-box"
            >
              <div style={{color: '#cda85d'}}>{s.icon}</div>
              <div>
                <h3 style={{fontSize:'1.1rem', color:'#fff'}}>{s.category}</h3>
                <p style={{fontSize:'0.85rem', color:'#aaa'}}>{s.list}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS (BOUNTIES) */}
      <section id="bounties" style={{ background: '#141414' }}>
        <div className="section-header">
          <h2>Bounties Collected</h2>
          <p className="typewriter" style={{color:'#888'}}>Past Missions & Heists</p>
        </div>

        <div className="bounty-grid">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bounty-card"
            >
              <div className="bounty-img-container">
                <img src={p.image} alt={p.title} className="bounty-img" />
              </div>
              <div className="bounty-content">
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <h3 style={{fontSize:'1.4rem'}}>{p.title}</h3>
                  <span style={{color:'#888', fontSize:'0.8rem'}}>{p.type}</span>
                </div>
                <p style={{color:'#aaa', margin:'15px 0', fontSize:'0.9rem'}}>
                  {p.desc}
                </p>
                <div style={{display:'flex', gap:'5px', flexWrap:'wrap'}}>
                  {p.tech.map(t => (
                    <span key={t} style={{background:'#333', padding:'2px 8px', fontSize:'0.7rem', borderRadius:'4px'}}>{t}</span>
                  ))}
                </div>
                <div className="reward-text">$ REWARD: EXPERIENCE</div>
                <a href={p.link} target="_blank" className="btn-western" style={{width:'100%', justifyContent:'center', marginTop:'20px', fontSize:'0.8rem'}}>
                  Inspect Work <ExternalLink size={14}/>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDUCATION (JOURNAL) */}
      <section id="journal" style={{ 
        background: `url("https://www.transparenttextures.com/patterns/aged-paper.png"), #e3dac9`,
        color: '#2b2b2b'
      }}>
        <div className="section-header">
          <h2 style={{color: '#2b2b2b'}}>Education Journal</h2>
          <Scroll color="#2b2b2b" size={32} style={{margin:'0 auto'}}/>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', borderLeft: '2px solid #8a0303', paddingLeft: '30px' }}>
          {education.map((edu, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="timeline-item" 
              style={{ marginBottom: '40px', position: 'relative' }}
            >
              <div style={{ 
                position:'absolute', left:'-39px', top:'0', 
                width:'16px', height:'16px', background:'#8a0303', borderRadius:'50%' 
              }}></div>
              <div style={{ fontFamily: 'Rye', fontSize: '1.2rem', color: '#8a0303' }}>{edu.year}</div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'Cinzel', fontWeight: 'bold' }}>{edu.degree}</h3>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>{edu.school}</p>
              <p style={{ fontWeight: 'bold' }}>{edu.score}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 0', textAlign: 'center', background: '#0a0a0a', borderTop: '1px solid #333' }}>
        <h2 style={{ marginBottom: '20px' }}>Ride With Me?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
          <a href="mailto:jashandeep20445@gmail.com" className="btn-western">
            <Mail size={18} /> Send Telegram
          </a>
          <a href="https://linkedin.com/in/jashan23" target="_blank" className="btn-western">
            <Linkedin size={18} /> Socials
          </a>
        </div>
        <p style={{ color: '#555', fontFamily: 'Courier Prime' }}>© 2026 Jashandeep. No rights reserved. Outlaws for life.</p>
      </footer>
    </div>
  );
}

export default App;