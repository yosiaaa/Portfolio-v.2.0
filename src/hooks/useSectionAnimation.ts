import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once
gsap.registerPlugin(ScrollTrigger, useGSAP);

export type AnimationType = "fade-up" | "fade-in" | "scale-up" | "custom";

interface UseSectionAnimationProps {
  /** Type of preset animation */
  type?: AnimationType;
  /** Distance in pixels for translateY on 'fade-up' (default: 50) */
  yOffset?: number;
  /** Animation duration in seconds (default: 0.8) */
  duration?: number;
  /** Stagger time in seconds between child elements matching 'staggerSelector' */
  stagger?: number;
  /** CSS selector for items to stagger (e.g., '.animate-item') */
  staggerSelector?: string;
  /** ScrollTrigger trigger point (default: 'top 80%') */
  start?: string;
  /** Custom callback for complex timelines */
  customAnimation?: (
    context: gsap.Context,
    sectionRef: React.RefObject<HTMLElement | null>,
  ) => void;
}

export const useSectionAnimation = <T extends HTMLElement = HTMLElement>({
  type = "fade-up",
  yOffset = 50,
  duration = 0.8,
  stagger = 0.15,
  staggerSelector,
  start = "top 80%",
  customAnimation,
}: UseSectionAnimationProps = {}) => {
  const sectionRef = useRef<T | null>(null);

  useGSAP(
    (context) => {
      if (!sectionRef.current) return;

      // Execute custom timeline if provided
      if (type === "custom" && customAnimation) {
        customAnimation(context, sectionRef);
        return;
      }

      // Target staggered elements if selector provided, otherwise target the section container itself
      const targets = staggerSelector
        ? gsap.utils.toArray(
            sectionRef.current.querySelectorAll(staggerSelector),
          )
        : sectionRef.current;

      if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

      // Define presets
      const initialVars: gsap.TweenVars = { opacity: 0 };
      const animateVars: gsap.TweenVars = {
        opacity: 1,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start,
          toggleActions: "play none none reverse",
        },
      };

      if (type === "fade-up") {
        initialVars.y = yOffset;
        animateVars.y = 0;
      } else if (type === "scale-up") {
        initialVars.scale = 0.9;
        animateVars.scale = 1;
      }

      if (staggerSelector && Array.isArray(targets)) {
        animateVars.stagger = stagger;
      }

      // Apply initial styles and create animation
      gsap.set(targets, initialVars);
      gsap.to(targets, animateVars);
    },
    { scope: sectionRef },
  );

  return sectionRef;
};
