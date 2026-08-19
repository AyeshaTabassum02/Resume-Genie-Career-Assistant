export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  cgpaOrPercentage: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  roleOrContribution: string;
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  duration: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface ResumeFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  gitHub: string;
  portfolio?: string;
  targetRole: string;
  technicalSkills: string;
  softSkills: string;
  education: Education[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  achievements: Achievement[];
}

export interface GeneratedResume {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  gitHub: string;
  portfolio?: string;
  targetRole: string;
  professionalSummary: string;
  technicalSkills: {
    category: string;
    skills: string[];
  }[];
  softSkills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
    cgpaOrPercentage: string;
    highlights?: string[];
  }[];
  projects: {
    title: string;
    technologies: string[];
    role: string;
    bulletPoints: string[];
  }[];
  experience: {
    organization: string;
    role: string;
    duration: string;
    bulletPoints: string[];
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: string;
  }[];
  achievements: {
    title: string;
    description: string;
  }[];
}

export type ResumeTemplateType = 'modern' | 'classic' | 'minimal';

export interface ResumeScoreBreakdown {
  content: number;
  skills: number;
  projects: number;
  experience: number;
  formatting: number;
  keywords: number;
  impact: number;
}

export interface ResumeAnalysisResult {
  overallScore: number;
  breakdown: ResumeScoreBreakdown;
  summaryFeedback: string;
  detectedSkills: string[];
  strengths: string[];
  weaknesses: string[];
  missingSections: string[];
  suggestions: string[];
  atsReadinessSummary: string;
}

export interface JobMatchResult {
  matchScore: number;
  summary: string;
  matchingSkills: string[];
  missingSkills: string[];
  relevantExperience: string[];
  recommendedKeywords: string[];
  tailoringSuggestions: string[];
  readinessVerdict: string;
}

export interface CareerRoleRecommendation {
  role: string;
  suitabilityScore: number;
  reason: string;
  existingSkills: string[];
  skillsToLearn: string[];
  keyResponsibilities: string[];
  estimatedDifficulty: 'Beginner-Friendly' | 'Moderate' | 'Advanced';
}

export interface CareerAssistantResult {
  overview: string;
  recommendedRoles: CareerRoleRecommendation[];
  topEmergingTrends: string[];
}

export interface SkillItem {
  name: string;
  category: string;
  status: 'have' | 'developing' | 'to_learn';
  proficiencyLevel: number; // 0 to 100
  reason?: string;
}

export interface SkillGapResult {
  targetRole: string;
  readinessPercentage: number;
  summary: string;
  skillsHave: SkillItem[];
  skillsDeveloping: SkillItem[];
  skillsToLearn: SkillItem[];
  quickWinActions: string[];
}

export interface RoadmapTopic {
  topic?: string;
  topicName?: string;
  explanation: string;
  whyItMatters: string;
  suggestedPractice: string;
  priority: 'High' | 'Medium' | 'Low' | string;
  completed?: boolean;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseTitle: string;
  goal?: string;
  description?: string;
  durationWeeks?: string;
  topics: RoadmapTopic[];
}

export interface RoadmapResult {
  targetRole: string;
  experienceLevel?: string;
  roadmapSummary?: string;
  summary?: string;
  estimatedTimeline?: string;
  estimatedDuration?: string;
  phases: RoadmapPhase[];
}

export type ActivePage = 
  | 'home'
  | 'resume-genie'
  | 'resume-analyzer'
  | 'job-match'
  | 'career-assistant'
  | 'skill-gap'
  | 'roadmap';
