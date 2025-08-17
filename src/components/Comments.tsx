'use client';

import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';

export default function Comments() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for dark mode preference
    const checkTheme = () => {
      const isDark = 
        document.documentElement.classList.contains('dark') ||
        (!document.documentElement.classList.contains('light') && 
         window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      setTheme(isDark ? 'dark' : 'light');
    };

    // Check theme on mount
    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => checkTheme();
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
          Comments
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Powered by GitHub Discussions. Sign in with GitHub to comment.
        </p>
      </div>
      
      <Giscus
        id="comments"
        repo="lesterholsterr/personal-website"
        repoId="R_kgDOPTxEew" // This needs to be configured on giscus.app
        category="General"
        categoryId="DIC_kwDOPTxEe84CuR4T" // This needs to be configured on giscus.app
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}