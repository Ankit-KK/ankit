
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check for user preference on initial load
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500",
        "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
        isAnimating && "scale-110",
        "hover:rotate-12"
      )}
      aria-label="Toggle theme"
      disabled={isAnimating}
    >
      <div className="relative h-5 w-5 overflow-hidden">
        <Sun className={cn(
          "h-5 w-5 absolute transition-all duration-500",
          isDarkMode ? "translate-y-10 rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"
        )} />
        <Moon className={cn(
          "h-5 w-5 absolute transition-all duration-500",
          isDarkMode ? "translate-y-0 rotate-0 opacity-100" : "-translate-y-10 -rotate-90 opacity-0"
        )} />
      </div>
    </button>
  );
}
