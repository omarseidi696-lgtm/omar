import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient, AI_MODEL } from "@/lib/ai/client";

type FeedbackRequest = {
  skillName: string;
  level: string;
  projectTitle: string;
  brief: string;
  deliverables: string[];
  note: string;
  locale: "en" | "ar";
};

function fallbackFeedback(body: FeedbackRequest): string {
  const wordCount = body.note.trim().split(/\s+/).filter(Boolean).length;
  const depth = wordCount > 60 ? "detailed" : wordCount > 20 ? "solid" : "brief";
  if (body.locale === "ar") {
    return [
      `شكراً لإرسال "${body.projectTitle}". ملاحظتك ${depth === "detailed" ? "مفصّلة وتُظهر فهماً جيداً" : depth === "solid" ? "واضحة وتغطي النقاط الأساسية" : "مختصرة — حاول إضافة تفاصيل أكثر عن خطوات عملك وقراراتك"}.`,
      `تذكّر أن تتأكد من تغطية هذه المخرجات: ${body.deliverables.join("، ")}.`,
      `الخطوة التالية: شارك العمل مع شخص آخر للحصول على رأي خارجي، وانتقل للمستوى التالي إذا شعرت بالثقة.`,
    ].join("\n\n");
  }
  return [
    `Thanks for submitting "${body.projectTitle}". Your note is ${depth === "detailed" ? "detailed and shows solid understanding" : depth === "solid" ? "clear and covers the basics" : "brief — try adding more detail about your process and decisions"}.`,
    `Make sure you've covered these deliverables: ${body.deliverables.join(", ")}.`,
    `Next step: share this with someone else for outside feedback, then move on to the next level when you feel confident.`,
  ].join("\n\n");
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as FeedbackRequest;

  if (!body?.note || !body?.projectTitle) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const client = getOpenAIClient();

  if (!client) {
    return NextResponse.json({ feedback: fallbackFeedback(body), source: "heuristic" });
  }

  try {
    const language = body.locale === "ar" ? "Arabic" : "English";
    const completion = await client.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an encouraging but honest project reviewer mentoring someone learning ${body.skillName}. Respond in ${language}. Keep feedback to 3-5 sentences, specific and actionable, referencing the deliverables when relevant.`,
        },
        {
          role: "user",
          content: `Project: ${body.projectTitle} (level: ${body.level})\nBrief: ${body.brief}\nExpected deliverables: ${body.deliverables.join(", ")}\n\nWhat the learner submitted:\n${body.note}`,
        },
      ],
      max_tokens: 300,
    });

    const feedback = completion.choices[0]?.message?.content?.trim() || fallbackFeedback(body);
    return NextResponse.json({ feedback, source: "ai" });
  } catch {
    return NextResponse.json({ feedback: fallbackFeedback(body), source: "heuristic" });
  }
}
