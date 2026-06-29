import type { Domain } from "./types";

export const domains: Domain[] = [
  {
    slug: "software-development",
    name: { en: "Software Development", ar: "تطوير البرمجيات" },
    icon: "Code2",
    description: {
      en: "Build web, mobile and backend systems used by millions.",
      ar: "بناء تطبيقات الويب والموبايل والأنظمة الخلفية المستخدمة من الملايين.",
    },
    avgSalaryUsd: [45000, 140000],
    topSkills: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "System Design", "Git", "REST APIs"],
    software: ["VS Code", "GitHub", "Docker", "Postman", "Figma"],
    certifications: [
      { en: "AWS Certified Developer", ar: "شهادة AWS للمطورين" },
      { en: "Meta Front-End Developer", ar: "شهادة Meta للواجهات الأمامية" },
    ],
    relatedJobTitles: [
      { en: "Frontend Engineer", ar: "مطور واجهات أمامية" },
      { en: "Backend Engineer", ar: "مطور خلفي" },
      { en: "Full-Stack Developer", ar: "مطور متكامل" },
    ],
    mostDemandedSkills: [
      { skill: "TypeScript", demandPercent: 92 },
      { skill: "React", demandPercent: 88 },
      { skill: "System Design", demandPercent: 76 },
      { skill: "SQL", demandPercent: 71 },
      { skill: "Docker", demandPercent: 64 },
    ],
  },
  {
    slug: "mechanical-engineering",
    name: { en: "Mechanical Engineering", ar: "الهندسة الميكانيكية" },
    icon: "Cog",
    description: {
      en: "Design, analyze and manufacture mechanical systems and machines.",
      ar: "تصميم وتحليل وتصنيع الأنظمة والآلات الميكانيكية.",
    },
    avgSalaryUsd: [42000, 110000],
    topSkills: ["CAD Modeling", "Thermodynamics", "FEA/Simulation", "GD&T", "Manufacturing Processes", "Project Management"],
    software: ["SolidWorks", "AutoCAD", "ANSYS", "MATLAB", "Siemens NX"],
    certifications: [
      { en: "Certified SolidWorks Professional (CSWP)", ar: "شهادة SolidWorks المحترف (CSWP)" },
      { en: "Six Sigma Green Belt", ar: "شهادة Six Sigma الحزام الأخضر" },
    ],
    relatedJobTitles: [
      { en: "Design Engineer", ar: "مهندس تصميم" },
      { en: "Manufacturing Engineer", ar: "مهندس تصنيع" },
      { en: "HVAC Engineer", ar: "مهندس تكييف وتبريد" },
    ],
    mostDemandedSkills: [
      { skill: "SolidWorks", demandPercent: 85 },
      { skill: "FEA/Simulation", demandPercent: 73 },
      { skill: "GD&T", demandPercent: 68 },
      { skill: "AutoCAD", demandPercent: 66 },
      { skill: "Six Sigma", demandPercent: 52 },
    ],
  },
  {
    slug: "digital-marketing",
    name: { en: "Digital Marketing", ar: "التسويق الرقمي" },
    icon: "Megaphone",
    description: {
      en: "Grow brands and revenue through performance and content marketing.",
      ar: "تنمية العلامات التجارية والإيرادات عبر التسويق الأدائي والمحتوى.",
    },
    avgSalaryUsd: [32000, 95000],
    topSkills: ["SEO", "Paid Media (Meta/Google Ads)", "Content Strategy", "Analytics", "Email Marketing", "Copywriting"],
    software: ["Google Analytics", "Meta Ads Manager", "HubSpot", "Canva", "SEMrush"],
    certifications: [
      { en: "Google Ads Certification", ar: "شهادة جوجل للإعلانات" },
      { en: "HubSpot Content Marketing", ar: "شهادة HubSpot للتسويق بالمحتوى" },
    ],
    relatedJobTitles: [
      { en: "Performance Marketer", ar: "مسوق أدائي" },
      { en: "SEO Specialist", ar: "أخصائي SEO" },
      { en: "Content Strategist", ar: "مخطط محتوى" },
    ],
    mostDemandedSkills: [
      { skill: "SEO", demandPercent: 81 },
      { skill: "Paid Media", demandPercent: 78 },
      { skill: "Analytics", demandPercent: 70 },
      { skill: "Copywriting", demandPercent: 62 },
      { skill: "Email Marketing", demandPercent: 55 },
    ],
  },
  {
    slug: "data-science",
    name: { en: "Data Science & AI", ar: "علم البيانات والذكاء الاصطناعي" },
    icon: "BrainCircuit",
    description: {
      en: "Turn data into decisions with statistics, ML and AI systems.",
      ar: "تحويل البيانات إلى قرارات باستخدام الإحصاء وتعلم الآلة والذكاء الاصطناعي.",
    },
    avgSalaryUsd: [55000, 160000],
    topSkills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization", "Deep Learning"],
    software: ["Python/Jupyter", "Pandas", "TensorFlow/PyTorch", "Power BI", "Tableau"],
    certifications: [
      { en: "Google Professional Data Engineer", ar: "شهادة جوجل لمهندس البيانات" },
      { en: "TensorFlow Developer Certificate", ar: "شهادة TensorFlow للمطورين" },
    ],
    relatedJobTitles: [
      { en: "Data Scientist", ar: "عالم بيانات" },
      { en: "ML Engineer", ar: "مهندس تعلم آلة" },
      { en: "Data Analyst", ar: "محلل بيانات" },
    ],
    mostDemandedSkills: [
      { skill: "Python", demandPercent: 90 },
      { skill: "Machine Learning", demandPercent: 82 },
      { skill: "SQL", demandPercent: 77 },
      { skill: "Deep Learning", demandPercent: 65 },
      { skill: "Data Visualization", demandPercent: 60 },
    ],
  },
  {
    slug: "graphic-design",
    name: { en: "Graphic & UI/UX Design", ar: "التصميم الجرافيكي وتجربة المستخدم" },
    icon: "Palette",
    description: {
      en: "Craft visual identities and digital product experiences.",
      ar: "تصميم الهويات البصرية وتجارب المنتجات الرقمية.",
    },
    avgSalaryUsd: [30000, 90000],
    topSkills: ["UI Design", "UX Research", "Typography", "Prototyping", "Branding", "Design Systems"],
    software: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Framer", "Notion"],
    certifications: [
      { en: "Google UX Design Certificate", ar: "شهادة جوجل لتصميم تجربة المستخدم" },
      { en: "Adobe Certified Professional", ar: "شهادة Adobe المحترف" },
    ],
    relatedJobTitles: [
      { en: "UI/UX Designer", ar: "مصمم واجهات وتجربة مستخدم" },
      { en: "Brand Designer", ar: "مصمم هوية بصرية" },
      { en: "Product Designer", ar: "مصمم منتجات" },
    ],
    mostDemandedSkills: [
      { skill: "Figma", demandPercent: 87 },
      { skill: "UX Research", demandPercent: 71 },
      { skill: "Prototyping", demandPercent: 68 },
      { skill: "Design Systems", demandPercent: 58 },
      { skill: "Branding", demandPercent: 54 },
    ],
  },
  {
    slug: "project-management",
    name: { en: "Project & Product Management", ar: "إدارة المشاريع والمنتجات" },
    icon: "ClipboardList",
    description: {
      en: "Lead teams and deliver products and projects on time and budget.",
      ar: "قيادة الفرق وتسليم المشاريع والمنتجات في الوقت والموازنة المحددة.",
    },
    avgSalaryUsd: [40000, 120000],
    topSkills: ["Agile/Scrum", "Stakeholder Management", "Roadmapping", "Risk Management", "Budgeting", "Communication"],
    software: ["Jira", "Asana", "Notion", "MS Project", "Confluence"],
    certifications: [
      { en: "PMP — Project Management Professional", ar: "شهادة PMP لإدارة المشاريع" },
      { en: "Certified ScrumMaster (CSM)", ar: "شهادة Scrum Master المعتمد" },
    ],
    relatedJobTitles: [
      { en: "Project Manager", ar: "مدير مشروع" },
      { en: "Product Manager", ar: "مدير منتج" },
      { en: "Scrum Master", ar: "سكرم ماستر" },
    ],
    mostDemandedSkills: [
      { skill: "Agile/Scrum", demandPercent: 80 },
      { skill: "Stakeholder Management", demandPercent: 69 },
      { skill: "Roadmapping", demandPercent: 61 },
      { skill: "Risk Management", demandPercent: 57 },
      { skill: "Jira", demandPercent: 55 },
    ],
  },
  {
    slug: "finance-accounting",
    name: { en: "Finance & Accounting", ar: "المالية والمحاسبة" },
    icon: "Landmark",
    description: {
      en: "Manage capital, reporting and financial strategy for organizations.",
      ar: "إدارة رأس المال والتقارير والاستراتيجية المالية للمؤسسات.",
    },
    avgSalaryUsd: [35000, 130000],
    topSkills: ["Financial Modeling", "Excel/Power Query", "Accounting Standards (IFRS)", "Valuation", "Budgeting", "SQL"],
    software: ["Excel", "Power BI", "QuickBooks", "SAP", "Bloomberg Terminal"],
    certifications: [
      { en: "CFA — Chartered Financial Analyst", ar: "شهادة CFA المحلل المالي المعتمد" },
      { en: "CPA — Certified Public Accountant", ar: "شهادة CPA المحاسب القانوني" },
    ],
    relatedJobTitles: [
      { en: "Financial Analyst", ar: "محلل مالي" },
      { en: "Accountant", ar: "محاسب" },
      { en: "FP&A Manager", ar: "مدير التخطيط المالي" },
    ],
    mostDemandedSkills: [
      { skill: "Financial Modeling", demandPercent: 75 },
      { skill: "Excel", demandPercent: 91 },
      { skill: "IFRS", demandPercent: 60 },
      { skill: "Valuation", demandPercent: 56 },
      { skill: "SQL", demandPercent: 44 },
    ],
  },
  {
    slug: "civil-engineering",
    name: { en: "Civil Engineering", ar: "الهندسة المدنية" },
    icon: "Building2",
    description: {
      en: "Design and oversee infrastructure, buildings and construction projects.",
      ar: "تصميم والإشراف على البنية التحتية والمباني ومشاريع الإنشاءات.",
    },
    avgSalaryUsd: [38000, 105000],
    topSkills: ["Structural Analysis", "AutoCAD/Revit", "Site Supervision", "Cost Estimation", "Geotechnical Analysis"],
    software: ["AutoCAD", "Revit", "ETABS", "SAP2000", "Primavera P6"],
    certifications: [
      { en: "PE — Professional Engineer License", ar: "ترخيص المهندس المحترف PE" },
      { en: "PMP for Construction", ar: "شهادة PMP للإنشاءات" },
    ],
    relatedJobTitles: [
      { en: "Structural Engineer", ar: "مهندس إنشائي" },
      { en: "Site Engineer", ar: "مهندس موقع" },
      { en: "Construction Project Manager", ar: "مدير مشروع إنشائي" },
    ],
    mostDemandedSkills: [
      { skill: "AutoCAD/Revit", demandPercent: 79 },
      { skill: "Structural Analysis", demandPercent: 72 },
      { skill: "Primavera P6", demandPercent: 58 },
      { skill: "Cost Estimation", demandPercent: 54 },
      { skill: "Site Supervision", demandPercent: 51 },
    ],
  },
];

export function getDomain(slug: string) {
  return domains.find((d) => d.slug === slug);
}
