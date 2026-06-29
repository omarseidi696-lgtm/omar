import type { SkillToolkit } from "./types";

export const toolkits: SkillToolkit[] = [
  {
    skillSlug: "excel",
    skillName: { en: "Excel", ar: "إكسل" },
    software: ["Microsoft Excel", "Power Query", "Power Pivot", "Google Sheets"],
    books: ["Excel 2021 Bible", "Financial Modeling in Excel for Dummies"],
    websites: ["ExcelJet", "Chandoo.org", "Microsoft Learn — Excel"],
    channels: ["LearnLoop", "PracticalPath", "ZeroToPro"],
    templates: ["Monthly budget tracker", "KPI dashboard template", "Project timeline (Gantt)"],
    proTip: {
      en: "Master pivot tables and Power Query before formulas — they solve 80% of real workplace tasks.",
      ar: "أتقن الجداول المحورية وPower Query قبل الصيغ المعقدة — فهي تحل 80% من المهام الفعلية في العمل.",
    },
  },
  {
    skillSlug: "figma",
    skillName: { en: "Figma (UI Design)", ar: "Figma (تصميم الواجهات)" },
    software: ["Figma", "FigJam", "Adobe Illustrator", "Framer"],
    books: ["Refactoring UI", "Don't Make Me Think"],
    websites: ["Figma Community", "Laws of UX", "Mobbin"],
    channels: ["CraftedTutorials", "SkillForge", "BuildWithMe"],
    templates: ["Design system starter kit", "Mobile app wireframe kit", "Component library template"],
    proTip: {
      en: "Build a personal component library early — it teaches you design systems thinking by doing.",
      ar: "ابنِ مكتبة مكونات خاصة بك مبكراً — فهي تعلمك التفكير بأنظمة التصميم عبر الممارسة.",
    },
  },
  {
    skillSlug: "python",
    skillName: { en: "Python", ar: "بايثون" },
    software: ["Python", "Jupyter Notebook", "VS Code", "Anaconda"],
    books: ["Automate the Boring Stuff with Python", "Python Crash Course"],
    websites: ["Real Python", "Python.org docs", "Kaggle"],
    channels: ["NorthStar Academy", "TheMentorDesk", "LearnLoop"],
    templates: ["Data cleaning script template", "CLI tool starter", "API wrapper boilerplate"],
    proTip: {
      en: "Write small automation scripts for your own daily tasks — real problems teach faster than tutorials.",
      ar: "اكتب سكريبتات صغيرة لأتمتة مهامك اليومية — المشاكل الحقيقية تعلّم أسرع من الدروس النظرية.",
    },
  },
  {
    skillSlug: "react",
    skillName: { en: "React.js", ar: "React.js" },
    software: ["VS Code", "React DevTools", "Vite", "Chrome DevTools"],
    books: ["Learning React (O'Reilly)", "Epic React by Kent C. Dodds"],
    websites: ["react.dev", "patterns.dev", "Frontend Mentor"],
    channels: ["BuildWithMe", "ZeroToPro", "CraftedTutorials"],
    templates: ["Component pattern cheat-sheet", "Dashboard starter template", "Auth flow boilerplate"],
    proTip: {
      en: "Build three full small apps before any course on 'advanced patterns' — patterns only make sense after pain.",
      ar: "ابنِ ثلاثة تطبيقات صغيرة كاملة قبل أي دورة في 'الأنماط المتقدمة' — فالأنماط تُفهم فقط بعد تجربة الألم.",
    },
  },
  {
    skillSlug: "solidworks",
    skillName: { en: "SolidWorks", ar: "SolidWorks" },
    software: ["SolidWorks", "eDrawings", "ANSYS Workbench"],
    books: ["SolidWorks 2023 Black Book", "Engineering Design Graphics"],
    websites: ["GrabCAD", "SolidWorks Forums", "MySolidWorks"],
    channels: ["SkillForge", "PracticalPath", "TheMentorDesk"],
    templates: ["Drawing sheet template (ISO)", "Assembly BOM template"],
    proTip: {
      en: "Model 10 real-world parts from photos before touching assemblies — geometry intuition comes first.",
      ar: "صمم 10 قطع حقيقية من صور قبل الانتقال للتجميعات — حدس الأشكال الهندسية يأتي أولاً.",
    },
  },
  {
    skillSlug: "seo",
    skillName: { en: "SEO", ar: "تحسين محركات البحث" },
    software: ["Google Search Console", "SEMrush", "Ahrefs", "Screaming Frog"],
    books: ["The Art of SEO", "SEO 2024"],
    websites: ["Moz Blog", "Search Engine Journal", "Google Search Central"],
    channels: ["NorthStar Academy", "LearnLoop", "ZeroToPro"],
    templates: ["Keyword research sheet", "Technical SEO audit checklist"],
    proTip: {
      en: "Audit and fix one real website end-to-end — that single project teaches more than ten courses.",
      ar: "قم بمراجعة وتحسين موقع حقيقي واحد بالكامل — مشروع واحد كهذا يعلّمك أكثر من عشر دورات.",
    },
  },
  {
    skillSlug: "agile-scrum",
    skillName: { en: "Agile & Scrum", ar: "أجايل وسكرم" },
    software: ["Jira", "Trello", "Confluence", "Miro"],
    books: ["Scrum: The Art of Doing Twice the Work in Half the Time", "User Story Mapping"],
    websites: ["Scrum.org", "Atlassian Agile Coach", "Mountain Goat Software"],
    channels: ["TheMentorDesk", "BuildWithMe", "SkillForge"],
    templates: ["Sprint planning template", "Retrospective board template"],
    proTip: {
      en: "Run a real sprint cycle on a personal project — even solo, the ceremonies build real muscle memory.",
      ar: "نفّذ دورة سبرنت حقيقية على مشروع شخصي — حتى منفرداً، الطقوس تبني عادات حقيقية.",
    },
  },
  {
    skillSlug: "autocad",
    skillName: { en: "AutoCAD", ar: "أوتوكاد" },
    software: ["AutoCAD", "Revit", "Civil 3D"],
    books: ["AutoCAD 2024 for Dummies", "Mastering AutoCAD Civil 3D"],
    websites: ["Autodesk Community", "CADTutor"],
    channels: ["PracticalPath", "CraftedTutorials", "LearnLoop"],
    templates: ["Title block template", "Layer standards sheet"],
    proTip: {
      en: "Recreate three real construction drawings from public projects to build muscle memory with standards.",
      ar: "أعد رسم ثلاث مخططات إنشائية حقيقية من مشاريع عامة لبناء عادة الالتزام بالمعايير.",
    },
  },
  {
    skillSlug: "financial-modeling",
    skillName: { en: "Financial Modeling", ar: "النمذجة المالية" },
    software: ["Excel", "Power BI", "Bloomberg Terminal"],
    books: ["Financial Modeling and Valuation", "Investment Banking (Rosenbaum & Pearl)"],
    websites: ["Wall Street Prep", "Corporate Finance Institute"],
    channels: ["NorthStar Academy", "ZeroToPro", "TheMentorDesk"],
    templates: ["3-statement model template", "DCF valuation template"],
    proTip: {
      en: "Build a 3-statement model for a real public company from its actual filings — twice.",
      ar: "ابنِ نموذجاً مالياً ثلاثي القوائم لشركة عامة حقيقية من تقاريرها الفعلية — مرتين.",
    },
  },
  {
    skillSlug: "machine-learning",
    skillName: { en: "Machine Learning", ar: "تعلم الآلة" },
    software: ["Python", "scikit-learn", "TensorFlow", "PyTorch"],
    books: ["Hands-On Machine Learning", "Deep Learning (Goodfellow)"],
    websites: ["Kaggle", "Papers with Code", "Distill.pub"],
    channels: ["LearnLoop", "SkillForge", "NorthStar Academy"],
    templates: ["EDA notebook template", "Model evaluation checklist"],
    proTip: {
      en: "Enter one Kaggle competition before any 'advanced ML' course — leaderboard feedback is the best teacher.",
      ar: "شارك في منافسة واحدة على Kaggle قبل أي دورة 'متقدمة' — تقييم لوحة الصدارة هو أفضل معلم.",
    },
  },
  {
    skillSlug: "public-speaking",
    skillName: { en: "Public Speaking", ar: "مهارات التحدث أمام الجمهور" },
    software: ["Loom (self-recording)", "Otter.ai (transcripts)"],
    books: ["Talk Like TED", "Confessions of a Public Speaker"],
    websites: ["Toastmasters International", "TED Masterclass"],
    channels: ["TheMentorDesk", "BuildWithMe"],
    templates: ["5-minute talk structure template", "Q&A prep sheet"],
    proTip: {
      en: "Record yourself weekly and watch it back muted first — body language reveals what words hide.",
      ar: "صوّر نفسك أسبوعياً وأعد المشاهدة بدون صوت أولاً — لغة الجسد تكشف ما تخفيه الكلمات.",
    },
  },
  {
    skillSlug: "time-management",
    skillName: { en: "Time Management", ar: "إدارة الوقت" },
    software: ["Notion", "Google Calendar", "Todoist"],
    books: ["Atomic Habits", "Deep Work"],
    websites: ["Cal Newport's blog", "Todoist Productivity Methods"],
    channels: ["ZeroToPro", "CraftedTutorials"],
    templates: ["Weekly time-block planner", "Eisenhower matrix template"],
    proTip: {
      en: "Track your actual time for one week before adopting any system — you can't fix what you haven't measured.",
      ar: "تابع وقتك الفعلي لمدة أسبوع قبل تطبيق أي نظام — لا يمكنك تحسين ما لم تقِسه.",
    },
  },
];

export function getToolkit(skillSlug: string) {
  return toolkits.find((t) => t.skillSlug === skillSlug);
}
