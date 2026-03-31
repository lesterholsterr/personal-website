'use client';

import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  try {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored && ['light', 'dark'].includes(stored)) {
      return stored;
    }
  } catch {
    // localStorage might not be available
  }
  return 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

  // Set mounted flag after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize theme state on mount (client-side only)
  useLayoutEffect(() => {
    const storedTheme = getStoredTheme();
    setTheme(storedTheme);

    // Apply theme immediately
    const html = document.documentElement;
    if (storedTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  // Update DOM when theme preference changes
  useLayoutEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Save to localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Handle localStorage errors gracefully
    }
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        mounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
