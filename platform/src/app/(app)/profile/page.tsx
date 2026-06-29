"use client";

import { useState } from "react";
import { Award, FileText, ClipboardCheck, Copy, Check, RotateCcw, Star } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile } from "@/lib/store/profile-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/data/courses";
import { projects } from "@/lib/data/projects";

export default function ProfilePage() {
  const t = useT();
  const { locale } = useLocale();
  const { profile, setDisplayName, setGoal, reset } = useProfile();
  const [copied, setCopied] = useState(false);

  const savedCourses = profile.savedCourseIds
    .map((id) => courses.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const dateLocale = locale === "ar" ? "ar" : "en";

  function handleShare() {
    const lines = [
      `${profile.displayName || "—"} — ${profile.goal || "—"}`,
      `Skills: ${profile.skills.join(", ") || "—"}`,
      `Certificates: ${profile.certificates.length}`,
      `Quiz results: ${profile.quizResults.length}`,
      `Completed roadmap modules: ${profile.completedRoadmapModules.length}`,
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleReset() {
    if (window.confirm(t.profile.resetConfirm)) reset();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.profile.title}</h1>
          <p className="mt-1 text-sm text-ink-subtle">{t.profile.subtitle}</p>
        </div>
        <Button onClick={handleShare} variant="secondary" icon={copied ? <Check size={16} /> : <Copy size={16} />}>
          {copied ? t.profile.copied : t.profile.shareProfile}
        </Button>
      </div>

      <Card className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={profile.displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder={t.profile.namePlaceholder}
          className="w-full rounded-md border border-hairline bg-surface-2 px-3 py-2 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary-focus/50 sm:w-56"
        />
        <input
          value={profile.goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder={t.profile.goalPlaceholder}
          className="w-full rounded-md border border-hairline bg-surface-2 px-3 py-2 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary-focus/50"
        />
      </Card>

      <div>
        <div className="flex items-center gap-2">
          <Award size={16} className="text-primary" />
          <h2 className="text-sm font-medium text-ink">{t.profile.certificates}</h2>
        </div>
        {profile.certificates.length > 0 ? (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profile.certificates.map((cert) => (
              <Card key={cert.id} className="flex items-center gap-3 border-primary/30 bg-primary/5">
                <Award size={20} className="shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-ink">{cert.title}</p>
                  <p className="mt-0.5 text-xs text-ink-subtle">
                    {t.profile.issuedOn} {new Date(cert.issuedAt).toLocaleDateString(dateLocale)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-3">
            <p className="text-sm text-ink-subtle">{t.profile.noCertificatesYet}</p>
          </Card>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2">
          <ClipboardCheck size={16} className="text-primary" />
          <h2 className="text-sm font-medium text-ink">{t.profile.quizHistory}</h2>
        </div>
        <Card className="mt-3">
          {profile.quizResults.length > 0 ? (
            <div className="flex flex-col gap-2">
              {profile.quizResults.map((r) => (
                <div key={r.quizId} className="flex items-center justify-between rounded-md border border-hairline px-3 py-2.5">
                  <span className="text-sm text-ink">{r.quizId}</span>
                  <div className="flex items-center gap-2">
                    <Badge tone={r.score / r.total >= 0.7 ? "success" : "warning"}>
                      {r.score}/{r.total}
                    </Badge>
                    <span className="text-xs text-ink-subtle">{new Date(r.takenAt).toLocaleDateString(dateLocale)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-subtle">{t.profile.noQuizzesYet}</p>
          )}
        </Card>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-primary" />
          <h2 className="text-sm font-medium text-ink">{t.profile.projectSubmissions}</h2>
        </div>
        <Card className="mt-3">
          {profile.projectSubmissions.length > 0 ? (
            <div className="flex flex-col gap-3">
              {profile.projectSubmissions.map((sub) => {
                const project = projects.find((p) => p.id === sub.projectId);
                return (
                  <div key={sub.projectId} className="rounded-md border border-hairline p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-ink">{project?.title[locale] ?? sub.projectId}</p>
                      <span className="text-xs text-ink-subtle">{new Date(sub.submittedAt).toLocaleDateString(dateLocale)}</span>
                    </div>
                    {sub.feedback && <p className="mt-2 whitespace-pre-line text-xs text-ink-subtle">{sub.feedback}</p>}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-ink-subtle">{t.profile.noSubmissionsYet}</p>
          )}
        </Card>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Star size={16} className="text-primary" />
          <h2 className="text-sm font-medium text-ink">{t.profile.savedCourses}</h2>
        </div>
        <Card className="mt-3">
          {savedCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {savedCourses.map((course) => (
                <div key={course.id} className="rounded-md border border-hairline p-3">
                  <p className="text-sm font-medium text-ink">{course.title[locale]}</p>
                  <p className="mt-0.5 text-xs text-ink-subtle">{course.provider}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-subtle">{t.profile.noSavedCourses}</p>
          )}
        </Card>
      </div>

      <Button onClick={handleReset} variant="tertiary" icon={<RotateCcw size={16} />} className="self-start text-danger">
        {t.profile.resetProfile}
      </Button>
    </div>
  );
}
