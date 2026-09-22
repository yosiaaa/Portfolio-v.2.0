import { ArrowUpRight, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { CardProject } from "./CustomCard";
import type { workItem } from "@/data/work";

export type ProjectProps = workItem;

type ProjectModalProps = {
  project: ProjectProps | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Drawer
      open={Boolean(project)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      showSwipeHandle
    >
      <DrawerContent>
        {project && (
          <>
            <DrawerClose
              onClick={onClose}
              className="absolute right-4 lg:right-10 top-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-7 w-7 text-primary" />
              <span className="sr-only">Close</span>
            </DrawerClose>

            <DrawerHeader>
              <DrawerTitle className="text-3xl lg:text-8xl text-primary font-inter font-bold">
                {project.projectName}
              </DrawerTitle>
            </DrawerHeader>

            <div className="mt-10 w-full">
              <div className="flex flex-col gap-7 lg:gap-10 w-full">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener"
                    className="text-primary/80 my-2 lg:my-7 flex items-center gap-1 uppercase text-sm font-inter font-medium max-w-4xl w-full"
                  >
                    {project.projectName}
                    <ArrowUpRight size={16} />
                  </a>
                )}
                <span className="text-primary text-xs sm:text-sm font-inter font-medium max-w-4xl w-full">
                  {project.description}
                </span>
                <div className="flex items-center w-full">
                  <div className="grid grid-cols-2 gap-7 lg:gap-12">
                    <div className="flex flex-col gap-2 max-w-sm w-full">
                      <span className="text-primary font-semibold text-base">
                        Industry
                      </span>
                      <span className="text-primary font-medium text-sm">
                        {project.industry.toString()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 max-w-sm w-full">
                      <span className="text-primary font-semibold text-base">
                        Classification
                      </span>
                      <span className="text-primary font-medium text-sm uppercase">
                        {project.classification.toString()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 max-w-sm w-full">
                      <span className="text-primary font-semibold text-base">
                        Technology I use
                      </span>
                      <span className="text-primary font-medium text-sm">
                        {project.technology.join(", ")}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 max-w-sm w-full">
                      <span className="text-primary font-semibold text-base">
                        Role
                      </span>
                      <span className="text-primary font-medium text-sm">
                        {project.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {project.images && project.images.length > 0 && (
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-20">
                {project.images.map((imgSrc, index) => (
                  <CardProject
                    key={`${project.id}-img-${index}`}
                    name={`${project.projectName} - preview ${index + 1}`}
                    image={imgSrc}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
