import {
  ResumeFormData,
  GeneratedResume,
  ResumeAnalysisResult,
  JobMatchResult,
  CareerAssistantResult,
  SkillGapResult,
  RoadmapResult,
} from '../types';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMsg = 'An unexpected server error occurred.';
    try {
      const data = await res.json();
      if (data.error) errorMsg = data.error;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }
  const json = await res.json();
  return json.data !== undefined ? json.data : json;
}

export const apiService = {
  async checkHealth(): Promise<{ status: string; hasApiKey: boolean }> {
    const res = await fetch('/api/health');
    return handleResponse(res);
  },

  async generateResume(formData: ResumeFormData): Promise<GeneratedResume> {
    const res = await fetch('/api/generate-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return handleResponse<GeneratedResume>(res);
  },

  async analyzeResume(resumeText: string): Promise<ResumeAnalysisResult> {
    const res = await fetch('/api/analyze-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText }),
    });
    return handleResponse<ResumeAnalysisResult>(res);
  },

  async matchJob(resumeText: string, jobDescription: string): Promise<JobMatchResult> {
    const res = await fetch('/api/match-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, jobDescription }),
    });
    return handleResponse<JobMatchResult>(res);
  },

  async getCareerGuidance(payload: {
    degree: string;
    yearOrSemester: string;
    technicalSkills: string;
    softSkills: string;
    interests: string[];
    preferredDomain: string;
    experienceLevel: string;
    preferredRole?: string;
  }): Promise<CareerAssistantResult> {
    const res = await fetch('/api/career-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<CareerAssistantResult>(res);
  },

  async analyzeSkillGap(payload: {
    targetRole: string;
    currentSkills: string;
    currentExperience?: string;
  }): Promise<SkillGapResult> {
    const res = await fetch('/api/skill-gap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<SkillGapResult>(res);
  },

  async generateRoadmap(payload: {
    targetRole: string;
    currentSkills: string;
    skillGaps?: string;
    experienceLevel?: string;
    timeframe?: string;
    hoursPerWeek?: string;
  }): Promise<RoadmapResult> {
    const res = await fetch('/api/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<RoadmapResult>(res);
  },
};
