interface Project {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  links: {
    github?: string;
    demo?: string;
    external?: string;
  };
}

const projects: Project[] = [
  {
    id: "book",
    title: "Electric Vehicles: Battleground China",
    description:
      "Researched, wrote, and published a book on the Chinese electric vehicle market over the span of 14 months.",
    links: {
      external:
        "https://www.amazon.com/Electric-Vehicles-Battleground-Matthew-Yang/dp/B09XT6J4SM",
    },
  },
  {
    id: "stockle",
    title: "Stockle",
    description:
      "A stock market-themed wordle parody. Currently in open Alpha — try it out!.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    links: {
      demo: "https://playstockle.com",
      github: "https://github.com/lesterholsterr/stockle",
    },
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-12">
          Projects
        </h2>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group opacity-0 animate-fadeInUp"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-3">
                    <h3 className="text-2xl font-light text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {project.technologies && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        {project.technologies.join(" • ")}
                      </p>
                    </div>
                  )}

                  <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">
                    {project.description}
                  </p>
                </div>

                <div className="flex gap-6 sm:flex-col sm:gap-3 flex-shrink-0">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-gray-900 transition-all duration-300 hover:translate-x-1"
                    >
                      Demo ↗
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-gray-900 transition-all duration-300 hover:translate-x-1"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.links.external && (
                    <a
                      href={project.links.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-gray-900 transition-all duration-300 hover:translate-x-1"
                    >
                      View ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
