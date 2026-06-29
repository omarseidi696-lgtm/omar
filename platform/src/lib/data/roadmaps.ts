import type { Roadmap, Level } from "./types";
import { skills } from "./skills";

const levels: Level[] = ["beginner", "intermediate", "advanced", "professional", "expert"];

const stageTemplates: Record<Level, { en: string[]; ar: string[] }> = {
  beginner: {
    en: ["Core concepts & terminology", "Setup your working environment", "First guided mini-project"],
    ar: ["المفاهيم والمصطلحات الأساسية", "تجهيز بيئة العمل", "أول مشروع صغير موجّه"],
  },
  intermediate: {
    en: ["Apply the fundamentals on real tasks", "Learn the standard workflow professionals use", "Build a portfolio-worthy project"],
    ar: ["تطبيق الأساسيات على مهام حقيقية", "تعلم سير العمل المعتمد بين المحترفين", "بناء مشروع يصلح لمعرض أعمالك"],
  },
  advanced: {
    en: ["Master edge cases & optimization", "Study real-world case studies", "Contribute to or lead a real project"],
    ar: ["إتقان الحالات الخاصة والتحسين", "دراسة حالات عملية حقيقية", "المساهمة في أو قيادة مشروع حقيقي"],
  },
  professional: {
    en: ["Earn a recognized certification", "Mentor or review others' work", "Specialize in a sub-niche"],
    ar: ["الحصول على شهادة معتمدة", "إرشاد ومراجعة أعمال الآخرين", "التخصص في مجال فرعي دقيق"],
  },
  expert: {
    en: ["Publish original work or research", "Speak or teach publicly on the topic", "Push the field forward with innovation"],
    ar: ["نشر عمل أو بحث أصلي", "التحدث أو التدريس علناً في الموضوع", "دفع المجال للأمام بالابتكار"],
  },
};

export const roadmaps: Roadmap[] = skills.map((skill) => ({
  skillSlug: skill.slug,
  skillName: skill.name,
  modules: levels.flatMap((level) =>
    stageTemplates[level].en.map((_, i) => ({
      id: `${skill.slug}-${level}-${i}`,
      title: {
        en: stageTemplates[level].en[i],
        ar: stageTemplates[level].ar[i],
      },
      level,
    }))
  ),
}));

export function getRoadmap(skillSlug: string) {
  return roadmaps.find((r) => r.skillSlug === skillSlug);
}
