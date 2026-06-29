"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleToggle } from "./locale-toggle";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const t = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/courses", label: t.nav.courses },
    { href: "/skills", label: t.nav.skills },
    { href: "/jobs", label: t.nav.jobs },
    { href: "/community", label: t.nav.community },
    { href: "/assistant", label: t.nav.assistant },
  ];

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-hairline bg-canvas/90 backdrop-blur supports-[backdrop-filter]:bg-canvas/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  pathname === link.href ? "text-ink" : "text-ink-subtle hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LocaleToggle />
            <ThemeToggle />
          </div>
          <Button href="/dashboard" size="sm" className="hidden sm:inline-flex">
            {t.nav.getStarted}
          </Button>
          <button
            type="button"
            aria-label={t.nav.menu}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-surface-1 text-ink lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hairline bg-canvas px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-ink-subtle hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/dashboard" onClick={() => setOpen(false)} className="text-sm text-ink-subtle hover:text-ink">
              {t.nav.dashboard}
            </Link>
          </nav>
          <div className="mt-4 flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
            <Button href="/dashboard" size="sm" className="flex-1">
              {t.nav.getStarted}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
