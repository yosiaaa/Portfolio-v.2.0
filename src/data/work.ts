import metroHome from "@/assets/metrodata/homepage.png";
import metroArticle from "@/assets/metrodata/article.png";
import portofolioHome from "@/assets/porto_v1/home.png";
import magazineHome from "@/assets/magazine/home.png";
import magazineDetail from "@/assets/magazine/detail.png";

export interface WorkItem {
  id: number;
  projectName: string;
  year: number;
  role: string;
  description: string;
  industry: string | string[];
  technology: readonly string[];
  challenges?: readonly string[];
  solutions?: readonly string[];
  classification: string;
  href?: string;
  images?: readonly string[];
}

export const WORK: readonly WorkItem[] = [
  {
    id: 1,
    projectName: "Metrodata Academy",
    year: 2023,
    industry: "Digital IT Solution",
    role: "Frontend",
    technology: ["React js", "Tailwind CSS", "RTK query", "Github"],
    description:
      "Metrodata Academy is a public company listed on the Indonesia Stock Exchange since 1990 (IDX: MTDL) and a leading Information and Communication Technology (ICT) company in Indonesia that has partnered with world-class IT firms since 1975. The Company is known for its comprehensive portfolio in the distribution of ICT hardware and software. Currently, the Company operates three main business lines: the Distribution Business, which handles distribution to dealers, ICT solution companies, and e-commerce channels; the Solutions Business, which provides end-to-end ICT solutions—ranging from design and implementation to IT managed services, consulting, and training; and the Consulting Business, which offers innovative business solutions for business transformation.",
    classification: "Released",
    href: "https://metrodataacademy.id/",
    images: [metroHome, metroArticle],
  },
  {
    id: 2,
    projectName: "PMIS Indosat",
    year: 2024,
    industry: "Project Management Employees",
    role: "Frontend",
    technology: ["React js", "Ant Design", "Gitlab"],
    description:
      "PMIS Indosat is a web-based application designed to help organizations plan, monitor, control, and report project activities. It provides a centralized platform where project teams can manage project data, track progress, assign tasks, monitor budgets and schedules, and generate reports and documents",
    classification: "Released",
  },
  {
    id: 3,
    projectName: "Portfolio Vol.01",
    year: 2024,
    industry: "Portfolio",
    role: "Frontend",
    technology: ["React js", "Tailwind CSS", "Shadcn UI"],
    description:
      "Basically the first version of my own portfolio, contains what about me, what i'm doing, what my expertise, then several projects i've worked on.",
    href: "https://yosiakehatdriesa.vercel.app/",
    images: [portofolioHome],
    classification: "Released",
  },
  {
    id: 4,
    projectName: "Magazine Liart Blogs",
    year: 2026,
    industry: ["Entertainment", "Lifestyle & Culture"],
    role: "Frontend",
    technology: ["React js", "Tailwind CSS", "Shadcn UI"],
    description:
      "Magazine Liart blog is a project for me to learning and explore, platform designed to display articles, artist/author. This website not finished yet, later im finished it or maybe can be developed on a larger scale.",
    href: "https://magazine-blog-liart.vercel.app/",
    images: [magazineHome, magazineDetail],
    classification: "Released",
  },
] as const;

// Backwards-compatible export type
export type workItem = WorkItem;
