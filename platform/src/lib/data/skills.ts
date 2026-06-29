export type SkillDef = {
  slug: string;
  name: { en: string; ar: string };
  domainSlug: string;
  icon: string;
};

export const skills: SkillDef[] = [
  { slug: "excel", name: { en: "Excel", ar: "إكسل" }, domainSlug: "finance-accounting", icon: "Sheet" },
  { slug: "figma", name: { en: "Figma (UI Design)", ar: "Figma (تصميم الواجهات)" }, domainSlug: "graphic-design", icon: "Figma" },
  { slug: "python", name: { en: "Python", ar: "بايثون" }, domainSlug: "data-science", icon: "Code" },
  { slug: "react", name: { en: "React.js", ar: "React.js" }, domainSlug: "software-development", icon: "Atom" },
  { slug: "solidworks", name: { en: "SolidWorks", ar: "SolidWorks" }, domainSlug: "mechanical-engineering", icon: "Box" },
  { slug: "seo", name: { en: "SEO", ar: "تحسين محركات البحث" }, domainSlug: "digital-marketing", icon: "Search" },
  { slug: "agile-scrum", name: { en: "Agile & Scrum", ar: "أجايل وسكرم" }, domainSlug: "project-management", icon: "RefreshCw" },
  { slug: "autocad", name: { en: "AutoCAD", ar: "أوتوكاد" }, domainSlug: "civil-engineering", icon: "Ruler" },
  { slug: "financial-modeling", name: { en: "Financial Modeling", ar: "النمذجة المالية" }, domainSlug: "finance-accounting", icon: "LineChart" },
  { slug: "machine-learning", name: { en: "Machine Learning", ar: "تعلم الآلة" }, domainSlug: "data-science", icon: "BrainCircuit" },
  { slug: "public-speaking", name: { en: "Public Speaking", ar: "مهارات التحدث أمام الجمهور" }, domainSlug: "project-management", icon: "Mic" },
  { slug: "time-management", name: { en: "Time Management", ar: "إدارة الوقت" }, domainSlug: "project-management", icon: "Clock" },
];

export function getSkill(slug: string) {
  return skills.find((s) => s.slug === slug);
}

export function getSkillsByDomain(domainSlug: string) {
  return skills.filter((s) => s.domainSlug === domainSlug);
}
