"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Star, Users, Clock, Award, ExternalLink, CheckCircle2 } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile } from "@/lib/store/profile-store";
import { getCourse, getProviderUrl } from "@/lib/data/courses";
import { domains } from "@/lib/data/domains";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = getCourse(id);
  const t = useT();
  const { locale } = useLocale();
  const { profile, enrollCourse } = useProfile();

  if (!course) notFound();

  const domain = domains.find((d) => d.slug === course.domainSlug);
  const isEnrolled = profile.enrolledCourseIds.includes(course.id);
  const providerUrl = getProviderUrl(course);

  const handleEnroll = () => {
    enrollCourse(course.id);
    if (providerUrl) {
      window.open(providerUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm text-ink-subtle hover:text-ink">
        <ArrowRight size={14} className="rotate-180 rtl:rotate-0" />
        {t.courses.backToCourses}
      </Link>

      <div className="flex flex-col gap-3">
        {domain && <Badge tone="default">{domain.name[locale]}</Badge>}
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{course.title[locale]}</h1>
        <p className="text-sm text-ink-subtle">{course.provider}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-ink-subtle">
          <span className="inline-flex items-center gap-1.5">
            <Star size={14} className="text-warning" /> {course.rating} {t.common.rating}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users size={14} /> {course.students.toLocaleString()} {t.common.students}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} /> {course.durationHours} {t.common.hours}
          </span>
          {course.hasCertificate && (
            <span className="inline-flex items-center gap-1.5 text-primary">
              <Award size={14} /> {t.common.certificate}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card>
            <h2 className="text-sm font-medium text-ink">{t.courses.overview}</h2>
            <p className="mt-2 text-sm text-ink-subtle">{course.title[locale]} — {course.provider}. {t.common[course.level]}.</p>
          </Card>
          <Card>
            <h2 className="text-sm font-medium text-ink">{t.courses.whatYouLearn}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {course.tags.map((tag) => (
                <li key={tag} className="flex items-center gap-2 text-sm text-ink-subtle">
                  <CheckCircle2 size={14} className="text-primary" />
                  {tag}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="flex flex-col gap-4">
          <span className="text-2xl font-semibold text-ink">
            {course.price === 0 ? t.common.free : `$${course.price}`}
          </span>

          {isEnrolled ? (
            <div className="flex flex-col gap-2">
              <Badge tone="success">{t.courses.enrolled}</Badge>
              <p className="text-xs text-ink-subtle">
                {providerUrl ? t.courses.enrolledNote : t.courses.internalEnrollNote}
              </p>
            </div>
          ) : (
            <Button onClick={handleEnroll} className="w-full" icon={providerUrl ? <ExternalLink size={16} /> : undefined}>
              {providerUrl ? t.courses.openOnProvider.replace("{provider}", course.provider) : t.courses.enrollNow}
            </Button>
          )}

          {isEnrolled && providerUrl && (
            <Button href={providerUrl} target="_blank" rel="noopener noreferrer" variant="secondary" className="w-full" icon={<ExternalLink size={16} />}>
              {t.courses.openOnProvider.replace("{provider}", course.provider)}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
