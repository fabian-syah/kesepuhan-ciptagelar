import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'motion/react';
import { useLanguage } from '../utils/langStore';
import { translations } from '../utils/translations';

const mediaSlots = [
  {
    id: 'dawn',
    videoSrc: '/assets/media/dawn-mist.mp4',
    imgSrc: '/assets/media/dawn-mist.webp',
    imgAlt: 'Misty highland canopy surrounding Kampung Adat Ciptagelar, Sukabumi, West Java',
    start: 0.10,
    end: 0.40,
    textIn: [0.12, 0.15],
    textOut: [0.37, 0.39],
    visibleRange: [0.105, 0.395] as [number, number],
    activeRange: [0.00, 0.72] as [number, number],
  },
  {
    id: 'seren-taun',
    imgSrc: '/assets/media/seren-taun-2.webp',
    imgAlt: 'Communal harvest procession with bamboo carrying poles in Sukabumi, West Java',
    start: 0.40,
    end: 0.70,
    textIn: [0.41, 0.44],
    textOut: [0.66, 0.69],
    visibleRange: [0.405, 0.695] as [number, number],
    activeRange: [0.08, 0.99] as [number, number],
  },
  {
    id: 'leuit',
    imgSrc: '/assets/media/leuit-standing.webp',
    imgAlt: 'Tall standing Leuit Sihengker rice barn on suren timber stilts in Sukabumi, West Java',
    start: 0.70,
    end: 1.00,
    textIn: [0.71, 0.74],
    textOut: [0.95, 0.98],
    visibleRange: [0.705, 0.985] as [number, number],
    activeRange: [0.38, 1.00] as [number, number],
  },
];

