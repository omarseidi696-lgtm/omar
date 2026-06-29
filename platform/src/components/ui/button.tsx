import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "inverse";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-focus",
  secondary:
    "bg-surface-1 text-ink border border-hairline hover:border-hairline-strong",
  tertiary: "bg-transparent text-ink hover:bg-surface-1",
  inverse: "bg-white text-black hover:bg-white/90",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-3.5 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children, icon } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus/50 disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  const { href, ...rest } = props as ButtonAsButton;
  void href;
  return (
    <button className={classes} {...rest}>
      {icon}
      {children}
    </button>
  );
}
