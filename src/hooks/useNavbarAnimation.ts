import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function useNavbarAnimation(isOpen: boolean) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";

        gsap.fromTo(
          menuRef.current,
          {
            opacity: 0,
            y: -40,
            display: "none",
          },
          {
            opacity: 1,
            y: 0,
            display: "flex",
            duration: 0.5,
            ease: "power3.out",
          },
        );
      } else {
        document.body.style.overflow = "";

        gsap.to(menuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            if (menuRef.current) {
              gsap.set(menuRef.current, { display: "none" });
            }
          },
        });
      }

      return () => {
        document.body.style.overflow = "";
      };
    },
    { dependencies: [isOpen] },
  );

  return { menuRef };
}
