import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, MessageSquareText } from 'lucide-react';

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-40 items-end">
      {/* Back to Top */}
      {showBackToTop && (
        <button
          id="btn-back-to-top"
          onClick={scrollToTop}
          className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xl flex items-center justify-center hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700 cursor-pointer group active:scale-95"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
        </button>
      )}

      {/* Floating Direct Call */}
      <a
        id="floating-call-btn"
        href="tel:+919110669897"
        className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl flex items-center justify-center hover:-translate-y-1 transition-all active:scale-95 hover:shadow-indigo-500/30"
        title="Call Admissions"
      >
        <Phone className="w-5 h-5 animate-pulse" />
      </a>

      {/* Floating WhatsApp */}
      <a
        id="floating-whatsapp-btn"
        href="https://wa.me/919110669897?text=Hello%20Veritas%20Academy,%20I%20am%20interested%20in%20learning%20more%20about%20your%20coaching%20programs."
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center hover:-translate-y-1 transition-all hover:rotate-6 active:scale-95 hover:shadow-emerald-500/20"
        title="Chat on WhatsApp"
      >
        <MessageSquareText className="w-7 h-7" />
      </a>
    </div>
  );
}
