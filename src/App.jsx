import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Github, Linkedin, Mail, Phone, ExternalLink, Award,
  ChevronRight, ChevronLeft, Code, Database, Server, X,
  MapPin, Calendar, FileText, Info, BrainCircuit, Maximize2,
  Globe, BookOpen, GraduationCap, Briefcase, ChevronDown, Languages
} from 'lucide-react';

// --- SCROLL REVEAL ---
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// --- DATA ---
const EXPERIENCE = [
  {
    id: 1,
    role: "Software Engineer (DS)",
    company: "Celebal Technologies",
    location: "Jaipur, Rajasthan",
    date: "Jan 2026 - Present",
    points: [
      "Spearheaded product development, taking technical ownership of a comprehensive workflow builder module from architecture to deployment.",
      "Architected and integrated advanced Agentic AI solutions with enterprise ERP and data analytics platforms to streamline complex business operations."
    ],
    color: "bg-purple-300",
    featured: true
  },
  {
    id: 2,
    role: "Junior Software Engineer (DS)",
    company: "Celebal Technologies",
    location: "Jaipur, Rajasthan",
    date: "May 2025 - Dec 2025",
    points: [
      "Designed and deployed scalable data processing and backend solutions utilizing Python, Microsoft Azure, and Azure Databricks.",
      "Worked within a Microsoft-partner AI/cloud consulting firm on enterprise data pipelines."
    ],
    color: "bg-purple-200",
    featured: true
  },
  {
    id: 3,
    role: "FSD + ML Engineer",
    company: "Intrvuz (Adzip Technologies)",
    location: "Noida, UP (Hybrid)",
    date: "Jun 2024 - Jun 2025",
    points: [
      "Engineered an automated, AI-driven interview bot leveraging Google Gemini and OpenAI GPT-4, evaluating candidates across entry-level to managerial roles.",
      "Developed robust backend infrastructure using Flask, MySQL, Cloud Firestore, and Firebase for high-volume candidate data.",
      "Designed an intuitive frontend integrating HTML, CSS, JavaScript, and jQuery for seamless user interaction."
    ],
    color: "bg-yellow-300",
    featured: true
  },
  {
    id: 4,
    role: "ML Intern",
    company: "ICICI Lombard",
    location: "Mumbai, MH (Remote)",
    date: "Feb 2024 - Apr 2024",
    points: [
      "Developed a multimodal fraud detection system for insurance claims, leveraging Gemini LLM to generate four unique risk assessment scores.",
      "Implemented WhisperAI STT to transcribe claimant audio and engineered a pipeline to extract emotional context from video frames."
    ],
    color: "bg-cyan-300",
    featured: true
  },
  {
    id: 5,
    role: "ML Researcher",
    company: "MineExcellence",
    location: "Melbourne, Australia (Remote)",
    date: "Aug 2023 - Oct 2023",
    points: [
      "Developed ANN-based predictive models to optimize blast fragmentation and reduce explosive usage by analyzing site-specific geological data.",
      "Improved blasting efficiency by 15% and reduced explosive consumption by 10-20% through ML-driven charge distribution models."
    ],
    color: "bg-pink-300",
    featured: false
  },
  {
    id: 6,
    role: "ML Intern",
    company: "Intrvuz (Adzip Technologies)",
    location: "Noida, UP (Remote)",
    date: "Oct 2023 - Feb 2024",
    points: [
      "Spearheaded R&D for an innovative interview bot leveraging Google Gemini AI and OpenAI GPT-4, evaluating multiple ASR and TTS providers.",
      "Engineered robust data storage and retrieval systems using MySQL, Firebase, and Cloud Firestore."
    ],
    color: "bg-yellow-200",
    featured: false
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "MehfilCart",
    desc: "Full-stack collaborative restaurant ordering platform with real-time WebSocket sync, 5-tier RBAC, QR-based table sessions, and a Next.js admin dashboard. Solo-built.",
    tech: ["FastAPI", "Next.js", "PostgreSQL", "Redis", "WebSocket"],
    link: "https://github.com/prerakl123/MehfilCart",
    featured: true
  },
  {
    id: 2,
    title: "HealthLogOps",
    desc: "Multi-platform health tracking ecosystem: Kotlin/Jetpack Compose Android app, Python/Kivy prototype, and a FastAPI analytics backend with Gemini AI-powered meal analysis.",
    tech: ["Kotlin", "Jetpack Compose", "FastAPI", "Gemini AI", "Room DB"],
    link: "https://github.com/prerakl123/HealthLogOps",
    featured: true
  },
  {
    id: 3,
    title: "QueryBuddy",
    desc: "Conversational AI chatbot that translates natural language to SQL queries. Dual-model support (GPT-4o + Gemini) with schema introspection and persistent chat sessions.",
    tech: ["Flask", "OpenAI", "Gemini", "MySQL", "Azure"],
    link: "#",
    featured: true
  },
  {
    id: 4,
    title: "Intrvuz - Cognitive Engine",
    desc: "AI-powered interview automation platform with voice-enabled conversational AI, real-time proctoring, and a modular cognitive services engine supporting multiple LLM/TTS/STT providers.",
    tech: ["Flask", "GPT-4", "Whisper", "ElevenLabs", "Firebase"],
    link: "#",
    featured: true
  },
  {
    id: 5,
    title: "AdaptEd - Personalized Learning",
    desc: "GenAI-powered educational platform with Agentic RAG using LangGraph, local LLM inference via Ollama, and real-time curriculum generation streamed via WebSocket.",
    tech: ["LangChain", "LangGraph", "Ollama", "Qdrant", "Flask"],
    link: "https://github.com/prerakl123/AdaptEd",
    featured: true
  },
  {
    id: 6,
    title: "auto_GTAV",
    desc: "CNN-based autonomous vehicle control in GTA V. Includes a full imitation learning pipeline: data collection, AlexNet training on GPU, and live inference with Win32 key injection.",
    tech: ["TensorFlow", "OpenCV", "CUDA", "Win32API"],
    link: "https://github.com/prerakl123/auto_GTAV",
    featured: false
  },
  {
    id: 7,
    title: "Fraud Detection (Emotion-AI)",
    desc: "Multi-modal insurance fraud detection using facial emotion recognition, audio transcription (WhisperAI), and LLM-powered behavioural scoring from interview videos.",
    tech: ["DeepFace", "Whisper", "Gemini", "Flask", "OpenCV"],
    link: "https://github.com/prerakl123/FraudDetectionUsingSentimentAnalysis",
    featured: false
  },
  {
    id: 8,
    title: "Object Detection in GTA V",
    desc: "Real-time YOLOv8 object detection on live GTA V screen capture with interactive class filtering and GPU-accelerated inference.",
    tech: ["YOLOv8", "OpenCV", "CUDA", "Python"],
    link: "https://github.com/prerakl123/Object-Detection-in-GTAV",
    featured: false
  },
  {
    id: 9,
    title: "Tapatap Payments",
    desc: "Production-grade campus payment platform using institutional ID cards. Multi-role system (Organisation, Admin, Merchant, Student) deployed on PythonAnywhere with MySQL.",
    tech: ["Flask", "MySQL", "SQLAlchemy", "Flask-Migrate"],
    link: "https://github.com/prerakl123/Tapatap_Payments",
    featured: false
  },
  {
    id: 10,
    title: "tECH-inder",
    desc: "Social platform for students to recruit collaborators for technical projects. Features follow/feed system, project applications, and misconduct reporting.",
    tech: ["Flask", "SQLAlchemy", "Bootstrap", "Gravatar"],
    link: "https://github.com/prerakl123/tECH-inder",
    featured: false
  },
  {
    id: 11,
    title: "eSpAnDash",
    desc: "Multi-game esports analytics dashboard pulling player metrics from Riot Games API (Valorant) with provider-abstracted architecture for PUBG, Fortnite, and CS:GO.",
    tech: ["Python", "Riot Games API", "Data Modelling"],
    link: "https://github.com/prerakl123/eSpAnDash",
    featured: false
  },
  {
    id: 12,
    title: "EZ_PY",
    desc: "Feature-rich Python text editor built with Tkinter. Regex-based syntax highlighting, embedded Python console, live Markdown preview, and code minimap.",
    tech: ["Python", "Tkinter", "Regex", "GPL-2.0"],
    link: "https://github.com/prerakl123/EZ_PY",
    featured: false
  },
  {
    id: 13,
    title: "Go Green (LSEG Hackathon)",
    desc: "Bank ESG Score and Recommendation desktop app built for the Refinitiv/LSEG Hackathon. Interactive ESG score slider with dark/light theming.",
    tech: ["Python", "Tkinter", "FinTech", "ESG"],
    link: "https://github.com/prerakl123/Refinitiv-London-Stock-Exchange-Group-Hackathon",
    featured: false
  },
  {
    id: 14,
    title: "Space-Chaos",
    desc: "2D space shooter game built with Pygame featuring self-drawn sprites, power-ups, shield mechanics, and compiled .exe distribution.",
    tech: ["Python", "Pygame", "PyInstaller"],
    link: "https://github.com/prerakl123/Space-Chaos",
    featured: false
  }
];

