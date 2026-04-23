"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const PHOTOS = [
  "/me/2022.png",
  "/me/2023.jpg",
  "/me/2024.jpg",
  "/me/2025.jpg",
  "/me/2026.jpg",
];

type Corner = "tl" | "tr" | "bl" | "br";

const CORNERS: Corner[] = ["tl", "tr", "bl", "br"];

const CORNER_CLASSES: Record<Corner, string> = {
  tl: "top-10 left-4 xl:left-10 2xl:left-16",
  tr: "top-10 right-4 xl:right-10 2xl:right-16",
  bl: "bottom-10 left-4 xl:left-10 2xl:left-16",
  br: "bottom-10 right-4 xl:right-10 2xl:right-16",
};

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const side = direction === "prev" ? "left-2" : "right-2";
  const points =
    direction === "prev" ? "15 18 9 12 15 6" : "9 18 15 12 9 6";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 -translate-y-1/2 ${side} w-7 h-7 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors z-10`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points={points} />
      </svg>
    </button>
  );
}

const STAIN_BACKGROUNDS: React.CSSProperties[] = [
  { backgroundColor: "#ffffff" },
  { backgroundColor: "#f2e8d5" },
  {
    backgroundColor: "#fbf6ed",
    backgroundImage:
      "linear-gradient(135deg, transparent 40%, #c9a77a 120%)",
  },
  {
    backgroundColor: "#ece0c7",
    backgroundImage:
      "radial-gradient(ellipse at 85% 18%, #8b5a2b55 0%, transparent 22%), radial-gradient(circle at 18% 82%, #6b3e1a44 0%, transparent 18%)",
  },
];

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(PHOTOS.length - 1);
  const [rotation, setRotation] = useState(-4);
  const [stainIndex, setStainIndex] = useState(0);
  const [corner, setCorner] = useState<Corner>("tr");
  const [ready, setReady] = useState(false);
  const fullText = "Hi, I'm Matthew!";

  useEffect(() => {
    setRotation(Math.random() * 16 - 8);
    setStainIndex(Math.floor(Math.random() * STAIN_BACKGROUNDS.length));
    setCorner(CORNERS[Math.floor(Math.random() * CORNERS.length)]);
    setReady(true);
  }, []);

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

  const year = PHOTOS[photoIndex].match(/(\d{4})/)?.[1] ?? "";

  const prevPhoto = () => setPhotoIndex((i) => Math.max(0, i - 1));
  const nextPhoto = () =>
    setPhotoIndex((i) => Math.min(PHOTOS.length - 1, i + 1));
  const canPrev = photoIndex > 0;
  const canNext = photoIndex < PHOTOS.length - 1;

  return (
    <section className="relative py-20 lg:pt-32 lg:pb-64 px-4 sm:px-6 lg:px-8 bg-[#F2EDE5] dark:bg-gray-900">
      {/* Polaroid — desktop: absolute to section, randomized corner/rotation/stain */}
      <div
        className={`${ready ? "polaroid" : "opacity-0"} hidden lg:block absolute ${CORNER_CLASSES[corner]} w-[180px] xl:w-[230px] 2xl:w-[260px] z-10`}
        style={{ ["--polaroid-rotate" as string]: `${rotation}deg` }}
      >
        <div
          className="p-3 pb-8 shadow-xl dark:shadow-black/50"
          style={STAIN_BACKGROUNDS[stainIndex]}
        >
          <div className="relative aspect-[4/5] bg-[#F2EDE5] overflow-hidden">
            <Image
              key={photoIndex}
              src={PHOTOS[photoIndex]}
              alt="Matthew"
              fill
              sizes="(min-width: 1536px) 520px, (min-width: 1280px) 460px, 360px"
              quality={95}
              className="object-cover"
              priority
            />
            {canPrev && <ArrowButton direction="prev" onClick={prevPhoto} />}
            {canNext && <ArrowButton direction="next" onClick={nextPhoto} />}
          </div>
          <p
            className="text-center text-xl text-gray-700 mt-2"
            style={{ fontFamily: "var(--font-caveat), 'Segoe Script', cursive" }}
          >
            {year}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 sm:mb-16 text-center">
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
            <div className="p-4 bg-[#F2EDE5] dark:bg-gray-800 rounded-lg border border-[#D5CFC4] dark:border-gray-700 h-[120px] flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <a
                  href="https://www.youtube.com/watch?v=IPKAwJKGSDc"
                  className="underline"
                >
                  Loving every minute cause you make me so alive!
                </a>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Last updated March 30, 2026
              </p>
            </div>
          </div>

          {/* Navigation Cards */}
          <div>
            <div className="space-y-4 mb-6">
              <Link
                href="/blog"
                className="block p-6 border border-[#D5CFC4] dark:border-gray-700 rounded-lg hover:border-[#CBC5BA] dark:hover:border-gray-600 hover:shadow-sm transition-all duration-300 hover:translate-y-[-2px] group bg-[#F2EDE5] dark:bg-gray-800"
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200">
                  Blog
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  I like to think and yap
                </p>
              </Link>

              <Link
                href="/bookshelf"
                className="block p-6 border border-[#D5CFC4] dark:border-gray-700 rounded-lg hover:border-[#CBC5BA] dark:hover:border-gray-600 hover:shadow-sm transition-all duration-300 hover:translate-y-[-2px] group bg-[#F2EDE5] dark:bg-gray-800"
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200">
                  Bookshelf
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  I like to read other people&apos;s yaps
                </p>
              </Link>
            </div>

            {/* Get in touch box - same height as Status box */}
            <a
              href="#contact"
              className="block p-6 bg-gray-700 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-600 transition-all duration-300 hover:translate-y-[-2px] group h-[120px] flex flex-col justify-center"
            >
              <h3 className="text-xl font-medium mb-2">Get in touch</h3>
              <p className="text-gray-300 dark:text-gray-400">
                I like to meet people!
              </p>
            </a>
          </div>
        </div>

        {/* Polaroid — mobile/tablet: inline centered after buttons, unchanged */}
        <div className="lg:hidden flex justify-center mt-16">
          <div className="polaroid-mobile w-[200px] sm:w-[230px] md:w-[260px]">
            <div className="bg-white p-3 pb-8 shadow-xl dark:shadow-black/50">
              <div className="relative aspect-[4/5] bg-[#F2EDE5] overflow-hidden">
                <Image
                  key={photoIndex}
                  src={PHOTOS[photoIndex]}
                  alt="Matthew"
                  fill
                  sizes="(min-width: 768px) 520px, (min-width: 640px) 460px, 400px"
                  quality={95}
                  className="object-cover"
                  priority
                />
                <ArrowButton direction="prev" onClick={prevPhoto} />
                <ArrowButton direction="next" onClick={nextPhoto} />
              </div>
              <p
                className="text-center text-xl text-gray-700 mt-2"
                style={{
                  fontFamily: "var(--font-caveat), 'Segoe Script', cursive",
                }}
              >
                {year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
