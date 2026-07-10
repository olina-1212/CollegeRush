import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-sm hover:bg-blue-700",

        secondary:
          "bg-blue-100 text-blue-700 hover:bg-blue-200",

        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700",

        outline:
          "bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };