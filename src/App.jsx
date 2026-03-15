import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, Phone, ExternalLink, Award,
  ChevronRight, ChevronLeft, Code, Database, Server, X,
  MapPin, Calendar, FileText, Cpu, BrainCircuit, Maximize2
} from 'lucide-react';

// --- DATA ---
const EXPERIENCE = [
  {
    id: 1,
    role: "AI Engineer, Backend Developer",
    company: "Intrvuz - Adzip Technologies Ltd",
    location: "Noida, UP",
    date: "July 2024 - Present",
    points: [
      "Developed a GenAI-powered interview bot integrating TTS & STT for speech-to-speech conversational experiences.",
      "Engineered asynchronous job processing workflows using Celery & Redis, improving system throughput by 3x.",
      "Optimized API interactions, reducing redundant calls and lowering platform costs by 42%.",
      "Scaled the system to support 300+ B2B users, ensuring 99.8% uptime with efficient rate-limiting."
    ],
    color: "bg-yellow-300"
  },
  {
    id: 2,
    role: "ML Engineer, Data Analyst",
    company: "ICICI Lombard General Health Insurance",
    location: "Mumbai, MH",
    date: "February 2024 - April 2024",
    points: [
      "Developed an AI-driven fraud detection system and optimized data ingestion pipelines for large-scale datasets.",
      "Increased precision and reduced false positives by 30% via a risk scoring model using XGBoost.",
      "Processed 120+ videos daily, achieving 82% fraud detection accuracy and reducing manual review efforts by 40%."
    ],
    color: "bg-cyan-300"
  },
  {
    id: 3,
    role: "Machine Learning Researcher",
    company: "MineExcellence",
    location: "Melbourne, Australia (Remote)",
    date: "August 2023 - October 2023",
    points: [
      "Developed ANN-based predictive models to optimize blast fragmentation and reduce explosive usage.",
      "Improved blasting efficiency by 15% through ML-driven explosive charge distribution models.",
      "Reduced explosive material consumption by 10-20%, aligning with industry safety regulations."
    ],
    color: "bg-pink-300"
  },
  {
    id: 4,
    role: "ML Developer",
    company: "Adzip",
    location: "Delhi, India (Part-time)",
    date: "Sep 2021 - May 2025",
    points: [
      "Developing personalized ad recommendation-based model using OpenAI LLMs and 'langchain'."
    ],
    color: "bg-emerald-300"
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Adapted - Personalized Learning for All",
    desc: "Curriculum-generation system using Llama-based RAG chains for real-time content creation (<10s response). Features speech-to-speech capabilities for specially-abled learners.",
    tech: ["Llama", "Mistral AI", "Qdrant", "PostgreSQL", "OAuth2"],
    link: "#",
    featured: true
  },
  {
    id: 2,
    title: "auto_GTAV",
    desc: "CNN-based model (21 layers) for hybrid autonomous vehicle control in GTA-V. Conducted 55+ hours of in-game training, achieving ~69% model accuracy.",
    tech: ["TensorFlow", "OpenCV", "Win32API"],
    link: "https://github.com/prerakl123/auto_GTAV",
    featured: true
  },
  {
    id: 3,
    title: "Tap-a-Tap Payments",
    desc: "Tap to Pay software using Institute ID cards (NFC based transactions). Integrated Paytm API for wallet transactions.",
    tech: ["Flask", "NFC", "Paytm API"],
    link: "https://github.com/prerakl123/Tap-a-tap_payments",
    featured: false
  },
  {
    id: 4,
    title: "tECH-Index",
    desc: "Project recruitment platform for students. Developed using Flask Web Framework and Bootstrap CSS.",
    tech: ["Flask", "Bootstrap", "PostgreSQL"],
    link: "https://github.com/prerakl123/tECH-Index",
    featured: false
  },
  {
    id: 5,
    title: "Chatter-Squad",
    desc: "Python based anonymous chatting application with real-time messaging capabilities.",
    tech: ["Python", "Socket.io", "Flask"],
    link: "https://github.com/prerakl123/Chatter-Squad",
    featured: false
  },
  {
    id: 6,
    title: "Diabetic Retinopathy Detection",
    desc: "Implementation of Graph Convolution Neural Networks for detecting diabetic retinopathy from fundus images.",
    tech: ["GCN", "RNN", "OpenCV"],
    link: "#",
    featured: false
  }
];

const CERTIFICATES = [
  { id: 1, title: "AWS Data Engineering", issuer: "AWS Academy", year: "2023", img: "https://placehold.co/600x400/FDE047/000000?text=AWS+Data+Eng", color: "bg-yellow-300" },
  { id: 2, title: "AWS Machine Learning Foundations", issuer: "AWS Academy", year: "2023", img: "https://placehold.co/600x400/67E8F9/000000?text=AWS+ML", color: "bg-cyan-300" },
  { id: 3, title: "AWS Cloud Foundations", issuer: "AWS Academy", year: "2023", img: "https://placehold.co/600x400/F9A8D4/000000?text=AWS+Cloud", color: "bg-pink-300" },
  { id: 4, title: "Future Certificate Slot", issuer: "TBD", year: "202X", img: "https://placehold.co/600x400/E5E7EB/000000?text=Placeholder", color: "bg-gray-200" },
  { id: 5, title: "Future Badge Slot", issuer: "TBD", year: "202X", img: "https://placehold.co/600x400/E5E7EB/000000?text=Placeholder", color: "bg-gray-200" },
  { id: 6, title: "Future Badge Slot", issuer: "TBD", year: "202X", img: "https://placehold.co/600x400/E5E7EB/000000?text=Placeholder", color: "bg-gray-200" },
];

