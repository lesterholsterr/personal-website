"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "Hi, I'm Matthew!";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-8">
            {displayedText}
            <span
              className={`inline-block w-1 h-16 bg-gray-900 dark:bg-gray-100 ml-1 transition-opacity duration-500 ${
                isTypingComplete ? "opacity-0" : "animate-pulse"
              }`}
            />
          </h1>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start opacity-0 animate-fadeInUp"
          style={{
            animation: "fadeInUp 0.8s ease-out forwards",
            animationDelay: "0.5s",
          }}
        >
          {/* About Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-6">
              About Me
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
              <p>
                Hi there, thanks for visiting! I am a student at the University
                of Waterloo pursuing a double major in Computer Science and
                Finance. I enjoy learning new things because it is my strong
                belief that the only reason you may find something uninteresting
                is that you haven&apos;t learned enough of it yet.
              </p>
            </div>

            {/* Status Box */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-[120px] flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                On a 12-hour Amtrak back to Toronto due to Air Canada strike. Made some good progress on this website.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Last updated August 17, 2025
              </p>
            </div>
          </div>

          {/* Navigation Cards */}
          <div>
            <div className="space-y-4 mb-6">
              <Link
                href="/blog"
                className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-300 hover:translate-y-[-2px] group bg-white dark:bg-gray-800"
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200">
                  Blog
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Turning my thoughts into words without LLMs
                </p>
              </Link>

              <Link
                href="/bookshelf"
                className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-300 hover:translate-y-[-2px] group bg-white dark:bg-gray-800"
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200">
                  Bookshelf
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Books that have shaped my thinking
                </p>
              </Link>
            </div>

            {/* Get in touch box - same height as Status box */}
            <a
              href="#contact"
              className="block p-6 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300 hover:translate-y-[-2px] group h-[120px] flex flex-col justify-center"
            >
              <h3 className="text-xl font-medium mb-2">Get in touch</h3>
              <p className="text-gray-300 dark:text-gray-400">DMs are open</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
