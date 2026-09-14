"use client";

import { useEffect, useRef, useState } from "react";

const achievements = [
  {
    number: "2018 & 2025",
    title: "Best Association",
    description: "Awarded Best Student Association at IHEC Carthage.",
    accent: "amber",
  },
  {
    number: "2x Winner",
    title: "Best Event Award",
    description: "Host of the Best Event at IHEC Carthage.",
    accent: "blue",
  },
  {
    number: "2025",
    title: "Best SME Project",
    description: "Recognized for delivering the Best SME Project.",
    accent: "amber",
  },
  {
    number: "4+ Pillars",
    title: "Annual Initiatives",
    description: "Workshops, conferences, academic competitions, and networking events throughout the year.",
    accent: "blue",
  },
] as const;

const AboutSectionOne = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  const reveal = reduceMotion || isVisible;

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about-section relative scroll-mt-24 overflow-hidden py-24 text-slate-900 transition-colors duration-500 dark:text-white md:py-32 ${reveal ? "about-section-visible" : ""}`}
    >
      <div className="about-dots pointer-events-none absolute inset-0" />
      <div className="about-vignette pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[42rem] -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-400/[0.05]" />

      <div className="container relative z-10 px-4">
        <header className="about-reveal mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-600 dark:text-amber-400">HEC Finance Academy</p>
          <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white md:text-4xl">The numbers behind our story</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Recognized for excellence, innovation and meaningful impact at IHEC Carthage.
          </p>
        </header>

        <div className="about-reveal about-delay-1 mx-auto mt-12 flex max-w-5xl items-center gap-4" aria-label="HEC FA identity">
          <span className="h-px flex-1 bg-blue-300 dark:bg-blue-700" />
          <span className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-200 sm:text-xs sm:tracking-[0.3em]">Finance × Technology × Data × Innovation</span>
          <span className="h-px flex-1 bg-blue-300 dark:bg-blue-700" />
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => (
            <article
              key={achievement.title}
              className={`about-card about-reveal about-delay-${index + 2} group relative flex min-h-[292px] flex-col items-center rounded-2xl border bg-white/90 p-8 text-center shadow-lg shadow-slate-200/50 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:border-blue-400 hover:shadow-blue-200/50 dark:border-[#1e3a75] dark:bg-[#0c1e47]/90 dark:shadow-black/20 dark:hover:border-amber-400/60 dark:hover:shadow-amber-400/10`}
            >
              <span className={`achievement-rule achievement-rule-${achievement.accent}`} />
              <div className="relative flex flex-1 flex-col items-center">
                <p className="about-number text-2xl font-bold tracking-[-0.04em] text-amber-600 dark:text-amber-300 md:text-3xl">{achievement.number}</p>
                <div className="mt-7 h-px w-12 bg-amber-500/70 transition-all duration-500 group-hover:w-20" />
                <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">{achievement.title}</h3>
                <p className="mt-4 max-w-[15rem] text-sm leading-7 text-slate-600 dark:text-slate-300">{achievement.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .about-section {
          background-color: #f8fafc;
        }

        :global(.dark) .about-section {
          background-color: #030d26;
        }

        .about-dots {
          background-image: radial-gradient(rgba(30, 64, 175, 0.12) 1.5px, transparent 1.5px);
          background-size: 36px 36px;
          opacity: 0.9;
        }

        :global(.dark) .about-dots {
          background-image: radial-gradient(rgba(59, 130, 246, 0.35) 1.5px, transparent 1.5px);
        }

        .about-vignette {
          background: radial-gradient(ellipse at center, transparent 20%, #f8fafc 90%);
        }

        :global(.dark) .about-vignette {
          background: radial-gradient(ellipse at center, transparent 20%, #030d26 90%);
        }

        .about-reveal {
          opacity: 0;
          transform: translateY(18px) scale(0.99);
          transition: opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-section-visible .about-reveal {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .about-delay-1 { transition-delay: 110ms; }
        .about-delay-2 { transition-delay: 210ms; }
        .about-delay-3 { transition-delay: 320ms; }
        .about-delay-4 { transition-delay: 430ms; }
        .about-delay-5 { transition-delay: 540ms; }

        .achievement-rule {
          position: absolute;
          left: 2rem;
          top: 0;
          height: 2px;
          width: 4rem;
          transition: width 500ms ease;
        }

        .group:hover .achievement-rule { width: 7rem; }
        .achievement-rule-amber { background: #fbbf24; }
        .achievement-rule-blue { background: #60a5fa; }
        .about-number { text-shadow: 0 0 22px rgba(245, 183, 64, 0.12); }

        @media (prefers-reduced-motion: reduce) {
          .about-reveal, .about-card, .achievement-rule { transition: none; }
          .about-reveal { opacity: 1; transform: none; }
          .about-card:hover { transform: none; }
        }
      `}</style>
    </section>
  );
};

export default AboutSectionOne;
