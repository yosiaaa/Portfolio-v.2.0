import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import ButtonGroup from "./ButtonGroup";
import { SOCIAL_MEDIA } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-10 lg:flex-row lg:items-center justify-between px-6 py-10 lg:p-20">
      <div className="max-w-sm w-full">
        <p className="text-wrap text-sm font-inter text-primary">
          Interested in working together? ping me for cool collaborations and
          frontend magic i’d love to hear about what you’re looking for.
        </p>
      </div>
      <div className="flex gap-5 items-center">
        <Button
          variant="link"
          href="/docs/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ArrowUpRight />
          CV / Resume
        </Button>
        <ButtonGroup items={SOCIAL_MEDIA} />
      </div>
    </footer>
  );
}
