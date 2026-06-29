import type { Job } from "./types";

export const jobs: Job[] = [
  {
    id: "job-1",
    title: { en: "Frontend Engineer (React)", ar: "مهندس واجهات أمامية (React)" },
    company: "Northwind Labs",
    domainSlug: "software-development",
    location: { en: "Remote", ar: "عن بُعد" },
    remote: true,
    salaryRange: [55000, 90000],
    requiredSkills: ["React", "TypeScript", "REST APIs", "Git"],
    level: "intermediate",
  },
  {
    id: "job-2",
    title: { en: "Backend Engineer (Node.js)", ar: "مهندس خلفي (Node.js)" },
    company: "Bluecrest Systems",
    domainSlug: "software-development",
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    remote: false,
    salaryRange: [60000, 100000],
    requiredSkills: ["Node.js", "SQL", "System Design", "Docker"],
    level: "advanced",
  },
  {
    id: "job-3",
    title: { en: "Mechanical Design Engineer", ar: "مهندس تصميم ميكانيكي" },
    company: "Falcon Manufacturing",
    domainSlug: "mechanical-engineering",
    location: { en: "Riyadh, Saudi Arabia", ar: "الرياض، السعودية" },
    remote: false,
    salaryRange: [38000, 65000],
    requiredSkills: ["CAD Modeling", "SolidWorks", "GD&T"],
    level: "intermediate",
  },
  {
    id: "job-4",
    title: { en: "Manufacturing Process Engineer", ar: "مهندس عمليات تصنيع" },
    company: "Atlas Industrial",
    domainSlug: "mechanical-engineering",
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    remote: false,
    salaryRange: [30000, 52000],
    requiredSkills: ["Manufacturing Processes", "Six Sigma", "AutoCAD"],
    level: "beginner",
  },
  {
    id: "job-5",
    title: { en: "Performance Marketing Specialist", ar: "أخصائي تسويق أدائي" },
    company: "Reach Digital",
    domainSlug: "digital-marketing",
    location: { en: "Remote", ar: "عن بُعد" },
    remote: true,
    salaryRange: [28000, 55000],
    requiredSkills: ["Paid Media (Meta/Google Ads)", "Analytics", "Copywriting"],
    level: "intermediate",
  },
  {
    id: "job-6",
    title: { en: "SEO Lead", ar: "قائد فريق سيو" },
    company: "Marketly",
    domainSlug: "digital-marketing",
    location: { en: "Amman, Jordan", ar: "عمّان، الأردن" },
    remote: false,
    salaryRange: [35000, 62000],
    requiredSkills: ["SEO", "Content Strategy", "Analytics"],
    level: "advanced",
  },
  {
    id: "job-7",
    title: { en: "Data Scientist", ar: "عالم بيانات" },
    company: "Vantage Analytics",
    domainSlug: "data-science",
    location: { en: "Remote", ar: "عن بُعد" },
    remote: true,
    salaryRange: [65000, 120000],
    requiredSkills: ["Python", "Machine Learning", "SQL", "Statistics"],
    level: "advanced",
  },
  {
    id: "job-8",
    title: { en: "Junior Data Analyst", ar: "محلل بيانات مبتدئ" },
    company: "Insight Co.",
    domainSlug: "data-science",
    location: { en: "Casablanca, Morocco", ar: "الدار البيضاء، المغرب" },
    remote: false,
    salaryRange: [22000, 38000],
    requiredSkills: ["SQL", "Data Visualization", "Excel"],
    level: "beginner",
  },
  {
    id: "job-9",
    title: { en: "Product Designer", ar: "مصمم منتجات" },
    company: "Loop Studio",
    domainSlug: "graphic-design",
    location: { en: "Remote", ar: "عن بُعد" },
    remote: true,
    salaryRange: [40000, 78000],
    requiredSkills: ["UI Design", "UX Research", "Figma", "Prototyping"],
    level: "intermediate",
  },
  {
    id: "job-10",
    title: { en: "Brand & Visual Designer", ar: "مصمم هوية بصرية" },
    company: "Studio North",
    domainSlug: "graphic-design",
    location: { en: "Beirut, Lebanon", ar: "بيروت، لبنان" },
    remote: false,
    salaryRange: [24000, 45000],
    requiredSkills: ["Branding", "Typography", "Adobe Illustrator"],
    level: "beginner",
  },
  {
    id: "job-11",
    title: { en: "Project Manager (Tech)", ar: "مدير مشروع (تقني)" },
    company: "Beacon Partners",
    domainSlug: "project-management",
    location: { en: "Remote", ar: "عن بُعد" },
    remote: true,
    salaryRange: [48000, 88000],
    requiredSkills: ["Agile/Scrum", "Stakeholder Management", "Jira"],
    level: "advanced",
  },
  {
    id: "job-12",
    title: { en: "Associate Product Manager", ar: "مدير منتج مساعد" },
    company: "Brightside",
    domainSlug: "project-management",
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    remote: false,
    salaryRange: [35000, 60000],
    requiredSkills: ["Roadmapping", "Communication", "Agile/Scrum"],
    level: "intermediate",
  },
  {
    id: "job-13",
    title: { en: "Financial Analyst", ar: "محلل مالي" },
    company: "Carrington Capital",
    domainSlug: "finance-accounting",
    location: { en: "Riyadh, Saudi Arabia", ar: "الرياض، السعودية" },
    remote: false,
    salaryRange: [32000, 58000],
    requiredSkills: ["Financial Modeling", "Excel/Power Query", "Valuation"],
    level: "intermediate",
  },
  {
    id: "job-14",
    title: { en: "Junior Accountant", ar: "محاسب مبتدئ" },
    company: "Cedar & Co.",
    domainSlug: "finance-accounting",
    location: { en: "Amman, Jordan", ar: "عمّان، الأردن" },
    remote: false,
    salaryRange: [18000, 30000],
    requiredSkills: ["Accounting Standards (IFRS)", "Excel/Power Query"],
    level: "beginner",
  },
  {
    id: "job-15",
    title: { en: "Structural Engineer", ar: "مهندس إنشائي" },
    company: "Helix Construction",
    domainSlug: "civil-engineering",
    location: { en: "Doha, Qatar", ar: "الدوحة، قطر" },
    remote: false,
    salaryRange: [40000, 75000],
    requiredSkills: ["Structural Analysis", "AutoCAD/Revit"],
    level: "advanced",
  },
  {
    id: "job-16",
    title: { en: "Site Engineer", ar: "مهندس موقع" },
    company: "Terra Build",
    domainSlug: "civil-engineering",
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    remote: false,
    salaryRange: [24000, 42000],
    requiredSkills: ["Site Supervision", "Cost Estimation"],
    level: "beginner",
  },
];

export function getJobsByDomain(domainSlug: string) {
  return jobs.filter((j) => j.domainSlug === domainSlug);
}

export function getJob(id: string) {
  return jobs.find((j) => j.id === id);
}

export function computeMatch(job: Job, userSkills: string[]): number {
  if (job.requiredSkills.length === 0) return 0;
  const normalizedUser = userSkills.map((s) => s.toLowerCase());
  const matched = job.requiredSkills.filter((s) => normalizedUser.includes(s.toLowerCase()));
  return Math.round((matched.length / job.requiredSkills.length) * 100);
}

export function getJobApplyUrl(job: Job): string {
  return `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(`${job.title.en} ${job.company}`)}`;
}
