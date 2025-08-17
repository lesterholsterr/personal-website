'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <button onClick={goToHome} className="text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300 cursor-pointer">
            Matthew Yang
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-8">
              <button onClick={goToHome} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:translate-y-[-1px] cursor-pointer">
                Home
              </button>
              <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:translate-y-[-1px]">
                Blog
              </Link>
              <Link href="/bookshelf" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:translate-y-[-1px]">
                Bookshelf
              </Link>
              <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:translate-y-[-1px]">
                Resume
              </a>
              <Link href="/#contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:translate-y-[-1px]">
                Contact
              </Link>
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
              aria-label="Toggle menu"
            >
              <div className="w-8 h-8 relative flex items-center justify-center">
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45' : '-translate-y-2'
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45' : 'translate-y-2'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="py-2 space-y-1">
            <button
              onClick={(e) => {
                goToHome(e);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
            >
              Home
            </button>
            <Link
              href="/blog"
              className="block px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/bookshelf"
              className="block px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Bookshelf
            </Link>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resume
            </a>
            <Link
              href="/#contact"
              className="block px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}