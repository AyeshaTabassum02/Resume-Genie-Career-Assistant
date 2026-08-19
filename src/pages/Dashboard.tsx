import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  FileEdit,
  FileSearch,
  Target,
  Compass,
  GitPullRequest,
  Map,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Play,
  Layers,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { setActivePage, loadSampleResumeForm, analysisResult, generatedResume } = useApp();

  const features = [
    {
      id: 'resume-genie',
      title: 'Resume Genie',
      subtitle: 'AI Resume Generator',
      description: 'Generate polished, ATS-optimized resumes with action-oriented bullets across Modern, Classic, and Minimal templates.',
      icon: FileEdit,
      badge: '3 Templates',
      actionLabel: 'Create Resume',
    },
    {
      id: 'resume-analyzer',
      title: 'Resume Analyzer',
      subtitle: 'NLP Content & ATS Evaluation',
      description: 'Get deep AI scoring (0–100), detected skills cloud, strengths, weaknesses, and missing critical sections in seconds.',
      icon: FileSearch,
      badge: 'NLP Scoring',
      actionLabel: 'Analyze Resume',
    },
    {
      id: 'job-match',
      title: 'Job Matcher',
      subtitle: 'ATS Job Description Comparison',
      description: 'Compare your resume against any target job description to pinpoint matched keywords, missing competencies, and alignment.',
      icon: Target,
      badge: 'Match % & Keywords',
      actionLabel: 'Match a Job',
    },
    {
      id: 'career-assistant',
      title: 'Career Assistant',
      subtitle: 'AI Role Recommendations',
      description: 'Discover optimal career roles based on your academic degree, skills inventory, interests, and industry demand.',
      icon: Compass,
      badge: 'Role Scoring',
      actionLabel: 'Explore Roles',
    },
    {
      id: 'skill-gap',
      title: 'Skill Gap Analyzer',
      subtitle: 'Current vs. Target Role Matrix',
      description: 'Categorize your skills into Have (Green), Developing (Yellow), and To Learn (Red) with clear visual progress meters.',
      icon: GitPullRequest,
      badge: 'Readiness Meter',
      actionLabel: 'Check Gaps',
    },
    {
      id: 'roadmap',
      title: 'Learning Roadmap',
      subtitle: '5-Phase Structured Progression',
      description: 'Personalized master curriculum spanning Fundamentals, Intermediate, Advanced, Capstone Projects, and Interview Prep.',
      icon: Map,
      badge: '5 Phases',
      actionLabel: 'View Roadmap',
    },
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-blue-500/20">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-bold text-blue-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Career Suite • Gemini 3.7 Flash</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Your AI Career Assistant is ready.
          </h2>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
            Build a professional resume, analyze skill gaps, compare job descriptions, and discover your personalized learning roadmap in seconds.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="hero-create-btn"
              onClick={() => setActivePage('resume-genie')}
              className="px-5 py-2.5 bg-white text-blue-600 font-bold rounded-xl text-sm shadow-md hover:bg-blue-50 transition-colors"
            >
              Resume Genie
            </button>
            <button
              id="hero-jobmatch-btn"
              onClick={() => setActivePage('job-match')}
              className="px-5 py-2.5 bg-blue-500/30 text-white font-bold rounded-xl text-sm border border-blue-400/30 hover:bg-blue-500/40 transition-colors"
            >
              Analyze Job Match
            </button>
            <button
              id="hero-demo-btn"
              onClick={() => {
                loadSampleResumeForm();
                setActivePage('resume-genie');
              }}
              className="px-4 py-2.5 text-amber-200 hover:text-white font-medium text-xs flex items-center space-x-1.5 transition-colors"
              title="Loads pre-filled sample student profile"
            >
              <Play className="w-3.5 h-3.5 fill-amber-300" />
              <span>1-Click Demo</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative geometry */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
          <div className="w-64 h-64 border-[24px] border-white rounded-full"></div>
        </div>
      </section>

      {/* Grid: 8 cols main + 4 cols AI insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* 2 Stats Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Resume Health Score */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-sm">Resume Health Score</h3>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  +12% vs benchmark
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="relative w-24 h-24 shrink-0">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="38" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                    <circle
                      cx="48"
                      cy="48"
                      r="38"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="238.7"
                      strokeDashoffset={238.7 - (238.7 * (analysisResult?.overallScore || 84)) / 100}
                      className="text-blue-600 transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900">{analysisResult?.overallScore || 84}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                      {analysisResult?.overallScore && analysisResult.overallScore >= 80 ? 'Strong' : 'Good'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-right text-xs">
                  <div className="font-medium text-slate-500">
                    Detected Skills: <span className="font-bold text-slate-800">{analysisResult?.detectedSkills?.length || 24}</span>
                  </div>
                  <div className="font-medium text-slate-500">
                    Strengths: <span className="font-bold text-emerald-600">{analysisResult?.strengths?.length || 6}</span>
                  </div>
                  <div className="font-medium text-slate-500">
                    Action Items: <span className="font-bold text-amber-600">{analysisResult?.weaknesses?.length || 2}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Career Compatibility */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 space-y-3.5">
              <h3 className="font-bold text-slate-800 text-sm">Career Compatibility</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Full Stack Developer</span>
                    <span className="text-blue-600">92%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[92%] rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Backend & API Engineer</span>
                    <span className="text-indigo-600">78%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full w-[78%] rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Data & AI Analyst</span>
                    <span className="text-slate-500">65%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-slate-400 h-full w-[65%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Feature Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">All Modules</h3>
              <span className="text-xs text-slate-400 font-medium">Select any module to start</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.id}
                    id={`feature-card-${feat.id}`}
                    onClick={() => setActivePage(feat.id as any)}
                    className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {feat.badge}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {feat.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mb-1.5">{feat.subtitle}</p>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{feat.description}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                      <span>{feat.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: AI Insights Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">AI Insights</h3>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mt-0.5">
                  Recommended for you
                </p>
              </div>
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <Zap className="w-4 h-4" />
              </span>
            </div>

            <div className="p-5 flex-1 space-y-4">
              {/* Insight item 1 */}
              <div className="flex space-x-3 items-start">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Add &apos;Cloud Deployment&apos;</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                    Your resume lacks cloud keywords. Gemini suggests adding a small project involving AWS or Docker.
                  </p>
                </div>
              </div>

              {/* Insight item 2 */}
              <div className="flex space-x-3 items-start">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Optimize Impact Verbs</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                    Swap &quot;Made a project&quot; for &quot;Engineered a scalable architecture&quot;. Action-oriented language boosts ATS rank.
                  </p>
                </div>
              </div>

              {/* Skill gap progress pills */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2.5">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Skill Gap Progress</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600">
                    React.js
                  </span>
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600">
                    TypeScript
                  </span>
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600">
                    Tailwind
                  </span>
                  <span className="px-2 py-1 bg-blue-100 border border-blue-200 rounded text-[10px] font-bold text-blue-700">
                    Express.js
                  </span>
                  <span className="px-2 py-1 bg-blue-100 border border-blue-200 rounded text-[10px] font-bold text-blue-700">
                    Gemini API
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="dashboard-start-roadmap-btn"
                  onClick={() => setActivePage('roadmap')}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Start Learning Roadmap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
