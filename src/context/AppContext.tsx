import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ActivePage,
  ResumeFormData,
  GeneratedResume,
  ResumeAnalysisResult,
  JobMatchResult,
  CareerAssistantResult,
  SkillGapResult,
  RoadmapResult,
} from '../types';
import { SAMPLE_STUDENT_PROFILE } from '../data/sampleData';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  // Resume Generator
  resumeFormData: ResumeFormData;
  setResumeFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>;
  generatedResume: GeneratedResume | null;
  setGeneratedResume: (resume: GeneratedResume | null) => void;
  loadSampleResumeForm: () => void;
  clearResumeForm: () => void;
  // Analyzer
  analyzerText: string;
  setAnalyzerText: (text: string) => void;
  analysisResult: ResumeAnalysisResult | null;
  setAnalysisResult: (result: ResumeAnalysisResult | null) => void;
  // Job Match
  jobMatchResumeText: string;
  setJobMatchResumeText: (text: string) => void;
  jobMatchDescription: string;
  setJobMatchDescription: (text: string) => void;
  jobMatchResult: JobMatchResult | null;
  setJobMatchResult: (result: JobMatchResult | null) => void;
  // Career Assistant
  careerDegree: string;
  setCareerDegree: (val: string) => void;
  careerYear: string;
  setCareerYear: (val: string) => void;
  careerSkills: string;
  setCareerSkills: (val: string) => void;
  careerInterests: string[];
  setCareerInterests: React.Dispatch<React.SetStateAction<string[]>>;
  careerDomain: string;
  setCareerDomain: (val: string) => void;
  careerExpLevel: string;
  setCareerExpLevel: (val: string) => void;
  careerResult: CareerAssistantResult | null;
  setCareerResult: (result: CareerAssistantResult | null) => void;
  // Skill Gap
  skillGapTargetRole: string;
  setSkillGapTargetRole: (role: string) => void;
  skillGapCurrentSkills: string;
  setSkillGapCurrentSkills: (skills: string) => void;
  skillGapResult: SkillGapResult | null;
  setSkillGapResult: (result: SkillGapResult | null) => void;
  // Roadmap
  roadmapTargetRole: string;
  setRoadmapTargetRole: (role: string) => void;
  roadmapCurrentSkills: string;
  setRoadmapCurrentSkills: (skills: string) => void;
  roadmapSkillGaps: string;
  setRoadmapSkillGaps: (gaps: string) => void;
  roadmapResult: RoadmapResult | null;
  setRoadmapResult: (result: RoadmapResult | null) => void;
  // Cross-Navigation Helpers
  transferResumeToAnalyzer: (text?: string) => void;
  transferResumeToJobMatch: (text?: string) => void;
  transferRoleToSkillGap: (role: string, skills?: string) => void;
  transferRoleToRoadmap: (role: string, currentSkills?: string, gaps?: string) => void;
  transferGapsToRoadmap: (role: string, currentSkills?: string, gaps?: string) => void;
  // Notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const EMPTY_FORM: ResumeFormData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedIn: '',
  gitHub: '',
  portfolio: '',
  targetRole: '',
  technicalSkills: '',
  softSkills: '',
  education: [
    {
      id: 'edu-init-1',
      degree: '',
      institution: '',
      year: '',
      cgpaOrPercentage: '',
    },
  ],
  projects: [
    {
      id: 'proj-init-1',
      title: '',
      description: '',
      technologies: '',
      roleOrContribution: '',
    },
  ],
  experience: [],
  certifications: [],
  achievements: [],
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');

  // Resume Form Data (cached in localStorage)
  const [resumeFormData, setResumeFormData] = useState<ResumeFormData>(() => {
    try {
      const saved = localStorage.getItem('rg_resume_form');
      return saved ? JSON.parse(saved) : SAMPLE_STUDENT_PROFILE;
    } catch {
      return SAMPLE_STUDENT_PROFILE;
    }
  });

  const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(() => {
    try {
      const saved = localStorage.getItem('rg_generated_resume');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Resume Analyzer
  const [analyzerText, setAnalyzerText] = useState<string>(() => {
    return localStorage.getItem('rg_analyzer_text') || '';
  });
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);

  // Job Matcher
  const [jobMatchResumeText, setJobMatchResumeText] = useState<string>('');
  const [jobMatchDescription, setJobMatchDescription] = useState<string>('');
  const [jobMatchResult, setJobMatchResult] = useState<JobMatchResult | null>(null);

  // Career Assistant
  const [careerDegree, setCareerDegree] = useState<string>('B.Tech in Computer Science');
  const [careerYear, setCareerYear] = useState<string>('3rd Year / 6th Semester');
  const [careerSkills, setCareerSkills] = useState<string>('JavaScript, React, Python, SQL, HTML/CSS, Git');
  const [careerInterests, setCareerInterests] = useState<string[]>(['Web Development', 'AI/ML', 'Cloud Computing']);
  const [careerDomain, setCareerDomain] = useState<string>('Software Engineering & Cloud');
  const [careerExpLevel, setCareerExpLevel] = useState<string>('Student / Internship Seeker');
  const [careerResult, setCareerResult] = useState<CareerAssistantResult | null>(null);

  // Skill Gap
  const [skillGapTargetRole, setSkillGapTargetRole] = useState<string>('Full Stack Developer (MERN / TypeScript)');
  const [skillGapCurrentSkills, setSkillGapCurrentSkills] = useState<string>('JavaScript, React.js, HTML5, CSS3, Basic Node.js, SQL, Git');
  const [skillGapResult, setSkillGapResult] = useState<SkillGapResult | null>(null);

  // Roadmap
  const [roadmapTargetRole, setRoadmapTargetRole] = useState<string>('Full Stack Developer (MERN / TypeScript)');
  const [roadmapCurrentSkills, setRoadmapCurrentSkills] = useState<string>('JavaScript, React, Node.js basics, SQL');
  const [roadmapSkillGaps, setRoadmapSkillGaps] = useState<string>('TypeScript, Docker, AWS, System Design, CI/CD');
  const [roadmapResult, setRoadmapResult] = useState<RoadmapResult | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('rg_resume_form', JSON.stringify(resumeFormData));
    } catch {
      // ignore
    }
  }, [resumeFormData]);

  useEffect(() => {
    try {
      if (generatedResume) {
        localStorage.setItem('rg_generated_resume', JSON.stringify(generatedResume));
      }
    } catch {
      // ignore
    }
  }, [generatedResume]);

  useEffect(() => {
    try {
      localStorage.setItem('rg_analyzer_text', analyzerText);
    } catch {
      // ignore
    }
  }, [analyzerText]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loadSampleResumeForm = () => {
    setResumeFormData(SAMPLE_STUDENT_PROFILE);
    showToast('Loaded sample student profile data!', 'success');
  };

  const clearResumeForm = () => {
    setResumeFormData(EMPTY_FORM);
    setGeneratedResume(null);
    showToast('Cleared resume form fields.', 'info');
  };

  // Helper to serialize generated resume to readable plain text
  const resumeToPlainText = (res: GeneratedResume | null): string => {
    if (!res) return '';
    let text = `${res.fullName}\n${res.location} | ${res.phone} | ${res.email}\nLinkedIn: ${res.linkedIn} | GitHub: ${res.gitHub}\n\n`;
    text += `CAREER OBJECTIVE / SUMMARY\n${res.professionalSummary}\n\n`;
    text += `TECHNICAL SKILLS\n`;
    res.technicalSkills?.forEach((cat) => {
      text += `${cat.category}: ${cat.skills.join(', ')}\n`;
    });
    if (res.softSkills?.length) {
      text += `Soft Skills: ${res.softSkills.join(', ')}\n`;
    }
    text += `\nEDUCATION\n`;
    res.education?.forEach((edu) => {
      text += `${edu.degree} - ${edu.institution} (${edu.year}) - ${edu.cgpaOrPercentage}\n`;
    });
    text += `\nPROJECTS\n`;
    res.projects?.forEach((proj) => {
      text += `${proj.title} [${proj.technologies.join(', ')}]\n`;
      proj.bulletPoints?.forEach((bp) => {
        text += `- ${bp}\n`;
      });
    });
    if (res.experience?.length) {
      text += `\nEXPERIENCE\n`;
      res.experience?.forEach((exp) => {
        text += `${exp.role} at ${exp.organization} (${exp.duration})\n`;
        exp.bulletPoints?.forEach((bp) => {
          text += `- ${bp}\n`;
        });
      });
    }
    if (res.certifications?.length) {
      text += `\nCERTIFICATIONS\n`;
      res.certifications?.forEach((c) => {
        text += `- ${c.name} (${c.issuer}, ${c.year})\n`;
      });
    }
    if (res.achievements?.length) {
      text += `\nACHIEVEMENTS\n`;
      res.achievements?.forEach((a) => {
        text += `- ${a.title}: ${a.description}\n`;
      });
    }
    return text;
  };

  const transferResumeToAnalyzer = (customText?: string) => {
    const text = customText || (generatedResume ? resumeToPlainText(generatedResume) : '');
    if (text) {
      setAnalyzerText(text);
      showToast('Transferred resume to Analyzer!', 'success');
    }
    setActivePage('resume-analyzer');
  };

  const transferResumeToJobMatch = (customText?: string) => {
    const text = customText || (generatedResume ? resumeToPlainText(generatedResume) : analyzerText);
    if (text) {
      setJobMatchResumeText(text);
      showToast('Transferred resume to Job Matcher!', 'success');
    }
    setActivePage('job-match');
  };

  const transferRoleToSkillGap = (role: string, skills?: string) => {
    setSkillGapTargetRole(role);
    if (skills) {
      setSkillGapCurrentSkills(skills);
    } else if (resumeFormData.technicalSkills) {
      setSkillGapCurrentSkills(resumeFormData.technicalSkills);
    }
    showToast(`Loaded "${role}" into Skill Gap Analyzer`, 'info');
    setActivePage('skill-gap');
  };

  const transferRoleToRoadmap = (role: string, currentSkills?: string, gaps?: string) => {
    setRoadmapTargetRole(role);
    if (currentSkills) {
      setRoadmapCurrentSkills(currentSkills);
    } else if (resumeFormData.technicalSkills) {
      setRoadmapCurrentSkills(resumeFormData.technicalSkills);
    }
    if (gaps) {
      setRoadmapSkillGaps(gaps);
    }
    showToast(`Loaded "${role}" into Learning Roadmap`, 'info');
    setActivePage('roadmap');
  };

  const transferGapsToRoadmap = (role: string, currentSkills?: string, gaps?: string) => {
    transferRoleToRoadmap(role, currentSkills, gaps);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        resumeFormData,
        setResumeFormData,
        generatedResume,
        setGeneratedResume,
        loadSampleResumeForm,
        clearResumeForm,
        analyzerText,
        setAnalyzerText,
        analysisResult,
        setAnalysisResult,
        jobMatchResumeText,
        setJobMatchResumeText,
        jobMatchDescription,
        setJobMatchDescription,
        jobMatchResult,
        setJobMatchResult,
        careerDegree,
        setCareerDegree,
        careerYear,
        setCareerYear,
        careerSkills,
        setCareerSkills,
        careerInterests,
        setCareerInterests,
        careerDomain,
        setCareerDomain,
        careerExpLevel,
        setCareerExpLevel,
        careerResult,
        setCareerResult,
        skillGapTargetRole,
        setSkillGapTargetRole,
        skillGapCurrentSkills,
        setSkillGapCurrentSkills,
        skillGapResult,
        setSkillGapResult,
        roadmapTargetRole,
        setRoadmapTargetRole,
        roadmapCurrentSkills,
        setRoadmapCurrentSkills,
        roadmapSkillGaps,
        setRoadmapSkillGaps,
        roadmapResult,
        setRoadmapResult,
        transferResumeToAnalyzer,
        transferResumeToJobMatch,
        transferRoleToSkillGap,
        transferRoleToRoadmap,
        transferGapsToRoadmap,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