const CERTIFICATES = [
  { id: 1, title: "AWS Cloud Foundations", issuer: "AWS Academy", year: "2023", color: "bg-yellow-300" },
  { id: 2, title: "AWS Data Engineering", issuer: "AWS Academy", year: "2023", color: "bg-yellow-200" },
  { id: 3, title: "AWS Machine Learning Foundations", issuer: "AWS Academy", year: "2023", color: "bg-yellow-300" },
  { id: 4, title: "Programming, DSA using Python", issuer: "NPTEL", year: "2023", color: "bg-cyan-300" },
  { id: 5, title: "Joy of Computing using Python", issuer: "NPTEL", year: "2022", color: "bg-cyan-200" },
  { id: 6, title: "Android Mobile Development (Meta)", issuer: "Coursera", year: "2024", color: "bg-blue-300" },
  { id: 7, title: "Version Control (Meta)", issuer: "Coursera", year: "2023", color: "bg-blue-200" },
  { id: 8, title: "Problem Solving (Intermediate)", issuer: "HackerRank", year: "2024", color: "bg-lime-300" },
  { id: 9, title: "Problem Solving (Basic)", issuer: "HackerRank", year: "2023", color: "bg-lime-200" },
  { id: 10, title: "Python (Basic)", issuer: "HackerRank", year: "2022", color: "bg-purple-300" },
  { id: 11, title: "CSS (Basic)", issuer: "HackerRank", year: "2023", color: "bg-purple-200" },
  { id: 12, title: "SQL (Basic)", issuer: "HackerRank", year: "2022", color: "bg-purple-300" },
  { id: 13, title: "C++ Beginner to Beyond", issuer: "Udemy", year: "2022", color: "bg-orange-300" },
  { id: 14, title: "C Programming Bootcamp", issuer: "Udemy", year: "2022", color: "bg-orange-200" },
  { id: 15, title: "PHP for Beginners", issuer: "Udemy", year: "2022", color: "bg-orange-300" },
  { id: 16, title: "Networking Basics", issuer: "Cisco", year: "2022", color: "bg-emerald-300" },
  { id: 17, title: "AI-ML Virtual Internship", issuer: "AICTE", year: "2023", color: "bg-pink-300" },
  { id: 18, title: "Project Expo 2023", issuer: "SRM University", year: "2023", color: "bg-pink-200" },
  { id: 19, title: "Smart Campus Hackathon", issuer: "SRM University", year: "2023", color: "bg-pink-300" },
  { id: 20, title: "Namma Yatri Hackathon", issuer: "SRM University", year: "2023", color: "bg-pink-200" },
];