const PUBLICATIONS = [
  {
    id: 1,
    type: "Patent",
    title: "Generative AI-Driven Personalized Learning System for Dynamic Educational Experiences",
    publisher: "Intellectual Property India",
    date: "Feb 2025",
    color: "bg-pink-300"
  },
  {
    id: 2,
    type: "Research Paper",
    title: "Adaptive Personalized Learning System with Generative AI",
    publisher: "Frontiers in Health Informatics",
    date: "2025",
    link: "https://doi.org/10.52783/fhivi.1915",
    color: "bg-cyan-300"
  }
];

// --- STYLES ---
const cardBase = "bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300";
const cardHover = "hover:-translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
const btnBase = "inline-flex items-center justify-center px-6 py-3 font-mono font-bold bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]";
const sectionPadding = "py-24 px-6 md:px-12 max-w-7xl mx-auto";

export default function App() {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState(null);
  const projectsPerPage = 4;

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Roboto+Mono:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const totalPages = Math.ceil(PROJECTS.length / projectsPerPage);
  const paginatedProjects = PROJECTS.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black selection:bg-yellow-300 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#FAFAFA]/90 backdrop-blur-md border-b-2 border-black z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono font-bold text-xl tracking-tighter">
            <span className="bg-yellow-300 px-2 py-1 border-2 border-black rounded-md mr-2">PL</span>
            Prerak.
          </div>
          <div className="hidden md:flex gap-8 font-mono font-bold text-sm">
            <a href="#about" className="hover:text-cyan-600 transition-colors">About</a>
            <a href="#experience" className="hover:text-cyan-600 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-cyan-600 transition-colors">Projects</a>
            <a href="#gallery" className="hover:text-cyan-600 transition-colors">Gallery</a>
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
              👋 Hi, my name is
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.1]">
              Prerak <br />
              <span className="text-transparent [-webkit-text-stroke:2px_black] bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Lodha.</span>
            </h1>

            <p className="text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
              I build <span className="bg-yellow-200 px-1 border border-black rounded">intelligent systems</span>. Backend-focused Software Engineer specializing in scalable AI/ML architectures and generative applications.
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
                  <p className="font-mono font-bold text-sm">B.Tech CS (AI & ML) - 7.96 CGPA</p>
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
              <span className="mx-8">AI/ML Engineer</span>
              <span className="mx-8">•</span>
              <span className="mx-8">Backend Developer</span>
              <span className="mx-8">•</span>
              <span className="mx-8">Data Analyst</span>
              <span className="mx-8">•</span>
              <span className="mx-8">Scalable Architectures</span>
              <span className="mx-8">•</span>
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
        <h2 className="text-4xl font-extrabold mb-12 uppercase tracking-tight">Technical Arsenal</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main About Card */}
          <div className={`${cardBase} ${cardHover} col-span-1 md:col-span-2 lg:col-span-2 p-8 bg-white flex flex-col justify-center`}>
            <h3 className="text-2xl font-bold mb-4">About Me</h3>
            <p className="text-lg leading-relaxed mb-4">
              I am a final-year CS student specializing in AI & ML at SRM Institute of Science and Technology. I thrive at the intersection of complex data problems and backend engineering.
            </p>
            <p className="text-lg leading-relaxed">
              My experience ranges from developing GenAI-powered interview bots to optimizing blast fragmentation in surface mining using predictive analytics.
            </p>
          </div>

          {/* Languages Card */}
          <div className={`${cardBase} ${cardHover} p-6 bg-yellow-100 flex flex-col`}>
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-8 h-8" />
              <h3 className="font-mono font-bold text-xl">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['Python', 'C++', 'JavaScript', 'SQL'].map(skill => (
                <span key={skill} className="bg-white border-2 border-black rounded-md px-3 py-1 font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{skill}</span>
              ))}
            </div>
          </div>

          {/* Frameworks & AI Card */}
          <div className={`${cardBase} ${cardHover} col-span-1 md:col-span-2 p-6 bg-cyan-100 flex flex-col`}>
            <div className="flex items-center gap-3 mb-6">
              <BrainCircuit className="w-8 h-8" />
              <h3 className="font-mono font-bold text-xl">Frameworks & Libraries</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Flask', 'FastAPI', 'SQLAlchemy', 'Pandas', 'TensorFlow', 'OpenCV', 'XGBoost', 'Langchain'].map(skill => (
                <span key={skill} className="bg-white border-2 border-black rounded-lg px-4 py-2 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{skill}</span>
              ))}
            </div>
          </div>

          {/* Tools & DBs Card */}
          <div className={`${cardBase} ${cardHover} p-6 bg-pink-100 flex flex-col`}>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8" />
              <h3 className="font-mono font-bold text-xl">Tools & DBs</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Redis', 'Celery', 'AWS'].map(skill => (
                <span key={skill} className="bg-white border-2 border-black rounded-md px-3 py-1 font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="bg-white border-y-2 border-black py-24 px-6 md:px-12 mt-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-16 uppercase tracking-tight text-center">Journey & Experience</h2>

          <div className="relative border-l-4 border-black ml-4 md:ml-1/2 md:border-l-0">
            {/* Center Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-black -translate-x-1/2"></div>

            {EXPERIENCE.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={exp.id} className={`mb-12 relative flex w-full md:w-1/2 ${isLeft ? 'md:justify-end md:pr-12 md:left-0' : 'md:justify-start md:pl-12 md:left-1/2'} pl-8 md:pl-12`}>

                  {/* Timeline Node */}
                  <div className={`absolute w-6 h-6 border-4 border-black rounded-full top-6 ${isLeft ? '-left-3 md:-right-3 md:left-auto' : '-left-3 md:-left-3'} ${exp.color} z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}></div>

                  {/* Content Card */}
                  <div className={`${cardBase} ${cardHover} w-full p-6 md:p-8 bg-white relative`}>
                    <span className={`absolute -top-4 right-4 ${exp.color} font-mono text-xs font-bold border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                      {exp.date}
                    </span>

                    <h3 className="text-2xl font-bold mt-2 leading-tight">{exp.role}</h3>
                    <div className="font-mono font-semibold text-gray-700 mt-2 mb-4 flex items-center gap-2">
                      <span className="bg-gray-100 border border-black px-2 py-0.5 rounded text-sm">{exp.company}</span>
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={sectionPadding}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-4xl font-extrabold uppercase tracking-tight">Select Works</h2>

          {/* Pagination Controls */}
          <div className="flex items-center gap-4">
            <span className="font-mono font-bold">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`${btnBase} px-3 py-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-white hover:bg-yellow-100'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, Math.min(totalPages, p + 1)))}
                disabled={currentPage === totalPages}
                className={`${btnBase} px-3 py-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-white hover:bg-yellow-100'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paginatedProjects.map((project) => (
            <div key={project.id} className={`${cardBase} flex flex-col h-full bg-white overflow-hidden group`}>
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-cyan-100 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:-rotate-6 transition-transform">
                    <Server className="w-6 h-6" />
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-black hover:text-cyan-600 transition-colors">
                    <ExternalLink className="w-6 h-6" />
                  </a>
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
          ))}
        </div>
      </section>

      {/* Publications */}
      <section className="bg-black text-white py-24 px-6 md:px-12 border-y-2 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-12 uppercase tracking-tight text-white">Publications & Research</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PUBLICATIONS.map(pub => (
              <div key={pub.id} className="bg-white text-black border-4 border-white rounded-2xl p-8 transform hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start mb-4">
                  <span className={`font-mono font-bold text-sm px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${pub.color}`}>
                    {pub.type}
                  </span>
                  <span className="font-mono text-gray-500">{pub.date}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">{pub.title}</h3>
                <p className="font-mono text-gray-600 mb-6 pb-6 border-b-2 border-gray-200">
                  Published in: <span className="text-black font-bold">{pub.publisher}</span>
                </p>
                {pub.link && (
                  <a href={pub.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold hover:text-cyan-600">
                    Read Paper <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Badges & Certificates Gallery */}
      <section id="gallery" className={sectionPadding}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold uppercase tracking-tight mb-4">Certifications Wall</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">A visual collection of milestones, achievements, and future goals.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setModalData(cert)}
              className={`${cardBase} overflow-hidden cursor-pointer group`}
            >
              <div className={`h-48 ${cert.color} border-b-2 border-black relative overflow-hidden flex items-center justify-center p-4`}>
                <img
                  src={cert.img}
                  alt={cert.title}
                  className="w-full h-full object-cover border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white p-3 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Maximize2 className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-bold text-lg leading-tight mb-2">{cert.title}</h3>
                <div className="flex justify-between items-center font-mono text-sm text-gray-600">
                  <span>{cert.issuer}</span>
                  <span className="font-bold text-black border border-black px-2 py-0.5 rounded bg-gray-100">{cert.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Gallery */}
      {modalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setModalData(null)}>
          <div
            className="bg-white border-4 border-black rounded-3xl w-full max-w-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-[modalFadeIn_0.2s_ease-out]"
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
              <div className="border-4 border-black rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white mb-6">
                <img src={modalData.img} alt={modalData.title} className="w-full h-auto max-h-[50vh] object-contain p-4" />
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
              Currently looking for new opportunities as an AI/ML Engineer or Backend Developer.
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
              Prerak Lodha © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
