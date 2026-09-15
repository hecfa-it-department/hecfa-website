"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleStickyNavbar = () => setSticky(window.scrollY >= 48);

    handleStickyNavbar();
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  useEffect(() => {
    setNavbarOpen(false);
  }, [pathname]);

  return (
    <header
      className={`header fixed top-0 left-0 z-40 w-full transition-all duration-500 ${sticky ? "py-4" : "py-6"}`}
    >
      <div className="container">
        <div className={`relative grid grid-cols-[1fr_auto] items-center rounded-full border px-7 transition-all duration-500 sm:px-9 lg:grid-cols-[1fr_auto_1fr] ${sticky ? "border-white/40 bg-white/85 py-4 shadow-lg shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85" : "border-white/30 bg-white/65 py-5 shadow-md shadow-slate-900/5 backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/60"}`}>
          <Link href="/#home" aria-label="HEC FA home" className="header-logo flex w-fit shrink-0 animate-[navLogoIn_700ms_ease-out_forwards] opacity-0">
            <Image src="/images/logo/logo2.svg" alt="HEC FA" width={190} height={37} priority className="h-[37px] w-[190px] max-w-[48vw] object-contain dark:hidden sm:h-[40px] sm:w-[204px]" />
            <Image src="/images/logo/logo.svg" alt="HEC FA" width={190} height={37} priority className="hidden h-[37px] w-[190px] max-w-[48vw] object-contain dark:block sm:h-[40px] sm:w-[204px]" />
          </Link>

          <div className="flex items-center justify-end gap-2 lg:col-start-3">
            <div className="hidden lg:block"><ThemeToggler /></div>
            <button type="button" onClick={() => setNavbarOpen((open) => !open)} aria-expanded={navbarOpen} aria-controls="navbarCollapse" aria-label={navbarOpen ? "Close navigation menu" : "Open navigation menu"} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full text-slate-900 transition hover:bg-slate-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:hidden dark:text-white">
              <span className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${navbarOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ${navbarOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${navbarOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>

          <nav id="navbarCollapse" aria-label="Primary navigation" className={`absolute top-[calc(100%+0.75rem)] right-0 left-0 rounded-3xl border border-white/40 bg-white/90 p-4 shadow-xl shadow-slate-900/10 backdrop-blur-xl transition-[opacity,transform,visibility] duration-300 lg:relative lg:top-auto lg:col-start-2 lg:row-start-1 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none dark:border-white/10 dark:bg-slate-950/90 lg:dark:bg-transparent ${navbarOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 lg:visible lg:translate-y-0 lg:opacity-100"}`}>
            <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-center lg:gap-3">
              {menuData.map((menuItem, index) => {
                const anchor = menuItem.path?.split("#")[1];
                const isActive = anchor ? pathname === "/" && typeof window !== "undefined" && window.location.hash === `#${anchor}` : pathname === menuItem.path;

                return (
                  <li key={menuItem.id} style={{ animationDelay: `${150 + index * 55}ms` }} className="animate-[navLinkIn_600ms_ease-out_both]">
                    <Link href={menuItem.path ?? "/"} onClick={() => setNavbarOpen(false)} className={`group relative flex items-center rounded-full px-4 py-3 text-base font-medium tracking-[0.01em] transition-colors duration-300 lg:py-3 ${isActive ? "text-blue-700 dark:text-blue-300" : "text-slate-700 hover:text-blue-700 dark:text-slate-200 dark:hover:text-blue-300"}`}>
                      {menuItem.title}
                      <span className={`absolute right-4 bottom-1 left-4 h-px origin-left scale-x-0 bg-blue-600 transition-transform duration-300 group-hover:scale-x-100 ${isActive ? "scale-x-100" : ""}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 border-t border-slate-900/10 pt-3 dark:border-white/10 lg:hidden"><ThemeToggler /></div>
          </nav>
        </div>
      </div>
      <style jsx>{`
        @keyframes navLogoIn { to { opacity: 1; transform: translateY(0); } }
        @keyframes navLinkIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          header, header *, header *::before, header *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
