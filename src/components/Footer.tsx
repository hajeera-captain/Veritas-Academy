import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Linkedin, Github, Send, Check } from 'lucide-react';

interface FooterProps {
  onOpenAdmission: () => void;
  onOpenPortal: (portalType: 'student' | 'parent' | 'teacher') => void;
  onOpenQuiz: () => void;
}

export default function Footer({ onOpenAdmission, onOpenPortal, onOpenQuiz }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Simulate database write
    const newsletters = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!newsletters.includes(email)) {
      newsletters.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(newsletters));
    }

    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer id="footer-section" className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 relative overflow-hidden">
      {/* Absolute Decorative Blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-900/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-900/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/20">
                V
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">
                VERITAS ACADEMY
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Empowering students in Bengaluru with state-of-the-art offline classes, small batches, and 1-on-1 expert mentoring.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/hajeera-arish-983764371/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors shadow-inner"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/hajeera-captain"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-purple-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors shadow-inner"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 tracking-wide text-sm uppercase">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-indigo-400 transition-colors">About Our Institute</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-indigo-400 transition-colors">Courses & Syllabus</a>
              </li>
              <li>
                <a href="#results" className="hover:text-indigo-400 transition-colors">Results & Top Rankers</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-indigo-400 transition-colors">Classroom Gallery</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-indigo-400 transition-colors">Frequently Asked Questions</a>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-indigo-400 transition-colors text-left bg-transparent border-none p-0 cursor-pointer">
                  Practice Online Mock Test
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 tracking-wide text-sm uppercase">Contact Admissions</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Sultan enclave, Kankanagar 5th cross, Hebbal, Bengaluru 560045
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                <a href="tel:+919110669897" className="hover:text-white transition-colors">
                  +91 9110669897
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <a href="mailto:admissionsveritas6362@gmail.com" className="hover:text-white transition-colors break-all">
                  admissionsveritas6362@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Daily: 9:00 AM - 8:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter and Portals */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 tracking-wide text-sm uppercase">Stay Updated</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Subscribe to receive weekly study worksheets, formulas, exam timetables, and admission openings.
            </p>
            <form onSubmit={handleSubscribe} className="relative mb-6">
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                id="newsletter-submit"
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 font-medium mb-4 animate-fade-in">
                Thank you! You are now subscribed to academic updates.
              </p>
            )}

            {/* Quick Portal Shortcuts */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-900">
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">Portal Access</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onOpenPortal('student')}
                  className="text-xs px-2.5 py-1 rounded bg-slate-900 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-900/60 transition-all text-slate-300 cursor-pointer"
                >
                  Student
                </button>
                <button
                  onClick={() => onOpenPortal('parent')}
                  className="text-xs px-2.5 py-1 rounded bg-slate-900 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-900/60 transition-all text-slate-300 cursor-pointer"
                >
                  Parent
                </button>
                <button
                  onClick={onOpenAdmission}
                  className="text-xs px-2.5 py-1 rounded bg-indigo-600/10 hover:bg-indigo-600 hover:text-white border border-indigo-900/40 text-indigo-400 transition-all cursor-pointer"
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Veritas Academy. All rights reserved. Registered Office: Hebbal, Bengaluru.
          </div>
          <div className="text-xs text-slate-500 flex gap-4">
            <a href="#about" className="hover:text-slate-400">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#courses" className="hover:text-slate-400">Terms of Use</a>
            <span>&bull;</span>
            <a href="#contact" className="hover:text-slate-400">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
