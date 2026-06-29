"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { domains } from "@/lib/data/domains";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { Card } from "@/components/ui/card";

function DomainIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Sparkle;
  return <Icon size={20} strokeWidth={2} />;
}

export default function SkillsIndexPage() {
  const t = useT();
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.skillsPage.title}</h1>
        <p className="mt-1 text-sm text-ink-subtle">{t.skillsPage.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {domains.map((domain) => (
          <Link key={domain.slug} href={`/skills/${domain.slug}`}>
            <Card className="group flex h-full flex-col gap-3 transition-all hover:border-hairline-strong hover:bg-surface-2">
              <div className="flex size-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                <DomainIcon name={domain.icon} />
              </div>
              <h2 className="font-medium text-ink">{domain.name[locale]}</h2>
              <p className="text-xs text-ink-subtle">{domain.description[locale]}</p>
              <div className="mt-auto flex items-center justify-between pt-2 text-xs text-ink-subtle">
                <span>
                  ${domain.avgSalaryUsd[0].toLocaleString()} – ${domain.avgSalaryUsd[1].toLocaleString()}
                </span>
                <ArrowRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100 rtl:rotate-180" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