function ChapterScene({
  chapterData,
  media,
  progress,
}: {
  chapterData: {
    num: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    text: string;
    floatingDetail: string;
  };
  media: (typeof mediaSlots)[0];
  progress: MotionValue<number>;
}) {
  const sectionOpacity = useTransform(
    progress,
    [media.start - 0.02, media.start + 0.03, media.end - 0.03, media.end],
    [0, 1, 1, 0],
    { clamp: true }
  );

  const imageScale = useTransform(progress, [media.start, media.end], [1.0, 1.12], { clamp: true });
  const imageY = useTransform(progress, [media.start, media.end], [0, -50], { clamp: true });

  const textOpacity = useTransform(
    progress,
    [media.textIn[0], media.textIn[1], media.textOut[0], media.textOut[1]],
    [0, 1, 1, 0],
    { clamp: true }
  );

  const textY = useTransform(
    progress,
    [media.textIn[0], media.textIn[1], media.textOut[0], media.textOut[1]],
    [28, 0, 0, -20],
    { clamp: true }
  );

  const textVisibility = useTransform(progress, (v) =>
    v >= media.visibleRange[0] && v <= media.visibleRange[1] ? 'visible' : 'hidden'
  );

  const textPointerEvents = useTransform(progress, (v) =>
    v >= media.textIn[1] && v <= media.textOut[0] ? 'auto' : 'none'
  );

  const badgeY = useTransform(progress, [media.start, media.end], [10, -10], { clamp: true });

  const isDisplay = useTransform(progress, (v) =>
    v >= media.activeRange[0] && v <= media.activeRange[1] ? 'block' : 'none'
  );

  return (
    <motion.section
      style={{
        opacity: sectionOpacity,
        display: isDisplay,
      }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <motion.div
        style={{
          scale: imageScale,
          y: imageY,
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {'videoSrc' in media && media.videoSrc ? (
          <video
            src={media.videoSrc}
            poster={media.imgSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover select-none"
          />
        ) : (
          <img
            src={media.imgSrc}
            alt={media.imgAlt}
            decoding="async"
            className="h-full w-full object-cover select-none"
          />
        )}
        <div className="absolute inset-0 bg-[#1C1814]/45" />
      </motion.div>

      <motion.div
        style={{
          y: badgeY,
          opacity: textOpacity,
          visibility: textVisibility,
          willChange: 'transform, opacity',
        }}
        className="absolute top-24 right-6 md:right-16 z-20 hidden md:block select-none"
      >
        <div className="border border-[#C89B3C]/40 bg-[#1C1814] px-4 py-2 text-[11px] tracking-[0.25em] uppercase text-[#F7F5EE] font-sans shadow-lg">
          {chapterData.floatingDetail}
        </div>
      </motion.div>

      <motion.div
        style={{
          opacity: textOpacity,
          y: textY,
          visibility: textVisibility,
          pointerEvents: textPointerEvents,
          willChange: 'transform, opacity',
        }}
        className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-6 sm:left-12 md:left-20 z-30 max-w-2xl text-left pointer-events-auto"
      >
        <div className="w-8 h-[1px] bg-[#C89B3C] mb-4" />

        <div className="flex items-center gap-3 mb-3 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F7F5EE]/80 font-sans">
          <span>Scene {chapterData.num}</span>
          <span className="text-[#F7F5EE]/40">•</span>
          <span>{chapterData.eyebrow}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-[#F7F5EE] leading-[1.08] tracking-tight mb-5 [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
          {chapterData.titleLine1}
          <br />
          {chapterData.titleLine2}
        </h2>

        <p className="text-xl sm:text-2xl font-sans font-light text-[#F7F5EE] leading-relaxed [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
          {chapterData.text}
        </p>
      </motion.div>
    </motion.section>
  );
}

export default function ScrollyMaster() {
  const containerRef = useRef<HTMLElement>(null);
  const lang = useLanguage();
  const t = translations[lang];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const directProgress = scrollYProgress;

  const [isHeroMounted, setIsHeroMounted] = useState(true);
  useMotionValueEvent(directProgress, 'change', (v) => {
    if (v > 0.10 && isHeroMounted) {
      setIsHeroMounted(false);
    } else if (v <= 0.10 && !isHeroMounted) {
      setIsHeroMounted(true);
    }
  });

  const heroOpacity = useTransform(directProgress, [0.00, 0.08], [1, 0], { clamp: true });
  const heroVisibility = useTransform(directProgress, (v) => (v > 0.09 ? 'hidden' : 'visible'));
  const heroScale = useTransform(directProgress, [0.00, 0.08], [1.0, 1.05], { clamp: true });

  const watermarkScale = useTransform(directProgress, [0.00, 0.08], [1.0, 1.15], { clamp: true });
  const watermarkOpacity = useTransform(directProgress, [0.00, 0.08], [0.18, 0], { clamp: true });

  const eyebrowY = useTransform(directProgress, [0.02, 0.07], [0, -35], { clamp: true });
  const h1Line1Y = useTransform(directProgress, [0.02, 0.07], [0, -50], { clamp: true });
  const h1Line2Y = useTransform(directProgress, [0.02, 0.07], [0, -40], { clamp: true });
  const subtitleY = useTransform(directProgress, [0.02, 0.07], [0, 30], { clamp: true });
  const scrollCueOpacity = useTransform(directProgress, [0.00, 0.04], [1, 0], { clamp: true });

  const rightProgressScaleY = useTransform(directProgress, [0, 1], [0, 1], { clamp: true });

  return (
    <section ref={containerRef} className="relative h-[600vh] w-full bg-[#1C1814]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#1C1814]">
        {isHeroMounted && (
          <div
            id="hero-scene-container"
            className="relative h-[100svh] w-full overflow-hidden"
          >
            <motion.div
              style={{
                opacity: heroOpacity,
                scale: heroScale,
                visibility: heroVisibility,
                willChange: 'transform, opacity',
              }}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              <video
                src="/assets/media/dawn-mist.mp4"
                poster="/assets/media/dawn-poster.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-[#1C1814]/45" />
            </motion.div>

            <motion.div
              style={{
                opacity: watermarkOpacity,
                scale: watermarkScale,
                visibility: heroVisibility,
                willChange: 'transform, opacity',
              }}
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
            >
              <span
                className="select-none font-serif font-light tracking-[0.06em] text-[18vw] sm:text-[15vw] lg:text-[14rem]"
                style={{ color: 'rgba(247, 245, 238, 0.12)' }}
              >
                {t.hero.watermark}
              </span>
            </motion.div>

            <motion.div
              style={{
                opacity: heroOpacity,
                visibility: heroVisibility,
                willChange: 'transform, opacity',
              }}
              className="absolute inset-0 z-20 flex items-center justify-center px-6 md:px-12 pointer-events-none"
            >
              <div className="max-w-4xl text-center pointer-events-auto">
                <div className="w-10 h-[1px] bg-[#C89B3C] mx-auto mb-5" />

                <motion.p
                  style={{ y: eyebrowY }}
                  className="mb-6 text-xs md:text-sm uppercase tracking-[0.4em] text-[#F7F5EE]/80 font-sans"
                >
                  {t.hero.eyebrow}
                </motion.p>

                <div className="overflow-hidden">
                  <motion.h1
                    style={{ y: h1Line1Y }}
                    className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.04] tracking-tight text-[#F7F5EE]"
                  >
                    {t.hero.title1}
                  </motion.h1>
                </div>

                <div className="overflow-hidden mt-1 sm:mt-2">
                  <motion.h1
                    style={{ y: h1Line2Y }}
                    className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.04] tracking-tight text-[#F7F5EE]"
                  >
                    {t.hero.title2}
                  </motion.h1>
                </div>

                <motion.p
                  style={{ y: subtitleY }}
                  className="mx-auto mt-8 max-w-xl text-xs sm:text-sm tracking-[0.25em] text-[#F7F5EE]/80 uppercase font-sans"
                >
                  {t.hero.subtitle}
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              style={{
                opacity: scrollCueOpacity,
                visibility: heroVisibility,
                willChange: 'opacity',
              }}
              className="pointer-events-none absolute bottom-8 left-1/2 z-40 -translate-x-1/2 flex flex-col items-center gap-2.5"
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#F7F5EE]/75 font-sans">
                {t.hero.scroll}
              </span>
              <div className="h-7 w-[1px] bg-[#F7F5EE]/30 relative overflow-hidden">
                <motion.div
                  animate={{ y: [-28, 28] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-3 w-full bg-[#C89B3C]"
                />
              </div>
            </motion.div>
          </div>
        )}

        <div className="absolute inset-0 z-10 pointer-events-none">
          {mediaSlots.map((media, index) => (
            <ChapterScene
              key={media.id}
              chapterData={t.chapters[index]}
              media={media}
              progress={directProgress}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute right-6 md:right-10 top-1/2 z-40 hidden h-44 -translate-y-1/2 lg:block">
          <div className="relative h-full w-[1px] bg-[#F7F5EE]/15">
            <motion.div
              style={{
                scaleY: rightProgressScaleY,
                transformOrigin: 'top',
                willChange: 'transform',
              }}
              className="absolute inset-x-0 top-0 h-full bg-[#C89B3C]"
            />
          </div>
        </div>
      </div>

      <div id="scrolly-sentinel" className="absolute bottom-24 left-0 w-full h-1 pointer-events-none" />
    </section>
  );
}
