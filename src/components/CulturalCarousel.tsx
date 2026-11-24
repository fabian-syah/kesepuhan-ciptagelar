import React from 'react';
import { useLanguage } from '../utils/langStore';
import { translations } from '../utils/translations';

export default function CulturalCarousel() {
  const lang = useLanguage();
  const t = translations[lang];

  return (
    <section
      id="gallery"
      className="w-full bg-[#1C1814] text-[#F7F5EE] py-12 md:py-16 font-sans border-t border-[#F7F5EE]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 md:mb-10">
        <div className="w-8 h-[1px] bg-[#C89B3C] mb-3" />
        <span className="text-xs uppercase tracking-[0.3em] text-[#F7F5EE]/75 font-sans block mb-2">
          {t.gallery.eyebrow}
        </span>
        <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light text-[#F7F5EE]">
          {t.gallery.title}
        </h3>
      </div>

      <div
        className="flex items-start gap-6 sm:gap-8 overflow-x-auto pl-6 md:pl-12 pr-12 pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {t.gallery.photos.map((p, index) => (
          <div
            key={p.id}
            className="w-[85vw] sm:w-[70vw] md:w-[60vw] max-w-[880px] flex-shrink-0 space-y-3 group select-none"
          >
            <div className="aspect-[3/2] w-full bg-[#181410] border border-[#F7F5EE]/10 overflow-hidden relative">
              <img
                src={p.src}
                alt={p.caption}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1C1814]/20 pointer-events-none" />
            </div>

            <p className="text-sm sm:text-base font-sans font-light text-[#F7F5EE]/85 leading-relaxed truncate">
              <span className="text-[#F7F5EE]/40 mr-2 font-mono text-xs">
                {String(index + 1).padStart(2, '0')}
              </span>
              {p.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
