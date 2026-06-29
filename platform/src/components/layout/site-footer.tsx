"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { useT } from "@/lib/i18n/locale-context";

export function SiteFooter() {
  const t = useT();

  const sectionLinks = [
    { href: "/courses", label: t.nav.courses },
    { href: "/videos", label: t.nav.videos },
    { href: "/skills", label: t.nav.skills },
    { href: "/roadmap", label: t.nav.roadmap },
    { href: "/jobs", label: t.nav.jobs },
  ];

  const companyLinks = [
    { href: "/about", label: t.footer.about },
    { href: "/contact", label: t.footer.contact },
    { href: "/privacy", label: t.footer.privacy },
    { href: "/terms", label: t.footer.terms },
  ];

  return (
    <footer className="border-t border-hairline bg-canvas px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-ink-subtle">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-ink-tertiary">
              {t.footer.sections}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {sectionLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-subtle hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-ink-tertiary">
              {t.footer.company}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-subtle hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-ink-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mehnati. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
