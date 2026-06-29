import type { Project, Level } from "./types";
import { skills } from "./skills";

const projectLevels: Level[] = ["beginner", "intermediate", "advanced"];

type LevelBrief = { title: { en: string; ar: string }; brief: { en: string; ar: string } };

const briefBySkillAndLevel: Record<string, Partial<Record<Level, LevelBrief>>> = {
  excel: {
    beginner: {
      title: { en: "Personal Budget Tracker", ar: "متتبع الموازنة الشخصية" },
      brief: { en: "Build a spreadsheet that tracks monthly income and expenses with basic formulas.", ar: "أنشئ ملف إكسل لتتبع الدخل والمصروفات الشهرية باستخدام الصيغ الأساسية." },
    },
    intermediate: {
      title: { en: "Sales Dashboard with Pivot Tables", ar: "لوحة مبيعات بالجداول المحورية" },
      brief: { en: "Turn a raw sales dataset into an interactive dashboard using PivotTables and slicers.", ar: "حوّل بيانات مبيعات خام إلى لوحة تفاعلية باستخدام الجداول المحورية والمرشحات." },
    },
    advanced: {
      title: { en: "Automated Financial Report with Power Query", ar: "تقرير مالي آلي باستخدام Power Query" },
      brief: { en: "Build a self-refreshing monthly report pulling from multiple source files.", ar: "أنشئ تقريراً شهرياً يتحدث تلقائياً من عدة ملفات مصدر." },
    },
  },
  figma: {
    beginner: {
      title: { en: "Redesign a Landing Page", ar: "إعادة تصميم صفحة هبوط" },
      brief: { en: "Recreate an existing landing page in Figma using consistent type and spacing.", ar: "أعد تصميم صفحة هبوط موجودة في Figma باستخدام تنسيق ثابت للخطوط والمسافات." },
    },
    intermediate: {
      title: { en: "Mobile App Prototype", ar: "نموذج تطبيق موبايل" },
      brief: { en: "Design and prototype a 5-screen mobile app flow with interactive components.", ar: "صمم وجهّز نموذجاً تفاعلياً لتطبيق موبايل من 5 شاشات." },
    },
    advanced: {
      title: { en: "Design System for a Product", ar: "نظام تصميم لمنتج" },
      brief: { en: "Build a full component library with variants, tokens and documentation.", ar: "ابنِ مكتبة مكونات كاملة مع المتغيرات والمتغيرات اللونية والتوثيق." },
    },
  },
  python: {
    beginner: {
      title: { en: "CLI Expense Tracker", ar: "أداة سطر أوامر لتتبع المصاريف" },
      brief: { en: "Build a command-line tool to log and summarize daily expenses.", ar: "ابنِ أداة سطر أوامر لتسجيل وتلخيص المصاريف اليومية." },
    },
    intermediate: {
      title: { en: "Web Scraper + Data Cleaner", ar: "أداة استخراج وتنظيف بيانات من الويب" },
      brief: { en: "Scrape a public dataset, clean it with Pandas, and export insights.", ar: "استخرج بيانات عامة من الويب، نظّفها باستخدام Pandas، وصدّر النتائج." },
    },
    advanced: {
      title: { en: "ML-Powered Prediction API", ar: "واجهة برمجية للتنبؤ بالذكاء الاصطناعي" },
      brief: { en: "Train a model and serve predictions through a small Flask/FastAPI service.", ar: "درّب نموذجاً وقدّم تنبؤاته عبر خدمة Flask/FastAPI صغيرة." },
    },
  },
  react: {
    beginner: {
      title: { en: "Personal Portfolio Site", ar: "موقع معرض أعمال شخصي" },
      brief: { en: "Build and deploy a responsive personal portfolio with React.", ar: "ابنِ وانشر موقعاً شخصياً متجاوباً باستخدام React." },
    },
    intermediate: {
      title: { en: "Task Management App", ar: "تطبيق إدارة مهام" },
      brief: { en: "Build a full CRUD task app with state management and persistence.", ar: "ابنِ تطبيق مهام كامل مع إدارة الحالة والتخزين." },
    },
    advanced: {
      title: { en: "Real-Time Dashboard", ar: "لوحة تحكم لحظية" },
      brief: { en: "Build a dashboard with live data updates, charts and auth.", ar: "ابنِ لوحة تحكم بتحديثات لحظية ورسوم بيانية ومصادقة." },
    },
  },
  solidworks: {
    beginner: {
      title: { en: "Model a Household Object", ar: "تصميم أداة منزلية" },
      brief: { en: "Model a simple household object with accurate dimensions.", ar: "صمم أداة منزلية بسيطة بأبعاد دقيقة." },
    },
    intermediate: {
      title: { en: "Multi-Part Assembly", ar: "تجميع متعدد القطع" },
      brief: { en: "Design and assemble a 10+ part mechanism with mates and motion.", ar: "صمم وجمّع آلية من أكثر من 10 قطع مع الوصلات والحركة." },
    },
    advanced: {
      title: { en: "FEA Stress Analysis Report", ar: "تقرير تحليل الإجهاد بـ FEA" },
      brief: { en: "Run and document a full simulation study on a load-bearing part.", ar: "نفّذ ووثّق دراسة محاكاة كاملة لقطعة تحمل أحمالاً." },
    },
  },
  seo: {
    beginner: {
      title: { en: "Keyword Research Report", ar: "تقرير بحث الكلمات المفتاحية" },
      brief: { en: "Research and prioritize keywords for a niche website.", ar: "ابحث ورتّب الكلمات المفتاحية لموقع متخصص." },
    },
    intermediate: {
      title: { en: "On-Page SEO Audit", ar: "تدقيق سيو داخلي" },
      brief: { en: "Audit a real website's on-page SEO and propose fixes.", ar: "دقّق السيو الداخلي لموقع حقيقي وقدّم حلولاً." },
    },
    advanced: {
      title: { en: "Full SEO Growth Campaign", ar: "حملة نمو سيو كاملة" },
      brief: { en: "Plan and execute a 90-day SEO growth campaign with reporting.", ar: "خطّط ونفّذ حملة نمو سيو لمدة 90 يوماً مع التقارير." },
    },
  },
  "agile-scrum": {
    beginner: {
      title: { en: "Personal Kanban Board", ar: "لوحة كانبان شخصية" },
      brief: { en: "Set up and run a Kanban board for a personal project for 2 weeks.", ar: "أنشئ ونفّذ لوحة كانبان لمشروع شخصي لمدة أسبوعين." },
    },
    intermediate: {
      title: { en: "Simulated Sprint Cycle", ar: "محاكاة دورة سبرنت" },
      brief: { en: "Run a full 2-week sprint with backlog, planning, and retro.", ar: "نفّذ دورة سبرنت كاملة لأسبوعين مع المهام والتخطيط والمراجعة." },
    },
    advanced: {
      title: { en: "Team Agile Transformation Plan", ar: "خطة تحول رشيق لفريق" },
      brief: { en: "Design an Agile adoption plan for a hypothetical 10-person team.", ar: "صمم خطة تبني منهجية أجايل لفريق افتراضي من 10 أشخاص." },
    },
  },
  autocad: {
    beginner: {
      title: { en: "Floor Plan Drawing", ar: "رسم مخطط طابق" },
      brief: { en: "Draft a simple residential floor plan to scale.", ar: "ارسم مخطط طابق سكني بسيط بمقياس دقيق." },
    },
    intermediate: {
      title: { en: "Site Layout Plan", ar: "مخطط تخطيط الموقع" },
      brief: { en: "Produce a full site layout with dimensions and annotations.", ar: "أنتج مخطط موقع كامل مع الأبعاد والملاحظات." },
    },
    advanced: {
      title: { en: "Structural Detail Set", ar: "مجموعة تفاصيل إنشائية" },
      brief: { en: "Produce a multi-sheet structural detail drawing set.", ar: "أنتج مجموعة لوحات تفاصيل إنشائية متعددة." },
    },
  },
  "financial-modeling": {
    beginner: {
      title: { en: "Simple Startup Budget Model", ar: "نموذج موازنة لشركة ناشئة" },
      brief: { en: "Build a 12-month budget model for a hypothetical startup.", ar: "ابنِ نموذج موازنة لـ 12 شهراً لشركة ناشئة افتراضية." },
    },
    intermediate: {
      title: { en: "3-Statement Model", ar: "نموذج القوائم الثلاث" },
      brief: { en: "Build a linked income statement, balance sheet and cash flow model.", ar: "ابنِ نموذجاً مرتبطاً لقائمة الدخل والميزانية والتدفقات النقدية." },
    },
    advanced: {
      title: { en: "DCF Valuation of a Public Company", ar: "تقييم DCF لشركة عامة" },
      brief: { en: "Value a real public company using a full DCF model from its filings.", ar: "قيّم شركة عامة حقيقية باستخدام نموذج DCF كامل من تقاريرها." },
    },
  },
  "machine-learning": {
    beginner: {
      title: { en: "Classify Iris-style Dataset", ar: "تصنيف بيانات بسيطة" },
      brief: { en: "Train and evaluate a simple classifier on a clean tabular dataset.", ar: "درّب وقيّم مصنفاً بسيطاً على بيانات جدولية نظيفة." },
    },
    intermediate: {
      title: { en: "Kaggle Competition Entry", ar: "مشاركة في منافسة Kaggle" },
      brief: { en: "Enter a beginner-friendly Kaggle competition and document your approach.", ar: "شارك في منافسة Kaggle مناسبة للمبتدئين ووثّق منهجك." },
    },
    advanced: {
      title: { en: "End-to-End ML Pipeline", ar: "خط أنابيب تعلم آلة كامل" },
      brief: { en: "Build a full pipeline from raw data to a deployed prediction service.", ar: "ابنِ خط أنابيب كاملاً من البيانات الخام إلى خدمة تنبؤ منشورة." },
    },
  },
  "public-speaking": {
    beginner: {
      title: { en: "5-Minute Self-Introduction Talk", ar: "حديث تعريف شخصي لمدة 5 دقائق" },
      brief: { en: "Record and refine a 5-minute talk introducing yourself and your goals.", ar: "صوّر وحسّن حديثاً مدته 5 دقائق تقدّم فيه نفسك وأهدافك." },
    },
    intermediate: {
      title: { en: "Persuasive Pitch", ar: "عرض إقناعي" },
      brief: { en: "Deliver a 10-minute persuasive pitch to a small live or virtual audience.", ar: "قدّم عرضاً إقناعياً لمدة 10 دقائق لجمهور حقيقي صغير أو عبر الإنترنت." },
    },
    advanced: {
      title: { en: "Conference-Style Talk", ar: "محاضرة بأسلوب المؤتمرات" },
      brief: { en: "Prepare and deliver a 20-minute conference-style talk with Q&A.", ar: "حضّر وقدّم محاضرة بأسلوب المؤتمرات لمدة 20 دقيقة مع أسئلة وأجوبة." },
    },
  },
  "time-management": {
    beginner: {
      title: { en: "One-Week Time Audit", ar: "تدقيق وقت لمدة أسبوع" },
      brief: { en: "Track every hour for a week and categorize how time is actually spent.", ar: "تتبّع كل ساعة لمدة أسبوع وصنّف كيف يُصرف وقتك فعلياً." },
    },
    intermediate: {
      title: { en: "Personal Productivity System", ar: "نظام إنتاجية شخصي" },
      brief: { en: "Design and run a personal task/time system for 2 weeks, then review.", ar: "صمم ونفّذ نظام مهام/وقت شخصي لأسبوعين، ثم قيّمه." },
    },
    advanced: {
      title: { en: "Quarterly Goal & Time Plan", ar: "خطة أهداف ووقت فصلية" },
      brief: { en: "Build a full quarterly goal-setting and time-allocation plan.", ar: "ابنِ خطة كاملة لتحديد الأهداف وتوزيع الوقت لفصل كامل." },
    },
  },
};

