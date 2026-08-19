import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import {
  Compass,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2,
  GraduationCap,
  Briefcase,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';

const COMMON_INTERESTS = [
  'Web Development',
  'Cloud & DevOps',
  'Machine Learning & AI',
  'Data Engineering',
  'Mobile App Development',
  'Cybersecurity',
  'UI/UX & Product Design',
  'System Architecture',
  'Distributed Systems',
  'Full Stack Engineering',
];

export const CareerAssistant: React.FC = () => {
  const {
    careerFormData,
    setCareerFormData,
    careerResult,
    setCareerResult,
    transferRoleToSkillGap,
    showToast,
  } = useApp();

  const [isRecommending, setIsRecommending] = useState(false);

  const toggleInterest = (interest: string) => {
    setCareerFormData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleRecommend = async () => {
    if (!careerFormData.degree.trim() || !careerFormData.technicalSkills.trim()) {
      showToast('Please provide your Degree and Technical Skills.', 'error');
      return;
    }

    try {
      setIsRecommending(true);
      showToast('Analyzing career paths with Gemini AI...', 'info');
      const result = await apiService.getCareerGuidance(careerFormData);
      setCareerResult(result);
      showToast('Career recommendations ready!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to get career recommendations.', 'error');
    } finally {
      setIsRecommending(false);
    }
  };

  const handleLoadSample = () => {
    setCareerFormData({
      degree: 'B.S. in Computer Science & Engineering',
      yearOrSemester: '4th Year (Senior)',
      technicalSkills: 'JavaScript, TypeScript, React.js, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, Git',
      softSkills: 'Critical Thinking, Collaborative Problem Solving, Fast Learner',
      interests: ['Web Development', 'Cloud & DevOps', 'Distributed Systems'],
      preferredDomain: 'Software Engineering & Cloud Computing',
      experienceLevel: 'Entry-Level / Fresher',
    });
    showToast('Loaded sample student profile for career exploration!', 'success');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">AI Career Assistant</h1>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold uppercase tracking-wider border border-blue-200 px-2 py-0.5 rounded">
              Role Matching
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Discover optimal career trajectories based on your academic degree, technical inventory, and personal interests.
          </p>
        </div>

        <button
          onClick={handleLoadSample}
          className="flex items-center space-x-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-2 rounded-xl transition-colors shadow-2xs"
          title="Load pre-filled student career profile"
        >
          <Play className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
          <span>Sample Student Profile</span>
        </button>
      </div>

      {/* Input Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Degree & Branch <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. B.Tech Computer Science"
              value={careerFormData.degree}
              onChange={(e) => setCareerFormData({ ...careerFormData, degree: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Year / Semester</label>
            <input
              type="text"
              placeholder="e.g. 3rd Year / 6th Semester"
              value={careerFormData.yearOrSemester}
              onChange={(e) => setCareerFormData({ ...careerFormData, yearOrSemester: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Level</label>
            <select
              value={careerFormData.experienceLevel}
              onChange={(e) => setCareerFormData({ ...careerFormData, experienceLevel: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            >
              <option value="Fresher / Student">Fresher / Student</option>
              <option value="Internship Experienced">Internship Experienced</option>
              <option value="Entry-Level (0-1 yrs)">Entry-Level (0-1 yrs)</option>
              <option value="Junior (1-2 yrs)">Junior (1-2 yrs)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current Technical Skills <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Python, SQL, React, Node.js, Git, HTML/CSS..."
              value={careerFormData.technicalSkills}
              onChange={(e) => setCareerFormData({ ...careerFormData, technicalSkills: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Soft Skills</label>
            <textarea
              rows={3}
              placeholder="e.g. Communication, Problem Solving, Team Leadership..."
              value={careerFormData.softSkills}
              onChange={(e) => setCareerFormData({ ...careerFormData, softSkills: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
            />
          </div>
        </div>

        {/* Interests Selector */}
        <div className="space-y-2 pt-1">
          <label className="block text-xs font-semibold text-slate-700">Areas of Interest / Passion</label>
          <div className="flex flex-wrap gap-2">
            {COMMON_INTERESTS.map((interest) => {
              const selected = careerFormData.interests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                    selected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {selected ? '✓ ' : '+ '}
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            id="career-submit-btn"
            onClick={handleRecommend}
            disabled={isRecommending || !careerFormData.degree.trim() || !careerFormData.technicalSkills.trim()}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-101 disabled:opacity-50"
          >
            {isRecommending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Evaluating Roles...</span>
              </>
            ) : (
              <>
                <Compass className="w-4 h-4" />
                <span>Find Recommended Roles</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Display */}
      {careerResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Overview Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Career Trajectory Overview</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              {careerResult.overview}
            </p>
          </div>

          {/* Recommended Roles Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Recommended Career Matches ({careerResult.recommendedRoles?.length || 0})
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {careerResult.recommendedRoles?.map((role, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-blue-400 transition-all group"
                >
                  <div className="space-y-4">
                    {/* Role Header & Score */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {role.estimatedDifficulty}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                          {role.role}
                        </h4>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-2xl font-black text-blue-600">{role.suitabilityScore}%</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase">Suitability</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{role.reason}</p>

                    {/* Skills You Have */}
                    {role.existingSkills?.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-bold text-emerald-800 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Matching Skills You Have:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {role.existingSkills.map((s, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills To Learn */}
                    {role.skillsToLearn?.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-bold text-amber-800 flex items-center space-x-1">
                          <Zap className="w-3.5 h-3.5 text-amber-600" />
                          <span>Key Skills to Acquire:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {role.skillsToLearn.map((s, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Transfer to Skill Gap Button */}
                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => transferRoleToSkillGap(role.role, careerFormData.technicalSkills)}
                      className="w-full flex items-center justify-center space-x-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                    >
                      <span>Analyze Skill Gaps for this Role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emerging Trends */}
          {careerResult.topEmergingTrends?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-2.5">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Emerging Industry & Technology Trends</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {careerResult.topEmergingTrends.map((trend, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start space-x-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      ★
                    </span>
                    <span className="leading-relaxed">{trend}</span>
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
