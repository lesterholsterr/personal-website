"use client";

import { useState } from "react";

import Image from "next/image";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  logo: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "p72",
    company: "Point72",
    role: "Software Engineering Intern",
    location: "New York City, USA",
    duration: "Jun 2025 - Aug 2025",
    logo: "/p72-logo.jpeg",
    description: [
      "Led the rewrite of a trade reconciliation platform to support a major macro trading system migration, eliminating technical debt and delivering a UAT-ready system in under 6 weeks",
    ],
  },
  {
    id: "onex",
    company: "Onex",
    role: "Software Engineering Intern",
    location: "Toronto, Canada",
    duration: "Jan 2024 - Apr 2024 | Sep 2024 - Dec 2024",
    logo: "/onex-logo.jpeg",
    description: [
      "Developed an in-house risk management system, saving $300,000 annually by replacing a third-party service",
      "Built quantitative analysis tools in Python to reveal factor bias and timing patterns from factor models",
    ],
  },
  {
    id: "waterloo",
    company: "University of Waterloo",
    role: "Teaching Assistant (CFM101)",
    location: "Waterloo, Canada",
    duration: "Sep 2023 - Dec 2023",
    logo: "/waterloo-logo.png",
    description: [
      "Ran weekly tutorials to teach Python, statistics, and financial markets to 60 students using real market data",
    ],
  },
  {
    id: "bofa",
    company: "Bank of America",
    role: "Software Developer Intern",
    location: "Toronto, Canada",
    duration: "May 2023 - Aug 2023",
    logo: "/bofa-logo.jpeg",
    description: [
      "Developed middleware API service in Scala to stream real-time payout calculations to a positions dashboard for eSWAP, an equity swaps trading platform processing over $40 billion in transactions annually",
    ],
  },
  {
    id: "bmo",
    company: "Bank of Montreal",
    role: "Financial Analyst Intern",
    location: "Toronto, Canada",
    duration: "Jul 2022 - Aug 2022",
    logo: "/bmo-logo.png",
    description: [
      "Examined corporate action bulletins from central securities depositories and published notices to inform clients of upcoming events",
    ],
  },
];

export default function Experience() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-12">
          Work Experience
        </h2>

        <div className="space-y-2">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="border border-gray-200 rounded-lg bg-white"
            >
              <button
                onClick={() => toggleExpanded(exp.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {exp.company}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-sm text-gray-600 mt-1">
                        <span>{exp.role}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        expandedItems.has(exp.id) ? "rotate-180" : ""
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
                  </div>
                </div>
              </button>

              {expandedItems.has(exp.id) && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="pt-4">
                    <p className="text-sm text-gray-600 mb-3">{exp.location}</p>
                    <ul className="space-y-2">
                      {exp.description.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 leading-relaxed flex"
                        >
                          <span className="text-gray-400 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
