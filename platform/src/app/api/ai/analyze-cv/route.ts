import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient, AI_MODEL } from "@/lib/ai/client";
import { skills } from "@/lib/data/skills";

type AnalyzeRequest = {
  resumeText: string;
  profileSkills: string[];
  goal?: string;
  locale: "en" | "ar";
};

function fallbackAnalysis(body: AnalyzeRequest): string {
  const lower = body.resumeText.toLowerCase();
  const matched = skills.filter((s) => lower.includes(s.name.en.toLowerCase()));
  const missing = skills.filter((s) => !matched.includes(s)).slice(0, 4);

  if (body.locale === "ar") {
    return [
      `المهارات التي ظهرت في سيرتك الذاتية: ${matched.length > 0 ? matched.map((s) => s.name.ar).join("، ") : "لم يتم العثور على مهارات معروفة"}.`,
      `مهارات قد تستحق التطوير: ${missing.map((s) => s.name.ar).join("، ")}.`,
      `الخطوة التالية: أضف المهارات المطابقة إلى ملفك الشخصي، وراجع المسارات التعليمية للمهارات الناقصة لتبني خطة تعلّم.`,
    ].join("\n\n");
  }
  return [
    `Skills detected in your resume: ${matched.length > 0 ? matched.map((s) => s.name.en).join(", ") : "no recognized skills found"}.`,
    `Skills worth developing next: ${missing.map((s) => s.name.en).join(", ")}.`,
    `Next step: add the matched skills to your profile, then check the Roadmap for the missing ones to build a learning plan.`,
  ].join("\n\n");
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AnalyzeRequest;

  if (!body?.resumeText?.trim()) {
    return NextResponse.json({ error: "Missing resume text" }, { status: 400 });
  }

  const client = getOpenAIClient();

  if (!client) {
    return NextResponse.json({ analysis: fallbackAnalysis(body), source: "heuristic" });
  }

  try {
    const language = body.locale === "ar" ? "Arabic" : "English";
    const completion = await client.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a career coach analyzing a resume/CV. Respond in ${language}. Identify: 1) top skills detected, 2) skill gaps relative to the user's goal (if given), 3) three concrete, actionable next steps. Keep it under 8 sentences total.`,
        },
        {
          role: "user",
          content: `Goal: ${body.goal || "Not specified"}\nExisting tracked skills: ${body.profileSkills.join(", ") || "None"}\n\nResume/CV text:\n${body.resumeText}`,
        },
      ],
      max_tokens: 400,
    });

    const analysis = completion.choices[0]?.message?.content?.trim() || fallbackAnalysis(body);
    return NextResponse.json({ analysis, source: "ai" });
  } catch {
    return NextResponse.json({ analysis: fallbackAnalysis(body), source: "heuristic" });
  }
}
