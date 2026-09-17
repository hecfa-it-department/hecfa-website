"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navigationLinks = [
  ["Home", "/#home"],
  ["About", "#about"],
  ["Bureau", "#executive-board"],
  ["Events", "/#events"],
  ["Partnerships", "#partners"],
  ["Gallery", "/#gallery"],
  ["Contact", "/#contact"],
] as const;

const socialLinks = [
  ["Instagram", "https://www.instagram.com/hec_finance_academy/"],
  ["Facebook", "https://www.facebook.com/HEC.Finance.Academy"],
  ["TikTok", "https://www.tiktok.com/@hec_fa"],
  ["LinkedIn", "https://www.linkedin.com/company/hec-finance-academy/"],
] as const;

const contactItems = [
  ["Email", "hec.financeacademy@gmail.com", "mailto:hec.financeacademy@gmail.com"],
  ["Phone", "+216 24 710 928", "tel:+21624710928"],
  ["Location", "IHEC Carthage, Tunis", "https://www.google.com/maps/search/?api=1&query=IHEC+Carthage+Tunis"],
] as const;

const ContactIcon = ({ type }: { type: "Email" | "Phone" | "Location" }) => {
  if (type === "Email") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "Phone") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.6">
        <path d="M7.2 3.5 5 4.8a2 2 0 0 0-.9 2.4c1.7 5.9 5.8 10 11.7 11.7a2 2 0 0 0 2.4-.9l1.3-2.2-4.1-2.2-1.4 1.6a12.3 12.3 0 0 1-5.2-5.2l1.6-1.4-2.2-4.1Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.6">
      <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.2" />
    </svg>
  );
};

