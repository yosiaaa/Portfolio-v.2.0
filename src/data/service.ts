import bracket from "@/assets/bracket.svg";
import bolt from "@/assets/bolt.svg";
import stack from "@/assets/stack.svg";
import sparkles from "@/assets/sparkles.svg";

export type ServicesProps = {
  id: number;
  title: string;
  desc: string;
  icon: string;
};

export const SERVICE = [
  {
    id: 1,
    title: "Custom Web Application & UI Development",
    desc: "Building interactive, responsive single-page applications (SPAs) or web apps from scratch using modern frameworks like React. This includes integrating REST APIs, managing application state, and ensuring smooth performance across desktop and mobile",
    icon: bracket,
  },
  {
    id: 2,
    title: "SEO Core Web Vitals Optimization",
    desc: "Improving website speed and loading metrics for businesses losing traffic due to slow pages. Service includes reducing bundle sizes, optimizing images and assets, setting up lazy loading, eliminating layout shifts (CLS), and tuning rendering performance to pass Google’s Core Web Vitals",
    icon: bolt,
  },
  {
    id: 3,
    title: "Design System & Component Library Creation",
    desc: "Building reusable, well-documented component libraries and design tokens using tools like Storybook or Tailwind CSS. This helps client engineering teams standardize UI elements, speed up future feature rollouts, and maintain consistent brand styling across multiple apps",
    icon: stack,
  },
  {
    id: 4,
    title: "Interactive Website Motions",
    desc: "Enhance websites with captivating motions using cutting-edge technologies like GSAP, incorporating dynamic and interactive elements to boost user engagement",
    icon: sparkles,
  },
];
