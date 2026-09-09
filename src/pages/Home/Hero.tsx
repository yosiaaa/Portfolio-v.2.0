import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import userImage from "@/assets/new-user.jpg";
import { HERO_BIO } from "@/data/navigation";

export default function Hero() {
  const containerRef = useSectionAnimation<HTMLElement>({
    type: "fade-up",
    staggerSelector: ".hero-animate, .image-animate",
    stagger: 0.5,
  });
  return (
    <section id="home" ref={containerRef}>
      <div className="flex flex-col gap-10 px-6 pb-12 lg:flex-row lg:justify-between mt-32 lg:mt-107 lg:py-10 lg:px-20">
        {/* left section */}
        <ul className="space-y-2 order-2 md:order-1">
          {HERO_BIO.map((item) => (
            <li
              key={item}
              className="hero-animate text-primary font-thin text-5xl lg:text-6xl font-instrument tracking-wider"
            >
              {item}
            </li>
          ))}
        </ul>
        {/* right section */}
        <div className="image-animate flex order-1 md:order-2 md:justify-end gap-4 max-w-4xl w-full overflow-hidden">
          <img
            src={userImage}
            alt="User Image"
            className="max-w-full object-cover w-full"
            loading="lazy"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}
