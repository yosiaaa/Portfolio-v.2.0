import { useSectionAnimation } from "@/hooks/useSectionAnimation";

export default function About() {
  const containerRef = useSectionAnimation<HTMLElement>({
    type: "fade-up",
    staggerSelector: ".about-animate",
    stagger: 1,
    duration: 1,
  });
  return (
    <section id="about" ref={containerRef}>
      <div className="flex items-center justify-between px-6 py-20 lg:py-32 lg:px-20">
        <div className="about-animate flex flex-col gap-10">
          <div className="flex flex-col items-start w-full">
            <span className="text-sm text-primary/70 font-inter uppercase">
              Who?
            </span>
            <p className="font-inter font-medium text-primary text-4xl">
              Born in Indonesia. <br />
              <span className="font-instrument italic">
                Driven by ideas, with purpose.
              </span>
            </p>
          </div>
          <div className="max-w-xl w-full flex flex-col gap-5">
            <p className="text-base text-primary font-medium font-inter">
              I&apos;m Yosia Kehat Driesa. a Frontend Developer based in
              Jakarta. with 3+ years of experience building responsive,
              user-focused web experiences. I turn ideas into clean, scalable,
              and intuitive interfaces.
            </p>
            <p className="text-base text-primary font-medium font-inter">
              My core stack is{" "}
              <span className="font-instrument font-medium text-2xl">
                React & Next js
              </span>{" "}
              — with deep fluency in TypeScript, Tailwind CSS, and performance
              engineering.
            </p>
            <p className="text-base text-primary font-medium font-inter">
              Lately, I&apos;ve been working on something exciting with my
              partner — building a team focused on web application development.
              We started with a simple idea: to create a team that can help
              businesses bring their digital ideas to life. From developing
              custom web applications to creating solutions tailored to specific
              business needs, we want to focus on delivering products that are
              practical, reliable, and valuable. We&apos;re still at the early
              stage of this journey, learning, building, and growing together.
              There&apos;s still a lot ahead of us, but we&apos;re excited to
              see where this journey takes us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
