"use client";

import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "@/lib/i18n/locale-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
