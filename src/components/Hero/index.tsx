"use client";

import { useEffect, useRef, useState } from "react";

const wordPairs = [
  ["Finance", "Technology"],
  ["Technology", "Finance"],
  ["Data", "Innovation"],
  ["Innovation", "Data"],
] as const;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, active: false };
    let animationFrame = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const createParticles = () => {
      const count = width < 640 ? 30 : width < 1024 ? 46 : 68;

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 1.4 + 0.7,
        alpha: Math.random() * 0.35 + 0.35,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
        const first = particles[firstIndex];

        for (let secondIndex = firstIndex + 1; secondIndex < particles.length; secondIndex += 1) {
          const second = particles[secondIndex];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          const connectionDistance = width < 640 ? 105 : 135;

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.18;
            context.strokeStyle = `rgba(126, 164, 215, ${opacity})`;
            context.lineWidth = 0.7;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();
          }
        }

        context.fillStyle = `rgba(221, 234, 255, ${first.alpha})`;
        context.shadowColor = "color-mix(in srgb, var(--hecfa-yellow) 42%, transparent)";
        context.shadowBlur = 7;
        context.beginPath();
        context.arc(first.x, first.y, first.radius, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;

        if (!reduceMotion.matches) {
          if (pointer.active) {
            const distanceToPointer = Math.hypot(first.x - pointer.x, first.y - pointer.y);
            if (distanceToPointer < 180) {
              const influence = (1 - distanceToPointer / 180) * 0.012;
              first.vx += (pointer.x - first.x) * influence;
              first.vy += (pointer.y - first.y) * influence;
            }
          }

          first.vx = Math.max(-0.22, Math.min(0.22, first.vx));
          first.vy = Math.max(-0.22, Math.min(0.22, first.vy));
          first.x += first.vx;
          first.y += first.vy;

          if (first.x < -20 || first.x > width + 20) first.vx *= -1;
          if (first.y < -20 || first.y > height + 20) first.vy *= -1;
        }
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      createParticles();
      draw();
    };

    const animate = () => {
      draw();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    window.addEventListener("resize", resize);

    if (!reduceMotion.matches) {
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerleave", handlePointerLeave);
      animationFrame = window.requestAnimationFrame(animate);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
};

const Hero = () => {
  const [pairIndex, setPairIndex] = useState(0);
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setPairIndex(0);
      setWord1(wordPairs[0][0]);
      setWord2(wordPairs[0][1]);
      setIsDeleting(false);
      return;
    }

    const currentPair = wordPairs[pairIndex];
    const isTyped = word1 === currentPair[0] && word2 === currentPair[1];
    const isDeleted = word1.length === 0 && word2.length === 0;
    const delay = isTyped ? 1700 : 105;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && word1.length < currentPair[0].length) {
        setWord1(currentPair[0].slice(0, word1.length + 1));
      } else if (!isDeleting && word2.length < currentPair[1].length) {
        setWord2(currentPair[1].slice(0, word2.length + 1));
      } else if (!isDeleting && isTyped) {
        setIsDeleting(true);
      } else if (isDeleting && word1.length > 0) {
        setWord1(word1.slice(0, -1));
      } else if (isDeleting && word2.length > 0) {
        setWord2(word2.slice(0, -1));
      } else if (isDeleting && isDeleted) {
        setIsDeleting(false);
        setPairIndex((currentIndex) => (currentIndex + 1) % wordPairs.length);
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, pairIndex, reduceMotion, word1, word2]);

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#030b18] text-white">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_44%,#163560_0%,#0b1d36_32%,#050f20_68%,#020713_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_24%,rgba(1,5,14,0.58)_100%)]" />
      <ParticleNetwork />

      <div className="container relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center sm:px-8 lg:py-28">
        <div className="flex w-full max-w-4xl flex-col items-center">
          <p className="hero-fade hero-fade-delay-1 mb-7 text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-slate-300 sm:text-xs">
            HEC Finance Academy
          </p>

          <h1 className="hero-fade hero-fade-delay-2 flex w-full flex-col items-center text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-slate-50">
            <span className="block">Where</span>
            <span aria-live="polite" className="mt-5 flex flex-col items-center text-[clamp(2.2rem,7vw,6.5rem)] text-hecfa-yellow drop-shadow-[0_0_22px_color-mix(in_srgb,var(--hecfa-yellow)_22%,transparent)] sm:mt-6">
              <span className="inline-grid items-center justify-items-start">
                <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
                  Technology
                </span>
                <span className="col-start-1 row-start-1 inline-flex items-center whitespace-nowrap">
                  <span>{word1}</span>
                  <span aria-hidden="true" className="hero-cursor ml-2 inline-block h-[0.9em] w-[2px] bg-current align-middle" />
                </span>
              </span>
              <span className="my-3 text-slate-50 sm:my-4">Meets</span>
              <span className="inline-grid items-center justify-items-start">
                <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
                  Technology
                </span>
                <span className="col-start-1 row-start-1 inline-flex items-center whitespace-nowrap">
                  <span>{word2}</span>
                  <span aria-hidden="true" className="hero-cursor ml-2 inline-block h-[0.9em] w-[2px] bg-current align-middle" />
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-fade hero-fade-delay-3 mx-auto mt-9 max-w-2xl text-base leading-8 text-slate-300 sm:mt-10 sm:text-lg sm:leading-8">
            HEC Finance Academy is a student club at IHEC Carthage bridging finance and technology through learning, innovation, and collaboration.
          </p>
        </div>
      </div>

      <style jsx>{`
        .hero-fade {
          opacity: 0;
          transform: translateY(16px);
          animation: heroFadeIn 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .hero-fade-delay-1 {
          animation-delay: 180ms;
        }

        .hero-fade-delay-2 {
          animation-delay: 330ms;
        }

        .hero-fade-delay-3 {
          animation-delay: 520ms;
        }

        .hero-cursor {
          animation: cursorBlink 1.05s ease-in-out infinite;
          text-shadow: 0 0 12px color-mix(in srgb, var(--hecfa-yellow) 72%, transparent);
        }

        @keyframes heroFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cursorBlink {
          0%,
          44% {
            opacity: 1;
          }
          52%,
          100% {
            opacity: 0.18;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade,
          .hero-cursor {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
