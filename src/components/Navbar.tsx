import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "./ui/button";
import ButtonGroup from "./ButtonGroup";
import { NAV_ITEMS, SOCIAL_MEDIA } from "@/data/navigation";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useNavScroll } from "@/hooks/useNavScroll";
import { useNavbarAnimation } from "@/hooks/useNavbarAnimation";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

export default function Navbar() {
  const { isOpen, toggleMenu, handleNavClick } = useNavScroll();
  const { menuRef } = useNavbarAnimation(isOpen);

  return (
    <header className="px-6 lg:px-20 w-full top-0 left-0 z-50 bg-transparent fixed">
      <nav className="flex justify-between items-center relative z-50">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 animate-[spin_30s_linear_infinite]"
          />
        </Link>

        <span className="hidden text-sm italic font-inter uppercase font-thin text-primary">
          Portfolio v.2.0
        </span>

        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="cursor-pointer p-2 z-50"
        >
          {isOpen ? (
            <X size={30} className="text-white" />
          ) : (
            <Menu size={30} className="text-primary" />
          )}
        </button>
      </nav>

      {/* Fixed Full Screen Overlay */}
      <div
        data-cursor="scroll"
        ref={menuRef}
        className=" fixed flex flex-col justify-between inset-0 bg-black text-white px-6 lg:px-20 pt-50 pb-10 lg:pb-20 z-40"
      >
        <ul className="flex flex-col w-full">
          {NAV_ITEMS.map(({ id, label, href }) => (
            <li key={id} className="w-full">
              <Link
                to={href}
                onClick={(e) => handleNavClick(e, href)}
                className="block w-full -mx-10 px-10 py-5 text-4xl font-inter sm:text-5xl font-bold uppercase transition-colors duration-300 hover:bg-white hover:text-black"
                style={{ width: "calc(100% + 5rem)" }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-10 text-sm flex flex-col lg:flex-row gap-7 lg:justify-between">
          <div className="max-w-sm w-full">
            <p className="text-wrap text-sm font-inter text-primary">
              Interested in working together? ping me for cool collaborations
              and frontend magic i’d love to hear about what you’re looking for.
            </p>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <Button
              href="/docs/cv.pdf"
              target="_blank"
              rel="noopener"
              variant="link"
            >
              CV / Resume
            </Button>

            <ButtonGroup items={SOCIAL_MEDIA} />
          </div>
        </div>
      </div>
    </header>
  );
}
