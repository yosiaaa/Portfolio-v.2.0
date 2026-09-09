import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

interface RunningTextProps {
  text?: string;
  speed?: number; // pixels moved per frame (~60fps)
}

export const RunningText: React.FC<RunningTextProps> = ({
  text = "• Passionate • Motion • Creative • Frontend • Interactive ",
  speed = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // States managed in refs to prevent unnecessary React re-renders
  const isPaused = useRef<boolean>(false);
  const pauseTimeoutRef = useRef<gsap.core.Tween | null>(null);
  const glideTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate exact midpoint width for infinite loop wrapping
    const totalWidth = track.scrollWidth / 2;

    // Function to pause movement and resume after specified delay (default 0.75s)
    const pauseAndResume = (delaySeconds = 0.8) => {
      isPaused.current = true;

      // Clear any pending auto-resume timeouts
      if (pauseTimeoutRef.current) pauseTimeoutRef.current.kill();

      pauseTimeoutRef.current = gsap.delayedCall(delaySeconds, () => {
        isPaused.current = false;
      });
    };

    // Constant movement ticker frame function
    const updateTicker = () => {
      // Pause ticker if user is dragging, gliding, or in a temporary pause window
      if (isPaused.current) return;

      const currentX = gsap.getProperty(track, "x") as number;
      // Subtract speed to move left continuously
      let nextX = currentX - speed;

      // Wrap coordinate seamlessly around totalWidth
      if (nextX <= -totalWidth) {
        nextX += totalWidth;
      }

      gsap.set(track, { x: nextX });
    };

    // Add tick listener to GSAP engine
    gsap.ticker.add(updateTicker);

    // Setup Draggable
    const draggableInstance = Draggable.create(track, {
      type: "x",
      onPress() {
        // Kill existing glides and timeouts immediately on user touch/click
        if (glideTweenRef.current) glideTweenRef.current.kill();
        if (pauseTimeoutRef.current) pauseTimeoutRef.current.kill();
        isPaused.current = true;
      },
      onDrag() {
        // Keep wrapping position inside totalWidth range while actively dragging
        const currentX = gsap.getProperty(track, "x") as number;
        const wrappedX = gsap.utils.wrap(-totalWidth, 0, currentX);
        gsap.set(track, { x: wrappedX });
      },
      onDragEnd() {
        const currentX = gsap.getProperty(track, "x") as number;

        // Calculate throw momentum speed based on deltaX movement speed
        const throwVelocity = this.deltaX * 12;
        const targetX = currentX + throwVelocity;

        // Animate smooth deceleration (throwing effect)
        glideTweenRef.current = gsap.to(track, {
          x: targetX,
          duration: Math.min(Math.abs(throwVelocity) * 0.003 + 0.4, 1.2),
          ease: "power2.out",
          modifiers: {
            x: gsap.utils.unitize((x) =>
              gsap.utils.wrap(-totalWidth, 0, parseFloat(x)),
            ),
          },
          onComplete() {
            // Once throw deceleration finishes, pause briefly then resume ticker
            pauseAndResume(0.75);
          },
        });
      },
    });

    // Handle pure click/tap to pause
    const handleClick = () => {
      if (draggableInstance[0].isDragging) return;
      pauseAndResume(0.75);
    };

    track.addEventListener("click", handleClick);

    // Cleanup resources on component unmount
    return () => {
      gsap.ticker.remove(updateTicker);
      if (pauseTimeoutRef.current) pauseTimeoutRef.current.kill();
      if (glideTweenRef.current) glideTweenRef.current.kill();
      track.removeEventListener("click", handleClick);
      draggableInstance[0].kill();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden z-10 py-6 select-none cursor-grab active:cursor-grabbing"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        <span className="text-4xl md:text-5xl font-semibold text-primary tracking-wider">
          {text.repeat(4)}
        </span>
        <span className="text-4xl md:text-5xl font-extrabold text-primary tracking-wider">
          {text.repeat(4)}
        </span>
      </div>
    </div>
  );
};

export default RunningText;
