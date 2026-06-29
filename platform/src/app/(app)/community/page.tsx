"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { Users, MessagesSquare, MessageCircle, CalendarClock, Trophy, ChevronDown, ChevronUp, Check, Plus } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile } from "@/lib/store/profile-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { domains } from "@/lib/data/domains";
import { communityGroups, communityChallenges, sampleThreads } from "@/lib/data/community";

function threadReplies(threadId: string, author: string, count: number, locale: "en" | "ar") {
  const replyAuthors = ["Mona.k", "Khaled_dev", "Reem.codes", "Tariq.ai", "Hana_ux"];
  const repliesEn = [
    "This was really helpful, thanks for sharing!",
    "I had the same question — following this thread.",
    "Agreed, took me about the same time when I started.",
    "Check the roadmap section here, it helped me a lot.",
    "Great point, I'd add that consistency matters more than speed.",
  ];
  const repliesAr = [
    "هذا مفيد جداً، شكراً للمشاركة!",
    "كان عندي نفس السؤال — أتابع هذا الموضوع.",
    "أوافقك، استغرقت وقتاً مشابهاً عندما بدأت.",
    "راجع قسم المسار التعليمي، ساعدني كثيراً.",
    "نقطة رائعة، أضيف أن الاستمرارية أهم من السرعة.",
  ];
  const shown = Math.min(count, 3);
  return Array.from({ length: shown }, (_, i) => ({
    author: replyAuthors[(i + author.length) % replyAuthors.length],
    text: (locale === "ar" ? repliesAr : repliesEn)[(i + threadId.length) % repliesEn.length],
  }));
}

function DomainIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Sparkle;
  return <Icon size={20} strokeWidth={2} />;
}

export default function CommunityPage() {
  const t = useT();
  const { locale } = useLocale();
  const { profile, toggleChallengeJoin } = useProfile();
  const [activeDomain, setActiveDomain] = useState(domains[0].slug);
  const [openThreadId, setOpenThreadId] = useState<string | null>(null);

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
          {threads.map((th) => {
            const isOpen = openThreadId === th.id;
            return (
              <div key={th.id} className="rounded-md border border-hairline">
                <button
                  onClick={() => setOpenThreadId(isOpen ? null : th.id)}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-start"
                >
                  <div className="flex items-start gap-2">
                    <MessageCircle size={14} className="mt-0.5 shrink-0 text-ink-tertiary" />
                    <div>
                      <p className="text-sm text-ink">{th.title[locale]}</p>
                      <p className="mt-0.5 text-xs text-ink-subtle">{th.author}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge tone="default">
                      {th.replies} {t.community.repliesLabel}
                    </Badge>
                    {isOpen ? <ChevronUp size={14} className="text-ink-tertiary" /> : <ChevronDown size={14} className="text-ink-tertiary" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="flex flex-col gap-2 border-t border-hairline px-3 py-2.5">
                    {threadReplies(th.id, th.author, th.replies, locale).map((reply, i) => (
                      <div key={i} className="rounded-md bg-surface-2 px-3 py-2">
                        <p className="text-xs font-medium text-ink-subtle">
                          {t.community.threadReplyFrom} {reply.author}
                        </p>
                        <p className="mt-1 text-sm text-ink">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {threads.length === 0 && <p className="text-sm text-ink-subtle">{t.community.noThreadsYet}</p>}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink">
            <CalendarClock size={16} className="text-primary" /> {t.community.weeklyChallenges}
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {weekly.map((c) => {
              const joined = profile.joinedChallengeIds.includes(c.id);
              return (
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
                      {(c.participants + (joined ? 1 : 0)).toLocaleString()} {t.community.participants}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleChallengeJoin(c.id)}
                    className={cn(
                      "mt-3 inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-xs font-medium transition-colors",
                      joined
                        ? "border-success/30 bg-success/15 text-success"
                        : "border-hairline text-ink-subtle hover:border-hairline-strong hover:text-ink"
                    )}
                  >
                    {joined ? <Check size={12} /> : <Plus size={12} />}
                    {joined ? t.community.joined : t.community.join}
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink">
            <Trophy size={16} className="text-primary" /> {t.community.monthlyChallenges}
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {monthly.map((c) => {
              const joined = profile.joinedChallengeIds.includes(c.id);
              return (
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
                      {(c.participants + (joined ? 1 : 0)).toLocaleString()} {t.community.participants}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleChallengeJoin(c.id)}
                    className={cn(
                      "mt-3 inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-xs font-medium transition-colors",
                      joined
                        ? "border-success/30 bg-success/15 text-success"
                        : "border-hairline text-ink-subtle hover:border-hairline-strong hover:text-ink"
                    )}
                  >
                    {joined ? <Check size={12} /> : <Plus size={12} />}
                    {joined ? t.community.joined : t.community.join}
                  </button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
