import type { VideoItem, Level } from "./types";
import { skills } from "./skills";

const levels: Level[] = ["beginner", "intermediate", "advanced"];

const channelPool = [
  "LearnLoop",
  "CraftedTutorials",
  "SkillForge",
  "PracticalPath",
  "NorthStar Academy",
  "BuildWithMe",
  "ZeroToPro",
  "TheMentorDesk",
];

const titleTemplates: Record<Level, { en: string; ar: string }> = {
  beginner: { en: "{skill} Crash Course for Absolute Beginners", ar: "دورة مكثفة في {skill} للمبتدئين تماماً" },
  intermediate: { en: "{skill}: Intermediate Techniques in Practice", ar: "{skill}: تقنيات متوسطة في التطبيق العملي" },
  advanced: { en: "Advanced {skill} Patterns Used by Professionals", ar: "أنماط متقدمة في {skill} يستخدمها المحترفون" },
  professional: { en: "{skill} for Professionals", ar: "{skill} للمحترفين" },
  expert: { en: "{skill} Expert Deep Dive", ar: "{skill} غوص عميق للخبراء" },
};

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export const videos: VideoItem[] = skills.flatMap((skill, skillIndex) => {
  const rand = seededRandom(skillIndex + 13);
  return levels.flatMap((level, levelIndex) =>
    Array.from({ length: 3 }, (_, i) => {
      const channel = channelPool[Math.floor(rand() * channelPool.length)];
      const item: VideoItem = {
        id: `${skill.slug}-${level}-${i}`,
        title: {
          en: titleTemplates[level].en.replace("{skill}", skill.name.en) + (i > 0 ? ` Part ${i + 1}` : ""),
          ar: titleTemplates[level].ar.replace("{skill}", skill.name.ar) + (i > 0 ? ` - الجزء ${i + 1}` : ""),
        },
        channel: `${channel}${i > 0 ? ` #${levelIndex + i}` : ""}`,
        level,
        durationMinutes: Math.round(8 + rand() * 52),
        rating: Math.round((4.9 - i * 0.15 - rand() * 0.3) * 10) / 10,
        skillSlug: skill.slug,
      };
      return item;
    })
  );
});

export function getVideosBySkill(skillSlug: string) {
  return videos
    .filter((v) => v.skillSlug === skillSlug)
    .sort((a, b) => b.rating - a.rating);
}

export function getVideoSearchUrl(video: VideoItem, locale: "en" | "ar"): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${video.title[locale]} ${video.channel}`)}`;
}
