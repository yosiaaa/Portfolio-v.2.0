import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { SOCIAL_MEDIA, type SocialMediaItem } from "@/data/navigation";

export type ButtonGroupProps = {
  items?: readonly SocialMediaItem[];
};

export default function ButtonGroup({
  items = SOCIAL_MEDIA,
}: ButtonGroupProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="link" size="icon">
            <EllipsisVertical size="icon" />
          </Button>
        }
      />

      <DropdownMenuContent align="end" side="top" className=" text-primary">
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem
              key={item.id}
              render={
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  {item.title}
                </a>
              }
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
