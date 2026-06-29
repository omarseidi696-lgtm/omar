"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles, Star, Users, Clock, Award, Search, X } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile } from "@/lib/store/profile-store";
import { Card, CardHover } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaggerGrid, StaggerItem } from "@/components/ui/motion";
import { courses } from "@/lib/data/courses";
import { domains } from "@/lib/data/domains";
import { skills } from "@/lib/data/skills";
import type { Course, Level } from "@/lib/data/types";

const levels: Level[] = ["beginner", "intermediate", "advanced", "professional", "expert"];
const providers = Array.from(new Set(courses.map((c) => c.provider))).sort();
type PriceFilter = "all" | "free" | "paid";
type SortKey = "rating" | "students" | "priceLow" | "priceHigh";
type DurationBucket = "all" | "short" | "medium" | "long";

function CourseCard({ course, saved, onToggleSave }: { course: Course; saved: boolean; onToggleSave: () => void }) {
  const t = useT();
  const { locale } = useLocale();
  return (
    <Link href={`/courses/${course.id}`} className="block">
      <CardHover className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <Badge tone="default">{domains.find((d) => d.slug === course.domainSlug)?.name[locale]}</Badge>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSave();
            }}
            aria-label={t.common.save}
            className={saved ? "text-primary" : "text-ink-tertiary hover:text-ink"}
          >
            <Star size={16} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
        <h3 className="font-medium text-ink">{course.title[locale]}</h3>
        <p className="text-xs text-ink-subtle">{course.provider}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-ink-subtle">
          <span className="inline-flex items-center gap-1">
            <Star size={12} className="text-warning" /> {course.rating}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users size={12} /> {course.students.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {course.durationHours} {t.common.hours}
          </span>
          {course.hasCertificate && (
            <span className="inline-flex items-center gap-1 text-primary">
              <Award size={12} /> {t.common.certificate}
            </span>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-semibold text-ink">{course.price === 0 ? t.common.free : `$${course.price}`}</span>
          <Badge tone="default">{t.common[course.level]}</Badge>
        </div>
      </CardHover>
    </Link>
  );
}

export default function CoursesPage() {
  const t = useT();
  const { locale } = useLocale();
  const { profile, toggleSavedCourse } = useProfile();

  const [search, setSearch] = useState("");
  const [domainSlug, setDomainSlug] = useState("all");
  const [level, setLevel] = useState<"all" | Level>("all");
  const [language, setLanguage] = useState<"all" | Course["language"]>("all");
  const [provider, setProvider] = useState("all");
  const [price, setPrice] = useState<PriceFilter>("all");
  const [duration, setDuration] = useState<DurationBucket>("all");
  const [certOnly, setCertOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("rating");

  const matchedDomainSlugs = useMemo(
    () =>
      new Set(
        profile.skills
          .map((name) => skills.find((s) => s.name.en.toLowerCase() === name.toLowerCase())?.domainSlug)
          .filter((s): s is string => Boolean(s))
      ),
    [profile.skills]
  );

  const recommended = useMemo(
    () =>
      courses
        .filter((c) => matchedDomainSlugs.has(c.domainSlug))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3),
    [matchedDomainSlugs]
  );

  const filtered = useMemo(() => {
    let result = courses.filter((c) => {
      if (search && !c.title.en.toLowerCase().includes(search.toLowerCase()) && !c.title.ar.includes(search)) return false;
      if (domainSlug !== "all" && c.domainSlug !== domainSlug) return false;
      if (level !== "all" && c.level !== level) return false;
      if (language !== "all" && c.language !== language) return false;
      if (provider !== "all" && c.provider !== provider) return false;
      if (price === "free" && c.price !== 0) return false;
      if (price === "paid" && c.price === 0) return false;
      if (certOnly && !c.hasCertificate) return false;
      if (duration === "short" && c.durationHours >= 5) return false;
      if (duration === "medium" && (c.durationHours < 5 || c.durationHours > 15)) return false;
      if (duration === "long" && c.durationHours <= 15) return false;
      return true;
    });

    result = result.slice().sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "students") return b.students - a.students;
      if (sortBy === "priceLow") return a.price - b.price;
      return b.price - a.price;
    });

    return result;
  }, [search, domainSlug, level, language, provider, price, certOnly, duration, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setDomainSlug("all");
    setLevel("all");
    setLanguage("all");
    setProvider("all");
    setPrice("all");
    setDuration("all");
    setCertOnly(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.courses.title}</h1>
        <p className="mt-1 text-sm text-ink-subtle">{t.courses.subtitle}</p>
      </div>

      {recommended.length > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles size={16} />
            <h2 className="text-sm font-medium">{t.courses.recommendedTitle}</h2>
          </div>
          <p className="mt-1 text-xs text-ink-subtle">{t.courses.recommendedSubtitle}</p>
          <StaggerGrid className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {recommended.map((course) => (
              <StaggerItem key={course.id}>
                <CourseCard
                  course={course}
                  saved={profile.savedCourseIds.includes(course.id)}
                  onToggleSave={() => toggleSavedCourse(course.id)}
                />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Card>
      )}

      {/* Filters */}
      <Card className="flex flex-col gap-4">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-tertiary ltr:left-3 rtl:right-3" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.courses.searchPlaceholder}
            className="w-full rounded-md border border-hairline bg-surface-2 px-9 py-2 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary-focus/50"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
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
          <select value={language} onChange={(e) => setLanguage(e.target.value as "all" | Course["language"])} className="select-field">
            <option value="all">{t.common.language}: {t.common.all}</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="multi">Multi</option>
          </select>
          <select value={provider} onChange={(e) => setProvider(e.target.value)} className="select-field">
            <option value="all">{t.common.provider}: {t.common.all}</option>
            {providers.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select value={price} onChange={(e) => setPrice(e.target.value as PriceFilter)} className="select-field">
            <option value="all">{t.common.price}: {t.common.all}</option>
            <option value="free">{t.common.free}</option>
            <option value="paid">{t.common.paid}</option>
          </select>
          <select value={duration} onChange={(e) => setDuration(e.target.value as DurationBucket)} className="select-field">
            <option value="all">{t.courses.durationAll}</option>
            <option value="short">{t.courses.durationShort}</option>
            <option value="medium">{t.courses.durationMedium}</option>
            <option value="long">{t.courses.durationLong}</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-ink-subtle">
              <input type="checkbox" checked={certOnly} onChange={(e) => setCertOnly(e.target.checked)} />
              {t.courses.certificateOnly}
            </label>
            <button onClick={clearFilters} className="inline-flex items-center gap-1 text-sm text-ink-subtle hover:text-ink">
              <X size={14} />
              {t.common.clearFilters}
            </button>
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)} className="select-field">
            <option value="rating">{t.courses.sortRating}</option>
            <option value="students">{t.courses.sortStudents}</option>
            <option value="priceLow">{t.courses.sortPriceLow}</option>
            <option value="priceHigh">{t.courses.sortPriceHigh}</option>
          </select>
        </div>
      </Card>

      <p className="text-sm text-ink-subtle">
        {filtered.length} {t.common.results}
      </p>

      {filtered.length > 0 ? (
        <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <StaggerItem key={course.id}>
              <CourseCard
                course={course}
                saved={profile.savedCourseIds.includes(course.id)}
                onToggleSave={() => toggleSavedCourse(course.id)}
              />
            </StaggerItem>
          ))}
        </StaggerGrid>
      ) : (
        <Card className="py-12 text-center text-sm text-ink-subtle">{t.common.noResults}</Card>
      )}
    </div>
  );
}
