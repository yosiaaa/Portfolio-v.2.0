import { useState } from "react";
import ProjectModal, { type ProjectProps } from "@/components/ProjectModal";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { WORK } from "@/data/work";

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null,
  );

  const containerRef = useSectionAnimation<HTMLElement>({
    type: "fade-up",
    staggerSelector: ".work-animate",
    stagger: 0.7,
  });

  return (
    <section id="work" ref={containerRef}>
      <div className="flex flex-col gap-10 lg:gap-20 px-6 py-20 lg:py-32 lg:px-20">
        <div className="flex flex-col gap-6 lg:gap-12">
          <div className="flex flex-col gap-7">
            <span className="work-animate font-inter text-primary text-[11px] font-medium">
              Area of Expertise
            </span>
            <div className="flex items-center gap-1">
              <h2 className="work-animate font-instrument text-primary text-6xl lg:text-[64px] font-medium tracking-wide leading-none">
                Selected Work
              </h2>
            </div>
          </div>
          <span className="work-animate font-inter text-primary max-w-lg w-full lg:text-[13px] font-medium tracking-wide">
            Over the past few years, I&apos;ve worked primarily on company
            profile websites and digital products, with additional experience
            designing PMIS applications. Here are a few selected projects
            showcasing my work across design and development
          </span>
        </div>

        <div className="flex w-full max-w-xl flex-col gap-5">
          {/* Pass 'item' into onClick handler */}
          {WORK.map((item) => (
            <div
              key={item.id}
              className="hover:text-primary flex w-full cursor-pointer items-center gap-2"
              onClick={() => setSelectedProject(item)}
            >
              <span className="text-primary/70 lg:text-nowrap text-xl font-medium">
                {item.projectName}
              </span>
              <div className="flex h-px w-full items-center bg-[#ffffff1a]"></div>
              <div className="flex gap-1">
                <span className="text-primary/70 text-sm font-medium">
                  {item.role},
                </span>
                <span className="text-primary/70 text-sm font-medium">
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
