"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useT } from "@/lib/i18n/locale-context";
import { useMounted } from "@/lib/use-mounted";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const t = useT();

  const isDark = mounted ? theme !== "light" : true;

  return (
    <button
      type="button"
      aria-label={t.theme.toggle}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-surface-1 text-ink-subtle transition-colors hover:text-ink hover:border-hairline-strong"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
