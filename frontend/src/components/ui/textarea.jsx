import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };