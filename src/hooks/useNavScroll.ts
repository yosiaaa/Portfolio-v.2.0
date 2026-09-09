import { useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function useNavScroll() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault();

        // Close menu modal
        setIsOpen(false);

        // Smooth scroll to the targeted section
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: href,
            autoKill: false,
          },
          ease: "power3.inOut",
        });
      }
    },
    [],
  );

  return {
    isOpen,
    setIsOpen,
    toggleMenu,
    handleNavClick,
  };
}
