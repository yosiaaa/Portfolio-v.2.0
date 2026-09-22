import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const container = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const topLine = useRef<HTMLDivElement>(null);
  const bottomLine = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);

  useGSAP(
    () => {
      if (!container.current) return;

      const progress = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          onComplete?.();
        },
      });

      // Initial state
      gsap.set(progressBar.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(counter.current, {
        yPercent: 100,
      });

      gsap.set(title.current, {
        yPercent: 110,
      });

      gsap.set(topLine.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(bottomLine.current, {
        scaleX: 0,
        transformOrigin: "right center",
      });

      gsap.set(grid.current, {
        opacity: 0,
      });

      // Background
      tl.to(grid.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // Decorative lines
      tl.to(
        [topLine.current, bottomLine.current],
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.inOut",
        },
        "<",
      );

      // Main title
      tl.to(
        title.current,
        {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
        },
        "-=0.5",
      );

      // Counter animation
      tl.to(
        progress,
        {
          value: 100,
          duration: 2.8,
          ease: "power2.inOut",

          onUpdate: () => {
            const value = Math.round(progress.value);

            if (counter.current) {
              counter.current.textContent = String(value).padStart(3, "0");
            }

            if (progressBar.current) {
              gsap.set(progressBar.current, {
                scaleX: progress.value / 100,
              });
            }
          },
        },
        "-=0.4",
      );

      // Counter reveal
      tl.to(
        counter.current,
        {
          yPercent: 0,
          duration: 0.8,
          ease: "power4.out",
        },
        "<",
      );

      // Small pause before exit
      tl.to({}, { duration: 0.25 });

      // Exit animation
      tl.to(container.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
      });

      // Hide decorative content during exit
      tl.to(
        [title.current, counter.current, grid.current],
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        },
        "-=0.9",
      );
    },
    { scope: container },
  );

  if (!isVisible) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-9999 flex h-screen w-full items-center justify-center overflow-hidden bg-[#111] text-white"
    >
      {/* Grid */}
      <div
        ref={grid}
        className="pointer-events-none absolute inset-0 opacity-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.055) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.055) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute inset-0 bg-[#111]/40" />
      </div>

      {/* Top line */}
      <div
        ref={topLine}
        className="absolute left-6 right-6 top-6 h-px origin-left bg-white/30 md:left-10 md:right-10 md:top-10"
      />

      {/* Bottom line */}
      <div
        ref={bottomLine}
        className="absolute bottom-6 left-6 right-6 h-px origin-right bg-white/30 md:bottom-10 md:left-10 md:right-10"
      />

      {/* Top left */}
      <div className="absolute left-6 top-10 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 md:left-10">
        Creative Studio
      </div>

      {/* Top right */}
      <div className="absolute right-6 top-10 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 md:right-10">
        Please Wait
      </div>

      {/* Main */}
      <div className="relative z-10 flex w-full max-w-350 flex-col px-6 md:px-10">
        <div className="overflow-hidden">
          <h1
            ref={title}
            className="text-[13vw] font-medium uppercase md:leading-[0.75] tracking-[-0.08em] md:text-[10vw]"
          >
            Driesa Studio
          </h1>
        </div>

        <div className="mt-8 flex items-end justify-between border-t border-white/20 pt-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
            Initializing experience
          </div>

          <div className="overflow-hidden">
            <div className="flex items-baseline">
              <span
                ref={counter}
                className="font-mono text-5xl font-light tracking-[-0.06em] md:text-7xl"
              >
                000
              </span>

              <span className="ml-2 font-mono text-xs text-white/50">%</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5 h-0.5 w-full overflow-hidden bg-white/10">
          <div
            ref={progressBar}
            className="h-full w-full origin-left bg-white"
          />
        </div>

        <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
          <span>System / 01</span>
          <span>Experience / Ready</span>
        </div>
      </div>

      {/* Bottom left */}
      <div className="absolute bottom-10 left-6 font-mono text-[10px] text-white/30 md:left-10">
        © {new Date().getFullYear()}
      </div>

      {/* Bottom right */}
      <div className="absolute bottom-10 right-6 font-mono text-[10px] text-white/30 md:right-10">
        00:00
      </div>
    </div>
  );
}
