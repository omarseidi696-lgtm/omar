"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Wifi, Banknote, ExternalLink, CheckCircle2 } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile } from "@/lib/store/profile-store";
import { getJob, getJobApplyUrl, computeMatch } from "@/lib/data/jobs";
import { domains } from "@/lib/data/domains";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = getJob(id);
  const t = useT();
  const { locale } = useLocale();
  const { profile, applyToJob } = useProfile();

  if (!job) notFound();

  const domain = domains.find((d) => d.slug === job.domainSlug);
  const match = computeMatch(job, profile.skills);
  const isApplied = profile.appliedJobIds.includes(job.id);
  const applyUrl = getJobApplyUrl(job);

  const handleApply = () => {
    applyToJob(job.id);
    window.open(applyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col gap-6">
      <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm text-ink-subtle hover:text-ink">
        <ArrowRight size={14} className="rotate-180 rtl:rotate-0" />
        {t.jobs.backToJobs}
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {domain && <Badge tone="default">{domain.name[locale]}</Badge>}
          <Badge tone={match >= 60 ? "success" : match >= 30 ? "warning" : "default"}>
            {match}% {t.dashboard.matchLabel}
          </Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{job.title[locale]}</h1>
        <p className="text-sm text-ink-subtle">{job.company}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-ink-subtle">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} /> {job.location[locale]}
          </span>
          {job.remote && (
            <span className="inline-flex items-center gap-1.5 text-primary">
              <Wifi size={14} /> {t.jobs.remote}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Banknote size={14} />
            ${job.salaryRange[0].toLocaleString()}–${job.salaryRange[1].toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card>
            <h2 className="text-sm font-medium text-ink">{t.jobs.overview}</h2>
            <p className="mt-2 text-sm text-ink-subtle">
              {job.title[locale]} — {job.company}. {t.common[job.level]}.
            </p>
          </Card>
          <Card>
            <h2 className="text-sm font-medium text-ink">{t.jobs.requiredSkills}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {job.requiredSkills.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-sm text-ink-subtle">
                  <CheckCircle2 size={14} className="text-primary" />
                  {skill}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="flex flex-col gap-4">
          <span className="text-lg font-semibold text-ink">
            ${job.salaryRange[0].toLocaleString()}–${job.salaryRange[1].toLocaleString()}
          </span>

          {isApplied ? (
            <div className="flex flex-col gap-2">
              <Badge tone="success">{t.jobs.applied}</Badge>
              <p className="text-xs text-ink-subtle">{t.jobs.appliedNote}</p>
              <Button href={applyUrl} target="_blank" rel="noopener noreferrer" variant="secondary" className="w-full" icon={<ExternalLink size={16} />}>
                {t.jobs.applyNow}
              </Button>
            </div>
          ) : (
            <Button onClick={handleApply} className="w-full" icon={<ExternalLink size={16} />}>
              {t.jobs.applyNow}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
