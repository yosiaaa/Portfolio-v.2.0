export const NAV_ITEMS = [
  {
    id: 1,
    label: "Home",
    href: "#home",
  },
  {
    id: 2,
    label: "About",
    href: "#about",
  },
  {
    id: 3,
    label: "Service",
    href: "#services",
  },
  {
    id: 3,
    label: "Work",
    href: "#work",
  },
] as const;

export const SOCIAL_MEDIA = [
  { id: 1, title: "Github", href: "https://github.com/yosiaaa" },
  { id: 2, title: "Linkedin", href: "https://www.linkedin.com/in/yosiakd/" },
  { id: 3, title: "Instagram", href: "https://www.instagram.com/driesa.yk" },
] as const;

export const HERO_BIO = [
  "Motion Enthusiast",
  "Creative Design",
  "Storytelling",
  "Powerlifting",
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
export type SocialMediaItem = (typeof SOCIAL_MEDIA)[number];
