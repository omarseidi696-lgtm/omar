"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { Users, MessagesSquare, MessageCircle, CalendarClock, Trophy } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { domains } from "@/lib/data/domains";
import { communityGroups, communityChallenges, sampleThreads } from "@/lib/data/community";

function DomainIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Sparkle;
  return <Icon size={20} strokeWidth={2} />;
}

export default function CommunityPage() {
  const t = useT();
  const { locale } = useLocale();
  const [activeDomain, setActiveDomain] = useState(domains[0].slug);

  const domain = domains.find((d) => d.slug === activeDomain);
  const group = communityGroups.find((g) => g.domainSlug === activeDomain);
  const threads = sampleThreads.filter((th) => th.domainSlug === activeDomain);
  const weekly = communityChallenges.filter((c) => c.type === "weekly");
  const monthly = communityChallenges.filter((c) => c.type === "monthly");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.community.title}</h1>
        <p className="mt-1 text-sm text-ink-subtle">{t.community.subtitle}</p>
      </div>

      <Card className="flex flex-wrap gap-2">
        {domains.map((d) => (
          <button
            key={d.slug}
            onClick={() => setActiveDomain(d.slug)}
            className={cn(
              "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
              activeDomain === d.slug
                ? "border-primary bg-primary/15 text-primary"
                : "border-hairline text-ink-subtle hover:border-hairline-strong hover:text-ink"
            )}
          >
            {d.name[locale]}
          </button>
        ))}
      </Card>

      {domain && group && (
        <Card className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
            <DomainIcon name={domain.icon} />
          </div>
          <div className="flex-1">
            <h2 className="font-medium text-ink">{group.name[locale]}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-ink-subtle">
              <span className="inline-flex items-center gap-1">
                <Users size={12} /> {group.members.toLocaleString()} {t.community.members}
              </span>
              <span className="inline-flex items-center gap-1">
                <MessagesSquare size={12} /> {group.threads.toLocaleString()} {t.community.threads}
              </span>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <h2 className="text-sm font-medium text-ink">{t.community.recentThreads}</h2>
        <div className="mt-3 flex flex-col gap-2">
          {threads.map((th) => (
            <div
              key={th.id}
              className="flex items-center justify-between gap-3 rounded-md border border-hairline px-3 py-2.5"
            >
              <div className="flex items-start gap-2">
                <MessageCircle size={14} className="mt-0.5 shrink-0 text-ink-tertiary" />
                <div>
                  <p className="text-sm text-ink">{th.title[locale]}</p>
                  <p className="mt-0.5 text-xs text-ink-subtle">{th.author}</p>
                </div>
              </div>
              <Badge tone="default" className="shrink-0">
                {th.replies} {t.community.repliesLabel}
              </Badge>
            </div>
          ))}
          {threads.length === 0 && <p className="text-sm text-ink-subtle">{t.community.noThreadsYet}</p>}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink">
            <CalendarClock size={16} className="text-primary" /> {t.community.weeklyChallenges}
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {weekly.map((c) => (
              <div key={c.id} className="rounded-md border border-hairline px-3 py-2.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-ink">{c.title[locale]}</p>
                  <Badge tone="default" className="shrink-0">
                    {domains.find((d) => d.slug === c.domainSlug)?.name[locale]}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-ink-subtle">
                  <span>
                    {t.community.deadline}: {c.deadline}
                  </span>
                  <span>
                    {c.participants.toLocaleString()} {t.community.participants}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink">
            <Trophy size={16} className="text-primary" /> {t.community.monthlyChallenges}
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {monthly.map((c) => (
              <div key={c.id} className="rounded-md border border-hairline px-3 py-2.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-ink">{c.title[locale]}</p>
                  <Badge tone="default" className="shrink-0">
                    {domains.find((d) => d.slug === c.domainSlug)?.name[locale]}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-ink-subtle">
                  <span>
                    {t.community.deadline}: {c.deadline}
                  </span>
                  <span>
                    {c.participants.toLocaleString()} {t.community.participants}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
