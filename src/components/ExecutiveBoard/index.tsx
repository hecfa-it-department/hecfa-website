"use client";

import { useEffect, useRef, useState } from "react";

type BoardMember = {
  name: string;
  role: string;
  image: string;
  instagram: string;
  facebook: string;
  linkedin: string;
};

const executiveBoard: BoardMember[] = [
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
  { name: "", role: "", image: "", instagram: "", facebook: "", linkedin: "" },
];

const SocialIcon = ({ type }: { type: "instagram" | "facebook" | "linkedin" }) => {
  if (type === "instagram") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.7" r="1" className="fill-current stroke-none" /></svg>;
  }

  if (type === "facebook") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v8h3Z" /></svg>;
  }

  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M5.2 8.3A1.7 1.7 0 1 0 5.2 5a1.7 1.7 0 0 0 0 3.3ZM3.7 9.7h3v9.6h-3V9.7Zm4.8 0h2.9V11h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.2 4 5v5h-3v-4.4c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v4.5h-3V9.7Z" /></svg>;
};

const ExecutiveBoard = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });

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
    <section id="executive-board" ref={sectionRef} className={`executive-board relative scroll-mt-24 overflow-hidden py-24 text-slate-900 dark:text-white md:py-32 ${reveal ? "executive-board-visible" : ""}`}>
      <div className="executive-dots pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />

      <div className="container relative z-10 px-4">
        <header className="board-reveal mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-hecfa-yellow">Executive Board</p>
          <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white sm:text-5xl">Meet The <span className="text-hecfa-yellow">Executive Board</span></h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">Meet our dedicated executive committee who work together to create impactful experiences for our members.</p>
        </header>

        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {executiveBoard.map((member, index) => (
            <article key={`board-member-${index + 1}`} className={`board-card board-reveal board-delay-${Math.min(index + 1, 6)} group relative flex min-h-[164px] items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition duration-400 hover:-translate-y-1 hover:border-blue-400 hover:shadow-blue-200/50 dark:border-[#1e3a75] dark:bg-[#0c1e47]/90 dark:shadow-black/20 dark:hover:border-hecfa-yellow/60 dark:hover:shadow-blue-500/10 sm:p-5`}>
              <div className="board-photo flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-200 bg-slate-100 text-center text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:border-blue-900 dark:bg-[#081735] dark:text-slate-500">
                {member.image ? <img src={member.image} alt={member.name} className="h-full w-full object-cover transition duration-400 group-hover:scale-105" /> : "Photo to be added"}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-slate-900 dark:text-white">{member.name || "Name to be added"}</h3>
                <p className="mt-1 text-sm font-medium text-hecfa-yellow">{member.role || "Role to be added"}</p>
                <div className="mt-4 flex items-center gap-3 text-slate-500 dark:text-blue-200">
                  {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on Instagram`} className="transition duration-300 hover:scale-110 hover:text-hecfa-yellow"><SocialIcon type="instagram" /></a>}
                  {member.facebook && <a href={member.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on Facebook`} className="transition duration-300 hover:scale-110 hover:text-hecfa-yellow"><SocialIcon type="facebook" /></a>}
                  {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className="transition duration-300 hover:scale-110 hover:text-hecfa-yellow"><SocialIcon type="linkedin" /></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .executive-board { background: #f8fafc; }
        :global(.dark) .executive-board { background: #030d26; }
        .executive-dots { background-image: radial-gradient(rgba(30, 64, 175, 0.1) 1.2px, transparent 1.2px); background-size: 36px 36px; }
        :global(.dark) .executive-dots { background-image: radial-gradient(rgba(59, 130, 246, 0.2) 1.2px, transparent 1.2px); }
        .board-reveal { opacity: 0; transform: translateY(18px); transition: opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1); }
        .executive-board-visible .board-reveal { opacity: 1; transform: translateY(0); }
        .board-delay-1 { transition-delay: 80ms; }
        .board-delay-2 { transition-delay: 140ms; }
        .board-delay-3 { transition-delay: 200ms; }
        .board-delay-4 { transition-delay: 260ms; }
        .board-delay-5 { transition-delay: 320ms; }
        .board-delay-6 { transition-delay: 380ms; }
        @media (prefers-reduced-motion: reduce) {
          .board-reveal, .board-card, .board-photo img { opacity: 1; transform: none; transition: none; }
          .board-card:hover { transform: none; }
        }
      `}</style>
    </section>
  );
};

export default ExecutiveBoard;
