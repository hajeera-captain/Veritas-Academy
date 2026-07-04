import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, User, BookOpen, GraduationCap, Laptop, Award } from 'lucide-react';

interface NavbarProps {
  onOpenAdmission: () => void;
  onOpenPortal: (portalType: 'student' | 'parent' | 'teacher') => void;
  onOpenQuiz: () => void;
  activeSection: string;
}

export default function Navbar({ onOpenAdmission, onOpenPortal, onOpenQuiz, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  // Sync dark mode preference with HTML element
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
                   (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Courses', href: '#courses' },
    { label: 'Faculty', href: '#faculty' },
    { label: 'Results', href: '#results' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Blogs', href: '#blogs' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                V
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight text-slate-950 dark:text-white block">
                  VERITAS
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-600 dark:text-indigo-400 font-bold block -mt-1">
                  Academy Hebbal
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  activeSection === link.href.slice(1)
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTAs and Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Practice Quiz Portal */}
            <button
              id="btn-quiz-portal"
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-100 dark:border-indigo-900/40 transition-colors cursor-pointer"
            >
              <Laptop className="w-3.5 h-3.5" />
              Test Portal
            </button>

            {/* Portals Dropdown */}
            <div className="relative">
              <button
                id="btn-portals-dropdown"
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                onBlur={() => setTimeout(() => setPortalDropdownOpen(false), 200)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                Portals
                <ChevronDown className="w-3 h-3" />
              </button>

              {portalDropdownOpen && (
                <div
                  id="nav-portals-menu"
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <button
                    onClick={() => onOpenPortal('student')}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    Student Portal
                  </button>
                  <button
                    onClick={() => onOpenPortal('parent')}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4 text-purple-500" />
                    Parent Portal
                  </button>
                  <button
                    onClick={() => onOpenPortal('teacher')}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 flex items-center gap-2"
                  >
                    <Award className="w-4 h-4 text-emerald-500" />
                    Attendance/Admin
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="btn-theme-toggle"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Primary CTA */}
            <button
              id="btn-navbar-enroll"
              onClick={onOpenAdmission}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-sm shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              id="btn-theme-toggle-mobile"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Trigger Button */}
            <button
              id="btn-mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          id="mobile-nav-panel"
          className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in fade-in duration-200"
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${
                  activeSection === link.href.slice(1)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex flex-wrap gap-2.5">
            <button
              id="btn-mobile-quiz"
              onClick={() => {
                setIsOpen(false);
                onOpenQuiz();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40 text-sm font-semibold hover:bg-indigo-100"
            >
              <Laptop className="w-4 h-4" />
              Practice Quiz
            </button>

            <button
              id="btn-mobile-student-portal"
              onClick={() => {
                setIsOpen(false);
                onOpenPortal('student');
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-sm font-semibold hover:bg-slate-100"
            >
              <User className="w-4 h-4" />
              Student Portal
            </button>
          </div>

          <div className="flex gap-2">
            <button
              id="btn-mobile-parent-portal"
              onClick={() => {
                setIsOpen(false);
                onOpenPortal('parent');
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-sm font-semibold hover:bg-slate-100"
            >
              <GraduationCap className="w-4 h-4" />
              Parent Portal
            </button>

            <button
              id="btn-mobile-enroll"
              onClick={() => {
                setIsOpen(false);
                onOpenAdmission();
              }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm shadow-md text-center hover:from-blue-700"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
