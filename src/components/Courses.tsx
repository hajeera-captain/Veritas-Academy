import React, { useState } from 'react';
import { BookOpen, Clock, GraduationCap, Coins, CheckCircle2, ArrowRight, Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { coursesData } from '../mockData';
import { Course } from '../types';

interface CoursesProps {
  onOpenAdmissionWithCourse: (courseId: string) => void;
}

export default function Courses({ onOpenAdmissionWithCourse }: CoursesProps) {
  // Advanced Filter States
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedExam, setSelectedExam] = useState<string>('All');

  // Filter Categories
  const subjects = ['All', 'Science', 'Commerce', 'Engineering', 'General'];
  const grades = ['All', 'Class 6-10', 'PUC', 'Undergraduate'];
  const exams = ['All', 'NEET', 'JEE', 'CET', 'Boards', 'VTU', 'Olympiads'];

  // Filter Logic
  const filteredCourses = coursesData.filter((course) => {
    const matchesSubject = selectedSubject === 'All' || course.subjectType === selectedSubject;
    const matchesGrade = selectedGrade === 'All' || course.gradeLevel === selectedGrade;
    const matchesExam = selectedExam === 'All' || 
      (selectedExam === 'Boards' ? course.targetExam.includes('Boards') : course.targetExam === selectedExam);
    return matchesSubject && matchesGrade && matchesExam;
  });

  const handleResetFilters = () => {
    setSelectedSubject('All');
    setSelectedGrade('All');
    setSelectedExam('All');
  };

  return (
    <section id="courses" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-blue-600 dark:text-blue-400">
            Syllabus & Curricula
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">
            Browse Our Premium Tutoring Programs
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            From primary school fundamentals to complex JEE Advanced integration, VTU engineering support, and express rapid revisions prior to boards.
          </p>
        </div>

        {/* Interactive Filter Bento Box */}
        <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-100 dark:border-slate-850 mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-150 dark:border-slate-850">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
              <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Interactive Program Finder
              </span>
            </div>
            {(selectedSubject !== 'All' || selectedGrade !== 'All' || selectedExam !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline cursor-pointer flex items-center gap-1.5 self-start transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Subject Filter Card */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                1. Stream / Subject
              </span>
              <div className="flex flex-wrap gap-1.5">
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer border ${
                      selectedSubject === sub
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/10'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Grade Filter Card */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                2. Grade Level
              </span>
              <div className="flex flex-wrap gap-1.5">
                {grades.map((grd) => (
                  <button
                    key={grd}
                    onClick={() => setSelectedGrade(grd)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer border ${
                      selectedGrade === grd
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/10'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {grd}
                  </button>
                ))}
              </div>
            </div>

            {/* Exam Filter Card */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                3. Target Exam
              </span>
              <div className="flex flex-wrap gap-1.5">
                {exams.map((exm) => (
                  <button
                    key={exm}
                    onClick={() => setSelectedExam(exm)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer border ${
                      selectedExam === exm
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/10'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {exm}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Courses Listing Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course: Course) => (
              <div
                key={course.id}
                className="flex flex-col rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Course Card Banner Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-sm text-[10px] font-bold text-blue-400 font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-blue-900/35">
                    {course.category}
                  </span>
                </div>

                {/* Course Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Filter Matching Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100/20">
                        {course.subjectType}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100/20">
                        {course.gradeLevel}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100/20">
                        {course.targetExam}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-950 dark:text-white tracking-tight leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed mt-2 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Metadata labels */}
                    <div className="space-y-2 mt-4 pt-4 border-t border-slate-50 dark:border-slate-850 text-[11px]">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>Duration: <b className="font-semibold text-slate-700 dark:text-slate-300">{course.duration}</b></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <GraduationCap className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>Eligibility: <b className="font-semibold text-slate-700 dark:text-slate-300">{course.eligibility}</b></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Coins className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>Tuition Fee: <b className="font-semibold text-blue-600 dark:text-blue-400 font-mono">{course.fees}</b></span>
                      </div>
                    </div>

                    {/* Syllabus checklist list */}
                    <div className="mt-5 space-y-1.5">
                      <span className="text-[9px] font-bold font-mono tracking-wider text-slate-400 uppercase">Syllabus Inclusions</span>
                      {course.subjects.map((subject, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enroll Trigger */}
                  <div className="pt-6 mt-6 border-t border-slate-50 dark:border-slate-850">
                    <button
                      onClick={() => onOpenAdmissionWithCourse(course.id)}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-slate-750 text-white dark:text-slate-100 hover:text-white dark:hover:text-blue-350 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                    >
                      Enroll & Book Demo
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Filter State */
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-950/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 max-w-xl mx-auto space-y-4 px-6">
            <Filter className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">
                No Programs Found
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We couldn't find any tuition programs matching this specific combination of Stream, Grade, and Target Exam. Try relaxing your filters.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm shadow-blue-500/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
