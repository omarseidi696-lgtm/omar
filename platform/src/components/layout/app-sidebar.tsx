"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
} from "lucide-react";
import { useT } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/cn";

export function AppSidebar({
  className,
  orientation = "vertical",
}: {
  className?: string;
  orientation?: "vertical" | "horizontal";
}) {
  const t = useT();
  const pathname = usePathname();

  const items = [
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

  const isHorizontal = orientation === "horizontal";

  return (
    <nav
      className={cn(
        isHorizontal ? "flex items-center gap-1 overflow-x-auto" : "flex flex-col gap-1",
        className
      )}
    >
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors",
              isHorizontal && "flex-col gap-1 px-3.5 py-2 text-xs",
              active
                ? "bg-surface-2 text-ink"
                : "text-ink-subtle hover:bg-surface-1 hover:text-ink"
            )}
          >
            <Icon size={16} strokeWidth={2} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
