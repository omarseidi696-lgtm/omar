import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Tone = "default" | "primary" | "success" | "warning" | "danger";

const toneClasses: Record<Tone, string> = {
  default: "bg-surface-2 text-ink-muted",
  primary: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
};

export function Badge({
  tone = "default",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
