"use client";

import { useState } from "react";

interface VideoSlot {
  youtubeId?: string;
  description: string;
  comingSoon?: boolean;
}

interface SubSection {
  title: string;
  duration: string;
  description: string;
  videos?: VideoSlot[];
  links?: { label: string; url: string }[];
  comingSoon?: boolean;
}

interface SideQuest {
  id: string;
  title: string;
  duration: string;
  description: string;
  subSections?: SubSection[];
  links?: { label: string; url: string }[];
}

const sideQuests: SideQuest[] = [
  {
    id: "writing",
    title: "Writing",
    duration: "Feb 2021 - Present",
    description: "Goal: Provoke my thoughts, then other people's",
    subSections: [
      {
        title: "Electric Vehicles: Battleground China",
        duration: "Feb 2021 - Apr 2022",
        description:
          "Researched, wrote, and published a book on the Chinese electric vehicle market over the span of 14 months.",
        links: [
          {
            label: "Read",
            url: "https://www.amazon.com/Electric-Vehicles-Battleground-Matthew-Yang/dp/B09XT6J4SM",
          },
        ],
      },
      {
        title: "This Website",
        duration: "Aug 2022 - Present",
        description: "Check out my blog :)",
      },
    ],
  },
  {
    id: "music",
    title: "Music",
    duration: "2011 - Present",
    description: "Goal: Be able to jam with good musicians.",
    subSections: [
      {
        title: "Piano",
        duration: "2011 - Present",
        description:
          "Classically trained from 2011 - 2016 (Asian canon event). Took a break, then picked up jazz piano in high school (2018 - 2022). Spent my first co-op's first paycheck on a Yamaha P125. Brought it to school with me and started playing + singing songs I liked!",
        videos: [
          {
            description:
              "Probably peaked in terms of technical ability in 2022 right before going to Waterloo",
            youtubeId: "Cm0hJSponxc",
          },
          {
            description:
              "Probably the coolest solo piece I've arranged and performed back in high school music class. Yeah I used to play alto sax too 😎",
            youtubeId: "jEzC0_gdEEs",
          },
        ],
      },
      {
        title: "Guitar",
        duration: "Jan 2026 - Present",
        description:
          "Bought a Fender Dreadnought Acoustic my second day in SF. It's so addicting!",
        videos: [
          {
            youtubeId: "aYlzWi1EQJI",
            description:
              "3.5 months in. Fairly easy guitar song but tough vocals for me!",
          },
        ],
      },
      // {
      //   title: "Vocals",
      //   duration: "",
      //   description: "",
      //   comingSoon: true,
      // },
    ],
  },
  {
    id: "combat-sports",
    title: "Combat Sports",
    duration: "Jun 2025 - Present",
    description: "Goal: Attend a fighting competition before graduation.",
    subSections: [
      {
        title: "Boxing",
        duration: "Jun 2025 - Aug 2025",
        description: "Amazing people, challenging workouts, and lots of fun!",
        links: [{ label: "Gotham Gym", url: "https://www.gothamgymnyc.com/" }],
      },
      {
        title: "Muay Thai",
        duration: "Jan 2026 - Present",
        description: "Trying to learn the art of eight limbs.",
        links: [
          {
            label: "California Martial Athletics",
            url: "https://www.cmasf.com/",
          },
        ],
      },
    ],
  },
];

export default function Projects() {
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());

  const toggleSub = (key: string) => {
    const next = new Set(expandedSubs);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    setExpandedSubs(next);
  };

  return (
    <section
      id="side-quests"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F2EDE5] dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 mb-12">
          Side Quests
        </h2>

        <div className="space-y-12">
          {sideQuests.map((quest, index) => (
            <div
              key={quest.id}
              className="group opacity-0 animate-fadeInUp"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex-1">
                <div className="flex items-baseline gap-4 mb-1 sm:justify-between">
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-300">
                      {quest.title}
                    </h3>
                    <span className="text-sm text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {quest.links && (
                    <div className="hidden sm:flex gap-3 flex-shrink-0">
                      {quest.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:translate-x-1"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {quest.duration}
                </p>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {quest.description}
                </p>

                {/* Mobile links */}
                {quest.links && (
                  <div className="flex gap-6 sm:hidden mt-4">
                    {quest.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:translate-x-1"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}

                {/* Individually expandable sub-sections */}
                {quest.subSections && (
                  <div className="mt-6 space-y-2 pl-4 border-l-2 border-[#D5CFC4] dark:border-gray-700">
                    {quest.subSections.map((sub) => {
                      const subKey = `${quest.id}-${sub.title}`;
                      const isExpanded = expandedSubs.has(subKey);

                      if (sub.comingSoon) {
                        return (
                          <div key={sub.title} className="py-2">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                              {sub.title}
                            </h4>
                            <p className="text-sm italic text-gray-400 dark:text-gray-500 mt-1">
                              Coming soon
                            </p>
                          </div>
                        );
                      }

                      return (
                        <div key={sub.title}>
                          <button
                            onClick={() => toggleSub(subKey)}
                            className="w-full text-left py-2 flex items-center justify-between gap-4 hover:bg-[#E8E3DB] dark:hover:bg-gray-800 rounded-md px-2 -mx-2 transition-colors duration-200 cursor-pointer"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                {sub.title}
                              </h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {sub.duration}
                              </span>
                            </div>
                            <svg
                              className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {isExpanded && (
                            <div className="pb-4 pt-2 px-2">
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {sub.description}
                              </p>

                              {/* Sub-section links */}
                              {sub.links && sub.links.length > 0 && (
                                <div className="flex gap-4 mt-2">
                                  {sub.links.map((link) =>
                                    link.url ? (
                                      <a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:translate-x-1"
                                      >
                                        {link.label} ↗
                                      </a>
                                    ) : (
                                      <span
                                        key={link.label}
                                        className="text-sm italic text-gray-400 dark:text-gray-500"
                                      >
                                        {link.label} — link coming soon
                                      </span>
                                    ),
                                  )}
                                </div>
                              )}

                              {/* Video slots */}
                              {sub.videos && sub.videos.length > 0 && (
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {sub.videos.map((video, vIdx) => (
                                    <div key={vIdx} className="min-w-0">
                                      {video.youtubeId && !video.comingSoon ? (
                                        <div>
                                          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                                            <iframe
                                              src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                              title={video.description}
                                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                              allowFullScreen
                                              className="absolute inset-0 w-full h-full"
                                            />
                                          </div>
                                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                            {video.description}
                                          </p>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-3 py-3 px-4 rounded-lg bg-[#F2EDE5] dark:bg-gray-800 h-full">
                                          <svg
                                            className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={1.5}
                                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                            />
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={1.5}
                                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                          </svg>
                                          <p className="text-sm italic text-gray-400 dark:text-gray-500">
                                            {video.description}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
