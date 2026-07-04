import React, { useState, useEffect } from 'react';
import { 
  Users, Award, Trophy, Calendar, Sparkles, GraduationCap, ClipboardCheck, 
  MonitorPlay, BarChart3, Star, Download, Search, Info, HelpCircle, 
  ArrowRight, FileText, ChevronLeft, ChevronRight, Laptop
} from 'lucide-react';

// Subcomponents
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import LiveChat from './components/LiveChat';
import AdmissionForm from './components/AdmissionForm';
import Portals from './components/Portals';
import TestPortal from './components/TestPortal';

// Section components
import AboutUs from './components/AboutUs';
import Courses from './components/Courses';
import Faculty from './components/Faculty';
import Results from './components/Results';
import GalleryLightbox from './components/GalleryLightbox';
import Blogs from './components/Blogs';
import FAQ from './components/FAQ';
import Contact from './components/Contact';

// Mock Data
import { stats, quickFeatures, testimonialsData, noticeBoardData, studyMaterialsData } from './mockData';
import { Testimonial, StudyMaterial } from './types';

export default function App() {
  // Modal togglers
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [selectedCourseForAdmission, setSelectedCourseForAdmission] = useState<string>('');
  
  const [portalOpen, setPortalOpen] = useState(false);
  const [portalType, setPortalType] = useState<'student' | 'parent' | 'teacher'>('student');
  
  const [quizOpen, setQuizOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Testimonials Carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Study Materials list state
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(studyMaterialsData);
  const [searchMaterialTerm, setSearchMaterialTerm] = useState('');

  // Active section scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'courses', 'faculty', 'results', 'gallery', 'blogs', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatic slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonialsData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenAdmission = (courseId: string = '') => {
    setSelectedCourseForAdmission(courseId);
    setIsAdmissionOpen(true);
  };

  const handleOpenPortal = (type: 'student' | 'parent' | 'teacher') => {
    setPortalType(type);
    setPortalOpen(true);
  };

  const handleDownloadMaterial = (id: string, fileName: string) => {
    // Increment download counter locally
    setStudyMaterials(prev => 
      prev.map(m => m.id === id ? { ...m, downloadCount: m.downloadCount + 1 } : m)
    );

    // Simulated pdf text download
    const element = document.createElement("a");
    const file = new Blob([
      `==================================================\n`,
      `          VERITAS ACADEMY BENGALURU            \n`,
      `         FREE STUDY RESOURCE DOWNLOAD CENTER        \n`,
      `==================================================\n\n`,
      `Document Title: ${fileName}\n`,
      `Downloaded On : ${new Date().toLocaleDateString()}\n\n`,
      `This curriculum material and study formulation is property of\n`,
      `Veritas Academy, Sultan Enclave, Kankanagar, Hebbal, Bengaluru.\n\n`,
      `For offline classroom coaching, CET mock test sheets, and direct\n`,
      `doubts clarification with Dr. Hajeera Arish, join our micro-batches.\n\n`,
      `Admissions Hotline: +91 9110669897\n`,
      `Web: admissionsveritas6362@gmail.com\n`,
      `==================================================`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName.replace(/\s+/g, '_')}_Veritas_Notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredMaterials = studyMaterials.filter(m => 
    m.title.toLowerCase().includes(searchMaterialTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchMaterialTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen transition-colors duration-300 antialiased font-sans">
      {/* Sticky Top-level Navigation */}
      <Navbar 
        onOpenAdmission={() => handleOpenAdmission()}
        onOpenPortal={handleOpenPortal}
        onOpenQuiz={() => setQuizOpen(true)}
        activeSection={activeSection}
      />

      {/* HOME PAGE / HERO BENTO GRID SECTION */}
      <header id="home" className="relative pt-32 pb-16 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        {/* Ambient background decorative blur circles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Main 12-Column Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Card 1: HERO MAIN CARD (Span 8 - Primary branding) */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              {/* Radial glow in corners */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full -ml-16 -mb-16 blur-3xl pointer-events-none"></div>

              <div className="space-y-6 relative z-10">
                {/* Highlight badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-100/60 dark:border-blue-900/40 text-xs font-semibold animate-in fade-in duration-500">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin-slow" />
                  <span>Premium Offline Tutoring in Hebbal</span>
                </div>

                {/* Display Headline */}
                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-white leading-tight tracking-tight">
                  Unlock Your Potential with{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Expert Guidance
                  </span>
                </h1>

                {/* Subheading */}
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                  Join thousands of successful students preparing for School, PUC Science/Commerce, Engineering Entrance, NEET, JEE, CET, and Competitive Exams. Experience the difference of micro-batches and personalized attention.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-8 sm:pt-12 relative z-10">
                <button
                  id="btn-hero-enroll"
                  onClick={() => handleOpenAdmission()}
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Enroll Now
                </button>
                <button
                  id="btn-hero-demo"
                  onClick={() => handleOpenAdmission()}
                  className="px-6 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-850 dark:text-slate-100 font-bold text-sm border border-slate-100 dark:border-slate-700 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Book Free Demo
                </button>
                <a
                  href="#study-materials"
                  className="px-5 py-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 text-blue-750 dark:text-blue-300 border border-blue-100/30 dark:border-blue-900/30 text-xs font-semibold hover:bg-blue-100/70 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Brochures
                </a>
              </div>
            </div>

            {/* Card 2: ACADEMY STATISTICS CARD (Span 4 - Sleek dark gradient box) */}
            <div className="lg:col-span-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-slate-900 dark:to-indigo-950 rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden border border-indigo-500/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-100 opacity-80 block mb-6">
                  Our Track Record
                </span>
                
                {/* 2x2 Stats Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  {stats.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight block text-white">
                        {item.value}
                      </span>
                      <span className="text-[10px] sm:text-xs font-medium text-blue-150 block opacity-90">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Badge / Trust text */}
              <div className="pt-8 border-t border-white/10 mt-8 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-bold">Hebbal's Pride Academy</p>
                  <p className="text-[10px] opacity-70">Over 15 Years of Educational Mastery</p>
                </div>
              </div>
            </div>

            {/* Card 3: NOTICE BOARD BULLETIN (Span 5 - News & updates) */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm relative flex flex-col justify-between overflow-hidden min-h-[380px]">
              <div>
                {/* Visual badge */}
                <span className="absolute top-6 right-6 bg-rose-50 dark:bg-rose-950/20 text-[9px] font-bold text-rose-600 dark:text-rose-400 font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-rose-100 dark:border-rose-900/30">
                  Live Bulletin
                </span>

                <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white mb-5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Academy Notice Board
                </h3>

                <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-1">
                  {noticeBoardData.map((notice) => (
                    <div 
                      key={notice.id} 
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 space-y-1 hover:border-blue-100 dark:hover:border-slate-800 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                          {notice.category}
                        </span>
                        <span className="text-[9px] text-slate-450 dark:text-slate-500 font-mono">
                          {notice.date}
                        </span>
                      </div>
                      <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-150 flex items-center gap-1.5 leading-snug">
                        {notice.title}
                        {notice.isNew && (
                          <span className="bg-emerald-500 text-white text-[8px] font-black uppercase px-1 py-0.5 rounded font-mono">NEW</span>
                        )}
                      </h4>
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {notice.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 dark:border-slate-800/80">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-mono">
                  Updated: Today (July 2026)
                </p>
              </div>
            </div>

            {/* Card 4: ONLINE PRACTICE PORTAL (Span 4 - Highly interactive portal test entry) */}
            <div className="lg:col-span-4 bg-purple-600 dark:bg-purple-900 text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden border border-purple-500/10 min-h-[380px]">
              {/* background design circles */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-30"></div>
              
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Laptop className="w-5 h-5 text-purple-200" />
                </div>
                
                <h3 className="font-display font-bold text-xl text-white leading-tight">
                  Online Practice Portal
                </h3>
                <p className="text-xs text-purple-100 opacity-90 leading-relaxed mt-3">
                  Take active diagnostic MCQ tests created by our Bangalore IISc & NIT expert faculty. Track formulas and instantly view detailed step-by-step mathematical explanations.
                </p>
              </div>

              <button
                onClick={() => setQuizOpen(true)}
                className="w-full mt-8 py-3.5 px-4 rounded-xl bg-white text-purple-700 hover:bg-purple-50 font-bold text-xs shadow-md shadow-purple-950/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                Launch Practice Exam &rarr;
              </button>
            </div>

            {/* Card 5: VERIFIED RATING / TESTIMONIAL SNAPSHOT (Span 3 - Social proof snippet) */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-between min-h-[380px]">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-450 dark:text-slate-500 block">
                  Public Feedback
                </span>

                {/* Google stars card */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white text-base mt-2">
                    4.9 / 5.0
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">120+ Verified Google Reviews</p>
                </div>

                {/* Testimonial preview */}
                <div className="italic text-xs text-slate-650 dark:text-slate-300 leading-relaxed">
                  "The small batch size of 15 students was a game changer. Prof. Arish monitored my weak areas in Physics daily..."
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 dark:border-slate-800/80 flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"
                  alt="Reviewer"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-slate-100 dark:border-slate-800"
                />
                <div>
                  <h5 className="font-bold text-[10.5px] text-slate-850 dark:text-white">Dr. Srinivas Swamy</h5>
                  <p className="text-[9.5px] text-slate-400">Parent of Aditya Swamy (JEE AIR 432)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* QUICK KEY FEATURES GRID */}
      <section id="quick-features" className="py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-indigo-600 dark:text-indigo-400">
              Why We Excel
            </span>
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white mt-1">
              Engineered for Maximum Performance
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Our infrastructure, batch guidelines, and evaluation routines are strictly structured to optimize conceptual recall.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickFeatures.map((feat) => {
              // Icon selector
              let Icon = Users;
              if (feat.icon === 'GraduationCap') Icon = GraduationCap;
              if (feat.icon === 'ClipboardCheck') Icon = ClipboardCheck;
              if (feat.icon === 'MonitorPlay') Icon = MonitorPlay;
              if (feat.icon === 'Sparkles') Icon = Sparkles;
              if (feat.icon === 'BarChart3') Icon = BarChart3;

              return (
                <div
                  key={feat.title}
                  className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/25 border border-slate-100 dark:border-slate-850 hover:border-indigo-100 dark:hover:border-indigo-900/30 hover:bg-white transition-all shadow-inner group"
                >
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100/30 mb-5 group-hover:scale-105 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-slate-850 dark:text-white tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <AboutUs />

      {/* COURSES & SYLLABUS SECTION */}
      <Courses onOpenAdmissionWithCourse={handleOpenAdmission} />

      {/* MOCK STUDENT TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left intro panel */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-indigo-600 dark:text-indigo-400">
                Alumni Voice
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                Verified Reviews from Parents & Students
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Nothing makes us prouder than hearing of our graduates' achievements. Read true stories from parents who experienced our personal, small-batch tutoring environment.
              </p>
              
              {/* Google Reviews rating mock badge */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm w-max">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                  G
                </div>
                <div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-350 font-bold mt-0.5">4.9 / 5.0 (120+ Google Reviews)</p>
                </div>
              </div>
            </div>

            {/* Right Sliding Carousel card panel */}
            <div className="lg:col-span-7">
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 sm:p-10 shadow-lg min-h-[300px] flex flex-col justify-between">
                {/* Absolute Quote Mark */}
                <span className="absolute top-8 right-8 text-slate-100 dark:text-slate-800 text-7xl font-serif font-black select-none pointer-events-none">
                  “
                </span>

                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(testimonialsData[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Feedback text */}
                  <p className="text-slate-650 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic">
                    "{testimonialsData[currentTestimonial].feedback}"
                  </p>
                </div>

                {/* Profile card footer */}
                <div className="flex items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonialsData[currentTestimonial].avatar}
                      alt={testimonialsData[currentTestimonial].name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover bg-slate-50"
                    />
                    <div>
                      <h4 className="font-display font-bold text-xs text-slate-850 dark:text-white">
                        {testimonialsData[currentTestimonial].name}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {testimonialsData[currentTestimonial].role} • Course: {testimonialsData[currentTestimonial].course}
                      </p>
                    </div>
                  </div>

                  {/* Manual Arrow Toggles */}
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setCurrentTestimonial(prev => (prev - 1 + testimonialsData.length) % testimonialsData.length)}
                      className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-550 dark:text-slate-400 cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonialsData.length)}
                      className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-550 dark:text-slate-400 cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACULTY MEMBERS PROFILES */}
      <Faculty />

      {/* RESULTS & TOP RANKERS */}
      <Results />

      {/* REVISION AND FORMULA WORKSHEETS FREE DOWNLOAD CENTER */}
      <section id="study-materials" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-indigo-600 dark:text-indigo-400">
                Resource Center
              </span>
              <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white mt-1">
                Download Free Syllabus & Formula Books
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Grab complimentary textbook outlines and standard CET physics equation summaries created by our expert faculty.
              </p>
            </div>

            {/* Filter Search */}
            <div className="relative w-full md:w-80">
              <input
                id="resource-search-box"
                type="text"
                placeholder="Search worksheets, blueprints..."
                value={searchMaterialTerm}
                onChange={(e) => setSearchMaterialTerm(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
              <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
            </div>
          </div>

          {/* Downloads Listing Grid */}
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xs text-slate-400">No resources matches your criteria. Try searching "formula" or "brochure".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-widest font-mono text-slate-400 block">
                        {mat.category} • {mat.fileType}
                      </span>
                      <h4 className="font-semibold text-xs text-slate-850 dark:text-white mt-1 leading-snug">
                        {mat.title}
                      </h4>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Size: {mat.fileSize} • {mat.downloadCount} DLs</span>
                    <button
                      id={`btn-download-mat-${mat.id}`}
                      onClick={() => handleDownloadMaterial(mat.id, mat.title)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      Download <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <GalleryLightbox />

      {/* BLOGS AND STUDY GUIDES */}
      <Blogs />

      {/* EXPANDING FAQ ACCORDIONS */}
      <FAQ />

      {/* CONTACT PAGE AND PHYSICAL HEBBAL MAPS */}
      <Contact />

      {/* STATIC FOOTER DETAILS */}
      <Footer 
        onOpenAdmission={() => handleOpenAdmission()}
        onOpenPortal={handleOpenPortal}
        onOpenQuiz={() => setQuizOpen(true)}
      />

      {/* FLOATING ACTION UTILITIES */}
      <FloatingButtons />

      {/* CONVERSATIONAL CHAT DESK */}
      <LiveChat />

      {/* REGISTRATION ADMISSIONS MODAL OVERLAY */}
      <AdmissionForm 
        isOpen={isAdmissionOpen} 
        onClose={() => setIsAdmissionOpen(false)}
        preSelectedCourse={selectedCourseForAdmission}
      />

      {/* STUDENT AND PARENT PORTALS OVERLAY */}
      <Portals 
        isOpen={portalOpen} 
        onClose={() => setPortalOpen(false)} 
        initialType={portalType} 
      />

      {/* ONLINE PRACTICE TEST PORTAL OVERLAY */}
      <TestPortal 
        isOpen={quizOpen} 
        onClose={() => setQuizOpen(false)} 
      />
    </div>
  );
}
