"use client";

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface FootnoteProps {
  text: string;
}

export default function Footnote({ text }: FootnoteProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const [positionReady, setPositionReady] = useState(false);
  const footnoteRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const calculatePosition = () => {
    if (!footnoteRef.current) return;

    const footnoteRect = footnoteRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get tooltip dimensions (estimate if not rendered yet)
    const tooltipWidth = tooltipRef.current?.offsetWidth || 300;
    const tooltipHeight = tooltipRef.current?.offsetHeight || 100;

    // Calculate center position for tooltip (fixed positioning - no scroll offset needed)
    let left = footnoteRect.left + footnoteRect.width / 2 - tooltipWidth / 2;
    let top = footnoteRect.bottom + 8;

    // Adjust horizontal position if tooltip would go off screen
    if (left < 16) {
      left = 16;
    } else if (left + tooltipWidth > viewportWidth - 16) {
      left = viewportWidth - tooltipWidth - 16;
    }

    // Check if tooltip would go off bottom of screen, if so show above
    if (top + tooltipHeight > viewportHeight - 16) {
      top = footnoteRect.top - tooltipHeight - 8;
    }

    setPosition({ top, left });
    setPositionReady(true);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsVisible(false);
      setPositionReady(false);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      if (!isVisible) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setPositionReady(false);
      }
    }
  };

  // Calculate position after tooltip is rendered
  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure tooltip is rendered
      const timer = setTimeout(calculatePosition, 10);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile && 
        isVisible && 
        footnoteRef.current && 
        tooltipRef.current &&
        !footnoteRef.current.contains(event.target as Node) &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isMobile, isVisible]);

  return (
    <>
      <span
        ref={footnoteRef}
        className="inline-flex items-center justify-center w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 transition-colors duration-200 select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Footnote: ${text}`}
        aria-expanded={isVisible}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        ◆
      </span>
      
      {mounted && isVisible && positionReady && createPortal(
          <div
            ref={tooltipRef}
            className="fixed z-50 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-w-xs sm:max-w-sm animate-in fade-in-0 zoom-in-95 duration-200"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            <div className="relative">
              {text}
              {/* Arrow pointing to footnote */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-200 dark:border-b-gray-600"></div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-white dark:border-b-gray-800"></div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}