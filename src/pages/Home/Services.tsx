import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICE } from "@/data/service";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const itemsContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !headerRef.current ||
        !itemsContainerRef.current
      )
        return;

      // Select ALL service items directly from the DOM wrapper
      const items = gsap.utils.toArray<HTMLElement>(
        itemsContainerRef.current.children,
      );

      if (items.length === 0) return;

      // 1. Reveal Header (Left) & First Item (Index 0) on scroll enter
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }).from(
        items[0],
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      );

      // 2. Reveal all remaining items (Index 1 to end) individually as you scroll down
      items.slice(1).forEach((item) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="services" ref={containerRef}>
      <div className="flex flex-col gap-10 lg:flex-row justify-between items-start px-6 py-20 lg:py-32 lg:p-20 min-h-screen">
        {/* Left Header */}
        <div
          ref={headerRef}
          className="flex flex-col gap-5 lg:gap-10 lg:sticky lg:top-60"
        >
          <span className="text-primary text-lg lg:text-[11px] font-inter">
            What I Offer
          </span>
          <h2 className="font-instrument text-primary text-[64px] font-medium tracking-wide leading-none">
            Services
          </h2>
          <span className="font-inter text-primary max-w-sm text-base md:text-[13px] font-medium tracking-wide">
            Explore My Web Development Services.
          </span>
        </div>

        {/* Right Column / Items Wrapper */}
        <div ref={itemsContainerRef} className="grid gap-16 max-w-lg w-full">
          {SERVICE.map((service) => (
            <div
              key={service.id}
              className="flex flex-col lg:flex-row items-start gap-7"
            >
              <img
                src={service.icon}
                alt={service.title}
                className="object-contain w-12 h-12 shrink-0"
              />
              <div className="flex flex-col gap-2 w-full max-w-xl">
                <span className="text-primary font-semibold lg:text-3xl font-inter">
                  {service.title}
                </span>
                <span className="text-primary/80 text-base font-medium text-wrap">
                  {service.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
