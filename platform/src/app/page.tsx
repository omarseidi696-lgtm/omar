"use client";

import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  GraduationCap,
  PlayCircle,
  TrendingUp,
  Wrench,
  Map,
  FolderKanban,
  ClipboardCheck,
  Briefcase,
  Users,
  UserCircle,
  Bot,
  Sparkles,
} from "lucide-react";
import { useT } from "@/lib/i18n/locale-context";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CardHover } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/data/courses";
import { skills } from "@/lib/data/skills";
import { jobs } from "@/lib/data/jobs";

export default function Home() {
  const t = useT();

  const stats = [
    { label: t.home.statCourses, value: `${courses.length}+` },
    { label: t.home.statSkills, value: `${skills.length}+` },
    { label: t.home.statLearners, value: "12,400+" },
    { label: t.home.statJobs, value: `${jobs.length}+` },
  ];

  const sections = [
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/courses", label: t.nav.courses, icon: GraduationCap },
    { href: "/videos", label: t.nav.videos, icon: PlayCircle },
    { href: "/skills", label: t.nav.skills, icon: TrendingUp },
    { href: "/tools", label: t.nav.tools, icon: Wrench },
    { href: "/roadmap", label: t.nav.roadmap, icon: Map },
    { href: "/projects", label: t.nav.projects, icon: FolderKanban },
    { href: "/quizzes", label: t.nav.quizzes, icon: ClipboardCheck },
    { href: "/jobs", label: t.nav.jobs, icon: Briefcase },
    { href: "/community", label: t.nav.community, icon: Users },
    { href: "/profile", label: t.nav.profile, icon: UserCircle },
    { href: "/assistant", label: t.nav.assistant, icon: Bot },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--color-primary) 18%, transparent), transparent 70%)",
          }}
        />
        <Container className="flex flex-col items-center py-24 text-center sm:py-32">
          <div className="animate-fade-up inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-surface-1 px-3 py-1 text-xs font-medium text-ink-subtle">
            <Sparkles size={13} className="text-primary" />
            {t.home.eyebrow}
          </div>
          <h1
            className="animate-fade-up mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.05s" }}
          >
            {t.home.heroTitle}
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-2xl text-base text-ink-subtle sm:text-lg"
            style={{ animationDelay: "0.1s" }}
          >
            {t.home.heroSubtitle}
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.15s" }}
          >
            <Button href="/dashboard" size="lg" icon={<ArrowRight size={16} />}>
              {t.home.ctaPrimary}
            </Button>
            <Button href="/assistant" size="lg" variant="secondary">
              {t.home.ctaSecondary}
            </Button>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b border-hairline bg-surface-1/40">
        <Container className="grid grid-cols-2 gap-6 py-12 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-sm text-ink-subtle">{stat.label}</div>
            </div>
          ))}
        </Container>
      </section>

      {/* 12 pillars */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t.home.sectionsTitle}
            </h2>
            <p className="mt-3 text-ink-subtle">{t.home.sectionsSubtitle}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} href={section.href}>
                  <CardHover className="group flex h-full flex-col gap-3">
                    <div className="flex size-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink">{section.label}</span>
                      <ArrowRight
                        size={16}
                        className="text-ink-tertiary opacity-0 transition-all -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 rtl:rotate-180"
                      />
                    </div>
                  </CardHover>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* AI mentor teaser */}
      <section className="border-y border-hairline bg-surface-1/40 py-20 sm:py-28">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge tone="primary" className="mb-4">
              <Bot size={13} />
              {t.nav.assistant}
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t.home.aiTitle}
            </h2>
            <p className="mt-4 max-w-lg text-ink-subtle">{t.home.aiSubtitle}</p>
            <Button href="/assistant" className="mt-7" icon={<ArrowRight size={16} />}>
              {t.home.aiCta}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FolderKanban, label: t.nav.projects },
              { icon: ClipboardCheck, label: t.nav.quizzes },
              { icon: Map, label: t.nav.roadmap },
              { icon: Briefcase, label: t.nav.jobs },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 rounded-lg border border-hairline bg-surface-1 p-6 text-center"
                >
                  <Icon size={20} className="text-primary" />
                  <span className="text-sm text-ink-subtle">{item.label}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-xxl border border-hairline bg-surface-1 px-8 py-16 text-center sm:px-16">
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(60% 80% at 50% 100%, color-mix(in srgb, var(--color-primary) 22%, transparent), transparent 70%)",
              }}
            />
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t.home.ctaBannerTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-subtle">{t.home.ctaBannerSubtitle}</p>
            <Button href="/assistant" size="lg" className="mt-7" icon={<ArrowRight size={16} />}>
              {t.home.ctaBannerButton}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
