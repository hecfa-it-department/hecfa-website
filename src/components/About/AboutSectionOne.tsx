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

// Official HEC FA photos for the animated gallery.
const galleryImages = [
  { src: "/images/hecfa-achivments/image.webp", alt: "HEC FA student gathering" },
  { src: "/images/hecfa-achivments/image (1).webp", alt: "HEC FA conference" },
  { src: "/images/hecfa-achivments/image (2).webp", alt: "HEC FA academic event" },
  { src: "/images/hecfa-achivments/2.png", alt: "HEC FA workshop" },
  { src: "/images/hecfa-achivments/7.png", alt: "HEC FA community event" },
  { src: "/images/hecfa-achivments/image (4).webp", alt: "HEC FA student activity" },
  { src: "/images/hecfa-achivments/479928586_18375067828140268_8218381010391100954_n.jpg", alt: "HEC FA networking event" },
  { src: "/images/hecfa-achivments/587031636_18413341165140268_7329107051791474267_n.jpg", alt: "HEC FA academic gathering" },
] as const;

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/hec_finance_academy/", icon: "instagram" },
  { name: "Facebook", href: "https://www.facebook.com/HEC.Finance.Academy", icon: "facebook" },
  { name: "TikTok", href: "https://www.tiktok.com/@hec_fa", icon: "tiktok" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/hec-finance-academy/", icon: "linkedin" },
] as const;

