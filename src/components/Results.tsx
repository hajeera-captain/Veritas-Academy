import React from 'react';
import { Trophy, TrendingUp, Sparkles, Star, GraduationCap } from 'lucide-react';
import { resultsData } from '../mockData';

export default function Results() {
  return (
    <section id="results" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-blue-600 dark:text-blue-400">
            Rankers & Achievements
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">
            Celebrating Our Student Hall of Fame
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            Every score tells a story of weekly drills, late-night doubts cleared, and tireless mentoring. Our students represent Bengaluru's top ranks year after year.
          </p>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {resultsData.map((res) => (
            <div
              key={res.id}
              className="relative rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Highlight Ribbon */}
              <div className="absolute top-4 right-4 w-7 h-7 bg-blue-50 dark:bg-blue-950/40 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-100/30">
                <Trophy className="w-4 h-4" />
              </div>

              <div>
                {/* Student Photo with rounded border */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-md mb-4 bg-slate-100">
                  <img
                    src={res.image}
                    alt={res.studentName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Score Big Tag */}
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight block">
                  {res.score}
                </span>

                <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 font-mono tracking-widest block mt-0.5">
                  {res.exam} • Class of {res.year}
                </span>

                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100 mt-3 leading-tight">
                  {res.studentName}
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-1.5 font-medium italic">
                  "{res.achievement}"
                </p>
              </div>

              {/* College Placement Badge */}
              <div className="mt-5 pt-3 border-t border-slate-200/50 dark:border-slate-800 flex items-center gap-2 text-[10px] text-slate-400">
                <GraduationCap className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-650 dark:text-slate-300 truncate">
                  {res.college}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Achievements Timeline / Factoids summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-blue-500/10">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <h4 className="font-display font-bold text-base">State Level Board Toppers</h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              Consistently scoring state positions in 10th CBSE and 12th PUC board finals, with over 45 students scoring a perfect 100/100 in math and science.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-base">Premier Engineering Placements</h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              Our graduates are currently studying computer science and engineering at prestigious campuses like IIT Madras, NIT Surathkal, RVCE, and PES University.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-base">Top Medical Doctor Trainees</h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              By mastering Biology diagrams and Organic pathways, dozens of our aspirants secure merit government seats at BMCRI, KIMS, and St. John's Medical College.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
