import React from 'react';
import { Linkedin, GraduationCap, Award, Star } from 'lucide-react';
import { facultyData } from '../mockData';

export default function Faculty() {
  return (
    <section id="faculty" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-blue-600 dark:text-blue-400">
            Meet the Masters
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">
            Expert Mentors with Decades of Teaching Pedigree
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            Our courses are exclusively designed and coached by NIT postgraduates, IISc Ph.D. scholars, and textbook authors. No trainee educators—only veteran masters.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facultyData.map((fac) => (
            <div
              key={fac.id}
              className="flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Profile Image with Gradient overlay */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={fac.image}
                  alt={fac.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/0 to-slate-950/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <a
                    href={fac.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              {/* Faculty details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-100/30">
                    <Star className="w-3.5 h-3.5 fill-current shrink-0" />
                    {fac.experience} Exp
                  </span>
                  <h3 className="font-display font-bold text-sm text-slate-950 dark:text-white">
                    {fac.name}
                  </h3>
                  
                  {/* Qualification */}
                  <div className="flex items-start gap-1.5 text-[11px] text-slate-500">
                    <GraduationCap className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span className="font-medium leading-tight">{fac.qualification}</span>
                  </div>

                  {/* Specialization */}
                  <div className="flex items-start gap-1.5 text-[11px] text-slate-500 pb-1">
                    <Award className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span className="font-medium leading-tight">{fac.specialization}</span>
                  </div>

                  {/* Micro biography */}
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-50 dark:border-slate-800/80 line-clamp-4 italic">
                    "{fac.bio}"
                  </p>
                </div>

                {/* Footer action */}
                <div className="pt-4 mt-4 border-t border-slate-50 dark:border-slate-800/80 flex items-center justify-between">
                  <a
                    href={fac.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
                  >
                    View publications & credentials
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
