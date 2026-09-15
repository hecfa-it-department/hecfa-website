"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/types/brand";
import brandsData from "./brandsData";

const Brands = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);
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
    <section id="partners" ref={sectionRef} className={`partners-section relative scroll-mt-24 overflow-hidden py-24 text-slate-900 dark:text-white md:py-32 ${reveal ? "partners-visible" : ""}`}>
      <div className="partners-dots pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />

      <div className="container relative z-10 px-4">
        <header className="partner-reveal mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-600 dark:text-amber-400">Partners &amp; Sponsors</p>
          <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white sm:text-5xl">Organizations &amp; Companies Who Trusted Us</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Building meaningful collaborations with organizations and companies that support our vision, activities, and impact.
          </p>
        </header>

        <div className="partner-reveal partner-delay-1 mx-auto mt-7 flex max-w-4xl items-center gap-4" aria-label="HEC FA identity">
          <span className="h-px flex-1 bg-blue-200 dark:bg-blue-800" />
          <span className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-200 sm:text-xs sm:tracking-[0.3em]">Finance × Technology × Data × Innovation</span>
          <span className="h-px flex-1 bg-blue-200 dark:bg-blue-800" />
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {brandsData.map((brand, index) => (
            <SingleBrand key={brand.id} brand={brand} index={index} />
          ))}
        </div>

        <div className="partner-reveal partner-delay-6 mt-14 text-center">
          <a href="#" className="partner-cta inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber-400 active:scale-[0.99]">
            Become A Partner <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .partners-section { background: #f8fafc; }
        :global(.dark) .partners-section { background: #030d26; }
        .partners-dots {
          background-image: radial-gradient(rgba(30, 64, 175, 0.1) 1.2px, transparent 1.2px);
          background-size: 36px 36px;
        }
        :global(.dark) .partners-dots {
          background-image: radial-gradient(rgba(59, 130, 246, 0.2) 1.2px, transparent 1.2px);
        }
        .partner-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .partners-visible .partner-reveal { opacity: 1; transform: translateY(0); }
        .partner-delay-1 { transition-delay: 100ms; }
        .partner-delay-6 { transition-delay: 700ms; }

        .partner-cta {
          border: 1px solid rgba(30, 64, 175, 0.35);
          background: rgba(255, 255, 255, 0.7);
          color: #172554;
          box-shadow: 0 10px 28px rgba(30, 64, 175, 0.08);
        }

        .partner-cta:hover,
        .partner-cta:focus-visible,
        .partner-cta:active {
          border-color: #fbbf24;
          background: #fbbf24;
          color: #07152f;
          box-shadow: 0 12px 32px rgba(245, 183, 64, 0.2);
        }

        :global(.dark) .partner-cta {
          border-color: rgba(96, 165, 250, 0.45);
          background: rgba(12, 30, 71, 0.72);
          color: #f8fafc;
          box-shadow: 0 10px 28px rgba(2, 6, 23, 0.18);
        }

        :global(.dark) .partner-cta:hover,
        :global(.dark) .partner-cta:focus-visible,
        :global(.dark) .partner-cta:active {
          border-color: #fbbf24;
          background: #fbbf24;
          color: #07152f;
          box-shadow: 0 12px 32px rgba(245, 183, 64, 0.22);
        }

        @media (prefers-reduced-motion: reduce) {
          .partner-reveal { opacity: 1; transform: none; transition: none; }
          .partner-cta:hover, .partner-cta:active { transform: none; }
        }
      `}</style>
    </section>
  );
};

const SingleBrand = ({ brand, index }: { brand: Brand; index: number }) => (
  <a
    href={brand.href}
    title={brand.name}
    aria-label={brand.name}
    className={`partner-card partner-card-delay-${Math.min(index, 5)} group relative flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition duration-400 hover:-translate-y-1 hover:scale-[1.01] hover:border-blue-400 hover:shadow-blue-200/50 dark:border-[#1e3a75] dark:bg-[#0c1e47]/90 dark:shadow-black/20 dark:hover:border-blue-400 dark:hover:shadow-blue-500/10`}
  >
    <span className="partner-logo-wrapper flex h-24 w-full items-center justify-center">
      <Image src={brand.image} alt={brand.name} width={220} height={96} sizes="(max-width: 767px) 38vw, (max-width: 1199px) 22vw, 15vw" className="h-full w-full object-contain grayscale opacity-60 transition duration-400 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100" />
    </span>
  </a>
);

export default Brands;