const ACADEMICS = [
  { id: 1, type: "Degree", name: "B.Tech in Artificial Intelligence", institution: "SRM University", location: "Kattankulathur, TN", score: "8.09 CGPA", year: "2021 - 2025", desc: "Specialization in core AI, ML, and Backend Development." },
  { id: 2, type: "High School", name: "Class XII (CBSE)", institution: "Step By Step High School", location: "Jaipur, RJ", score: "79.6%", year: "2021", desc: "Physics, Chemistry, Mathematics (PCM)." },
  { id: 3, type: "Secondary", name: "Class X (CBSE)", institution: "BVB Vidyashram", location: "Jaipur, RJ", score: "91.6%", year: "2019", desc: "General Science and Mathematics." },
];

const PUBLICATIONS = [
  {
    id: 1,
    type: "Patent",
    title: "Generative AI-Driven Personalized Learning System for Dynamic Educational Experiences (202541012131)",
    publisher: "Intellectual Property India",
    date: "Feb 2025",
    link: "https://iprsearch.ipindia.gov.in/PatentSearch/PatentSearch/ViewApplicationStatus",
    color: "bg-pink-300"
  },
  {
    id: 2,
    type: "Research Paper",
    title: "Adaptive Personalized Learning System with Generative AI",
    publisher: "Frontiers in Health Informatics",
    date: "2025",
    link: "https://healthinformaticsjournal.com/index.php/IJMI/article/view/1915",
    color: "bg-cyan-300"
  },
  {
    id: 3,
    type: "Research Paper",
    title: "Teams Meet Summariser using LLMs",
    publisher: "Nanotechnology Perceptions",
    date: "Dec 2024",
    link: "https://nano-ntp.com/index.php/nano/article/view/4269/3263",
    color: "bg-yellow-300"
  }
];

