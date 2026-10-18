import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] select-none",
  {
    variants: {
      variant: {
        ghost:
          "bg-transparent text-ink hover:bg-surface-2",
        outline:
          "bg-surface text-ink shadow-card hover:bg-surface-2",
        solid: "bg-primary text-primary-fg hover:opacity-90",
      },
      size: {
        sm: "h-10 min-w-10 px-3 text-sm rounded-md",
        md: "h-11 min-w-11 px-4 text-sm rounded-md",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "icon",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
