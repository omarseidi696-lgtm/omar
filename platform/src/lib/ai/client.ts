import OpenAI from "openai";

export function getOpenAIClient(): OpenAI | null {
  const key = process.env.OPENAI_API_KEY;
  if (!key || key === "your-openai-api-key-here") return null;
  return new OpenAI({ apiKey: key });
}

export const AI_MODEL = "gpt-4o-mini";
