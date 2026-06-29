"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Plus } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile } from "@/lib/store/profile-store";
import { getDomain } from "@/lib/data/domains";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DomainDetailPage({ params }: { params: Promise<{ domainSlug: string }> }) {
  const { domainSlug } = use(params);
  const domain = getDomain(domainSlug);
  const t = useT();
  const { locale } = useLocale();
  const { profile, addSkill } = useProfile();

  const gaps = useMemo(() => {
    if (!domain) return [];
    return domain.topSkills.filter(
      (skill) => !profile.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
    );
  }, [domain, profile.skills]);

  if (!domain) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Link href="/skills" className="inline-flex items-center gap-1.5 text-sm text-ink-subtle hover:text-ink">
        <ArrowRight size={14} className="rotate-180 rtl:rotate-0" />
        {t.skillsPage.backToFields}
      </Link>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{domain.name[locale]}</h1>
        <p className="mt-1 text-sm text-ink-subtle">{domain.description[locale]}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-xs text-ink-subtle">{t.skillsPage.avgSalary}</p>
          <p className="mt-2 text-lg font-semibold text-ink">
            ${domain.avgSalaryUsd[0].toLocaleString()} – ${domain.avgSalaryUsd[1].toLocaleString()}
          </p>
        </Card>
        <Card className="sm:col-span-1 lg:col-span-3">
          <p className="text-xs text-ink-subtle">{t.skillsPage.topSkills}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {domain.topSkills.map((skill) => (
              <Badge key={skill} tone="default">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-sm font-medium text-ink">{t.skillsPage.mostDemanded}</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={domain.mostDemandedSkills} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-hairline)" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                stroke="var(--color-ink-tertiary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="skill"
                stroke="var(--color-ink-tertiary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={140}
              />
              <Tooltip
                cursor={{ fill: "var(--color-surface-2)" }}
                contentStyle={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-hairline)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(value) => [`${value}%`, t.skillsPage.mostDemanded]}
              />
              <Bar dataKey="demandPercent" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="text-sm font-medium text-ink">{t.skillsPage.software}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {domain.software.map((tool) => (
              <Badge key={tool} tone="default">
                {tool}
              </Badge>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-sm font-medium text-ink">{t.skillsPage.certifications}</h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-subtle">
            {domain.certifications.map((cert) => (
              <li key={cert.en}>{cert[locale]}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-sm font-medium text-ink">{t.skillsPage.relatedJobs}</h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-subtle">
            {domain.relatedJobTitles.map((job) => (
              <li key={job.en}>{job[locale]}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-sm font-medium text-ink">{t.skillsPage.yourGaps}</h2>
          {gaps.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {gaps.map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-subtle transition-colors hover:border-hairline-strong hover:text-ink"
                >
                  <Plus size={12} />
                  {skill}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-ink-subtle">{t.skillsPage.noGaps}</p>
          )}
        </Card>
      </div>
    </div>
  );
}
