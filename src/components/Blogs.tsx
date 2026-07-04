import React, { useState } from 'react';
import { Search, Calendar, User, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import { blogsData } from '../mockData';
import { Blog } from '../types';

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingBlog, setReadingBlog] = useState<Blog | null>(null);

  const categories = ['All', 'Study Tips', 'Exam Strategies', 'Admissions', 'News'];

  const filteredBlogs = blogsData.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="blogs" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!readingBlog ? (
          /* Normal Listings Mode */
          <div className="space-y-12">
            {/* Section Header with Search inputs */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-widest font-mono font-bold text-blue-600 dark:text-blue-400">
                  Insights & Study Tips
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">
                  Latest Academic Guidance & News
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Unlock exam secrets, revision formulas, and stress-management techniques compiled by Bangalore's finest educators.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-80 shrink-0">
                <input
                  id="blog-search-box"
                  type="text"
                  placeholder="Search articles, tips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap gap-2 border-b border-slate-150 dark:border-slate-800 pb-5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-850 dark:text-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blogs List */}
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 dark:bg-slate-950/20 rounded-3xl border border-dashed border-slate-200">
                <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-400 font-medium">No educational articles found matching your criteria.</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="text-xs text-blue-600 font-bold mt-2 hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="flex flex-col rounded-3xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
                  >
                    {/* Thumbnail Image */}
                    <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-slate-100 relative">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        loading="lazy"
                      />
                      <span className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-sm text-[9px] font-bold text-blue-400 font-mono uppercase tracking-widest px-2.5 py-1 rounded">
                        {blog.category}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex gap-4 text-[10px] text-slate-400 mb-2 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-tight mb-2.5 line-clamp-2 hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Footer read trigger */}
                    <div className="pt-4 border-t border-slate-200/50 dark:border-slate-850 flex items-center justify-between text-xs mt-auto">
                      <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-350 text-[10px]">
                        <User className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        By {blog.author}
                      </span>
                      <button
                        onClick={() => setReadingBlog(blog)}
                        className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline cursor-pointer"
                      >
                        Read Article &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Detailed Full Reader Mode */
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
            {/* Back to list trigger */}
            <button
              onClick={() => setReadingBlog(null)}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Education News
            </button>

            {/* Visual banner */}
            <div className="h-64 sm:h-96 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-100">
              <img
                src={readingBlog.image}
                alt={readingBlog.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Author/Date tags */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pb-4 border-b border-slate-150 dark:border-slate-800">
              <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider font-mono">
                {readingBlog.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {readingBlog.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readingBlog.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-500" />
                Written by: <b className="font-semibold text-slate-600 dark:text-slate-350">{readingBlog.author}</b>
              </span>
            </div>

            {/* Article title */}
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950 dark:text-white leading-tight">
              {readingBlog.title}
            </h1>

            {/* Article Body Content */}
            <div className="prose dark:prose-invert max-w-none text-slate-650 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
              {readingBlog.content}
            </div>

            {/* Ending counselor card */}
            <div className="mt-12 p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/60 dark:border-blue-900/40 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold font-display text-lg">
                S
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-800 dark:text-slate-150">Want customized study guides?</p>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  At Veritas Academy, we offer curated formula checklists and textbook worksheets. Talk to our counselor today.
                </p>
                <a href="#contact" onClick={() => setReadingBlog(null)} className="text-blue-600 font-bold mt-2 block">
                  Book trial session with faculty &rarr;
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
