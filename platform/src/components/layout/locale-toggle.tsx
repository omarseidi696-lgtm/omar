"use client";

import { useLocale } from "@/lib/i18n/locale-context";

export function LocaleToggle() {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="flex h-9 items-center justify-center rounded-md border border-hairline bg-surface-1 px-3 text-xs font-medium text-ink-subtle transition-colors hover:text-ink hover:border-hairline-strong"
    >
      {locale === "ar" ? "EN" : "عربي"}
    </button>
  );
}
