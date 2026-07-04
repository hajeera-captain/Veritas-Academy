import React from 'react';
import { Target, Sparkles, TrendingUp, Banknote, CheckCircle2, Laptop, FileText } from 'lucide-react';
import { coreValues, whyChooseUs } from '../mockData';

export default function AboutUs() {
  const iconMap: Record<string, any> = {
    Target: Target,
    Sparkles: Sparkles,
    TrendingUp: TrendingUp,
    Banknote: Banknote,
    CheckCircle2: CheckCircle2,
    Laptop: Laptop,
    FileText: FileText,
  };

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-indigo-600 dark:text-indigo-400">
            About Our Academy
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">
            Nurturing Academic Excellence Since 2011
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            With a decade and a half of tutoring heritage in Hebbal, Bengaluru, we pride ourselves on building strong conceptual foundations that translate directly to top-tier university rankings.
          </p>
        </div>

        {/* Journey, Mission, Vision bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {coreValues.map((val) => {
            const Icon = iconMap[val.icon] || Sparkles;
            return (
              <div
                key={val.title}
                className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Background decorative gradient glow */}
                <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-tr ${val.color} opacity-[0.03] group-hover:opacity-[0.07] rounded-full filter blur-xl transition-opacity`}></div>

                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${val.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5 animate-pulse" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
                    {val.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Why Choose Us & Interactive Cards */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Decorative ambient ball */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full filter blur-3xl"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left intro details */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-100/60 dark:border-indigo-900/30">
                The Veritas Advantage
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
                Our Proven Formula for Student Achievements
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                We believe that learning is an active, joyful dialogue rather than a passive lecture. By strictly restricting our batches and coupling standard offline drills with modern digital portals, we solve the structural gaps found in oversized institutes.
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  Schedule a classroom visit
                  <span className="text-lg leading-none">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Right Choose list grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseUs.map((feature) => {
                const Icon = iconMap[feature.icon] || CheckCircle2;
                return (
                  <div
                    key={feature.title}
                    className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 flex gap-4 transition-colors hover:bg-slate-50 hover:dark:bg-slate-850"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100/30">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-slate-850 dark:text-slate-100">
                        {feature.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
