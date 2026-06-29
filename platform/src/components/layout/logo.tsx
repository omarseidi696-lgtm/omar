import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 font-semibold text-ink ${className ?? ""}`}>
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-on-primary">
        <Sparkles size={16} />
      </span>
      <span className="text-[15px] tracking-tight">Mehnati</span>
    </Link>
  );
}
