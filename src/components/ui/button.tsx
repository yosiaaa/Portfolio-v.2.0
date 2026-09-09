import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-input/30 hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        ghost:
          "hover:bg-muted border-none rounded-none text-primary hover:text-foreground aria-expanded:bg-muted aria-expanded:text-primary dark:hover:bg-muted/50",
        marquee:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "flex items-center gap-2 bg-transparent text-primary border-primary/80 hover:bg-primary/10 px-3 py-2",
      },
      size: {
        default: "px-3",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    repeatCount?: number;
    href?: string;
    target?: string;
    rel?: string;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  repeatCount = 4,
  href,
  target,
  rel,
  render,
  ...props
}: ButtonProps) {
  const isMarquee = variant === "marquee";
  const repeatedItems = Array.from({ length: repeatCount });

  // If href is provided and render isn't overridden, render as an anchor element
  const defaultRender = href ? (
    <a href={href} target={target} rel={rel} />
  ) : undefined;

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      render={render ?? defaultRender}
      {...props}
    >
      {isMarquee ? (
        <span className="relative w-full max-w-35.5 overflow-hidden flex items-center">
          <span className="flex w-max transition-transform duration-500 ease-out group-hover/button:animate-none! group-hover/button:translate-x-0! animate-marquee-infinite">
            <span className="flex items-center gap-3 shrink-0 pr-3">
              {repeatedItems.map((_, i) => (
                <span key={`a-${i}`} className="inline-flex items-center gap-1">
                  {children}
                </span>
              ))}
            </span>

            <span
              className="flex items-center gap-3 shrink-0 pr-3"
              aria-hidden="true"
            >
              {repeatedItems.map((_, i) => (
                <span key={`b-${i}`} className="inline-flex items-center gap-1">
                  {children}
                </span>
              ))}
            </span>
          </span>
        </span>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