const SocialIcon = ({ label }: { label: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    {label === "Instagram" && (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.3" cy="6.7" r="1" />
      </>
    )}
    {label === "Facebook" && <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v8h3Z" />}
    {label === "TikTok" && <path d="M15.2 3c.2 1.7 1.2 2.8 2.9 3.2v2.8a7.3 7.3 0 0 1-2.9-.9v5.7a5.2 5.2 0 1 1-4.5-5.1v2.9a2.3 2.3 0 1 0 1.6 2.2V3h2.9Z" />}
    {label === "LinkedIn" && <path d="M5.2 8.3A1.7 1.7 0 1 0 5.2 5a1.7 1.7 0 0 0 0 3.3ZM3.7 9.7h3v9.6h-3V9.7Zm4.8 0h2.9V11h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.2 4 5v5h-3v-4.4c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v4.5h-3V9.7Z" />}
  </svg>
);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
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
      { threshold: 0.12 },
    );

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  const reveal = reduceMotion || isVisible;

  return (
    <footer ref={footerRef} className={`hecfa-footer ${reveal ? "footer-visible" : ""}`}>
      <div className="footer-network" aria-hidden="true">
        <span className="network-line network-line-one" />
        <span className="network-line network-line-two" />
        <span className="network-line network-line-three" />
        <span className="network-node network-node-one" />
        <span className="network-node network-node-two" />
        <span className="network-node network-node-three" />
      </div>
      <div className="footer-divider" />

      <div className="container relative z-10 px-4 py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="footer-column footer-reveal">
            <Link href="/#home" aria-label="HEC Finance Academy home" className="inline-block">
              <Image src="/images/logo/logo2.svg" alt="HEC Finance Academy" width={220} height={55} className="h-auto w-[170px] dark:hidden sm:w-[185px]" />
              <Image src="/images/logo/logo.svg" alt="HEC Finance Academy" width={220} height={55} className="hidden h-auto w-[170px] dark:block sm:w-[185px]" />
            </Link>
            <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">HEC Finance Academy</h2>
            <p className="mt-3 max-w-xs text-sm leading-7 text-slate-600 dark:text-slate-400">
              A student club at IHEC Carthage where finance, technology, data and innovation meet.
            </p>
          </div>

          <div className="footer-column footer-reveal footer-delay-1">
            <h2 className="footer-heading">Quick Navigation</h2>
            <nav aria-label="Footer navigation" className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
              {navigationLinks.map(([label, href]) => (
                <a key={label} href={href} className="footer-link text-sm text-slate-600 transition duration-300 hover:text-hecfa-yellow dark:text-slate-400">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-column footer-reveal footer-delay-2">
            <h2 className="footer-heading">Nos Contacts</h2>
            <div className="mt-5 space-y-4">
              {contactItems.map(([label, value, href]) => (
                <a
                  key={label}
                  href={href}
                  target={label === "Location" ? "_blank" : undefined}
                  rel={label === "Location" ? "noopener noreferrer" : undefined}
                  className="footer-contact-link flex items-start gap-3 text-sm text-slate-600 transition duration-300 hover:text-hecfa-yellow dark:text-slate-400"
                >
                  <span className="mt-0.5 shrink-0 text-hecfa-yellow"><ContactIcon type={label} /></span>
                  <span>{value}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column footer-reveal footer-delay-3">
            <h2 className="footer-heading">Follow Us</h2>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
              {socialLinks.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Follow HEC Finance Academy on ${label}`} className="footer-social flex items-center gap-2 text-sm text-slate-600 transition duration-300 hover:-translate-y-0.5 hover:text-hecfa-yellow dark:text-slate-400">
                  <SocialIcon label={label} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-12 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 HEC Finance Academy. All rights reserved.</p>
          <p>Made with passion by HEC Finance Academy IT Team</p>
        </div>
      </div>

      <style jsx>{`
        .hecfa-footer {
          position: relative;
          overflow: hidden;
          background: #f8fafc;
        }

        :global(.dark) .hecfa-footer { background: #030d26; }

        .footer-network {
          pointer-events: none;
          position: absolute;
          inset: 0;
          overflow: hidden;
          opacity: 0.28;
        }

        :global(.dark) .footer-network { opacity: 0.4; }

        .footer-network::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 35%, rgba(59, 130, 246, 0.12), transparent 28%), radial-gradient(circle at 80% 70%, rgba(245, 197, 66, 0.08), transparent 24%);
        }

        .network-line {
          position: absolute;
          height: 1px;
          width: 125%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.32), rgba(245, 197, 66, 0.24), transparent);
          transform: rotate(-8deg);
          animation: networkMove 18s linear infinite;
        }

        .network-line-one { top: 28%; left: -12%; }
        .network-line-two { top: 58%; left: -8%; animation-duration: 24s; animation-delay: -8s; transform: rotate(7deg); }
        .network-line-three { top: 78%; left: -15%; animation-duration: 28s; animation-delay: -14s; transform: rotate(-3deg); }

        .network-node {
          position: absolute;
          height: 4px;
          width: 4px;
          border-radius: 999px;
          background: var(--hecfa-yellow);
          box-shadow: 0 0 10px rgba(245, 197, 66, 0.35);
          animation: nodePulse 4s ease-in-out infinite;
        }

        .network-node-one { top: 28%; left: 26%; }
        .network-node-two { top: 58%; left: 71%; animation-delay: -1.5s; }
        .network-node-three { top: 78%; left: 44%; animation-delay: -2.5s; }

        .footer-divider {
          position: relative;
          z-index: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--hecfa-yellow), transparent);
          opacity: 0.65;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 800ms ease;
        }

        .footer-visible .footer-divider { transform: scaleX(1); }
        .footer-heading { color: #0f172a; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; }
        :global(.dark) .footer-heading { color: white; }
        .footer-reveal { opacity: 0; transform: translateY(10px); transition: opacity 600ms ease, transform 600ms ease; }
        .footer-visible .footer-reveal { opacity: 1; transform: translateY(0); }
        .footer-delay-1 { transition-delay: 80ms; }
        .footer-delay-2 { transition-delay: 160ms; }
        .footer-delay-3 { transition-delay: 240ms; }

        @keyframes networkMove {
          from { margin-left: -5%; opacity: 0.35; }
          50% { opacity: 0.7; }
          to { margin-left: 5%; opacity: 0.35; }
        }

        @keyframes nodePulse {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50% { opacity: 0.9; transform: scale(1.15); }
        }

        @media (prefers-reduced-motion: reduce) {
          .network-line, .network-node, .footer-divider, .footer-reveal { animation: none; transition: none; }
          .footer-divider, .footer-reveal { opacity: 1; transform: none; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
