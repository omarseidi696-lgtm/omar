"use client";

import { useState } from "react";
import { Lightbulb, Monitor, BookOpen, Globe, SquarePlay, FileBox } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { skills } from "@/lib/data/skills";
import { toolkits } from "@/lib/data/toolkits";

export default function ToolsPage() {
  const t = useT();
  const { locale } = useLocale();
  const [activeSkill, setActiveSkill] = useState(skills[0].slug);

  const toolkit = toolkits.find((tk) => tk.skillSlug === activeSkill);

  const groups = toolkit
    ? [
        { label: t.tools.software, icon: Monitor, items: toolkit.software },
        { label: t.tools.books, icon: BookOpen, items: toolkit.books },
        { label: t.tools.websites, icon: Globe, items: toolkit.websites },
        { label: t.tools.channels, icon: SquarePlay, items: toolkit.channels },
        { label: t.tools.templates, icon: FileBox, items: toolkit.templates },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.tools.title}</h1>
        <p className="mt-1 text-sm text-ink-subtle">{t.tools.subtitle}</p>
      </div>

      <Card className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <button
            key={skill.slug}
            onClick={() => setActiveSkill(skill.slug)}
            className={cn(
              "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
              activeSkill === skill.slug
                ? "border-primary bg-primary/15 text-primary"
                : "border-hairline text-ink-subtle hover:border-hairline-strong hover:text-ink"
            )}
          >
            {skill.name[locale]}
          </button>
        ))}
      </Card>

      {toolkit && (
        <>
          <Card className="flex items-start gap-3 border-primary/30 bg-primary/5">
            <Lightbulb size={18} className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-medium text-primary">{t.tools.proTip}</p>
              <p className="mt-1 text-sm text-ink-subtle">{toolkit.proTip[locale]}</p>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {groups.map((group) => {
              const Icon = group.icon;
              return (
                <Card key={group.label}>
                  <div className="flex items-center gap-2 text-ink">
                    <Icon size={16} className="text-primary" />
                    <h2 className="text-sm font-medium">{group.label}</h2>
                  </div>
                  <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-subtle">
                    {group.items.map((item) => (
                      <li key={item} className="border-b border-hairline pb-2 last:border-0 last:pb-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
