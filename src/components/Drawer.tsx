import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register the React hook plugin
gsap.registerPlugin(useGSAP);

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize and run animations
  const { contextSafe } = useGSAP(
    () => {
      if (!panelRef.current || !backdropRef.current) return;

      // Initial off-screen positioning
      gsap.set(panelRef.current, { xPercent: 100 });
      gsap.set(backdropRef.current, { opacity: 0 });

      // Build animation timeline
      tlRef.current = gsap
        .timeline({ paused: true })
        .to(backdropRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        })
        .to(
          panelRef.current,
          {
            xPercent: 0,
            duration: 0.7,
            ease: "power4.inOut",
          },
          "-=0.3",
        );

      // Target children elements inside links container if available
      if (linksContainerRef.current?.children.length) {
        gsap.set(linksContainerRef.current.children, { y: 50, opacity: 0 });
        tlRef.current.to(
          linksContainerRef.current.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      // Target footer element
      if (footerRef.current) {
        gsap.set(footerRef.current, { y: 20, opacity: 0 });
        tlRef.current.to(
          footerRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }
    },
    { scope: containerRef },
  );

  // Trigger smooth reverse animation before closing
  const handleClose = contextSafe(() => {
    if (tlRef.current) {
      tlRef.current.reverse().then(() => {
        onClose();
      });
    } else {
      onClose();
    }
  });

  // Play timeline forward/backward based on isOpen prop
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      tlRef.current?.play();
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/50"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 flex w-full md:w-1/2 z-99 overflow-hidden">
        <div
          ref={panelRef}
          className="flex h-full w-full flex-col justify-between bg-background-drawer shadow-xl"
        >
          {/* Header */}
          <div className="flex items-end justify-end p-10">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 rounded-md p-1 text-background hover:cursor-pointer focus:outline-none"
              aria-label="Close panel"
            >
              <span className="text-background font-semibold text-3xl">
                Menu
              </span>
              <X size={32} />
            </button>
          </div>

          {/* Body Links */}
          <div
            ref={linksContainerRef}
            className="flex flex-1 flex-col justify-center gap-4 my-auto"
          >
            {children}
          </div>

          {/* Footer */}
          <div ref={footerRef} className="flex justify-between pt-6 p-10">
            <div className="flex gap-20">
              <div className="flex flex-col gap-2">
                <span className="text-[#818180] font-inter font-medium text-sm uppercase tracking-wider">
                  Contact
                </span>
                <span className="text-background">test@mail.com</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#818180] font-inter font-medium text-sm uppercase tracking-wider">
                  Social Media
                </span>
                <span className="text-background">Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
