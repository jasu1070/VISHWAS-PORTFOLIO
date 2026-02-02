
import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Activity, 
  Settings, 
  Mail, 
  Phone, 
  MapPin, 
  Download,
  ChevronRight,
  Globe,
  Monitor,
  Box,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  PERSONAL_DETAILS, 
  EXPERIENCES, 
  SKILLS, 
  EDUCATIONS 
} from './constants';

const TechCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (isMobile) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX: isMobile ? 0 : rotateX, rotateY: isMobile ? 0 : rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative p-5 sm:p-6 rounded-sm border border-cyan-500/20 bg-slate-900/40 backdrop-blur-md group hover:border-cyan-500/60 transition-all duration-500 shadow-xl ${className}`}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500 group-hover:w-6 group-hover:h-6 transition-all duration-500" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500 group-hover:w-6 group-hover:h-6 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500 group-hover:w-6 group-hover:h-6 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500 group-hover:w-6 group-hover:h-6 transition-all duration-500" />
      <div className="relative z-10" style={{ transform: isMobile ? "none" : "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle: string; icon: any }> = ({ title, subtitle, icon: Icon }) => (
  <div className="mb-12 sm:mb-20 overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-3"
    >
      <Icon className="text-cyan-500" size={24} />
      <span className="text-cyan-500 font-mono tracking-[0.3em] text-[10px] sm:text-xs uppercase font-bold">{subtitle}</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase italic leading-none drop-shadow-2xl"
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '100%' }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="h-1 w-full bg-gradient-to-r from-cyan-500/80 via-cyan-500/20 to-transparent mt-6" 
    />
  </div>
);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    ['home', 'about', 'experience', 'skills', 'education'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((e: any, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  }, []);

  const navItems = [
    { icon: Monitor, label: 'CENTRAL', id: 'home' },
    { icon: Box, label: 'DATABASE', id: 'about' },
    { icon: Settings, label: 'PROCESS', id: 'experience' },
    { icon: Cpu, label: 'MODULES', id: 'skills' },
    { icon: Activity, label: 'LOGS', id: 'education' }
  ];

  return (
    <div className="min-h-screen bg-grid bg-dots relative overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
      {/* Heavy Ambient Lights */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navigation Bar - Global Header */}
      <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 font-mono"
          >
            <div className="w-10 h-10 bg-cyan-500 flex items-center justify-center rounded-sm">
              <Terminal size={24} className="text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-cyan-500 font-black text-sm tracking-tighter leading-none uppercase">V.K.ENGINEERING</span>
              <span className="text-cyan-500/50 text-[10px] tracking-[0.2em] font-bold">STATUS: ONLINE_NODE</span>
            </div>
          </motion.div>

          {/* Desktop Nav Buttons */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`group flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.2em] transition-all relative py-2 uppercase ${
                  activeSection === item.id ? 'text-cyan-500' : 'text-slate-500 hover:text-cyan-400'
                }`}
              >
                <item.icon size={14} className={activeSection === item.id ? "animate-pulse" : ""} />
                {item.label}
                {activeSection === item.id && (
                  <motion.div layoutId="nav-glow" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
             <div className="hidden md:block font-mono text-[10px] text-cyan-500/40 font-bold uppercase tracking-widest">{currentTime}</div>
             <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="lg:hidden w-10 h-10 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 rounded-sm hover:bg-cyan-500/20 transition-all"
             >
               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[999] bg-slate-950/98 flex flex-col pt-32 px-8 backdrop-blur-2xl"
          >
            <div className="space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`w-full flex items-center justify-between font-mono text-2xl font-black italic tracking-tight p-6 border rounded-sm transition-all ${
                    activeSection === item.id 
                    ? 'border-cyan-500 text-cyan-500 bg-cyan-500/10 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]' 
                    : 'border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-4 uppercase">
                    <item.icon size={24} />
                    {item.label}
                  </div>
                  <ChevronRight size={24} />
                </button>
              ))}
            </div>
            <div className="mt-auto pb-12 grid grid-cols-2 gap-4">
              <div className="p-4 border border-cyan-500/20 bg-cyan-500/5">
                <span className="block text-[8px] text-cyan-500/50 uppercase font-mono">System Time</span>
                <span className="text-xs font-mono font-bold text-cyan-500">{currentTime}</span>
              </div>
              <div className="p-4 border border-cyan-500/20 bg-cyan-500/5">
                <span className="block text-[8px] text-cyan-500/50 uppercase font-mono">Location</span>
                <span className="text-xs font-mono font-bold text-cyan-500 uppercase">Gujarat.IN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[2000] origin-left shadow-[0_0_15px_rgba(6,182,212,1)]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <header id="home" className="min-h-screen pt-32 pb-20 px-6 sm:px-10 lg:px-24 flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-0.5 w-16 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                <span className="font-mono text-cyan-500 uppercase tracking-[0.5em] text-xs font-black">Industrial Automation Engr</span>
              </div>
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.85] italic mb-10 text-slate-100">
                {PERSONAL_INFO.name.split(' ')[0]}<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(6, 182, 212, 0.4)' }}>{PERSONAL_INFO.name.split(' ')[1]}</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-6 mt-12">
                <button 
                  onClick={(e) => scrollToSection(e, 'experience')}
                  className="group relative px-10 py-5 bg-cyan-500 text-slate-950 font-black uppercase italic tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-4 overflow-hidden"
                >
                  <span className="relative z-10">INIT_CORE_PROCESS</span>
                  <ChevronRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                  <motion.div 
                    initial={false}
                    className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                  />
                </button>
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`} 
                  className="px-10 py-5 border-2 border-cyan-500/50 text-cyan-500 font-black uppercase italic tracking-widest hover:bg-cyan-500 hover:text-slate-950 transition-all text-center flex items-center justify-center gap-3"
                >
                  <Mail size={18} /> ESTABLISH_COMM
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-4">
            <TechCard className="aspect-[4/5] flex flex-col justify-between p-10 relative overflow-hidden group">
              <div className="absolute inset-0 z-0 pointer-events-none">
                 <img src={PERSONAL_INFO.profileImage} alt="Profile" className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-all duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              </div>
              <div className="relative z-10 flex justify-between items-start">
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/40">
                   <Monitor className="text-cyan-500" size={40} />
                </div>
                <div className="text-right font-mono">
                  <span className="block text-[10px] text-cyan-500/40 uppercase tracking-widest font-black">Designation_01</span>
                  <span className="block text-sm font-black text-slate-200">PLC_DEVELOPER</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-slate-950/50 border-l-4 border-cyan-500 italic">
                  <p className="text-xs font-mono text-slate-400 leading-relaxed uppercase">
                    "2025: PRODUCTION DEVELOPER WITH MES-DRIVEN EXECUTION, FAST TTL, LIVE SYSTEM OWNERSHIP, AND SMOOTH END-TO-END PRODUCTION WORKFLOW."
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-end font-mono">
                    <span className="text-[10px] text-cyan-500/60 font-black uppercase tracking-[0.2em]">Efficiency_Ratio</span>
                    <span className="text-sm font-black text-cyan-500">98.2%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden p-[1px]">
                    <motion.div 
                      className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "98.2%" }}
                      transition={{ duration: 2.5, delay: 1 }}
                    />
                  </div>
                </div>
              </div>
            </TechCard>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-24 border-y border-cyan-500/10 bg-slate-950/20">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader title="Database" subtitle="User_Profile_Metadata" icon={Box} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 sm:p-12 bg-cyan-500/[0.03] border border-cyan-500/10 relative group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                   <Activity size={80} className="text-cyan-500" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-widest text-cyan-500 mb-8 border-b border-cyan-500/20 pb-4 inline-block">Objective_Main</h3>
                <p className="text-lg sm:text-2xl text-slate-300 leading-relaxed italic font-light">
                  {PERSONAL_INFO.objective}
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PERSONAL_DETAILS.map((detail, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 border border-slate-800 bg-slate-900/40 group hover:border-cyan-500/30 transition-all shadow-lg"
                  >
                    <span className="block text-[10px] font-mono text-cyan-500/40 uppercase tracking-[0.2em] font-black mb-2">{detail.label}</span>
                    <span className="block font-black text-sm sm:text-lg text-slate-100 tracking-tight italic uppercase">{detail.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-4 h-full">
              <TechCard className="h-full flex flex-col p-8">
                <div className="space-y-8 flex-1">
                  <div className="space-y-2 group">
                    <h4 className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-[0.3em] font-black">V_01_EMAIL_PROTOCOL</h4>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 p-4 bg-slate-950/80 border border-cyan-500/10 hover:border-cyan-500/50 transition-all text-cyan-500 group-hover:bg-cyan-500/5">
                      <Mail size={20} />
                      <span className="text-xs font-mono font-bold truncate tracking-widest">{PERSONAL_INFO.email}</span>
                    </a>
                  </div>
                  <div className="space-y-2 group">
                    <h4 className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-[0.3em] font-black">V_02_PHONETIC_CORE</h4>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-4 p-4 bg-slate-950/80 border border-cyan-500/10 hover:border-cyan-500/50 transition-all text-cyan-500 group-hover:bg-cyan-500/5">
                      <Phone size={20} />
                      <span className="text-xs font-mono font-bold tracking-widest">{PERSONAL_INFO.phone}</span>
                    </a>
                  </div>
                  <div className="space-y-2 group">
                    <h4 className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-[0.3em] font-black">V_03_GEOGRAPHIC_COORD</h4>
                    <div className="flex items-start gap-4 p-4 bg-slate-950/80 border border-cyan-500/10">
                      <MapPin size={20} className="text-cyan-500 mt-1 flex-shrink-0" />
                      <span className="text-[10px] font-mono text-slate-400 leading-relaxed font-bold uppercase tracking-wider">{PERSONAL_INFO.address}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-cyan-500/10 flex justify-between items-center">
                  <div className="flex gap-2">
                    {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-cyan-500/40 rounded-full animate-pulse" />)}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-500/40 font-black tracking-widest uppercase">Encryption_Active</span>
                </div>
              </TechCard>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader title="Processing" subtitle="Experience_Operational_History" icon={Settings} />
          
          <div className="space-y-16 sm:y-24 relative">
            <div className="absolute left-6 sm:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-cyan-500/5 to-transparent hidden sm:block" />
            
            {EXPERIENCES.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative sm:pl-24"
              >
                <div className="absolute left-[34px] top-4 w-3 h-3 bg-slate-950 border-2 border-cyan-500 rounded-full hidden sm:block shadow-[0_0_10px_rgba(6,182,212,1)]" />
                
                <div className="flex flex-col lg:flex-row gap-8 items-start group">
                  <div className="w-full lg:w-56 flex-shrink-0 flex items-center justify-between lg:flex-col lg:items-start lg:gap-2">
                    <span className="text-3xl sm:text-5xl font-black italic text-cyan-500/40 group-hover:text-cyan-500 transition-colors duration-500">0{idx + 1}</span>
                    <span className="text-[10px] font-mono text-cyan-500 font-black tracking-[0.2em] uppercase bg-cyan-500/5 px-2 py-1 border border-cyan-500/20">{exp.period}</span>
                  </div>
                  
                  <div className="flex-1 w-full space-y-6">
                    <div>
                      <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black italic uppercase leading-none mb-3 text-slate-100 group-hover:text-cyan-400 transition-colors duration-500">{exp.role}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="text-cyan-500 font-mono text-sm sm:text-base font-black tracking-widest uppercase">{exp.company}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                        <span className="text-slate-500 font-mono text-[10px] sm:text-xs font-bold uppercase">LOC: {exp.location}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {exp.description.map((item, i) => (
                        <div key={i} className="flex gap-4 p-5 sm:p-6 border border-cyan-500/5 bg-slate-900/20 backdrop-blur-sm group/item hover:border-cyan-500/40 transition-all hover:bg-slate-900/40 shadow-lg">
                          <ChevronRight className="text-cyan-500 flex-shrink-0 mt-0.5 group-hover/item:translate-x-1 transition-transform" size={16} />
                          <p className="text-xs sm:text-sm text-slate-400 font-mono font-bold leading-relaxed uppercase tracking-tight">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-24 bg-slate-950/40 border-y border-cyan-500/10">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader title="Modules" subtitle="Core_Technology_Stack" icon={Cpu} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {SKILLS.map((skill, idx) => (
              <div key={idx} className="space-y-6 sm:space-y-8">
                <div className="flex items-center gap-4">
                  <div className="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-3 py-1 border border-cyan-500/30 uppercase font-black">CORE_{idx + 1}</div>
                  <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-slate-100">{skill.category}</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {skill.items.map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 10, backgroundColor: "rgba(6, 182, 212, 0.05)" }}
                      className="p-4 sm:p-5 bg-slate-900/50 border-l-4 border-slate-800 flex justify-between items-center group transition-all"
                    >
                      <span className="font-mono text-sm font-black text-slate-400 group-hover:text-cyan-500 transition-colors uppercase tracking-widest">{item}</span>
                      <div className="flex gap-1.5 opacity-20 group-hover:opacity-100 transition-opacity">
                         <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader title="Certification" subtitle="Validated_Knowledge_Base" icon={Activity} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {EDUCATIONS.map((edu, idx) => (
              <TechCard key={idx} className="flex flex-col min-h-[300px] p-10">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/40 self-start mb-8">
                  <span className="font-mono text-[11px] text-cyan-500 uppercase font-black tracking-[0.2em]">{edu.period}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black italic uppercase mb-4 leading-none text-slate-100 group-hover:text-cyan-400 transition-colors">{edu.degree}</h3>
                <p className="text-sm font-mono text-slate-500 font-bold uppercase mb-12 flex-1 tracking-widest">{edu.institution}</p>
                <div className="space-y-4">
                  <div className="h-0.5 w-full bg-slate-800 relative overflow-hidden">
                    <motion.div 
                      className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: idx * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <div className="flex justify-between items-center font-mono text-[9px] font-black tracking-widest text-cyan-500/40 uppercase">
                    <span>Degree_Validated</span>
                    <span>100%_AUTH</span>
                  </div>
                </div>
              </TechCard>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact Terminal */}
      <footer className="pt-32 pb-40 lg:pb-32 px-6 sm:px-10 lg:px-24 bg-slate-950 border-t-2 border-cyan-500/20 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -mr-80 -mb-80" />
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row justify-between items-start gap-20">
          <div className="max-w-2xl">
            <motion.h4 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl sm:text-8xl font-black italic uppercase mb-10 tracking-tighter leading-[0.85]"
            >
              ESTABLISH <span className="text-cyan-500">UPLINK?</span>
            </motion.h4>
            <p className="text-slate-400 font-mono text-sm sm:text-xl leading-relaxed uppercase font-bold tracking-tight mb-12 italic">
              "System available for industrial automation projects, logic development, and digital transformation consulting."
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="group p-6 border-2 border-cyan-500/40 text-cyan-500 hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center justify-center shadow-xl">
                <Mail size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="group p-6 border-2 border-cyan-500/40 text-cyan-500 hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center justify-center shadow-xl">
                <Phone size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={PERSONAL_INFO.resume}
                download
                className="group p-6 border-2 border-cyan-500/40 text-cyan-500 hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center justify-center gap-3 font-black italic uppercase tracking-widest shadow-xl"
              >
                <Download size={24} className="group-hover:translate-y-1 transition-transform" />
                <span className="hidden sm:inline">DOWNLOAD_RESUME</span>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-[450px] p-8 sm:p-10 bg-slate-900/50 border-2 border-cyan-500/20 font-mono text-xs shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]" />
            <div className="flex items-center gap-4 mb-8 border-b border-cyan-500/10 pb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/40" />
              </div>
              <span className="text-cyan-500/40 font-black tracking-[0.3em] uppercase">V_COMM_TERM_v4.2</span>
            </div>
            <div className="space-y-3 font-bold text-slate-500">
              <p><span className="text-cyan-500">vk@node:~$</span> status --full</p>
              <p className="text-cyan-300 uppercase">IDENT_01: {PERSONAL_INFO.fullName}</p>
              <p className="text-cyan-300 uppercase">EXPER_01: {EXPERIENCES[0].role}</p>
              <p className="text-cyan-300 uppercase">COMP_01: {EXPERIENCES[0].company}</p>
              <p className="text-green-500/80 uppercase tracking-widest">CONNECTION_ESTABLISHED_MES</p>
              <div className="flex items-center gap-2">
                <span className="text-cyan-500">vk@node:~$</span>
                <span className="w-3 h-5 bg-cyan-500/80 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto mt-24 sm:mt-32 pt-10 border-t border-cyan-500/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-slate-600 tracking-[0.4em] uppercase font-black text-center md:text-left">
          <div className="flex items-center gap-4">
            <Monitor size={14} className="text-cyan-500/20" />
            ARCHITECTURE: INDUSTRIAL_CORE_V3.5
          </div>
          <div>© {new Date().getFullYear()} VISHWAS_KUMAR.DESIGN_UNIT</div>
          <div className="flex items-center gap-3 bg-cyan-500/5 px-4 py-2 border border-cyan-500/10">
            <Globe size={14} className="animate-spin-slow" />
            GEO_SYNC: GUJARAT_ARVALLI
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
