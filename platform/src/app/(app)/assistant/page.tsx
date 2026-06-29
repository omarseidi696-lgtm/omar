"use client";

import { useState } from "react";
import { Bot, Send, FileSearch, User, Loader2, Sparkles } from "lucide-react";
import { useT, useLocale } from "@/lib/i18n/locale-context";
import { useProfile } from "@/lib/store/profile-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Tab = "chat" | "cv";
type ChatMessage = { role: "user" | "assistant"; content: string };

export default function AssistantPage() {
  const t = useT();
  const [tab, setTab] = useState<Tab>("chat");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.assistant.title}</h1>
        <p className="mt-1 text-sm text-ink-subtle">{t.assistant.subtitle}</p>
      </div>

      <Card className="flex w-fit gap-1 p-1">
        {(["chat", "cv"] as Tab[]).map((tb) => (
          <button
            key={tb}
            onClick={() => setTab(tb)}
            className={cn(
              "rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors",
              tab === tb ? "bg-surface-3 text-ink" : "text-ink-subtle hover:text-ink"
            )}
          >
            {tb === "chat" ? t.assistant.tabChat : t.assistant.tabCv}
          </button>
        ))}
      </Card>

      {tab === "chat" ? <ChatPanel /> : <CvPanel />}
    </div>
  );
}

function ChatPanel() {
  const t = useT();
  const { locale } = useLocale();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    const content = input.trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, locale }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex min-h-[16rem] flex-col gap-3">
        {messages.length === 0 && (
          <div className="flex items-start gap-2 text-sm text-ink-subtle">
            <Bot size={16} className="mt-0.5 shrink-0 text-primary" />
            {t.assistant.chatIntro}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn("flex items-start gap-2", m.role === "user" && "flex-row-reverse")}>
            {m.role === "assistant" ? (
              <Bot size={16} className="mt-0.5 shrink-0 text-primary" />
            ) : (
              <User size={16} className="mt-0.5 shrink-0 text-ink-tertiary" />
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-md px-3 py-2 text-sm whitespace-pre-line",
                m.role === "assistant" ? "bg-surface-2 text-ink" : "bg-primary/15 text-ink"
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-ink-subtle">
            <Loader2 size={14} className="animate-spin" /> {t.assistant.thinking}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder={t.assistant.chatPlaceholder}
          className="w-full rounded-md border border-hairline bg-surface-2 px-3 py-2.5 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary-focus/50"
        />
        <Button onClick={handleSend} disabled={loading || !input.trim()} icon={<Send size={16} />}>
          {t.assistant.send}
        </Button>
      </div>
    </Card>
  );
}

function CvPanel() {
  const t = useT();
  const { locale } = useLocale();
  const { profile } = useProfile();
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!resumeText.trim() || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/analyze-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, profileSkills: profile.skills, goal: profile.goal, locale }),
      });
      const data = await res.json();
      setAnalysis(data.analysis);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start gap-2 text-sm text-ink-subtle">
        <FileSearch size={16} className="mt-0.5 shrink-0 text-primary" />
        {t.assistant.cvIntro}
      </div>

      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder={t.assistant.cvPlaceholder}
        rows={8}
        className="w-full resize-none rounded-md border border-hairline bg-surface-2 px-3 py-2.5 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary-focus/50"
      />

      <Button
        onClick={handleAnalyze}
        disabled={loading || !resumeText.trim()}
        icon={loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
        className="self-start"
      >
        {loading ? t.assistant.analyzing : t.assistant.analyze}
      </Button>

      {analysis && (
        <Card className="border-primary/30 bg-primary/5">
          <p className="whitespace-pre-line text-sm text-ink-subtle">{analysis}</p>
        </Card>
      )}
    </Card>
  );
}
