"use client";

import { useCallback, useSyncExternalStore } from "react";

export type QuizResult = { quizId: string; skillSlug: string; score: number; total: number; takenAt: string };
export type Certificate = { id: string; title: string; skillSlug: string; issuedAt: string };
export type ProjectSubmission = { projectId: string; skillSlug: string; note: string; feedback?: string; submittedAt: string };

export type ProfileState = {
  displayName: string;
  goal: string;
  skills: string[];
  completedRoadmapModules: string[];
  quizResults: QuizResult[];
  certificates: Certificate[];
  savedCourseIds: string[];
  enrolledCourseIds: string[];
  joinedChallengeIds: string[];
  appliedJobIds: string[];
  projectSubmissions: ProjectSubmission[];
};

const STORAGE_KEY = "mehnati:profile";

const defaultState: ProfileState = {
  displayName: "",
  goal: "",
  skills: ["Excel", "Git", "Communication"],
  completedRoadmapModules: [],
  quizResults: [],
  certificates: [],
  savedCourseIds: [],
  enrolledCourseIds: [],
  joinedChallengeIds: [],
  appliedJobIds: [],
  projectSubmissions: [],
};

let listeners: Array<() => void> = [];
let cache: ProfileState | null = null;

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): ProfileState {
  if (typeof window === "undefined") return defaultState;
  if (cache) return cache;
  let next: ProfileState = defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    next = raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
  } catch {
    next = defaultState;
  }
  cache = next;
  return next;
}

function getServerSnapshot(): ProfileState {
  return defaultState;
}

function write(next: ProfileState) {
  cache = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emitChange();
}

function update(fn: (prev: ProfileState) => ProfileState) {
  write(fn(getSnapshot()));
}

export function useProfile() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addSkill = useCallback((skill: string) => {
    update((prev) => (prev.skills.includes(skill) ? prev : { ...prev, skills: [...prev.skills, skill] }));
  }, []);

  const removeSkill = useCallback((skill: string) => {
    update((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  }, []);

  const toggleModule = useCallback((moduleId: string) => {
    update((prev) => ({
      ...prev,
      completedRoadmapModules: prev.completedRoadmapModules.includes(moduleId)
        ? prev.completedRoadmapModules.filter((m) => m !== moduleId)
        : [...prev.completedRoadmapModules, moduleId],
    }));
  }, []);

  const recordQuizResult = useCallback((result: QuizResult, certificate?: Certificate) => {
    update((prev) => ({
      ...prev,
      quizResults: [...prev.quizResults.filter((r) => r.quizId !== result.quizId), result],
      certificates: certificate ? [...prev.certificates.filter((c) => c.id !== certificate.id), certificate] : prev.certificates,
    }));
  }, []);

  const toggleSavedCourse = useCallback((courseId: string) => {
    update((prev) => ({
      ...prev,
      savedCourseIds: prev.savedCourseIds.includes(courseId)
        ? prev.savedCourseIds.filter((id) => id !== courseId)
        : [...prev.savedCourseIds, courseId],
    }));
  }, []);

  const enrollCourse = useCallback((courseId: string) => {
    update((prev) => ({
      ...prev,
      enrolledCourseIds: prev.enrolledCourseIds.includes(courseId)
        ? prev.enrolledCourseIds
        : [...prev.enrolledCourseIds, courseId],
    }));
  }, []);

  const toggleChallengeJoin = useCallback((challengeId: string) => {
    update((prev) => ({
      ...prev,
      joinedChallengeIds: prev.joinedChallengeIds.includes(challengeId)
        ? prev.joinedChallengeIds.filter((id) => id !== challengeId)
        : [...prev.joinedChallengeIds, challengeId],
    }));
  }, []);

  const applyToJob = useCallback((jobId: string) => {
    update((prev) => ({
      ...prev,
      appliedJobIds: prev.appliedJobIds.includes(jobId) ? prev.appliedJobIds : [...prev.appliedJobIds, jobId],
    }));
  }, []);

  const submitProject = useCallback((submission: ProjectSubmission) => {
    update((prev) => ({
      ...prev,
      projectSubmissions: [...prev.projectSubmissions.filter((p) => p.projectId !== submission.projectId), submission],
    }));
  }, []);

  const setDisplayName = useCallback((displayName: string) => {
    update((prev) => ({ ...prev, displayName }));
  }, []);

  const setGoal = useCallback((goal: string) => {
    update((prev) => ({ ...prev, goal }));
  }, []);

  const reset = useCallback(() => write(defaultState), []);

  return {
    profile: state,
    addSkill,
    removeSkill,
    toggleModule,
    recordQuizResult,
    toggleSavedCourse,
    enrollCourse,
    toggleChallengeJoin,
    applyToJob,
    submitProject,
    setDisplayName,
    setGoal,
    reset,
  };
}
