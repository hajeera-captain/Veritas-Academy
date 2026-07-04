import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { faqData } from '../mockData';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq1'); // Default open first

  const categories = ['All', 'General', 'Admissions', 'Academics', 'Fees', 'Online Classes'];

  const filteredFaqs = faqData.filter((faq) => {
    return activeCategory === 'All' || faq.category === activeCategory;
  });

  const toggleFaq = (id: string) => {
    if (openFaqId === id) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(id);
    }
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-blue-600 dark:text-blue-400">
            Got Questions?
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">
            Frequently Asked Queries
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            Everything you need to know about our micro-batch sizes, weekly evaluation tests, counselor callbacks, and Hebbal center orientations.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-550 dark:text-slate-350 border border-slate-100 dark:border-slate-880'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordions list */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 overflow-hidden transition-all duration-200 shadow-sm"
              >
                {/* Accordion header button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 text-slate-800 dark:text-slate-100 hover:bg-slate-50/50 dark:hover:bg-slate-950/20 cursor-pointer"
                >
                  <div className="flex gap-3 items-center">
                    <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="font-semibold text-xs sm:text-sm tracking-tight pr-2">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-slate-400 shrink-0 bg-slate-50 dark:bg-slate-800 w-7 h-7 rounded-lg flex items-center justify-center">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Animated collapse content */}
                {isOpen && (
                  <div className="px-12 pb-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-850/80 pt-4 animate-in slide-in-from-top-2 duration-200">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                    <div className="mt-4 flex items-center gap-2.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                      <span>Category: {faq.category}</span>
                      <span>&bull;</span>
                      <a href="#contact" className="hover:underline">Still have questions? Chat with Saba &rarr;</a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