const deliverableTemplates: Record<Level, { en: string; ar: string }[]> = {
  beginner: [
    { en: "Working first version", ar: "نسخة أولى تعمل" },
    { en: "Short write-up of what you learned", ar: "ملخص قصير لما تعلمته" },
  ],
  intermediate: [
    { en: "Polished, presentable result", ar: "نتيجة منظمة وقابلة للعرض" },
    { en: "Documentation of your process", ar: "توثيق لخطوات عملك" },
    { en: "Shared for community feedback", ar: "مشاركة للحصول على ملاحظات المجتمع" },
  ],
  advanced: [
    { en: "Production-quality deliverable", ar: "مُخرج بجودة احترافية" },
    { en: "Full documentation & decisions log", ar: "توثيق كامل وسجل القرارات" },
    { en: "Presented with measurable results", ar: "تقديم النتائج مع مؤشرات قابلة للقياس" },
  ],
  professional: [
    { en: "Client-ready deliverable", ar: "مُخرج جاهز للعميل" },
    { en: "Stakeholder presentation", ar: "عرض لأصحاب المصلحة" },
  ],
  expert: [
    { en: "Original published artifact", ar: "عمل أصلي منشور" },
    { en: "Public review or critique invited", ar: "دعوة لمراجعة أو نقد علني" },
  ],
};

export const projects: Project[] = skills.flatMap((skill) =>
  projectLevels.map((level) => {
    const def = briefBySkillAndLevel[skill.slug]?.[level];
    return {
      id: `${skill.slug}-project-${level}`,
      skillSlug: skill.slug,
      level,
      title: def?.title ?? { en: `${skill.name.en} Practice Project`, ar: `مشروع تطبيقي في ${skill.name.ar}` },
      brief: def?.brief ?? {
        en: `Apply ${skill.name.en} on a realistic scenario suited for the ${level} level.`,
        ar: `طبّق ${skill.name.ar} على سيناريو واقعي يناسب المستوى ${level}.`,
      },
      deliverables: deliverableTemplates[level],
    } satisfies Project;
  })
);

export function getProjectsBySkill(skillSlug: string) {
  return projects.filter((p) => p.skillSlug === skillSlug);
}
