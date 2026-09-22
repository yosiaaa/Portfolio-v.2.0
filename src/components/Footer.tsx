import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { SOCIAL_MEDIA } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="flex items-start gap-7 lg:flex-row justify-between px-6 py-10 lg:p-20">
      <div className="flex flex-col gap-8">
        <div className="max-w-xs w-full">
          <p className="text-wrap text-sm font-inter text-primary">
            Interested in working together? ping me for cool collaborations and
            frontend magic i&apos;d love to hear about what you&apos;re looking
            for.
          </p>
        </div>
        <div className="flex gap-5">
          {SOCIAL_MEDIA.map(({ id, title, href, icon: Icon }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={title}
              className="flex items-center justify-center rounded-full"
            >
              <Icon className="size-6 text-primary" />
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <Button
          variant="link"
          href="/docs/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ArrowUpRight />
          CV / Resume
        </Button>
      </div>
    </footer>
  );
}
