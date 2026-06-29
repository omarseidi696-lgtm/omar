import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient, AI_MODEL } from "@/lib/ai/client";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ChatRequest = { messages: ChatMessage[]; locale: "en" | "ar" };

function fallbackReply(body: ChatRequest): string {
  if (body.locale === "ar") {
    return [
      "شكراً على رسالتك. أنا أعمل حالياً بوضع المساعدة الأساسي (بدون اتصال بمزود الذكاء الاصطناعي).",
      "بإمكانك استكشاف المسار التعليمي لمهارتك لخطوات منظمة، تجربة أحد المشاريع للتطبيق العملي، أو خوض اختبار للتأكد من إتقانك للأساسيات.",
    ].join("\n\n");
  }
  return [
    "Thanks for reaching out. I'm currently running in basic heuristic mode (no AI provider connected).",
    "In the meantime, check out the Roadmap for structured next steps, try a Project for hands-on practice, or take a Quiz to confirm you've nailed the fundamentals.",
  ].join("\n\n");
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ChatRequest;

  if (!body?.messages?.length) {
    return NextResponse.json({ error: "Missing messages" }, { status: 400 });
  }

  const client = getOpenAIClient();

  if (!client) {
    return NextResponse.json({ reply: fallbackReply(body), source: "heuristic" });
  }

  try {
    const language = body.locale === "ar" ? "Arabic" : "English";
    const completion = await client.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an encouraging, knowledgeable AI career mentor on the Mehnati skills platform. Help with skill-gap analysis, learning plans, interview prep, and career advice. Respond in ${language}. Keep replies concise (3-6 sentences) unless the user asks for more detail.`,
        },
        ...body.messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 350,
    });

    const reply = completion.choices[0]?.message?.content?.trim() || fallbackReply(body);
    return NextResponse.json({ reply, source: "ai" });
  } catch {
    return NextResponse.json({ reply: fallbackReply(body), source: "heuristic" });
  }
}
