"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Wifi, Banknote, X } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile } from "@/lib/store/profile-store";
import { CardHover, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaggerGrid, StaggerItem } from "@/components/ui/motion";
import { domains } from "@/lib/data/domains";
import { jobs, computeMatch } from "@/lib/data/jobs";
import type { Level } from "@/lib/data/types";

const levels: Level[] = ["beginner", "intermediate", "advanced", "professional", "expert"];
type SortKey = "match" | "salary";

export default function JobsPage() {
  const t = useT();
  const { locale } = useLocale();
  const { profile } = useProfile();

  const [search, setSearch] = useState("");
  const [domainSlug, setDomainSlug] = useState("all");
  const [level, setLevel] = useState<"all" | Level>("all");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("match");

  const filtered = useMemo(() => {
    const result = jobs
      .filter((j) => {
        if (
          search &&
          !j.title.en.toLowerCase().includes(search.toLowerCase()) &&
          !j.title.ar.includes(search) &&
          !j.company.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        if (domainSlug !== "all" && j.domainSlug !== domainSlug) return false;
        if (level !== "all" && j.level !== level) return false;
        if (remoteOnly && !j.remote) return false;
        return true;
      })
      .map((job) => ({ job, match: computeMatch(job, profile.skills) }));

    result.sort((a, b) => {
      if (sortBy === "match") return b.match - a.match;
      return b.job.salaryRange[1] - a.job.salaryRange[1];
    });

    return result;
  }, [search, domainSlug, level, remoteOnly, sortBy, profile.skills]);

  const clearFilters = () => {
    setSearch("");
    setDomainSlug("all");
    setLevel("all");
    setRemoteOnly(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.jobs.title}</h1>
        <p className="mt-1 text-sm text-ink-subtle">{t.jobs.subtitle}</p>
      </div>

      <Card className="flex flex-col gap-4">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-tertiary ltr:left-3 rtl:right-3" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.jobs.searchPlaceholder}
            className="w-full rounded-md border border-hairline bg-surface-2 px-9 py-2 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary-focus/50"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <select value={domainSlug} onChange={(e) => setDomainSlug(e.target.value)} className="select-field">
            <option value="all">{t.common.field}: {t.common.all}</option>
            {domains.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name[locale]}
              </option>
            ))}
          </select>
          <select value={level} onChange={(e) => setLevel(e.target.value as "all" | Level)} className="select-field">
            <option value="all">{t.common.difficulty}: {t.common.all}</option>
            {levels.map((l) => (
              <option key={l} value={l}>
                {t.common[l]}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)} className="select-field">
            <option value="match">{t.jobs.sortMatch}</option>
            <option value="salary">{t.jobs.sortSalary}</option>
          </select>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-ink-subtle">
              <input type="checkbox" checked={remoteOnly} onChange={(e) => setRemoteOnly(e.target.checked)} />
              {t.jobs.remoteOnly}
            </label>
            <button onClick={clearFilters} className="inline-flex items-center gap-1 text-sm text-ink-subtle hover:text-ink">
              <X size={14} />
              {t.common.clearFilters}
            </button>
          </div>
        </div>
      </Card>

      <p className="text-sm text-ink-subtle">
        {filtered.length} {t.common.results}
      </p>

      {filtered.length > 0 ? (
        <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ job, match }) => (
            <StaggerItem key={job.id}>
            <Link href={`/jobs/${job.id}`} className="block">
              <CardHover className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge tone="default">{domains.find((d) => d.slug === job.domainSlug)?.name[locale]}</Badge>
                  <Badge tone={match >= 60 ? "success" : match >= 30 ? "warning" : "default"}>{match}%</Badge>
                </div>
                <h3 className="font-medium text-ink">{job.title[locale]}</h3>
                <p className="text-xs text-ink-subtle">{job.company}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-ink-subtle">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} /> {job.location[locale]}
                  </span>
                  {job.remote && (
                    <span className="inline-flex items-center gap-1 text-primary">
                      <Wifi size={12} /> {t.jobs.remote}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {job.requiredSkills.map((s) => (
                    <Badge key={s} tone="default" className="text-[11px]">
                      {s}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-ink">
                    <Banknote size={14} className="text-ink-subtle" />
                    ${job.salaryRange[0].toLocaleString()}–${job.salaryRange[1].toLocaleString()}
                  </span>
                  <Badge tone="default">{t.common[job.level]}</Badge>
                </div>
              </CardHover>
            </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      ) : (
        <Card className="py-12 text-center text-sm text-ink-subtle">{t.common.noResults}</Card>
      )}
    </div>
  );
}
