import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-hairline bg-surface-1 p-6 transition-colors",
        className
      )}
      {...props}
    />
  );
}

export function CardHover({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-hairline bg-surface-1 p-6 transition-all duration-200 hover:border-hairline-strong hover:bg-surface-2 hover:-translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}
