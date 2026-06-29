"use client";

import { useState } from "react";
import { Award, Check, X } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile, type QuizResult, type Certificate } from "@/lib/store/profile-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { skills } from "@/lib/data/skills";
import { getQuizzesBySkill } from "@/lib/data/quizzes";
import type { Level, Quiz } from "@/lib/data/types";

const levels: Level[] = ["beginner", "intermediate", "advanced"];

export default function QuizzesPage() {
  const t = useT();
  const { locale } = useLocale();
  const { profile } = useProfile();
  const [activeSkill, setActiveSkill] = useState(skills[0].slug);
  const [activeLevel, setActiveLevel] = useState<Level>("beginner");

  const skillQuizzes = getQuizzesBySkill(activeSkill);
  const quiz = skillQuizzes.find((q) => q.level === activeLevel);
  const skill = skills.find((s) => s.slug === activeSkill);
  const existingResult = quiz ? profile.quizResults.find((r) => r.quizId === quiz.id) : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.quizzes.title}</h1>
        <p className="mt-1 text-sm text-ink-subtle">{t.quizzes.subtitle}</p>
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

      {quiz && skill ? (
        <QuizRunner key={quiz.id} quiz={quiz} skillName={skill.name[locale]} existingResult={existingResult} />
      ) : (
        <Card>
          <p className="text-sm text-ink-subtle">{t.quizzes.noQuiz}</p>
        </Card>
      )}
    </div>
  );
}

function QuizRunner({
  quiz,
  skillName,
  existingResult,
}: {
  quiz: Quiz;
  skillName: string;
  existingResult?: QuizResult;
}) {
  const t = useT();
  const { locale } = useLocale();
  const { recordQuizResult } = useProfile();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = quiz.questions.length;
  const allAnswered = quiz.questions.every((_, i) => answers[i] !== undefined);
  const score = quiz.questions.reduce((acc, q, i) => acc + (answers[i] === q.answerIndex ? 1 : 0), 0);
  const passed = submitted && score / total >= 0.7;

  function handleSubmit() {
    if (!allAnswered) return;
    setSubmitted(true);
    const didPass = score / total >= 0.7;
    const result: QuizResult = { quizId: quiz.id, skillSlug: quiz.skillSlug, score, total, takenAt: new Date().toISOString() };
    const certificate: Certificate | undefined = didPass
      ? { id: `cert-${quiz.id}`, title: `${skillName} — ${t.common[quiz.level]}`, skillSlug: quiz.skillSlug, issuedAt: new Date().toISOString() }
      : undefined;
    recordQuizResult(result, certificate);
  }

  function handleRetake() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <Card className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-ink">{quiz.title[locale]}</h2>
        <Badge tone="default">{t.common[quiz.level]}</Badge>
      </div>

      {existingResult && !submitted && (
        <Card className="flex items-center justify-between bg-surface-2">
          <span className="text-xs text-ink-subtle">{t.quizzes.previousAttempt}</span>
          <span className="text-sm font-medium text-ink">
            {existingResult.score}/{existingResult.total}
          </span>
        </Card>
      )}

      {!submitted ? (
        <>
          <div className="flex flex-col gap-5">
            {quiz.questions.map((q, qi) => (
              <div key={qi}>
                <p className="text-sm font-medium text-ink">
                  {t.quizzes.question} {qi + 1} {t.quizzes.of} {total} — {q.question[locale]}
                </p>
                <div className="mt-2 flex flex-col gap-2">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => setAnswers((prev) => ({ ...prev, [qi]: oi }))}
                      className={cn(
                        "flex items-center gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors rtl:text-right",
                        answers[qi] === oi
                          ? "border-primary/30 bg-primary/10 text-ink"
                          : "border-hairline text-ink-subtle hover:border-hairline-strong hover:text-ink"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-pill border",
                          answers[qi] === oi ? "border-primary bg-primary text-on-primary" : "border-hairline-strong"
                        )}
                      >
                        {answers[qi] === oi && <Check size={12} />}
                      </span>
                      {opt[locale]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2">
            <Button onClick={handleSubmit} disabled={!allAnswered}>
              {t.quizzes.submit}
            </Button>
            {!allAnswered && <p className="text-xs text-ink-tertiary">{t.quizzes.answerAllPrompt}</p>}
          </div>
        </>
      ) : (
        <>
          <Card className={cn(passed ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5")}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink">{t.quizzes.yourScore}</span>
              <span className="text-lg font-semibold text-ink">
                {score}/{total}
              </span>
            </div>
            <p className={cn("mt-1 text-sm", passed ? "text-success" : "text-warning")}>
              {passed ? t.quizzes.passed : t.quizzes.notPassed}
            </p>
          </Card>

          {passed && (
            <Card className="flex items-center gap-3 border-primary/30 bg-primary/5">
              <Award size={20} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-primary">{t.quizzes.certificateEarned}</p>
                <p className="mt-0.5 text-xs text-ink-subtle">{t.quizzes.certificateDesc}</p>
              </div>
            </Card>
          )}

          <div>
            <p className="text-xs font-medium text-ink-subtle">{t.quizzes.reviewTitle}</p>
            <div className="mt-2 flex flex-col gap-3">
              {quiz.questions.map((q, qi) => {
                const correct = answers[qi] === q.answerIndex;
                return (
                  <div key={qi} className="rounded-md border border-hairline p-3">
                    <div className="flex items-start gap-2">
                      {correct ? (
                        <Check size={16} className="mt-0.5 shrink-0 text-success" />
                      ) : (
                        <X size={16} className="mt-0.5 shrink-0 text-danger" />
                      )}
                      <p className="text-sm text-ink">{q.question[locale]}</p>
                    </div>
                    {!correct && (
                      <div className="mt-2 flex flex-col gap-1 ps-6 text-xs">
                        <p className="text-danger">
                          {t.quizzes.yourAnswer}: {q.options[answers[qi]]?.[locale] ?? "—"}
                        </p>
                        <p className="text-success">
                          {t.quizzes.correctAnswer}: {q.options[q.answerIndex][locale]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Button variant="secondary" onClick={handleRetake} className="self-start">
            {t.quizzes.retake}
          </Button>
        </>
      )}
    </Card>
  );
}
