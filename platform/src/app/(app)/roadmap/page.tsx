"use client";

import { useMemo, useState } from "react";
import { Check, Award } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile } from "@/lib/store/profile-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";
import { skills } from "@/lib/data/skills";
import { getRoadmap } from "@/lib/data/roadmaps";
import type { Level } from "@/lib/data/types";

const levels: Level[] = ["beginner", "intermediate", "advanced", "professional", "expert"];

export default function RoadmapPage() {
  const t = useT();
  const { locale } = useLocale();
  const { profile, toggleModule } = useProfile();
  const [activeSkill, setActiveSkill] = useState(skills[0].slug);

  const roadmap = getRoadmap(activeSkill);

  const overallProgress = useMemo(() => {
    if (!roadmap) return 0;
    const done = roadmap.modules.filter((m) => profile.completedRoadmapModules.includes(m.id)).length;
    return Math.round((done / roadmap.modules.length) * 100);
  }, [roadmap, profile.completedRoadmapModules]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.roadmap.title}</h1>
        <p className="mt-1 text-sm text-ink-subtle">{t.roadmap.subtitle}</p>
      </div>

      <Card className="flex flex-wrap gap-2">
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
      </Card>

      {roadmap && (
        <>
          <Card>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-ink">{t.roadmap.overallProgress}</span>
              <span className="text-ink-subtle">{overallProgress}%</span>
            </div>
            <ProgressBar value={overallProgress} className="mt-3" />
          </Card>

          <div className="flex flex-col gap-4">
            {levels.map((level) => {
              const modules = roadmap.modules.filter((m) => m.level === level);
              const doneCount = modules.filter((m) => profile.completedRoadmapModules.includes(m.id)).length;
              const isComplete = doneCount === modules.length;
              return (
                <Card key={level}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-medium text-ink">{t.common[level]}</h2>
                      {isComplete && (
                        <Badge tone="success" className="gap-1">
                          <Award size={12} />
                          {t.roadmap.levelComplete}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-ink-subtle">
                      {doneCount}/{modules.length}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    {modules.map((module) => {
                      const done = profile.completedRoadmapModules.includes(module.id);
                      return (
                        <button
                          key={module.id}
                          onClick={() => toggleModule(module.id)}
                          className={cn(
                            "flex items-center gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors rtl:text-right",
                            done
                              ? "border-primary/30 bg-primary/10 text-ink"
                              : "border-hairline text-ink-subtle hover:border-hairline-strong hover:text-ink"
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-5 shrink-0 items-center justify-center rounded-pill border",
                              done ? "border-primary bg-primary text-on-primary" : "border-hairline-strong"
                            )}
                          >
                            {done && <Check size={12} />}
                          </span>
                          {module.title[locale]}
                        </button>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
