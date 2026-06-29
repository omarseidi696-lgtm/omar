export type Level = "beginner" | "intermediate" | "advanced" | "professional" | "expert";

export type Domain = {
  slug: string;
  name: { en: string; ar: string };
  icon: string;
  description: { en: string; ar: string };
  avgSalaryUsd: [number, number];
  topSkills: string[];
  software: string[];
  certifications: { en: string; ar: string }[];
  relatedJobTitles: { en: string; ar: string }[];
  mostDemandedSkills: { skill: string; demandPercent: number }[];
};

export type Course = {
  id: string;
  title: { en: string; ar: string };
  provider: string;
  domainSlug: string;
  level: Level;
  price: number; // 0 = free
  currency: "USD";
  language: "en" | "ar" | "multi";
  durationHours: number;
  hasCertificate: boolean;
  rating: number;
  students: number;
  tags: string[];
};

export type VideoItem = {
  id: string;
  title: { en: string; ar: string };
  channel: string;
  level: Level;
  durationMinutes: number;
  rating: number;
  skillSlug: string;
};

export type ToolKitItem = { name: string; type: "software" | "book" | "website" | "channel" | "template"; url?: string };

export type SkillToolkit = {
  skillSlug: string;
  skillName: { en: string; ar: string };
  software: string[];
  books: string[];
  websites: string[];
  channels: string[];
  templates: string[];
  proTip: { en: string; ar: string };
};

export type RoadmapModule = { id: string; title: { en: string; ar: string }; level: Level };

export type Roadmap = {
  skillSlug: string;
  skillName: { en: string; ar: string };
  modules: RoadmapModule[];
};

export type Project = {
  id: string;
  skillSlug: string;
  level: Level;
  title: { en: string; ar: string };
  brief: { en: string; ar: string };
  deliverables: { en: string; ar: string }[];
};

export type QuizQuestion = {
  question: { en: string; ar: string };
  options: { en: string; ar: string }[];
  answerIndex: number;
};

export type Quiz = {
  id: string;
  skillSlug: string;
  level: Level;
  tier: "short" | "medium" | "professional";
  title: { en: string; ar: string };
  questions: QuizQuestion[];
};

export type Job = {
  id: string;
  title: { en: string; ar: string };
  company: string;
  domainSlug: string;
  location: { en: string; ar: string };
  remote: boolean;
  salaryRange: [number, number];
  requiredSkills: string[];
  level: Level;
};

export type CommunityGroup = {
  id: string;
  domainSlug: string;
  name: { en: string; ar: string };
  members: number;
  threads: number;
};

export type CommunityChallenge = {
  id: string;
  type: "weekly" | "monthly";
  title: { en: string; ar: string };
  domainSlug: string;
  deadline: string;
  participants: number;
};
