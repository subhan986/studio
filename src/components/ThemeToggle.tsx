
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setThemeState] = React.useState<"theme-light" | "dark" | "system">("system");

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    if (isDark) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "theme-light");
    }
  }, [theme]);
  
  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "theme-light" | "dark" | null;
    if (storedTheme) {
      setThemeState(storedTheme);
       document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // If no theme is stored, set to dark by default as per previous setup
      setThemeState("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);


  const toggleTheme = () => {
    setThemeState((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "theme-light" : "dark";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return newTheme;
    });
  };
  
  // Ensure the component only renders on the client after hydration
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <Button variant="ghost" size="icon" disabled className="h-9 w-9 sm:h-10 sm:w-10"></Button>;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 sm:h-10 sm:w-10"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] sm:h-5 sm:w-5" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] sm:h-5 sm:w-5" />
      )}
    </Button>
  );
}
