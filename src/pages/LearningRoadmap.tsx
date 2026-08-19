import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import {
  Map,
  Sparkles,
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  Code2,
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
  Play,
  RotateCcw,
  BookOpen,
  Zap,
} from 'lucide-react';

export const LearningRoadmap: React.FC = () => {
  const {
    roadmapTargetRole,
    setRoadmapTargetRole,
    roadmapCurrentSkills,
    setRoadmapCurrentSkills,
    roadmapSkillGaps,
    setRoadmapSkillGaps,
    roadmapResult,
    setRoadmapResult,
    showToast,
  } = useApp();

  const [isGenerating, setIsGenerating] = useState(false);
  const [timeframe, setTimeframe] = useState('12 Weeks');
  const [hoursPerWeek, setHoursPerWeek] = useState('10-15 Hours/Week');
  const [expandedPhases, setExpandedPhases] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  const [completedTopics, setCompletedTopics] = useState<{ [key: string]: boolean }>({});

  const toggleTopicCompleted = (topicKey: string) => {
    setCompletedTopics((prev) => ({
      ...prev,
      [topicKey]: !prev[topicKey],
    }));
  };

  const togglePhaseExpand = (phaseNum: number) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseNum]: !prev[phaseNum],
    }));
  };

  const handleGenerate = async () => {
    if (!roadmapTargetRole.trim()) {
      showToast('Please specify your Target Role.', 'error');
      return;
    }

    try {
      setIsGenerating(true);
      showToast('Generating 5-Phase learning roadmap with Gemini AI...', 'info');
      const result = await apiService.generateRoadmap({
        targetRole: roadmapTargetRole,
        currentSkills: roadmapCurrentSkills,
        skillGaps: roadmapSkillGaps,
        timeframe,
        hoursPerWeek,
      });
      setRoadmapResult(result);
      showToast('Learning roadmap generated successfully!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to generate learning roadmap.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLoadSample = () => {
    setRoadmapTargetRole('Full Stack Web Developer');
    setRoadmapCurrentSkills('HTML5, CSS3, JavaScript, React.js fundamentals');
    setRoadmapSkillGaps('TypeScript, Node.js & Express, PostgreSQL, Docker, AWS S3/EC2, CI/CD');
    showToast('Loaded sample roadmap parameters!', 'success');
  };

  const totalTopicsCount =
    roadmapResult?.phases?.reduce((acc, p) => acc + (p.topics?.length || 0), 0) || 0;
  const completedTopicsCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopicsCount > 0 ? Math.round((completedTopicsCount / totalTopicsCount) * 100) : 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Learning Roadmap</h1>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold uppercase tracking-wider border border-blue-200 px-2 py-0.5 rounded">
              5-Phase Curriculum
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Step-by-step master plan: Fundamentals, Intermediate Core, Advanced Architecture, Portfolio Projects, and Interview Prep.
          </p>
        </div>

        <button
          onClick={handleLoadSample}
          className="flex items-center space-x-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-2 rounded-xl transition-colors shadow-2xs"
          title="Load sample full-stack web dev roadmap"
        >
          <Play className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
          <span>Sample Roadmap</span>
        </button>
      </div>

      {/* Inputs Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Role <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Full Stack Developer, DevOps Engineer, ML Engineer"
              value={roadmapTargetRole}
              onChange={(e) => setRoadmapTargetRole(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Timeline</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            >
              <option value="6 Weeks (Intensive)">6 Weeks (Intensive)</option>
              <option value="12 Weeks (Standard)">12 Weeks (Standard)</option>
              <option value="24 Weeks (Comprehensive)">24 Weeks (Comprehensive)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Weekly Commitment</label>
            <select
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            >
              <option value="5-8 Hours/Week">5-8 Hours/Week</option>
              <option value="10-15 Hours/Week">10-15 Hours/Week</option>
              <option value="20+ Hours/Week">20+ Hours/Week</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Current Skills (What you already know)</label>
            <textarea
              rows={2}
              placeholder="e.g. JavaScript, HTML, CSS, Basic React"
              value={roadmapCurrentSkills}
              onChange={(e) => setRoadmapCurrentSkills(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Skill Gaps / Focus Areas (Optional)</label>
            <textarea
              rows={2}
              placeholder="e.g. TypeScript, Node.js APIs, Docker, System Design"
              value={roadmapSkillGaps}
              onChange={(e) => setRoadmapSkillGaps(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            id="roadmap-submit-btn"
            onClick={handleGenerate}
            disabled={isGenerating || !roadmapTargetRole.trim()}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-101 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Roadmap...</span>
              </>
            ) : (
              <>
                <Map className="w-4 h-4" />
                <span>Generate 5-Phase Roadmap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Display */}
      {roadmapResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Progress & Summary Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                    {roadmapResult.targetRole} Roadmap
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                    {roadmapResult.estimatedDuration || roadmapResult.estimatedTimeline || timeframe}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {roadmapResult.summary || roadmapResult.roadmapSummary}
                </p>
              </div>

              {/* Progress Tracker Ring */}
              <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">
                    {completedTopicsCount} of {totalTopicsCount} Topics
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">Checked Complete</div>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-blue-600 bg-white flex items-center justify-center font-extrabold text-xs text-blue-600">
                  {progressPercent}%
                </div>
              </div>
            </div>
          </div>

          {/* 5 Phases List */}
          <div className="space-y-4">
            {roadmapResult.phases?.map((phase) => {
              const isExpanded = expandedPhases[phase.phaseNumber] ?? true;

              return (
                <div
                  key={phase.phaseNumber}
                  className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden transition-all"
                >
                  {/* Phase Header */}
                  <div
                    onClick={() => togglePhaseExpand(phase.phaseNumber)}
                    className="p-5 bg-slate-50/70 hover:bg-slate-100/70 border-b border-slate-200/80 flex items-center justify-between cursor-pointer select-none transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        P{phase.phaseNumber}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{phase.phaseTitle}</h3>
                        <p className="text-xs text-slate-500">{phase.goal || phase.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {phase.durationWeeks && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg hidden sm:inline-block">
                          {phase.durationWeeks}
                        </span>
                      )}
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </div>
                  </div>

                  {/* Phase Topics */}
                  {isExpanded && (
                    <div className="p-5 divide-y divide-slate-100 space-y-4">
                      {phase.topics?.map((t, idx) => {
                        const topicKey = `p${phase.phaseNumber}-t${idx}`;
                        const isDone = completedTopics[topicKey] || false;
                        const topicTitle = t.topic || t.topicName || `Topic #${idx + 1}`;

                        return (
                          <div
                            key={idx}
                            className={`pt-4 first:pt-0 flex items-start space-x-3 transition-opacity ${
                              isDone ? 'opacity-60' : 'opacity-100'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => toggleTopicCompleted(topicKey)}
                              className={`mt-0.5 p-1 rounded-lg transition-colors ${
                                isDone
                                  ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                                  : 'text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200'
                              }`}
                              title={isDone ? 'Mark Incomplete' : 'Mark Complete'}
                            >
                              {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                            </button>

                            <div className="flex-1 space-y-1.5">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <h4 className={`text-xs font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                  {topicTitle}
                                </h4>
                                {t.priority && (
                                  <span
                                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                      t.priority === 'High'
                                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                        : t.priority === 'Medium'
                                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                                    }`}
                                  >
                                    {t.priority} Priority
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-slate-600 leading-relaxed">{t.explanation}</p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-slate-600">
                                  <span className="font-semibold text-slate-800">Why it matters: </span>
                                  {t.whyItMatters}
                                </div>
                                <div className="bg-blue-50/50 p-2 rounded-lg border border-blue-100 text-blue-900">
                                  <span className="font-semibold text-blue-800">Practice: </span>
                                  {t.suggestedPractice}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
