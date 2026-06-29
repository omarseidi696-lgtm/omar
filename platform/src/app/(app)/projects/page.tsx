"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile } from "@/lib/store/profile-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { skills } from "@/lib/data/skills";
import { getProjectsBySkill } from "@/lib/data/projects";
import type { Level } from "@/lib/data/types";

const levels: Level[] = ["beginner", "intermediate", "advanced"];

export default function ProjectsPage() {
  const t = useT();
  const { locale } = useLocale();
  const { profile, submitProject } = useProfile();
  const [activeSkill, setActiveSkill] = useState(skills[0].slug);
  const [activeLevel, setActiveLevel] = useState<Level>("beginner");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const projects = getProjectsBySkill(activeSkill);
  const project = projects.find((p) => p.level === activeLevel);
  const skill = skills.find((s) => s.slug === activeSkill);
  const existingSubmission = project ? profile.projectSubmissions.find((s) => s.projectId === project.id) : undefined;

  async function handleSubmit() {
    if (!project || !skill) return;
    const note = notes[project.id]?.trim();
    if (!note) return;
    setSubmittingId(project.id);
    try {
      const res = await fetch("/api/ai/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillName: skill.name.en,
          level: project.level,
          projectTitle: project.title.en,
          brief: project.brief.en,
          deliverables: project.deliverables.map((d) => d.en),
          note,
          locale,
        }),
      });
      const data = await res.json();
      submitProject({
        projectId: project.id,
        skillSlug: project.skillSlug,
        note,
        feedback: data.feedback,
        submittedAt: new Date().toISOString(),
      });
    } finally {
      setSubmittingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.projects.title}</h1>
        <p className="mt-1 text-sm text-ink-subtle">{t.projects.subtitle}</p>
      </div>

      <Card className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <button
            key={s.slug}
            onClick={() => setActiveSkill(s.slug)}
            className={cn(
              "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
              activeSkill === s.slug
                ? "border-primary bg-primary/15 text-primary"
                : "border-hairline text-ink-subtle hover:border-hairline-strong hover:text-ink"
            )}
          >
            {s.name[locale]}
          </button>
        ))}
      </Card>

      <div className="flex gap-2">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium",
              activeLevel === level ? "bg-surface-3 text-ink" : "text-ink-subtle hover:text-ink"
            )}
          >
            {t.common[level]}
          </button>
        ))}
      </div>

      {project && (
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-ink">{project.title[locale]}</h2>
            <Badge tone="default">{t.common[project.level]}</Badge>
          </div>
          <p className="text-sm text-ink-subtle">{project.brief[locale]}</p>
          <div>
            <p className="text-xs font-medium text-ink-subtle">{t.projects.deliverables}</p>
            <ul className="mt-2 flex flex-col gap-1.5 text-sm text-ink-subtle">
              {project.deliverables.map((d) => (
                <li key={d.en} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-pill bg-ink-tertiary" />
                  {d[locale]}
                </li>
              ))}
            </ul>
          </div>

          <textarea
            value={notes[project.id] ?? existingSubmission?.note ?? ""}
            onChange={(e) => setNotes((prev) => ({ ...prev, [project.id]: e.target.value }))}
            placeholder={t.projects.notePlaceholder}
            rows={4}
            className="w-full resize-none rounded-md border border-hairline bg-surface-2 px-3 py-2.5 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary-focus/50"
          />

          <Button
            onClick={handleSubmit}
            disabled={submittingId === project.id || !(notes[project.id] ?? "").trim()}
            icon={submittingId === project.id ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            className="self-start"
          >
            {submittingId === project.id ? t.projects.submitting : existingSubmission ? t.projects.resubmit : t.projects.submit}
          </Button>

          {existingSubmission?.feedback && (
            <Card className="border-primary/30 bg-primary/5">
              <p className="text-xs font-medium text-primary">{t.projects.feedbackTitle}</p>
              <p className="mt-2 whitespace-pre-line text-sm text-ink-subtle">{existingSubmission.feedback}</p>
            </Card>
          )}
        </Card>
      )}
    </div>
  );
}
