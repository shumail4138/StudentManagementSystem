"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
<button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg p-2 hover:scale-105 transition"
>
  {theme === "dark" ? "☀️" : "🌙"}
</button>
  );
}