const SocialIcon = ({ name }: { name: (typeof socialLinks)[number]["icon"] }) => {
  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.7" r="1" className="fill-current stroke-none" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v8h3Z" />
      </svg>
    );
  }

  if (name === "tiktok") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M15.2 3c.2 1.7 1.2 2.8 2.9 3.2v2.8a7.3 7.3 0 0 1-2.9-.9v5.7a5.2 5.2 0 1 1-4.5-5.1v2.9a2.3 2.3 0 1 0 1.6 2.2V3h2.9Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M5.2 8.3A1.7 1.7 0 1 0 5.2 5a1.7 1.7 0 0 0 0 3.3ZM3.7 9.7h3v9.6h-3V9.7Zm4.8 0h2.9V11h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.2 4 5v5h-3v-4.4c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v4.5h-3V9.7Z" />
    </svg>
  );
};

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
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 pb-28 lg:grid-cols-2 lg:gap-20 lg:pb-40">
          <div className="about-reveal about-intro-copy">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-600 dark:text-amber-400">About HEC FA</p>
            <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white md:text-4xl">Explore HEC Finance Academy</h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              <p>
                HEC Finance Academy aims to spread <span className="intro-highlight">financial literacy</span> by introducing interested students to the fundamentals of finance.
              </p>
              <p>
                As the first student club at IHEC Carthage with a dedicated <span className="intro-highlight">IT</span> department, HEC FA creates a unique environment where <span className="intro-highlight">Finance</span> meets <span className="intro-highlight">Technology</span>.
              </p>
              <p>
                Through workshops, projects, competitions, conferences and networking opportunities, students can explore new fields, gain practical experience and apply and enrich the knowledge they develop beyond the classroom.
              </p>
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-200 sm:text-sm sm:tracking-[0.28em]">
              Finance <span className="mx-1 text-amber-500">×</span> Technology <span className="mx-1 text-amber-500">×</span> Data <span className="mx-1 text-amber-500">×</span> Innovation
            </p>
          </div>

          <div className="about-reveal about-delay-1 gallery-frame" aria-label="HEC FA activity gallery">
            <div className="gallery-fade gallery-fade-top" />
            <div className="gallery-fade gallery-fade-bottom" />
            <div className="gallery-column gallery-column-up">
              {[...galleryImages.slice(0, 3), ...galleryImages.slice(0, 3)].map((image, index) => (
                <div className="gallery-image" key={`up-${image.src}-${index}`}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </div>
              ))}
            </div>
            <div className="gallery-column gallery-column-down">
              {[...galleryImages.slice(3), ...galleryImages.slice(3)].map((image, index) => (
                <div className="gallery-image" key={`down-${image.src}-${index}`}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

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

        <div className={`social-section about-reveal about-delay-6 mx-auto mt-28 max-w-5xl border-t border-blue-200/80 pt-16 text-center dark:border-blue-900/80 md:mt-36`}>
          <div className="social-watermark" aria-hidden="true">
            <img src="/images/logo/logo.svg" alt="" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">Stay connected</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-white sm:text-3xl">Connect with HEC Finance Academy</h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Follow us and stay connected.</p>

            <div className="mx-auto mt-9 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card group flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-5 py-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:border-blue-400 hover:text-blue-700 hover:shadow-blue-200/50 dark:border-[#1e3a75] dark:bg-[#0c1e47]/70 dark:text-slate-200 dark:hover:border-amber-400/70 dark:hover:text-amber-300 dark:hover:shadow-amber-400/10"
                >
                  <span className="text-blue-700 transition duration-500 group-hover:text-amber-500 dark:text-blue-200 dark:group-hover:text-amber-300">
                    <SocialIcon name={social.icon} />
                  </span>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
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

        .social-card { box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05); }

        .social-card:hover { box-shadow: 0 18px 42px rgba(37, 99, 235, 0.12); }

        .social-section { position: relative; isolation: isolate; }

        .social-watermark {
          pointer-events: none;
          position: absolute;
          z-index: 0;
          top: -12rem;
          left: 50%;
          width: min(60rem, 96vw);
          height: 34rem;
          transform: translateX(-50%);
          opacity: 0.2;
          filter: drop-shadow(0 0 28px rgba(59, 130, 246, 0.55)) drop-shadow(0 0 34px rgba(245, 183, 64, 0.28));
        }

        .social-watermark::after {
          content: "";
          position: absolute;
          inset: 12% 8%;
          border-radius: 999px;
          background: radial-gradient(ellipse, rgba(59, 130, 246, 0.36), rgba(245, 183, 64, 0.08) 44%, transparent 72%);
          filter: blur(26px);
          z-index: -1;
        }

        .social-watermark img {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: contain;
        }

        @media (max-width: 639px) {
          .social-watermark { top: -8rem; height: 25rem; width: 135vw; opacity: 0.16; }
        }

        .intro-highlight {
          color: #b45309;
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: rgba(245, 158, 11, 0.45);
          text-underline-offset: 4px;
        }

        :global(.dark) .intro-highlight {
          color: #fbbf24;
        }

        .gallery-frame {
          position: relative;
          display: grid;
          height: 30rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 9%, black 91%, transparent);
          mask-image: linear-gradient(to bottom, transparent, black 9%, black 91%, transparent);
        }

        .gallery-column {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 1rem;
          align-self: flex-start;
        }

        .gallery-column-up { animation: galleryUp 32s linear infinite; }
        .gallery-column-down { animation: galleryDown 36s linear infinite; transform: translateY(-50%); }
        .gallery-column:hover { animation-play-state: paused; }

        .gallery-image {
          aspect-ratio: 1 / 1.12;
          overflow: hidden;
          border: 1px solid #cbd5e1;
          border-radius: 1rem;
          background: #e2e8f0;
        }

        :global(.dark) .gallery-image {
          border-color: rgba(30, 58, 117, 0.6);
          background: #0c1e47;
        }

        .gallery-image img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: filter 500ms ease, transform 500ms ease;
        }

        .gallery-image:hover img {
          filter: brightness(1.08);
          transform: scale(1.04);
        }

        .gallery-fade {
          pointer-events: none;
          position: absolute;
          z-index: 2;
          right: 0;
          left: 0;
          height: 22%;
        }

        .gallery-fade-top {
          top: 0;
          background: linear-gradient(to bottom, #f8fafc, transparent);
        }

        .gallery-fade-bottom {
          bottom: 0;
          background: linear-gradient(to top, #f8fafc, transparent);
        }

        :global(.dark) .gallery-fade-top { background: linear-gradient(to bottom, #030d26, transparent); }
        :global(.dark) .gallery-fade-bottom { background: linear-gradient(to top, #030d26, transparent); }

        @keyframes galleryUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }

        @keyframes galleryDown {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-reveal, .about-card, .achievement-rule, .gallery-image img, .social-card { transition: none; }
          .about-reveal { opacity: 1; transform: none; }
          .about-card:hover { transform: none; }
          .social-card:hover { transform: none; }
          .gallery-column { animation: none; transform: none; }
        }
      `}</style>
    </section>
  );
};

export default AboutSectionOne;
