"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { events, type EventItem } from "./eventsData";

const EventCard = ({ event }: { event: EventItem }) => (
  <article className="event-card group overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-hecfa-yellow/70 hover:shadow-lg hover:shadow-blue-200/40 dark:border-[#1e3a75] dark:bg-[#0c1e47]/80 dark:hover:shadow-blue-950/40">
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image src={event.image} alt={event.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
      {event.category && <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-slate-950/65 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white">{event.category}</span>}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{event.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{event.description}</p>
      <dl className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
        <div className="flex gap-3"><dt className="font-semibold text-hecfa-yellow">Date</dt><dd>{event.date}</dd></div>
        <div className="flex gap-3"><dt className="font-semibold text-hecfa-yellow">Location</dt><dd>{event.location}</dd></div>
      </dl>
    </div>
  </article>
);

const Events = () => {
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
    }, { threshold: 0.08 });

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
    <main ref={sectionRef} className={`events-page min-h-screen overflow-hidden bg-[#f8fafc] text-slate-900 dark:bg-[#030d26] dark:text-white ${reveal ? "events-visible" : ""}`}>
      <div className="events-dots pointer-events-none absolute inset-0" />
      <div className="container relative z-10 px-4 pb-24 pt-36 sm:pb-32 sm:pt-44">
        <header className="event-reveal mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-hecfa-yellow">HEC Finance Academy</p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white sm:text-6xl">Our Events</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">Explore the activities, gatherings and experiences shaped by each HEC FA academic mandate.</p>
        </header>

        <div className="mt-20 space-y-24 sm:mt-28 sm:space-y-32">
          ["2023/2024", "2024/2025", "2025/2026"].map((mandate, mandateIndex) => {
            const mandateEvents = events.filter((event) => event.mandate === mandate);
            return (
              <section key={mandate} aria-labelledby={`mandate-${mandate}`} className="event-reveal" style={{ transitionDelay: `${mandateIndex * 120}ms` }}>
                <div className="mb-9 flex items-center gap-4">
                  <span className="h-px w-10 bg-hecfa-yellow" />
                  <h2 id={`mandate-${mandate}`} className="text-2xl font-bold tracking-[-0.03em] text-slate-900 dark:text-white sm:text-3xl">Mandat {mandate}</h2>
                  <span className="h-px flex-1 bg-slate-200 dark:bg-blue-900/70" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {mandateEvents.map((event, index) => <EventCard key={`${mandate}-${index}`} event={event} />)}
                </div>
              </section>
            );
          )})}
        </div>
      </div>

      <style jsx>{`
        .events-page { position: relative; }
        .events-dots { background-image: radial-gradient(rgba(30, 64, 175, 0.1) 1.2px, transparent 1.2px); background-size: 36px 36px; opacity: 0.7; }
        :global(.dark) .events-dots { background-image: radial-gradient(rgba(59, 130, 246, 0.18) 1.2px, transparent 1.2px); }
        .event-reveal { opacity: 0; transform: translateY(18px); transition: opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1); }
        .events-visible .event-reveal { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .event-reveal, .event-card, .event-card img { transition: none; } .event-reveal { opacity: 1; transform: none; } }
      `}</style>
    </main>
  );
};

export default Events;
