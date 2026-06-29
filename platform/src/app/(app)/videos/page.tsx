"use client";

import { useMemo, useState } from "react";
import { PlayCircle, Star, Clock } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { Card, CardHover } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { videos } from "@/lib/data/videos";
import { skills } from "@/lib/data/skills";
import type { Level } from "@/lib/data/types";

const levels: Level[] = ["beginner", "intermediate", "advanced"];

export default function VideosPage() {
  const t = useT();
  const { locale } = useLocale();
  const [activeSkill, setActiveSkill] = useState<string>("all");
  const [activeLevel, setActiveLevel] = useState<"all" | Level>("all");

  const topPickIds = useMemo(() => {
    const ids = new Set<string>();
    for (const skill of skills) {
      for (const level of levels) {
        const top = videos
          .filter((v) => v.skillSlug === skill.slug && v.level === level)
          .sort((a, b) => b.rating - a.rating)[0];
        if (top) ids.add(top.id);
      }
    }
    return ids;
  }, []);

  const filtered = useMemo(
    () =>
      videos
        .filter((v) => activeSkill === "all" || v.skillSlug === activeSkill)
        .filter((v) => activeLevel === "all" || v.level === activeLevel)
        .sort((a, b) => b.rating - a.rating),
    [activeSkill, activeLevel]
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.videos.title}</h1>
        <p className="mt-1 text-sm text-ink-subtle">{t.videos.subtitle}</p>
      </div>

      <Card className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSkill("all")}
            className={cn(
              "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
              activeSkill === "all"
                ? "border-primary bg-primary/15 text-primary"
                : "border-hairline text-ink-subtle hover:border-hairline-strong hover:text-ink"
            )}
          >
            {t.videos.allSkills}
          </button>
          {skills.map((skill) => (
            <button
              key={skill.slug}
              onClick={() => setActiveSkill(skill.slug)}
              className={cn(
                "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
                activeSkill === skill.slug
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-hairline text-ink-subtle hover:border-hairline-strong hover:text-ink"
              )}
            >
              {skill.name[locale]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveLevel("all")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium",
              activeLevel === "all" ? "bg-surface-3 text-ink" : "text-ink-subtle hover:text-ink"
            )}
          >
            {t.common.all}
          </button>
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium",
                activeLevel === level ? "bg-surface-3 text-ink" : "text-ink-subtle hover:text-ink"
              )}
            >
              {t.common[level]}
            </button>
          ))}
        </div>
      </Card>

      <p className="text-sm text-ink-subtle">
        {filtered.length} {t.common.results}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video) => (
            <CardHover key={video.id} className="flex flex-col gap-3">
              <div className="flex aspect-video items-center justify-center rounded-md bg-surface-3 text-ink-tertiary">
                <PlayCircle size={32} strokeWidth={1.5} />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Badge tone="default">{t.common[video.level]}</Badge>
                {topPickIds.has(video.id) && <Badge tone="primary">{t.videos.topPick}</Badge>}
              </div>
              <h3 className="text-sm font-medium text-ink">{video.title[locale]}</h3>
              <p className="text-xs text-ink-subtle">{video.channel}</p>
              <div className="mt-auto flex items-center gap-3 text-xs text-ink-subtle">
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="text-warning" /> {video.rating}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} /> {video.durationMinutes} {t.common.minutes}
                </span>
              </div>
            </CardHover>
          ))}
        </div>
      ) : (
        <Card className="py-12 text-center text-sm text-ink-subtle">{t.common.noResults}</Card>
      )}
    </div>
  );
}
