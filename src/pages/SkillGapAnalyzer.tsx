import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { CAREER_ROLE_PRESETS } from '../data/sampleData';
import {
  GitPullRequest,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Loader2,
  Target,
  Play,
  RotateCcw,
  Check,
  Zap,
} from 'lucide-react';

export const SkillGapAnalyzer: React.FC = () => {
  const {
    skillGapTargetRole,
    setSkillGapTargetRole,
    skillGapCurrentSkills,
    setSkillGapCurrentSkills,
    skillGapResult,
    setSkillGapResult,
    transferGapsToRoadmap,
    showToast,
  } = useApp();

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!skillGapTargetRole.trim() || !skillGapCurrentSkills.trim()) {
      showToast('Please provide both a Target Role and your Current Skills.', 'error');
      return;
    }

    try {
      setIsAnalyzing(true);
      showToast('Analyzing skill gaps and readiness with Gemini NLP...', 'info');
      const result = await apiService.analyzeSkillGap({
        targetRole: skillGapTargetRole,
        currentSkills: skillGapCurrentSkills,
      });
      setSkillGapResult(result);
      showToast('Skill gap analysis complete!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to analyze skill gaps.', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectRolePreset = (roleName: string) => {
    setSkillGapTargetRole(roleName);
    if (!skillGapCurrentSkills.trim()) {
      setSkillGapCurrentSkills('JavaScript, TypeScript, React.js, HTML5, CSS3, Git, REST APIs');
    }
    showToast(`Target role set to "${roleName}"`, 'info');
  };

  const handleLoadSample = () => {
    setSkillGapTargetRole('Full Stack Web Developer');
    setSkillGapCurrentSkills('JavaScript, React.js, Node.js basics, HTML5, CSS3, Git, REST APIs, JSON');
    showToast('Loaded sample skills and target role!', 'success');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Skill Gap Analyzer</h1>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold uppercase tracking-wider border border-blue-200 px-2 py-0.5 rounded">
              Readiness Matrix
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Categorize your skills into Have (Green), Developing (Yellow), and To Learn (Red) for any target tech position.
          </p>
        </div>

        <button
          onClick={handleLoadSample}
          className="flex items-center space-x-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-2 rounded-xl transition-colors shadow-2xs"
          title="Populate sample target role and current skills"
        >
          <Play className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
          <span>Sample Role & Skills</span>
        </button>
      </div>

      {/* Target Role Quick Presets */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
          Select or Type Target Role
        </label>
        <div className="flex flex-wrap gap-2">
          {CAREER_ROLE_PRESETS.map((role) => (
            <button
              key={role}
              onClick={() => handleSelectRolePreset(role)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                skillGapTargetRole === role
                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Position / Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Full Stack Developer, DevOps Engineer, Data Scientist"
              value={skillGapTargetRole}
              onChange={(e) => setSkillGapTargetRole(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current Skills Inventory <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. JavaScript, React, Node.js basics, SQL, Git..."
              value={skillGapCurrentSkills}
              onChange={(e) => setSkillGapCurrentSkills(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            id="skillgap-submit-btn"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !skillGapTargetRole.trim() || !skillGapCurrentSkills.trim()}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-101 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Evaluating Gap Matrix...</span>
              </>
            ) : (
              <>
                <GitPullRequest className="w-4 h-4" />
                <span>Analyze Skill Gaps</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Display */}
      {skillGapResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Readiness Score Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-28 h-28 rounded-full border-8 border-blue-500 bg-blue-50 text-blue-600 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-3xl font-extrabold tracking-tight">{skillGapResult.readinessPercentage}%</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Readiness</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-slate-800">Role Readiness Score</h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                      {skillGapResult.targetRole}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
                    {skillGapResult.summary}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() =>
                    transferGapsToRoadmap(
                      skillGapResult.targetRole,
                      skillGapCurrentSkills,
                      skillGapResult.skillsToLearn.map((s) => s.name).join(', ')
                    )
                  }
                  className="flex items-center justify-center space-x-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-xs transition-colors"
                >
                  <span>Build 5-Phase Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 3-Column Skills Matrix Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Skills You Have (Green) */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Skills You Have ({skillGapResult.skillsHave?.length || 0})</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Proficient
                </span>
              </div>

              <div className="space-y-3">
                {skillGapResult.skillsHave?.map((skill, idx) => (
                  <div key={idx} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                      <span>{skill.name}</span>
                      <span className="text-emerald-700 font-mono">{skill.proficiencyLevel}%</span>
                    </div>
                    <div className="w-full bg-emerald-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${skill.proficiencyLevel}%` }}
                      ></div>
                    </div>
                    {skill.reason && <p className="text-[11px] text-slate-500">{skill.reason}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Skills Developing (Yellow) */}
            <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Developing ({skillGapResult.skillsDeveloping?.length || 0})</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  In Progress
                </span>
              </div>

              <div className="space-y-3">
                {skillGapResult.skillsDeveloping?.map((skill, idx) => (
                  <div key={idx} className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                      <span>{skill.name}</span>
                      <span className="text-amber-700 font-mono">{skill.proficiencyLevel}%</span>
                    </div>
                    <div className="w-full bg-amber-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full"
                        style={{ width: `${skill.proficiencyLevel}%` }}
                      ></div>
                    </div>
                    {skill.reason && <p className="text-[11px] text-slate-500">{skill.reason}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Skills To Learn (Red) */}
            <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>To Learn ({skillGapResult.skillsToLearn?.length || 0})</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  Critical Gaps
                </span>
              </div>

              <div className="space-y-3">
                {skillGapResult.skillsToLearn?.map((skill, idx) => (
                  <div key={idx} className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                      <span>{skill.name}</span>
                      <span className="text-rose-700 font-mono">{skill.proficiencyLevel}%</span>
                    </div>
                    <div className="w-full bg-rose-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full"
                        style={{ width: `${Math.max(skill.proficiencyLevel, 8)}%` }}
                      ></div>
                    </div>
                    {skill.reason && <p className="text-[11px] text-slate-500">{skill.reason}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Win Actions */}
          {skillGapResult.quickWinActions?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-2.5">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>2-4 Week Quick Win Milestones</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillGapResult.quickWinActions.map((act, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start space-x-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{act}</span>
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
