import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { SAMPLE_JOB_DESCRIPTIONS, SAMPLE_RESUME_TEXT } from '../data/sampleData';
import {
  Target,
  Sparkles,
  CheckCircle2,
  XCircle,
  Key,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Loader2,
  FileText,
  Building2,
  Play,
  RotateCcw,
  Check,
  AlertCircle,
} from 'lucide-react';

export const JobMatcher: React.FC = () => {
  const {
    jobMatchResumeText,
    setJobMatchResumeText,
    jobMatchDescription,
    setJobMatchDescription,
    jobMatchResult,
    setJobMatchResult,
    transferRoleToSkillGap,
    showToast,
  } = useApp();

  const [isMatching, setIsMatching] = useState(false);

  const handleMatch = async () => {
    if (!jobMatchResumeText.trim() || jobMatchResumeText.trim().length < 30) {
      showToast('Please provide your resume text.', 'error');
      return;
    }
    if (!jobMatchDescription.trim() || jobMatchDescription.trim().length < 30) {
      showToast('Please provide the job description text.', 'error');
      return;
    }

    try {
      setIsMatching(true);
      showToast('Comparing resume with job description using NLP...', 'info');
      const result = await apiService.matchJob(jobMatchResumeText, jobMatchDescription);
      setJobMatchResult(result);
      showToast('Job match analysis complete!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to match job description.', 'error');
    } finally {
      setIsMatching(false);
    }
  };

  const handleLoadSampleJob = (index: number) => {
    const job = SAMPLE_JOB_DESCRIPTIONS[index];
    if (job) {
      setJobMatchDescription(job.text);
      if (!jobMatchResumeText.trim()) {
        setJobMatchResumeText(SAMPLE_RESUME_TEXT);
      }
      showToast(`Loaded sample: "${job.title}"`, 'info');
    }
  };

  const handleLoadSampleResume = () => {
    setJobMatchResumeText(SAMPLE_RESUME_TEXT);
    showToast('Loaded sample resume text!', 'success');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-blue-600 border-blue-500 bg-blue-50';
    if (score >= 65) return 'text-indigo-600 border-indigo-500 bg-indigo-50';
    if (score >= 50) return 'text-amber-600 border-amber-500 bg-amber-50';
    return 'text-rose-600 border-rose-500 bg-rose-50';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Job Description Matcher</h1>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold uppercase tracking-wider border border-blue-200 px-2 py-0.5 rounded">
              ATS Comparison
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare candidate resume against target job postings to identify matched keywords, missing competencies, and alignment.
          </p>
        </div>

        {/* Quick Sample Loaders */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleLoadSampleResume}
            className="flex items-center space-x-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors"
          >
            <Play className="w-3 h-3 fill-slate-600 text-slate-600" />
            <span>Sample Resume</span>
          </button>
          <button
            onClick={() => handleLoadSampleJob(0)}
            className="flex items-center space-x-1 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl transition-colors"
          >
            <Play className="w-3 h-3 fill-amber-600 text-amber-600" />
            <span>Sample Job #1</span>
          </button>
          <button
            onClick={() => handleLoadSampleJob(1)}
            className="flex items-center space-x-1 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl transition-colors"
          >
            <Play className="w-3 h-3 fill-amber-600 text-amber-600" />
            <span>Sample Job #2</span>
          </button>
        </div>
      </div>

      {/* 2-Column Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Resume */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>1. Candidate Resume</span>
            </label>
            <span className="text-[11px] text-slate-400 font-mono">{jobMatchResumeText.length} chars</span>
          </div>
          <textarea
            id="jobmatch-resume-textarea"
            rows={9}
            placeholder="Paste candidate resume text or load from Resume Genie..."
            value={jobMatchResumeText}
            onChange={(e) => setJobMatchResumeText(e.target.value)}
            className="w-full p-3 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
          />
        </div>

        {/* Right: Job Description */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center space-x-1.5">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>2. Target Job Description</span>
            </label>
            <span className="text-[11px] text-slate-400 font-mono">{jobMatchDescription.length} chars</span>
          </div>
          <textarea
            id="jobmatch-description-textarea"
            rows={9}
            placeholder="Paste company job requirements, responsibilities, and qualifications..."
            value={jobMatchDescription}
            onChange={(e) => setJobMatchDescription(e.target.value)}
            className="w-full p-3 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Match Trigger Button */}
      <div className="flex justify-center">
        <button
          id="jobmatch-submit-btn"
          onClick={handleMatch}
          disabled={isMatching || !jobMatchResumeText.trim() || !jobMatchDescription.trim()}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-101 disabled:opacity-50"
        >
          {isMatching ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Comparing with Gemini NLP...</span>
            </>
          ) : (
            <>
              <Target className="w-4 h-4" />
              <span>Analyze Job Match</span>
            </>
          )}
        </button>
      </div>

      {/* Results Display */}
      {jobMatchResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Score Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div className="flex items-center space-x-6">
                <div className={`w-28 h-28 rounded-full border-8 flex flex-col items-center justify-center shadow-inner ${getScoreColor(jobMatchResult.matchScore)}`}>
                  <span className="text-3xl font-extrabold tracking-tight">{jobMatchResult.matchScore}%</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Match Fit</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-slate-800">Job Compatibility Score</h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                      {jobMatchResult.readinessVerdict || 'Evaluated'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
                    {jobMatchResult.summary}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => transferRoleToSkillGap('Target Role from Job Description', jobMatchResult.matchingSkills.join(', '))}
                  className="flex items-center justify-center space-x-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  <span>Bridge Gaps in Skill Analyzer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Matching Skills vs Missing Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matching Skills */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Matching Skills ({jobMatchResult.matchingSkills?.length || 0})</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Present in Both
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {jobMatchResult.matchingSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Missing Skills ({jobMatchResult.missingSkills?.length || 0})</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  Required in Job
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {jobMatchResult.missingSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1 text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg"
                  >
                    <AlertCircle className="w-3 h-3 text-rose-600" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Natural Keywords */}
          {jobMatchResult.recommendedKeywords?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                  <Key className="w-4 h-4 text-blue-600" />
                  <span>Recommended Natural Keywords from Job Description</span>
                </div>
                <span className="text-[11px] text-slate-400">Only include if you genuinely possess the skill</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {jobMatchResult.recommendedKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Relevant Experience Mapping */}
          {jobMatchResult.relevantExperience?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-2.5">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Experience Alignment</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {jobMatchResult.relevantExperience.map((exp, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="leading-relaxed">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tailoring Suggestions */}
          {jobMatchResult.tailoringSuggestions?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-2.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Specific Resume Tailoring Recommendations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {jobMatchResult.tailoringSuggestions.map((sug, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-1">Tip #{idx + 1}</span>
                    {sug}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
