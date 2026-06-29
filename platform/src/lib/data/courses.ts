import type { Course, Level } from "./types";
import { domains } from "./domains";

const providers = [
  "Coursera",
  "Udemy",
  "edX",
  "LinkedIn Learning",
  "Mehnati Academy",
  "Pluralsight",
  "DataCamp",
  "Udacity",
];

const levels: Level[] = ["beginner", "intermediate", "advanced", "professional", "expert"];
const languages: Course["language"][] = ["en", "ar", "multi"];

const courseTitlesByDomain: Record<string, { en: string; ar: string }[]> = {
  "software-development": [
    { en: "Modern JavaScript from Zero to Hero", ar: "جافاسكريبت الحديثة من الصفر للاحتراف" },
    { en: "React & Next.js Complete Guide", ar: "دليل React و Next.js الشامل" },
    { en: "Backend Engineering with Node.js", ar: "هندسة الأنظمة الخلفية بـ Node.js" },
    { en: "System Design Interview Mastery", ar: "احتراف تصميم الأنظمة لمقابلات العمل" },
    { en: "SQL & Database Design Bootcamp", ar: "معسكر تصميم قواعد البيانات و SQL" },
    { en: "Docker & Kubernetes for Developers", ar: "Docker و Kubernetes للمطورين" },
    { en: "TypeScript in Practice", ar: "TypeScript في التطبيق العملي" },
    { en: "Git & GitHub Professional Workflow", ar: "سير العمل المحترف في Git و GitHub" },
  ],
  "mechanical-engineering": [
    { en: "SolidWorks for Product Design", ar: "SolidWorks لتصميم المنتجات" },
    { en: "Finite Element Analysis with ANSYS", ar: "تحليل العناصر المحددة باستخدام ANSYS" },
    { en: "GD&T Fundamentals", ar: "أساسيات GD&T" },
    { en: "Thermodynamics for Engineers", ar: "الديناميكا الحرارية للمهندسين" },
    { en: "Manufacturing Processes Explained", ar: "شرح عمليات التصنيع" },
    { en: "MATLAB for Mechanical Simulation", ar: "MATLAB لمحاكاة الأنظمة الميكانيكية" },
  ],
  "digital-marketing": [
    { en: "SEO Mastery: Rank #1 on Google", ar: "احتراف السيو: الصدارة في جوجل" },
    { en: "Meta & Google Ads Performance Marketing", ar: "التسويق الأدائي عبر Meta و Google Ads" },
    { en: "Content Strategy for Brands", ar: "استراتيجية المحتوى للعلامات التجارية" },
    { en: "Email Marketing Automation", ar: "أتمتة التسويق عبر البريد الإلكتروني" },
    { en: "Marketing Analytics with GA4", ar: "تحليلات التسويق باستخدام GA4" },
    { en: "Copywriting That Converts", ar: "كتابة المحتوى المقنع للمبيعات" },
  ],
  "data-science": [
    { en: "Python for Data Science", ar: "بايثون لعلم البيانات" },
    { en: "Machine Learning A-Z", ar: "تعلم الآلة من الألف للياء" },
    { en: "Deep Learning with PyTorch", ar: "التعلم العميق باستخدام PyTorch" },
    { en: "SQL for Data Analysts", ar: "SQL لمحللي البيانات" },
    { en: "Data Visualization with Power BI", ar: "تصور البيانات باستخدام Power BI" },
    { en: "Statistics for Machine Learning", ar: "الإحصاء لتعلم الآلة" },
  ],
  "graphic-design": [
    { en: "UI Design Foundations in Figma", ar: "أساسيات تصميم الواجهات في Figma" },
    { en: "UX Research Methods", ar: "أساليب بحث تجربة المستخدم" },
    { en: "Branding & Visual Identity", ar: "العلامة التجارية والهوية البصرية" },
    { en: "Design Systems at Scale", ar: "أنظمة التصميم على نطاق واسع" },
    { en: "Adobe Illustrator Masterclass", ar: "احتراف Adobe Illustrator" },
  ],
  "project-management": [
    { en: "PMP Exam Prep Bootcamp", ar: "معسكر التحضير لشهادة PMP" },
    { en: "Agile & Scrum Foundations", ar: "أساسيات Agile و Scrum" },
    { en: "Product Roadmapping Workshop", ar: "ورشة تخطيط خارطة طريق المنتج" },
    { en: "Stakeholder Communication Skills", ar: "مهارات التواصل مع أصحاب المصلحة" },
    { en: "Risk Management for Projects", ar: "إدارة المخاطر في المشاريع" },
  ],
  "finance-accounting": [
    { en: "Financial Modeling in Excel", ar: "النمذجة المالية في Excel" },
    { en: "IFRS Accounting Standards", ar: "معايير المحاسبة الدولية IFRS" },
    { en: "Valuation & Investment Analysis", ar: "التقييم وتحليل الاستثمار" },
    { en: "CFA Level 1 Crash Course", ar: "دورة مكثفة لشهادة CFA المستوى الأول" },
    { en: "Budgeting & Forecasting", ar: "إعداد الموازنات والتنبؤ المالي" },
  ],
  "civil-engineering": [
    { en: "AutoCAD & Revit for Civil Engineers", ar: "AutoCAD و Revit للمهندسين المدنيين" },
    { en: "Structural Analysis with ETABS", ar: "التحليل الإنشائي باستخدام ETABS" },
    { en: "Construction Cost Estimation", ar: "تقدير تكاليف الإنشاءات" },
    { en: "Primavera P6 Project Scheduling", ar: "جدولة المشاريع باستخدام Primavera P6" },
    { en: "Geotechnical Engineering Basics", ar: "أساسيات الهندسة الجيوتقنية" },
  ],
};

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export const courses: Course[] = domains.flatMap((domain, domainIndex) => {
  const titles = courseTitlesByDomain[domain.slug] ?? [];
  const rand = seededRandom(domainIndex + 7);

  return titles.map((title, i) => {
    const level = levels[Math.floor(rand() * levels.length)];
    const isFree = rand() < 0.3;
    const provider = providers[Math.floor(rand() * providers.length)];
    const language = languages[Math.floor(rand() * languages.length)];

    const course: Course = {
      id: `${domain.slug}-course-${i}`,
      title,
      provider,
      domainSlug: domain.slug,
      level,
      price: isFree ? 0 : Math.round((19 + rand() * 130) / 5) * 5,
      currency: "USD",
      language,
      durationHours: Math.round(2 + rand() * 38),
      hasCertificate: rand() > 0.25,
      rating: Math.round((3.7 + rand() * 1.3) * 10) / 10,
      students: Math.round(500 + rand() * 120000),
      tags: domain.topSkills.slice(0, 3),
    };
    return course;
  });
});

export function getCoursesByDomain(domainSlug: string) {
  return courses.filter((c) => c.domainSlug === domainSlug);
}

export function getCourse(id: string) {
  return courses.find((c) => c.id === id);
}

const providerSearchUrls: Record<string, string> = {
  Coursera: "https://www.coursera.org/search?query=",
  Udemy: "https://www.udemy.com/courses/search/?q=",
  edX: "https://www.edx.org/search?q=",
  "LinkedIn Learning": "https://www.linkedin.com/learning/search?keywords=",
  Pluralsight: "https://www.pluralsight.com/search?q=",
  DataCamp: "https://www.datacamp.com/search?q=",
  Udacity: "https://www.udacity.com/catalog?search=",
};

export function getProviderUrl(course: Course): string | null {
  const base = providerSearchUrls[course.provider];
  if (!base) return null;
  return `${base}${encodeURIComponent(course.title.en)}`;
}
