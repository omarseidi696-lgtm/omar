import type { CommunityGroup, CommunityChallenge } from "./types";
import { domains } from "./domains";

export const communityGroups: CommunityGroup[] = domains.map((d, i) => ({
  id: `group-${d.slug}`,
  domainSlug: d.slug,
  name: d.name,
  members: 800 + i * 415,
  threads: 60 + i * 23,
}));

export const communityChallenges: CommunityChallenge[] = [
  {
    id: "challenge-weekly-1",
    type: "weekly",
    title: { en: "Ship a mini dashboard in 7 days", ar: "أنشئ لوحة تحكم صغيرة في 7 أيام" },
    domainSlug: "software-development",
    deadline: "2026-07-06",
    participants: 214,
  },
  {
    id: "challenge-weekly-2",
    type: "weekly",
    title: { en: "Redesign a real landing page", ar: "أعد تصميم صفحة هبوط حقيقية" },
    domainSlug: "graphic-design",
    deadline: "2026-07-06",
    participants: 176,
  },
  {
    id: "challenge-weekly-3",
    type: "weekly",
    title: { en: "Audit one website's on-page SEO", ar: "دقّق السيو الداخلي لموقع واحد" },
    domainSlug: "digital-marketing",
    deadline: "2026-07-06",
    participants: 132,
  },
  {
    id: "challenge-monthly-1",
    type: "monthly",
    title: { en: "Best 3-statement financial model", ar: "أفضل نموذج مالي ثلاثي القوائم" },
    domainSlug: "finance-accounting",
    deadline: "2026-07-31",
    participants: 89,
  },
  {
    id: "challenge-monthly-2",
    type: "monthly",
    title: { en: "Best end-to-end ML mini-project", ar: "أفضل مشروع تعلم آلة متكامل" },
    domainSlug: "data-science",
    deadline: "2026-07-31",
    participants: 121,
  },
];

export const sampleThreads = [
  {
    id: "thread-1",
    domainSlug: "software-development",
    title: { en: "How long did it take you to land your first dev job?", ar: "كم استغرقت لتحصل على أول وظيفة برمجة؟" },
    replies: 34,
    author: "Yousef.dev",
  },
  {
    id: "thread-2",
    domainSlug: "graphic-design",
    title: { en: "Feedback on my portfolio — UI designer transitioning from graphic design", ar: "ملاحظات على ملف أعمالي — انتقال من التصميم الجرافيكي لتصميم الواجهات" },
    replies: 21,
    author: "Lina.design",
  },
  {
    id: "thread-3",
    domainSlug: "data-science",
    title: { en: "Best path to ML engineer with a non-CS background?", ar: "أفضل طريق لتصبح مهندس تعلم آلة بدون خلفية علوم حاسوب؟" },
    replies: 47,
    author: "Omar.k",
  },
  {
    id: "thread-4",
    domainSlug: "project-management",
    title: { en: "PMP vs CSM — which certification first?", ar: "PMP أم CSM — أي شهادة أولاً؟" },
    replies: 18,
    author: "Sara.pm",
  },
];
