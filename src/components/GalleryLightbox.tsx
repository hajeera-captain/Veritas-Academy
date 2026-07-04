import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';
import { galleryData } from '../mockData';
import { GalleryItem } from '../types';

export default function GalleryLightbox() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Classrooms', 'Laboratories', 'Seminars', 'Events', 'Sports', 'Annual Day'];

  const filteredItems = galleryData.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-indigo-600 dark:text-indigo-400">
            Academy Environment
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">
            Where Focused Study Meets State-of-the-Art Infrastructure
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            Take a visual tour through our interactive classrooms, advanced biology labs, career counseling workshops, and annual sports sessions in Hebbal.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-100 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: GalleryItem, index: number) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative h-64 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer bg-slate-100"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                  <ZoomIn className="w-4.5 h-4.5" />
                </div>
                <span className="text-[9px] uppercase font-bold text-indigo-400 font-mono tracking-widest">
                  {item.category}
                </span>
                <h4 className="font-display font-bold text-sm text-white mt-1 leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200">
          {/* Header toolbar */}
          <div className="flex justify-between items-center text-white pt-2">
            <span className="text-xs font-mono text-slate-400">
              Viewing photo {lightboxIndex + 1} of {filteredItems.length} • {filteredItems[lightboxIndex].category}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Image Stage with lateral arrows */}
          <div className="flex-1 flex items-center justify-between gap-4 max-w-5xl mx-auto w-full">
            <button
              onClick={prevImage}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white shrink-0 cursor-pointer"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] max-w-full flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900 border border-white/5 shadow-2xl">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] max-w-full object-contain"
              />
            </div>

            <button
              onClick={nextImage}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white shrink-0 cursor-pointer"
              aria-label="Next image"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom title info */}
          <div className="text-center text-white pb-4 max-w-lg mx-auto space-y-1">
            <h4 className="font-display font-bold text-base">
              {filteredItems[lightboxIndex].title}
            </h4>
            <p className="text-xs text-slate-400">
              Veritas Academy Hebbal Infrastructure Showcase
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