const SPOKEN_LANGUAGES = [
  { lang: "English", level: "Professional", pct: 90 },
  { lang: "Hindi", level: "Native", pct: 100 },
  { lang: "Japanese", level: "Limited Working", pct: 30 },
  { lang: "French", level: "Elementary", pct: 20 },
  { lang: "German", level: "Elementary", pct: 15 },
];

const COMPETITIVE_EXAMS = {
  engineering: ["JEE Mains", "AIEESE", "BITSAT", "MET", "VITEEE", "SRMJEEE"],
  mba: ["CAT", "NMAT by GMAC", "SNAP (Symbiosis)", "XAT", "GMAT"],
  interviews: ["KJ Somaiya (KJSIT)", "BITSoM", "Symbiosis SIT", "IMI New Delhi", "XIM Bhubaneswar"]
};

// --- STYLES ---
const cardBase = "bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300";
const cardHover = "hover:-translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
const btnBase = "inline-flex items-center justify-center px-6 py-3 font-mono font-bold bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]";
const sectionPadding = "py-24 px-6 md:px-12 max-w-7xl mx-auto";

export default function App() {
  const [modalData, setModalData] = useState(null);
  const [examsOpen, setExamsOpen] = useState(false);
  const [showAllExp, setShowAllExp] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Roboto+Mono:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const featuredExp = EXPERIENCE.filter(e => e.featured);
  const otherExp = EXPERIENCE.filter(e => !e.featured);
  const visibleExp = showAllExp ? EXPERIENCE : featuredExp;

  const featuredProjects = PROJECTS.filter(p => p.featured);
  const otherProjects = PROJECTS.filter(p => !p.featured);
  const visibleProjects = showAllProjects ? PROJECTS : featuredProjects;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black selection:bg-yellow-300 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#FAFAFA]/90 backdrop-blur-md border-b-2 border-black z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono font-bold text-xl tracking-tighter flex items-center">
            <span className="bg-yellow-300 px-2 py-1 border-2 border-black rounded-md mr-2">PL</span>
            Prerak.
            <span className="cursor-pointer opacity-25 hover:opacity-80 transition-opacity ml-1.5" onClick={() => setExamsOpen(true)}>
              <Info className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="hidden md:flex gap-8 font-mono font-bold text-sm">
            <a href="#about" className="hover:text-cyan-600 transition-colors">About</a>
            <a href="#experience" className="hover:text-cyan-600 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-cyan-600 transition-colors">Projects</a>
            <a href="#publications" className="hover:text-cyan-600 transition-colors">Publications</a>
            <a href="#gallery" className="hover:text-cyan-600 transition-colors">Certificates</a>
            <a href="#languages" className="hover:text-cyan-600 transition-colors">Languages</a>
          </div>
          <a href="mailto:prerakl123@gmail.com" className={`${btnBase} bg-yellow-300 hover:bg-yellow-400 py-2 px-4 text-sm`}>
            Let's Talk
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block px-4 py-2 bg-cyan-300 border-2 border-black rounded-full font-mono font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Hi, my name is
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.1]">
              Prerak <br />
              <span className="text-transparent [-webkit-text-stroke:2px_black] bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Lodha.</span>
            </h1>

            <p className="text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
              <span className="bg-yellow-200 px-1 border border-black rounded">Software Engineer</span> @ Celebal Technologies. AI/ML and GenAI specialist building scalable backend architectures, RAG pipelines, and agentic AI solutions. Co-author of a published patent in adaptive learning.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#projects" className={`${btnBase} bg-cyan-300 hover:bg-cyan-400 text-lg`}>
                View My Work
              </a>
              <a href="https://github.com/prerakl123" target="_blank" rel="noreferrer" className={`${btnBase} bg-white hover:bg-gray-100`}>
                <Github className="w-5 h-5 mr-2" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/prerak-lodha-06142b221/" target="_blank" rel="noreferrer" className={`${btnBase} bg-white hover:bg-gray-100`}>
                <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Hero Image / Bento snippet */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-yellow-300 border-2 border-black rounded-2xl translate-x-4 translate-y-4"></div>
            <div className="relative bg-white border-2 border-black rounded-2xl overflow-hidden aspect-[4/5] md:aspect-square z-10 p-4 flex flex-col justify-between">

              <img
                src="https://placehold.co/800x1000/FAFAFA/000000?text=Profile+Photo"
                alt="Prerak Lodha"
                className="w-full h-full object-cover border-2 border-black rounded-xl"
              />

              <div className="absolute bottom-8 left-8 right-8 bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3">
                  <MapPin className="text-pink-500 w-5 h-5" />
                  <p className="font-mono font-bold text-sm">Jaipur, Rajasthan, IN</p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Award className="text-cyan-500 w-5 h-5" />
                  <p className="font-mono font-bold text-sm">B.Tech CS (AI & ML) - 8.09 CGPA</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Marquee Section */}
      <div className="w-full overflow-hidden border-y-2 border-black bg-pink-300 py-4 shadow-[0_4px_0px_0px_rgba(0,0,0,1)] mb-12 relative z-20">
        <div className="whitespace-nowrap flex animate-[marquee_20s_linear_infinite] font-mono font-bold text-xl uppercase items-center">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              {['AI/ML Engineer', 'Backend Developer', 'GenAI Specialist', 'Problem Solver', 'Team Player', 'Continuous Learner', 'System Design', 'Open Source'].map((item, j) => (
                <React.Fragment key={j}>
                  <span className="mx-8">{item}</span>
                  <span className="mx-6">-</span>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>

      {/* About & Skills Bento Box */}
      <section id="about" className={sectionPadding}>
        <Reveal><h2 className="text-4xl font-extrabold mb-12 uppercase tracking-tight">Technical Arsenal</h2></Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main About Card */}
          <Reveal className={`${cardBase} ${cardHover} col-span-1 md:col-span-2 lg:col-span-2 p-8 bg-white flex flex-col justify-center text-justify`}>
            <h3 className="text-2xl font-bold mb-4">About Me</h3>
            <p className="text-lg leading-relaxed mb-4">
              Software Engineer at Celebal Technologies with a B.Tech in Artificial Intelligence from SRM University. I specialise in designing and deploying scalable AI/ML products, backend systems, and GenAI-powered solutions across enterprise platforms.
            </p>
            <p className="text-lg leading-relaxed">
              From building AI-driven interview bots used by 300+ B2B clients, to architecting real-time collaborative ordering platforms and multimodal fraud detection pipelines - I thrive at the intersection of complex problems and clean engineering.
            </p>
          </Reveal>

          {/* Languages Card */}
          <Reveal className={`${cardBase} ${cardHover} p-6 bg-yellow-100 flex flex-col`} delay={100}>
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-8 h-8" />
              <h3 className="font-mono font-bold text-xl">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['Python', 'C++', 'JavaScript', 'SQL', 'Kotlin', 'PHP'].map(skill => (
                <span key={skill} className="bg-white border-2 border-black rounded-md px-3 py-1 font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{skill}</span>
              ))}
            </div>
          </Reveal>

          {/* Frameworks & AI Card */}
          <Reveal className={`${cardBase} ${cardHover} col-span-1 md:col-span-2 p-6 bg-cyan-100 flex flex-col`} delay={200}>
            <div className="flex items-center gap-3 mb-6">
              <BrainCircuit className="w-8 h-8" />
              <h3 className="font-mono font-bold text-xl">Frameworks & Libraries</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Flask', 'FastAPI', 'React.js', 'Next.js', 'Node.js', 'SQLAlchemy', 'Pandas', 'TensorFlow', 'OpenCV', 'LangChain', 'LangGraph', 'WhisperAI', 'Gemini'].map(skill => (
                <span key={skill} className="bg-white border-2 border-black rounded-lg px-4 py-2 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{skill}</span>
              ))}
            </div>
          </Reveal>

          {/* Tools & DBs Card */}
          <Reveal className={`${cardBase} ${cardHover} p-6 bg-pink-100 flex flex-col`} delay={300}>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8" />
              <h3 className="font-mono font-bold text-xl">Clouds, DBs & More</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['Firebase & Firestore', 'PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Redis', 'Celery', 'Azure', 'Azure Databricks', 'AWS', 'Qdrant'].map(skill => (
                <span key={skill} className="bg-white border-2 border-black rounded-md px-3 py-1 font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{skill}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience - Carousel style: featured first, "View More" for rest */}
      <section id="experience" className="bg-white border-y-2 border-black py-24 px-6 md:px-12 mt-12">
        <div className="max-w-5xl mx-auto">
          <Reveal><h2 className="text-4xl font-extrabold mb-16 uppercase tracking-tight text-center">Journey & Experience</h2></Reveal>

          <div className="relative border-l-4 border-black ml-4 md:ml-1/2 md:border-l-0">
            {/* Center Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-black -translate-x-1/2"></div>

            {visibleExp.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <Reveal key={exp.id} delay={index * 100}>
                  <div className={`mb-12 relative flex w-full md:w-1/2 ${isLeft ? 'md:justify-end md:pr-12 md:left-0' : 'md:justify-start md:pl-12 md:left-1/2'} pl-8 md:pl-12`}>

                    {/* Timeline Node */}
                    <div className={`absolute w-6 h-6 border-4 border-black rounded-full top-6 ${isLeft ? '-left-3 md:-right-3 md:left-auto' : '-left-3 md:-left-3'} ${exp.color} z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}></div>

                    {/* Content Card */}
                    <div className={`${cardBase} ${cardHover} w-full p-6 md:p-8 bg-white relative`}>
                      <span className={`absolute -top-4 right-4 ${exp.color} font-mono text-xs font-bold border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                        {exp.date}
                      </span>

                      <h3 className="text-2xl font-bold mt-2 leading-tight">{exp.role}</h3>
                      <div className="font-mono font-semibold text-gray-700 mt-2 mb-4 flex items-center gap-2 flex-wrap">
                        <span className="bg-gray-100 border border-black px-2 py-0.5 rounded text-sm">{exp.company}</span>
                        <span className="text-xs text-gray-500">{exp.location}</span>
                      </div>

                      <ul className="space-y-3 mt-4">
                        {exp.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400" />
                            <span className="text-gray-800 leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* View More / Less toggle */}
          {otherExp.length > 0 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllExp(!showAllExp)}
                className={`${btnBase} bg-purple-200 hover:bg-purple-300`}
              >
                {showAllExp ? 'Show Less' : `View ${otherExp.length} More`}
                <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${showAllExp ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Projects - Carousel style: featured first, "View More" for rest */}
      <section id="projects" className={sectionPadding}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <Reveal><h2 className="text-4xl font-extrabold uppercase tracking-tight">Select Works</h2></Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 80}>
              <div className={`${cardBase} flex flex-col h-full bg-white overflow-hidden group`}>
                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-cyan-100 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:-rotate-6 transition-transform">
                      <Server className="w-6 h-6" />
                    </div>
                    {project.link !== '#' && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-black hover:text-cyan-600 transition-colors">
                        <ExternalLink className="w-6 h-6" />
                      </a>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-700 flex-grow mb-6 leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map(t => (
                      <span key={t} className="font-mono text-xs font-bold border border-black rounded px-2 py-1 bg-gray-50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative bottom bar */}
                <div className={`h-3 w-full border-t-2 border-black ${project.featured ? 'bg-yellow-300' : 'bg-gray-200'}`}></div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View More / Less toggle */}
        {otherProjects.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className={`${btnBase} bg-cyan-200 hover:bg-cyan-300`}
            >
              {showAllProjects ? 'Show Less' : `View ${otherProjects.length} More Projects`}
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${showAllProjects ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </section>

      {/* Publications */}
      <section id="publications" className="bg-black text-white py-24 px-6 md:px-12 border-y-2 border-black">
        <div className="max-w-7xl mx-auto">
          <Reveal><h2 className="text-4xl font-extrabold mb-12 uppercase tracking-tight text-white">Publications & Research</h2></Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PUBLICATIONS.map((pub, i) => (
              <Reveal key={pub.id} delay={i * 100}>
                <div className="bg-white text-black border-4 border-white rounded-2xl p-8 transform hover:scale-[1.02] transition-transform h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`font-mono font-bold text-sm px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${pub.color}`}>
                      {pub.type}
                    </span>
                    <span className="font-mono text-gray-500">{pub.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 flex-grow">{pub.title}</h3>
                  <p className="font-mono text-gray-600 mb-6 pb-6 border-b-2 border-gray-200">
                    Published in: <span className="text-black font-bold">{pub.publisher}</span>
                  </p>
                  {pub.link && pub.link !== '#' && (
                    <a href={pub.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold hover:text-cyan-600">
                      Read Paper <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Wall */}
      <section id="gallery" className={sectionPadding}>
        <div className="text-center mb-16">
          <Reveal><h2 className="text-4xl font-extrabold uppercase tracking-tight mb-4">Certifications Wall</h2></Reveal>
          <Reveal delay={100}><p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">A collection of milestones, achievements, and continuous learning.</p></Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATES.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 40}>
              <div className={`${cardBase} ${cardHover} overflow-hidden cursor-pointer group`} onClick={() => setModalData(cert)}>
                <div className={`h-32 ${cert.color} border-b-2 border-black flex items-center justify-center`}>
                  <Award className="w-12 h-12 text-black/30 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-sm leading-tight mb-2">{cert.title}</h3>
                  <div className="flex justify-between items-center font-mono text-xs text-gray-600">
                    <span>{cert.issuer}</span>
                    <span className="font-bold text-black border border-black px-1.5 py-0.5 rounded bg-gray-100">{cert.year}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certificate Modal */}
      {modalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setModalData(null)}>
          <div
            className="bg-white border-4 border-black rounded-3xl w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-[modalFadeIn_0.2s_ease-out]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b-4 border-black p-4 md:p-6 bg-yellow-300">
              <h3 className="text-2xl font-bold truncate pr-4">{modalData.title}</h3>
              <button
                onClick={() => setModalData(null)}
                className="p-2 bg-white border-2 border-black rounded-xl hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-1 active:shadow-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 md:p-8 bg-[#FAFAFA]">
              <div className={`${modalData.color} border-4 border-black rounded-2xl p-8 flex items-center justify-center mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                <Award className="w-20 h-20 text-black/40" />
              </div>
              <div className="grid grid-cols-2 gap-4 font-mono text-lg">
                <div className="p-4 bg-cyan-100 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-sm font-bold text-gray-600 uppercase mb-1">Issuer</p>
                  <p className="font-bold">{modalData.issuer}</p>
                </div>
                <div className="p-4 bg-pink-100 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-sm font-bold text-gray-600 uppercase mb-1">Year</p>
                  <p className="font-bold">{modalData.year}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spoken Languages */}
      <section id="languages" className="bg-white border-y-2 border-black py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Reveal><h2 className="text-4xl font-extrabold mb-12 uppercase tracking-tight text-center">Languages & More</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Languages card */}
            <Reveal className={`${cardBase} p-8`}>
              <div className="flex items-center gap-3 mb-6">
                <Languages className="w-7 h-7" />
                <h3 className="font-mono font-bold text-xl">Spoken Languages</h3>
              </div>
              <div className="space-y-4">
                {SPOKEN_LANGUAGES.map(l => (
                  <div key={l.lang}>
                    <div className="flex justify-between font-mono text-sm mb-1">
                      <span className="font-bold">{l.lang}</span>
                      <span className="text-gray-500">{l.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 border border-black overflow-hidden">
                      <div className="bg-cyan-400 h-full rounded-full transition-all duration-700" style={{ width: `${l.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Organizations & IEI membership card */}
            <Reveal className={`${cardBase} p-8`} delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-7 h-7" />
                <h3 className="font-mono font-bold text-xl">Organizations</h3>
              </div>
              <div className={`${cardBase} p-6 bg-yellow-50`}>
                <h4 className="font-bold text-lg mb-2">IEI Students' Chapter</h4>
                <p className="font-mono text-sm text-gray-600 mb-3">Member - Sep 2023 - Present</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The Institution of Engineers (India) Students' Chapter at SRM University. Active member of the collegiate chapter.
                </p>
              </div>
              <div className={`${cardBase} p-6 bg-pink-50 mt-4`}>
                <h4 className="font-bold text-lg mb-2">Academic Achievement</h4>
                <p className="font-mono text-sm text-gray-600 mb-3">B.Tech AI & ML - 8.09 CGPA</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  SRM Institute of Science and Technology, Kattankulathur, Tamil Nadu (2021 - 2025).
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Footer & Contact */}
      <footer className="bg-yellow-300 border-t-4 border-black pt-20 pb-12 px-6 md:px-12 relative overflow-hidden mt-20">
        {/* Decorative huge text */}
        <div className="absolute -bottom-10 -right-10 text-[15rem] font-extrabold text-yellow-400 opacity-50 select-none pointer-events-none leading-none z-0">
          PL
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight mb-6 leading-none">
              Let's Build <br /> Something.
            </h2>
            <p className="text-xl font-medium max-w-md mb-8">
              Software Engineer at Celebal Technologies. Open to collaborations in AI/ML, GenAI, and backend engineering.
            </p>

            <div className="flex flex-col gap-4 max-w-sm">
              <a href="mailto:prerakl123@gmail.com" className="flex items-center gap-4 bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 transition-transform">
                <Mail className="w-6 h-6 text-pink-500" />
                <span className="font-mono font-bold text-lg">prerakl123@gmail.com</span>
              </a>
              <a href="tel:+919829778167" className="flex items-center gap-4 bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 transition-transform">
                <Phone className="w-6 h-6 text-cyan-500" />
                <span className="font-mono font-bold text-lg">+91 98297 78167</span>
              </a>
            </div>
          </div>

          <div className="md:text-right flex flex-col md:items-end">
            <div className="flex gap-4 mb-12">
              <a href="https://github.com/prerakl123" target="_blank" rel="noreferrer" className="bg-black text-white p-4 border-2 border-black rounded-2xl hover:bg-white hover:text-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Github className="w-8 h-8" />
              </a>
              <a href="https://www.linkedin.com/in/prerak-lodha-06142b221/" target="_blank" rel="noreferrer" className="bg-black text-white p-4 border-2 border-black rounded-2xl hover:bg-white hover:text-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Linkedin className="w-8 h-8" />
              </a>
            </div>
            <p className="font-mono font-bold text-sm bg-white border-2 border-black px-4 py-2 inline-block rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Prerak Lodha {new Date().getFullYear()} <span
                className="cursor-pointer opacity-20 hover:opacity-100 transition-opacity ml-2"
                onClick={() => setExamsOpen(true)}
              >
                <Info className="w-4 h-4 inline transition-transform hover:scale-110 mb-0.5" />
              </span>
            </p>
          </div>
        </div>
      </footer>

      {/* Hidden Exams/Academics Modal */}
      {examsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setExamsOpen(false)}>
          <div
            className="bg-white border-4 border-black rounded-3xl w-full max-w-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-[modalFadeIn_0.2s_ease-out]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b-4 border-black p-4 md:p-6 bg-purple-300">
              <h3 className="text-2xl font-bold">Academic Record & Exams</h3>
              <button
                onClick={() => setExamsOpen(false)}
                className="p-2 bg-white border-2 border-black rounded-xl hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-1 active:shadow-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 md:p-8 bg-[#FAFAFA] max-h-[70vh] overflow-y-auto">
              {/* Academics */}
              <div className="space-y-4 mb-8">
                <h4 className="font-mono font-bold text-lg uppercase tracking-tight">Education</h4>
                {ACADEMICS.map(item => (
                  <div key={item.id} className="bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <span className="font-mono text-sm bg-yellow-300 border border-black px-2 py-1 rounded font-bold">{item.score}</span>
                    </div>
                    <p className="font-mono text-gray-700 text-sm mb-2">{item.institution} - {item.location}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500 font-medium">{item.desc}</span>
                      <span className="font-mono text-xs border border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-2 py-1 rounded font-bold">{item.year}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Competitive Exams */}
              <div className="space-y-4 mb-6">
                <h4 className="font-mono font-bold text-lg uppercase tracking-tight">Competitive Exams Attempted</h4>
                <div className="bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h5 className="font-bold text-sm mb-2 text-gray-600">Engineering Entrance</h5>
                  <div className="flex flex-wrap gap-2">
                    {COMPETITIVE_EXAMS.engineering.map(e => (
                      <span key={e} className="font-mono text-xs border border-black px-2 py-1 rounded bg-cyan-50">{e}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h5 className="font-bold text-sm mb-2 text-gray-600">MBA Entrance</h5>
                  <div className="flex flex-wrap gap-2">
                    {COMPETITIVE_EXAMS.mba.map(e => (
                      <span key={e} className="font-mono text-xs border border-black px-2 py-1 rounded bg-pink-50">{e}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h5 className="font-bold text-sm mb-2 text-gray-600">MBA Interview Calls</h5>
                  <div className="flex flex-wrap gap-2">
                    {COMPETITIVE_EXAMS.interviews.map(e => (
                      <span key={e} className="font-mono text-xs border border-black px-2 py-1 rounded bg-yellow-50">{e}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
