"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Award, Clock, Layers, Target, ArrowRight, Plus, X } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile } from "@/lib/store/profile-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/lib/data/skills";
import { getRoadmap } from "@/lib/data/roadmaps";
import { jobs, computeMatch } from "@/lib/data/jobs";
import type { Level } from "@/lib/data/types";

const levelOrder: Level[] = ["beginner", "intermediate", "advanced", "professional", "expert"];

function levelReached(skillSlug: string, completedModuleIds: string[]): Level | null {
  const roadmap = getRoadmap(skillSlug);
  if (!roadmap) return null;
  let reached: Level | null = null;
  for (const level of levelOrder) {
    const moduleIds = roadmap.modules.filter((m) => m.level === level).map((m) => m.id);
    const allDone = moduleIds.length > 0 && moduleIds.every((id) => completedModuleIds.includes(id));
    if (allDone) reached = level;
    else break;
  }
  return reached;
}

export default function DashboardPage() {
  const t = useT();
  const { locale } = useLocale();
  const { profile, addSkill, removeSkill, setDisplayName, setGoal } = useProfile();

  const matchedSkills = useMemo(
    () =>
      profile.skills
        .map((name) => skills.find((s) => s.name.en.toLowerCase() === name.toLowerCase()))
        .filter((s): s is NonNullable<typeof s> => Boolean(s)),
    [profile.skills]
  );

  const suggestedSkills = useMemo(
    () =>
      skills
        .filter((s) => !profile.skills.some((name) => name.toLowerCase() === s.name.en.toLowerCase()))
        .slice(0, 4),
    [profile.skills]
  );

  const chartData = useMemo(
    () =>
      matchedSkills.map((skill) => {
        const roadmap = getRoadmap(skill.slug);
        const total = roadmap?.modules.length ?? 0;
        const done = roadmap?.modules.filter((m) => profile.completedRoadmapModules.includes(m.id)).length ?? 0;
        return {
          name: skill.name[locale],
          progress: total > 0 ? Math.round((done / total) * 100) : 0,
        };
      }),
    [matchedSkills, profile.completedRoadmapModules, locale]
  );

  const overallLevel = useMemo<Level>(() => {
    let best: Level = "beginner";
    for (const skill of matchedSkills) {
      const reached = levelReached(skill.slug, profile.completedRoadmapModules);
      if (reached && levelOrder.indexOf(reached) > levelOrder.indexOf(best)) best = reached;
    }
    return best;
  }, [matchedSkills, profile.completedRoadmapModules]);

  const recommendedJobs = useMemo(
    () =>
      jobs
        .map((job) => ({ job, match: computeMatch(job, profile.skills) }))
        .filter((j) => j.match > 0)
        .sort((a, b) => b.match - a.match)
        .slice(0, 3),
    [profile.skills]
  );

  const hoursInvested = Math.round(profile.completedRoadmapModules.length * 1.5 + profile.quizResults.length * 0.5);

  const stats = [
    { label: t.dashboard.statSkills, value: profile.skills.length, icon: Target },
    { label: t.dashboard.statCertificates, value: profile.certificates.length, icon: Award },
    { label: t.dashboard.statModules, value: profile.completedRoadmapModules.length, icon: Layers },
    { label: t.dashboard.statHours, value: hoursInvested, icon: Clock },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.dashboard.title}</h1>
          <p className="mt-1 text-sm text-ink-subtle">
            {t.dashboard.greeting}
            {profile.displayName ? `, ${profile.displayName}` : ""}
          </p>
        </div>
        <Badge tone="primary" className="self-start sm:self-auto">
          {t.dashboard.level}: {t.common[overallLevel]}
        </Badge>
      </div>

      {/* Profile quick edit */}
      <Card className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={profile.displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder={t.dashboard.namePlaceholder}
          className="w-full rounded-md border border-hairline bg-surface-2 px-3 py-2 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary-focus/50 sm:w-56"
        />
        <input
          value={profile.goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder={t.dashboard.goalPlaceholder}
          className="w-full rounded-md border border-hairline bg-surface-2 px-3 py-2 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary-focus/50"
        />
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="flex flex-col gap-2">
              <Icon size={18} className="text-primary" />
              <span className="text-2xl font-semibold text-ink">{stat.value}</span>
              <span className="text-xs text-ink-subtle">{stat.label}</span>
            </Card>
          );
        })}
      </div>

      {/* Skills */}
      <Card>
        <h2 className="text-sm font-medium text-ink">{t.dashboard.currentSkills}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <Badge key={skill} tone="primary" className="gap-1.5">
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                aria-label={t.dashboard.removeSkill}
                className="text-primary/70 hover:text-primary"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
          {profile.skills.length === 0 && <span className="text-sm text-ink-subtle">—</span>}
        </div>

        <h2 className="mt-5 text-sm font-medium text-ink">{t.dashboard.suggestedSkills}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestedSkills.map((skill) => (
            <button
              key={skill.slug}
              onClick={() => addSkill(skill.name.en)}
              className="inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-subtle transition-colors hover:border-hairline-strong hover:text-ink"
            >
              <Plus size={12} />
              {skill.name[locale]}
            </button>
          ))}
        </div>
      </Card>

      {/* Progress chart */}
      <Card>
        <h2 className="text-sm font-medium text-ink">{t.dashboard.progressTitle}</h2>
        <p className="mt-1 text-xs text-ink-subtle">{t.dashboard.progressSubtitle}</p>
        {chartData.length > 0 ? (
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-hairline)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-ink-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="var(--color-ink-tertiary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-surface-2)" }}
                  contentStyle={{
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-hairline)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(value) => [`${value}%`, t.dashboard.progressTitle]}
                />
                <Bar dataKey="progress" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-6 text-sm text-ink-subtle">{t.dashboard.noProgressYet}</p>
        )}
        <Link href="/roadmap" className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
          {t.dashboard.viewRoadmap}
          <ArrowRight size={14} className="rtl:rotate-180" />
        </Link>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recommended jobs */}
        <Card>
          <h2 className="text-sm font-medium text-ink">{t.dashboard.recommendedJobs}</h2>
          <div className="mt-3 flex flex-col gap-3">
            {recommendedJobs.map(({ job, match }) => (
              <Link
                key={job.id}
                href="/jobs"
                className="flex items-center justify-between rounded-md border border-hairline px-3 py-2.5 transition-colors hover:border-hairline-strong hover:bg-surface-2"
              >
                <div>
                  <div className="text-sm font-medium text-ink">{job.title[locale]}</div>
                  <div className="text-xs text-ink-subtle">{job.company}</div>
                </div>
                <Badge tone="success">
                  {match}% {t.dashboard.matchLabel}
                </Badge>
              </Link>
            ))}
            {recommendedJobs.length === 0 && <p className="text-sm text-ink-subtle">{t.common.noResults}</p>}
          </div>
          <Link href="/jobs" className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
            {t.dashboard.viewJobs}
            <ArrowRight size={14} className="rtl:rotate-180" />
          </Link>
        </Card>

        {/* Recent quizzes */}
        <Card>
          <h2 className="text-sm font-medium text-ink">{t.dashboard.recentQuizzes}</h2>
          <div className="mt-3 flex flex-col gap-3">
            {profile.quizResults
              .slice()
              .reverse()
              .slice(0, 5)
              .map((result) => (
                <div key={result.quizId} className="flex items-center justify-between rounded-md border border-hairline px-3 py-2.5">
                  <span className="text-sm text-ink">{result.skillSlug}</span>
                  <Badge tone={result.score / result.total >= 0.6 ? "success" : "warning"}>
                    {result.score}/{result.total}
                  </Badge>
                </div>
              ))}
            {profile.quizResults.length === 0 && <p className="text-sm text-ink-subtle">{t.dashboard.noQuizzesYet}</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
