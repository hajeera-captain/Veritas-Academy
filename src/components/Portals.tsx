import React, { useState, useEffect } from 'react';
import { 
  X, User, GraduationCap, Lock, BookOpen, ClipboardList, 
  CheckCircle, Calendar, BarChart3, Coins, MessageSquare, 
  Trash, Eye, EyeOff, ShieldCheck, Mail, Download, Search, 
  Award, FileText, CheckCircle2, Clock, MapPin, Sparkles, BookCheck
} from 'lucide-react';
import { studyMaterialsData } from '../mockData';

interface PortalsProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: 'student' | 'parent' | 'teacher';
}

export default function Portals({ isOpen, onClose, initialType }: PortalsProps) {
  const [activeTab, setActiveTab] = useState<'student' | 'parent' | 'teacher'>(initialType);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Student Portal Tabs
  const [studentSubTab, setStudentSubTab] = useState<'courses' | 'exams' | 'results' | 'materials'>('courses');
  
  // Local states for study materials and search
  const [materialsList, setMaterialsList] = useState(studyMaterialsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterialCategory, setSelectedMaterialCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // States for student portal data
  const [studentData] = useState({
    name: 'Zainab Fatima',
    id: 'VERITAS-REG-2026',
    course: '2nd PUC Science Integrated',
    attendance: '96.5%',
    attendanceSessions: '28 / 29 classes',
    feeStatus: 'Fully Paid (A/C No: VERITAS-6362)',
    recentGrades: [
      { id: 'g1', test: 'Chemistry Organic Mock 2', score: '28 / 30', date: 'June 28, 2026', status: 'A+', percentile: '98th', remarks: 'Outstanding deduction of Finkelstein reagents!', educator: 'Dr. Hajeera Arish' },
      { id: 'g2', test: 'Physics Electrostatics Test 1', score: '27 / 30', date: 'June 21, 2026', status: 'A', percentile: '95th', remarks: 'Mechanics derivation was clean. Mind the sign conventions.', educator: 'Prof. Mohammed Arish' },
      { id: 'g3', test: 'Mathematics Calculus Assignment 1', score: '10 / 10', date: 'June 14, 2026', status: 'S', percentile: '100th', remarks: 'Flawless homework submission with compact proofs.', educator: 'Prof. Ramesh K. S.' },
      { id: 'g4', test: 'NEET Biology Zoology Diagnostic', score: '345 / 360', date: 'June 07, 2026', status: 'A+', percentile: '99th', remarks: 'Genetics logic is perfect. Work slightly on Plant Taxonomy memorization.', educator: 'Mrs. Shabana Begum' }
    ],
    enrolledPrograms: [
      {
        id: 'p1',
        title: '2nd PUC Science Integrated',
        progress: 85,
        educator: 'Dr. Hajeera Arish (Chemistry), Prof. Ramesh (Math)',
        schedule: 'Mon - Sat (6:30 AM - 8:30 AM & 5:30 PM - 8:30 PM)',
        nextClass: 'Today at 5:30 PM (Electrostatics Derivations with Prof. Arish)',
        syllabus: ['Derivatives & Calculus', 'Electrostatics & Gauss Law', 'Nucleophilic Substitution Reactions', 'Recombinant DNA Genetics']
      },
      {
        id: 'p2',
        title: 'NEET Medical Coaching Prep',
        progress: 72,
        educator: 'Mrs. Shabana Begum (Biology), Dr. Hajeera (Chemistry)',
        schedule: 'Sundays (9:00 AM - 12:30 PM Test & 1:30 PM - 4:30 PM Review)',
        nextClass: 'Saturday 4:30 PM (Plant Anatomy Revision Lab)',
        syllabus: ['Human Physiology', 'Botany Genetics', 'Organic Chemistry for NEET', 'Physics Speed Drills']
      }
    ],
    upcomingExams: [
      {
        id: 'ex1',
        title: 'NEET Sunday Mock Test 3',
        date: 'July 12, 2026 (Sunday)',
        time: '09:30 AM - 12:30 PM',
        room: 'Lecture Hall H-201',
        portion: 'Organic Halides Pathways & Electrostatics Gauss Applications',
        type: 'NEET Simulation (Written & OMR Grid)',
        urgency: 'high'
      },
      {
        id: 'ex2',
        title: 'Physics Weekly Drill Test',
        date: 'July 18, 2026 (Saturday)',
        time: '04:30 PM - 06:00 PM',
        room: 'Seminar Room S-1',
        portion: 'Magnetic Effects of Current & Coulomb Law Integrals',
        type: 'Short Subjective Drill',
        urgency: 'medium'
      },
      {
        id: 'ex3',
        title: 'Mathematics Monthly Revision Exam',
        date: 'July 25, 2026 (Saturday)',
        time: '04:30 PM - 06:30 PM',
        room: 'Lecture Hall H-202',
        portion: 'Limits, Continuity & Advanced Calculus Derivations',
        type: 'Boards Format Exam',
        urgency: 'low'
      }
    ],
    assignments: [
      { id: 'as1', subject: 'Physics', title: 'Coulomb\'s Law Advanced DPP', due: 'July 10, 2026', status: 'Pending' },
      { id: 'as2', subject: 'Chemistry', title: 'Finkelstein Reagents Chart', due: 'July 12, 2026', status: 'Submitted' }
    ]
  });

  // Admin database leads loaded from localStorage
  const [leadsList, setLeadsList] = useState<any[]>([]);

  useEffect(() => {
    setActiveTab(initialType);
    setIsLoggedIn(false);
    setLoginId('');
    setPassword('');
    setLoginError('');
    setShowPassword(false);
    setStudentSubTab('courses');
  }, [initialType, isOpen]);

  useEffect(() => {
    if (isOpen && activeTab === 'teacher') {
      loadLeads();
    }
  }, [isOpen, activeTab]);

  const loadLeads = () => {
    const leads = JSON.parse(localStorage.getItem('admissions_leads') || '[]');
    const chatbots = JSON.parse(localStorage.getItem('admissions_callback_requests') || '[]');
    const combined = [
      ...leads.map((l: any) => ({ ...l, type: 'Admission Webform' })),
      ...chatbots.map((c: any) => ({ ...c, type: 'Chat Advisor Lead', studentName: c.name, parentName: 'N/A' }))
    ];
    combined.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
    setLeadsList(combined);
  };

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const formattedId = loginId.trim().toUpperCase();

    if (activeTab === 'student') {
      // Secure check for both ID and password
      const isValidId = formattedId === 'STUDENT' || formattedId === 'VERITAS-REG-2026' || formattedId === '12345' || formattedId.startsWith('VERITAS');
      const isValidPass = password.trim() === 'student123' || password.trim() === 'password';

      if (isValidId && isValidPass) {
        setIsLoggedIn(true);
      } else if (!isValidId) {
        setLoginError('Invalid Student registration ID. Try: STUDENT or VERITAS-REG-2026');
      } else {
        setLoginError('Incorrect password. Try: student123');
      }
    } else if (activeTab === 'parent') {
      const isValidPhone = loginId.length >= 10 || loginId === '9110669897' || loginId === '9999999999';
      const isValidPass = password.trim() !== ''; // Parents can use any dummy code to simulate OTP login securely

      if (isValidPhone && isValidPass) {
        setIsLoggedIn(true);
      } else if (!isValidPhone) {
        setLoginError('Please enter your 10-digit registered mobile number. Try: 9110669897');
      } else {
        setLoginError('Please enter the security verification PIN or password.');
      }
    } else if (activeTab === 'teacher') {
      if (loginId.trim().toUpperCase() === 'ADMIN' && password === 'ADMIN') {
        setIsLoggedIn(true);
        loadLeads();
      } else {
        setLoginError('Invalid Faculty ID or administrative code. Try: ADMIN / ADMIN');
      }
    }
  };

  const handleDeleteLead = (id: string, type: string) => {
    if (confirm('Are you sure you want to resolve and remove this inquiry?')) {
      const key = type === 'Admission Webform' ? 'admissions_leads' : 'admissions_callback_requests';
      const items = JSON.parse(localStorage.getItem(key) || '[]');
      const filtered = items.filter((item: any) => item.id !== id);
      localStorage.setItem(key, JSON.stringify(filtered));
      loadLeads();
    }
  };

  const handleDownload = (material: any) => {
    // Increment download counter locally
    const updated = materialsList.map(m => {
      if (m.id === material.id) {
        return { ...m, downloadCount: m.downloadCount + 1 };
      }
      return m;
    });
    setMaterialsList(updated);

    // Show beautiful toast
    setToastMessage(`Downloading: ${material.title}`);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // Filter study materials dynamically
  const filteredMaterials = materialsList.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          material.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedMaterialCategory === 'All' || material.category === selectedMaterialCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Portal Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-5xl shadow-2xl relative z-10 flex flex-col h-[650px] border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Header Block */}
        <div className="bg-slate-950 p-6 text-white flex items-center justify-between shrink-0 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-display font-bold text-lg">
              V
            </div>
            <div>
              <h3 className="font-display font-bold text-base tracking-tight text-white">
                Veritas Digital Learning Hub
              </h3>
              <p className="text-[10px] text-slate-500 font-mono">
                SECURE ACCESS HUB v3.1 • COMPLIANT SSL GATEWAY
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portals Select Tabs (Only if not logged in) */}
        {!isLoggedIn && (
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1.5 shrink-0">
            <button
              onClick={() => { setActiveTab('student'); setLoginError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'student'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <User className="w-4 h-4" />
              Student Portal
            </button>
            <button
              onClick={() => { setActiveTab('parent'); setLoginError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'parent'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Parent Portal
            </button>
            <button
              onClick={() => { setActiveTab('teacher'); setLoginError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'teacher'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Lock className="w-4 h-4" />
              Faculty / Admin
            </button>
          </div>
        )}

        {/* Core Screen Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950/40 flex flex-col">
          {!isLoggedIn ? (
            /* Secure Login Screen Form */
            <div className="max-w-md mx-auto py-6 space-y-6 w-full">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-2 border border-blue-100 dark:border-blue-900/35">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white">
                  {activeTab === 'student' && 'Secure Student Login'}
                  {activeTab === 'parent' && 'Parent Progress Portal'}
                  {activeTab === 'teacher' && 'Faculty Administrative Center'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                  {activeTab === 'student' && 'Enter your unique Student ID and secure password to check grades, worksheets and lectures.'}
                  {activeTab === 'parent' && 'Enter your registered mobile number and PIN to monitor ward grades, remarks, and attendances.'}
                  {activeTab === 'teacher' && 'Enter authorized administrative credentials to view dashboard inquiries and counseling sheets.'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                {loginError && (
                  <p className="text-xs font-medium text-rose-500 bg-rose-50 dark:bg-rose-950/20 px-3.5 py-2.5 rounded-lg border border-rose-100 dark:border-rose-900/40 animate-fade-in">
                    {loginError}
                  </p>
                )}

                {/* Username/ID field */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                    {activeTab === 'student' && 'Student Registration ID'}
                    {activeTab === 'parent' && 'Registered Mobile Number'}
                    {activeTab === 'teacher' && 'Faculty ID Key'}
                  </label>
                  <input
                    type="text"
                    required
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder={
                      activeTab === 'student'
                        ? 'e.g., student or VERITAS-REG-2026'
                        : activeTab === 'parent'
                        ? 'e.g., 9110669897'
                        : 'e.g., ADMIN'
                    }
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100"
                  />
                </div>

                {/* Password field - Active for student as well for SECURE portal */}
                {(activeTab === 'student' || activeTab === 'teacher' || activeTab === 'parent') && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        {activeTab === 'parent' ? 'Security Verification PIN / Passcode' : 'Secure Password'}
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={
                          activeTab === 'student' 
                            ? 'e.g., student123' 
                            : activeTab === 'parent' 
                            ? 'e.g., parent123 or any password' 
                            : 'e.g., ADMIN'
                        }
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-350 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  id="btn-confirm-credentials"
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  Confirm Security Credentials & Login
                </button>
              </form>

              {/* Informational help box */}
              <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 flex items-start gap-2.5 max-w-sm mx-auto text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Quick Sandbox logins:</p>
                  <p className="mt-1 text-[11px] leading-relaxed">
                    🎓 Student: ID <code className="font-bold font-mono px-1 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded">student</code> & password <code className="font-bold font-mono px-1 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded">student123</code><br />
                    👨‍👩‍👧 Parent: ID <code className="font-bold font-mono px-1 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded">9110669897</code> & password <code className="font-bold font-mono px-1 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded">parent123</code><br />
                    💼 Admin/Teacher: ID <code className="font-bold font-mono px-1 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded">ADMIN</code> & password <code className="font-bold font-mono px-1 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded">ADMIN</code>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Logged In Portals views */
            <div className="space-y-6 flex-1 flex flex-col">
              {/* Profile Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    {activeTab === 'student' && <User className="w-5 h-5" />}
                    {activeTab === 'parent' && <GraduationCap className="w-5 h-5" />}
                    {activeTab === 'teacher' && <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">
                      {activeTab === 'student' && studentData.name}
                      {activeTab === 'parent' && `Aditya's Parent Dashboard`}
                      {activeTab === 'teacher' && 'Principal / Admin Register'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {activeTab === 'student' && `${studentData.course} • ID: ${studentData.id}`}
                      {activeTab === 'parent' && `Tracking ward: Aditya Swamy • Course: JEE Prep`}
                      {activeTab === 'teacher' && 'Hebbal Campus Admission Logs'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Toast Download Notification */}
              {toastMessage && (
                <div className="bg-emerald-600 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 self-center animate-fade-in z-20 font-sans border border-emerald-500">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{toastMessage}</span>
                  <span className="ml-1 text-[10px] font-mono opacity-80">( Virtual download count incremented )</span>
                </div>
              )}

              {/* STUDENT PORTAL DASHBOARD */}
              {activeTab === 'student' && (
                <div className="flex-1 flex flex-col min-h-0 space-y-4">
                  {/* Dashboard stats panel */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 shrink-0">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-3.5 shadow-sm">
                      <h5 className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1">My Attendance</h5>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="text-lg font-bold text-slate-800 dark:text-white font-mono">{studentData.attendance}</span>
                      </div>
                      <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">● Excellent Status</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-3.5 shadow-sm">
                      <h5 className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1">Enrolled Programs</h5>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-purple-500" />
                        <span className="text-lg font-bold text-slate-800 dark:text-white font-mono">{studentData.enrolledPrograms.length} Active</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Dual Board & Entrance Prep</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-3.5 shadow-sm">
                      <h5 className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1">Upcoming Exams</h5>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="text-lg font-bold text-slate-800 dark:text-white font-mono">{studentData.upcomingExams.length} Scheduled</span>
                      </div>
                      <p className="text-[10px] text-rose-500 font-semibold mt-0.5">Next exam Sunday</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-3.5 shadow-sm">
                      <h5 className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1">Avg Percentile</h5>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-500" />
                        <span className="text-lg font-bold text-slate-800 dark:text-white font-mono">98.0%</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Top 5% Batch Ranking</p>
                    </div>
                  </div>

                  {/* Dashboard Internal Tabs */}
                  <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-1 shrink-0">
                    <button
                      onClick={() => setStudentSubTab('courses')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        studentSubTab === 'courses'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Enrolled Courses
                    </button>
                    <button
                      onClick={() => setStudentSubTab('exams')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        studentSubTab === 'exams'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Upcoming Exams
                    </button>
                    <button
                      onClick={() => setStudentSubTab('results')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        studentSubTab === 'results'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      Past Results
                    </button>
                    <button
                      onClick={() => setStudentSubTab('materials')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        studentSubTab === 'materials'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Study Materials
                    </button>
                  </div>

                  {/* Dashboard Content Block */}
                  <div className="flex-1 overflow-y-auto min-h-0 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                    {/* SUB-TAB 1: ENROLLED COURSES */}
                    {studentSubTab === 'courses' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-850 pb-2">
                          <h6 className="font-display font-bold text-xs uppercase text-slate-500 tracking-wider">
                            My Active Educational Programs
                          </h6>
                          <span className="text-[10px] text-blue-500 font-bold font-mono">2ND PUC SCIENCE INTEGRATED GROUP</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {studentData.enrolledPrograms.map((course) => (
                            <div key={course.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 hover:border-blue-500/20 transition-all flex flex-col justify-between">
                              <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                  <h7 className="font-display font-bold text-sm text-slate-800 dark:text-white leading-tight">
                                    {course.title}
                                  </h7>
                                  <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded">
                                    Active
                                  </span>
                                </div>

                                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                  <User className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                  <span>Instructors: <b>{course.educator}</b></span>
                                </p>

                                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                  <span>Weekly Schedule: <b>{course.schedule}</b></span>
                                </p>

                                <div className="p-3 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-50/70 dark:border-blue-950/30 rounded-xl">
                                  <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                                    Next Lecture Segment
                                  </span>
                                  <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                                    {course.nextClass}
                                  </p>
                                </div>

                                <div className="space-y-1 pt-1">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Syllabus Covered & Targets:</span>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    {course.syllabus.map((syl, i) => (
                                      <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-400">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                                        <span className="truncate">{syl}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                                  <span>Syllabus Completion progress</span>
                                  <span className="font-bold font-mono text-blue-600 dark:text-blue-400">{course.progress}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-600" style={{ width: `${course.progress}%` }}></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SUB-TAB 2: UPCOMING EXAM SCHEDULES */}
                    {studentSubTab === 'exams' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-850 pb-2">
                          <h6 className="font-display font-bold text-xs uppercase text-slate-500 tracking-wider">
                            My Upcoming Mock & Boards Examination Calendar
                          </h6>
                          <span className="text-[10px] text-amber-500 font-semibold flex items-center gap-1 font-mono">
                            ● ADMISSIONS & SAT SCHEDULING ACTIVE
                          </span>
                        </div>

                        <div className="space-y-3">
                          {studentData.upcomingExams.map((exam) => (
                            <div key={exam.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`px-2 py-0.5 text-[8px] font-bold uppercase rounded ${
                                    exam.urgency === 'high' 
                                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20'
                                      : exam.urgency === 'medium'
                                      ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/20'
                                      : 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/20'
                                  }`}>
                                    {exam.urgency === 'high' ? 'CRITICAL MOCK' : exam.urgency === 'medium' ? 'WEEKLY TEST' : 'REVISION EXAM'}
                                  </span>
                                  <h7 className="font-semibold text-xs text-slate-800 dark:text-slate-100">
                                    {exam.title}
                                  </h7>
                                </div>

                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex flex-wrap gap-x-4 gap-y-1">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                    Date: <b>{exam.date}</b>
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                                    Time: <b>{exam.time}</b>
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                                    Room: <b>{exam.room}</b>
                                  </span>
                                </p>

                                <div className="text-[11px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-2.5 rounded-lg">
                                  <span className="font-bold text-[9px] text-slate-400 uppercase font-mono block mb-0.5">Syllabus Coverage:</span>
                                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{exam.portion}</p>
                                </div>
                              </div>

                              <div className="shrink-0 text-right md:border-l md:border-slate-150 md:dark:border-slate-850 md:pl-5 flex flex-row md:flex-col items-center justify-between md:justify-center gap-3">
                                <div>
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block text-left md:text-right">Exam Format:</span>
                                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block text-left md:text-right">{exam.type}</span>
                                </div>
                                <button
                                  onClick={() => alert(`Rules and portions for ${exam.title} downloaded to virtual console.`)}
                                  className="px-3 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 hover:bg-slate-100 hover:text-blue-600 text-[10px] font-bold rounded-lg cursor-pointer transition-colors"
                                >
                                  Download Portion
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Exam guidelines notice card */}
                        <div className="p-4 rounded-xl bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/35 dark:border-amber-900/20 text-[11px] leading-relaxed text-amber-800 dark:text-amber-400 flex gap-2.5">
                          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                          <div>
                            <p className="font-bold uppercase tracking-wider text-[10px]">Mandatory Academic Guidelines for Mock Tests:</p>
                            <p className="mt-1">
                              Attendance in NEET mocks is mandatory. OMR answer scripts are scanned on Sunday afternoons, and complete student performance percentiles are updated to Parent Dashboards by Monday evening. Hall entry cards or registration keys must be displayed to teachers at the Hebbal testing center entrance.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB-TAB 3: PAST RESULTS SECTION */}
                    {studentSubTab === 'results' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-850 pb-2">
                          <h6 className="font-display font-bold text-xs uppercase text-slate-500 tracking-wider">
                            My Graded Tests & Continuous Evaluation Report
                          </h6>
                          <span className="text-[10px] text-blue-500 font-bold font-mono">CUMULATIVE STUDY STATUS: S-GRADE AVG</span>
                        </div>

                        <div className="space-y-3">
                          {studentData.recentGrades.map((grade) => (
                            <div key={grade.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 flex flex-col space-y-3">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-150 dark:border-slate-850 pb-2">
                                <div>
                                  <h7 className="font-bold text-xs text-slate-800 dark:text-slate-100 block">{grade.test}</h7>
                                  <span className="text-[10px] text-slate-400 mt-0.5 block">Evaluated On: {grade.date}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <div className="text-right">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Score Card</span>
                                    <span className="font-bold font-mono text-sm text-slate-800 dark:text-white">{grade.score}</span>
                                  </div>
                                  <span className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center text-xs text-blue-600 dark:text-blue-400 font-bold font-mono shrink-0 shadow-sm">
                                    {grade.status}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                                <div>
                                  <span className="text-slate-400 block uppercase text-[9px] font-mono tracking-wider">Subject Area & Mentor</span>
                                  <span className="font-medium text-slate-700 dark:text-slate-300 block">{grade.educator}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block uppercase text-[9px] font-mono tracking-wider">Batch Percentile Rank</span>
                                  <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 block">{grade.percentile} Percentile</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block uppercase text-[9px] font-mono tracking-wider">Academics Performance Standing</span>
                                  <span className="font-semibold text-blue-600 dark:text-blue-400 block">Class Topper Group</span>
                                </div>
                              </div>

                              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 italic text-slate-500 text-[10.5px] leading-relaxed flex items-start gap-1.5">
                                <MessageSquare className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                <span>
                                  <b>Educator Feedback:</b> "{grade.remarks}"
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Interactive analysis summary */}
                        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h7 className="font-display font-bold text-xs text-slate-800 dark:text-white flex items-center gap-1">
                              <Sparkles className="w-4 h-4 text-amber-500" />
                              Need a certified physical Transcript?
                            </h7>
                            <p className="text-[11px] text-slate-400">
                              Generate a sealed report card containing monthly ranks signed by Hebbal Campus Principal Dr. Hajeera Arish.
                            </p>
                          </div>
                          <button
                            onClick={() => alert('Continuous assessment scorecard compiled successfully. Sent to registered parent phone.')}
                            className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs shrink-0 cursor-pointer transition-colors active:scale-98"
                          >
                            Print Consolidated Report Card
                          </button>
                        </div>
                      </div>
                    )}

                    {/* SUB-TAB 4: STUDY MATERIALS SECTION */}
                    {studentSubTab === 'materials' && (
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 dark:border-slate-850 pb-3">
                          <h6 className="font-display font-bold text-xs uppercase text-slate-500 tracking-wider">
                            Interactive Study Materials & Formula Sheet Vault
                          </h6>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-blue-500 font-bold font-mono">NCERT ALIGNED RESOURCES</span>
                          </div>
                        </div>

                        {/* Search and filtering row */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search booklet title, subject, formula..."
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100"
                            />
                          </div>

                          <div className="flex gap-1.5 overflow-x-auto pb-1">
                            {['All', 'Notes', 'Formula Sheet', 'Syllabus', 'Brochure'].map((cat) => (
                              <button
                                key={cat}
                                onClick={() => setSelectedMaterialCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-[10.5px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                                  selectedMaterialCategory === cat
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-slate-50 dark:bg-slate-950 text-slate-500 hover:text-slate-700 dark:hover:text-slate-350 border border-slate-200/50 dark:border-slate-800/80'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Materials Listing Table */}
                        {filteredMaterials.length > 0 ? (
                          <div className="space-y-2">
                            {filteredMaterials.map((material) => (
                              <div
                                key={material.id}
                                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 hover:border-blue-500/20 transition-all flex items-center justify-between gap-4"
                              >
                                <div className="flex items-start gap-3 min-w-0">
                                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100/40 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                    <FileText className="w-4.5 h-4.5" />
                                  </div>
                                  <div className="min-w-0">
                                    <h7 className="font-semibold text-xs text-slate-800 dark:text-slate-100 block truncate">
                                      {material.title}
                                    </h7>
                                    <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                                      <span className="font-bold text-blue-500 uppercase">{material.category}</span>
                                      <span>• File: <b>{material.fileType}</b></span>
                                      <span>• Size: <b>{material.fileSize}</b></span>
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 shrink-0">
                                  <div className="text-right hidden sm:block">
                                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Downloads</span>
                                    <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">{material.downloadCount} files</span>
                                  </div>
                                  <button
                                    onClick={() => handleDownload(material)}
                                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10.5px] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 space-y-3">
                            <Search className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
                            <p className="text-xs text-slate-400 leading-relaxed">
                              No study materials found matching <code className="font-bold font-mono px-1 bg-slate-50 dark:bg-slate-950">"{searchQuery}"</code> in this category.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PARENT PORTAL DASHBOARD (PRESERVED & COLOR ADJUSTED) */}
              {activeTab === 'parent' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0 overflow-y-auto">
                  {/* Left Column: Progress summary */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm space-y-4">
                    <h5 className="font-display font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                      <BarChart3 className="w-4.5 h-4.5 text-blue-500" />
                      Aditya's Academic Performance Chart
                    </h5>
                    <div className="space-y-3.5">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-500">Physics (JEE mechanics)</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">92%</span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-500">Chemistry (Organic pathways)</span>
                          <span className="font-bold text-purple-600 dark:text-purple-400">89%</span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-600" style={{ width: '89%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-500">Mathematics (Limits & calculus)</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">95%</span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 text-xs">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Educators Monthly Remarks:</p>
                      <blockquote className="mt-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 italic text-slate-500 text-[11px] leading-relaxed">
                        "Aditya has excellent logical deduction. His calculus derivation matches top college layouts. Needs some visual formula mapping in Chemistry to avoid reagent confusion. Attendance is a perfect 100% in Physics Sunday mocks."
                        <span className="block text-right text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1 font-sans not-italic">— Dr. Hajeera Arish</span>
                      </blockquote>
                    </div>
                  </div>

                  {/* Right Column: Parent feedback */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm space-y-4">
                    <h5 className="font-display font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                      <MessageSquare className="w-4.5 h-4.5 text-blue-500" />
                      Direct Communication with Faculty
                    </h5>
                    <p className="text-xs text-slate-400">
                      Leave a question or schedule a parent-teacher discussion below. Our team replies within 12 hours.
                    </p>
                    <textarea
                      rows={3}
                      placeholder="e.g., I would like to request a 10-minute slot during Saturday's PTM to discuss Aditya's Chemistry preparations..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 resize-none"
                    ></textarea>
                    <button
                      onClick={() => alert('Your query was successfully transmitted to Principal Office.')}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Transmit Memo to Administrator
                    </button>
                  </div>
                </div>
              )}

              {/* TEACHER/ADMIN PORTAL DASHBOARD (PRESERVED) */}
              {activeTab === 'teacher' && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm space-y-4 flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3 shrink-0">
                    <h5 className="font-display font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                      <ClipboardList className="w-4.5 h-4.5 text-blue-500" />
                      Live Admission Inquiries & Callbacks ({leadsList.length})
                    </h5>
                    <button
                      onClick={loadLeads}
                      className="text-xs px-2.5 py-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 rounded cursor-pointer"
                    >
                      Reload Database
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 min-h-0">
                    {leadsList.length === 0 ? (
                      <div className="text-center py-12 space-y-2">
                        <Mail className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="text-xs text-slate-400">No active student registrations or callback inquiries logged in this sandbox environment.</p>
                        <p className="text-[10px] text-blue-500 font-semibold">Try filling in the Admission form or chatting with the Bot, then return here!</p>
                      </div>
                    ) : (
                      leadsList.map((lead, idx) => (
                        <div key={lead.id || idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800 dark:text-slate-200">{lead.studentName}</span>
                              <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                {lead.type}
                              </span>
                            </div>
                            <p className="text-slate-400 text-[10px] mt-1 flex flex-wrap gap-x-3">
                              <span>Phone: <b className="font-mono text-slate-700 dark:text-slate-300">+91 {lead.phone}</b></span>
                              {lead.course && <span>Course: <b className="text-slate-700 dark:text-slate-300">{lead.course.replace('-', ' ').toUpperCase()}</b></span>}
                              {lead.parentName !== 'N/A' && <span>Parent: <b className="text-slate-700 dark:text-slate-300">{lead.parentName}</b></span>}
                            </p>
                            {lead.notes && <p className="text-[10px] text-blue-500 italic mt-1 font-mono">"{lead.notes}"</p>}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.type)}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-850 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer border border-transparent hover:border-rose-100"
                              title="Resolve & Clear"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
