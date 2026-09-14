"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/5 text-slate-900 transition-colors duration-300 hover:bg-slate-900/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
    >
      <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-all duration-300 ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-75 opacity-0"}`} fill="none" aria-hidden="true">
        <path d="M12 3v2m0 14v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M3 12h2m14 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 24 24" className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? "rotate-45 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`} fill="none" aria-hidden="true">
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default ThemeToggler;
