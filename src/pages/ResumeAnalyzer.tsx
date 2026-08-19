import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { SAMPLE_RESUME_TEXT } from '../data/sampleData';
import {
  FileSearch,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  Loader2,
  FileText,
  Play,
  RotateCcw,
  Check,
  Zap,
} from 'lucide-react';

export const ResumeAnalyzer: React.FC = () => {
  const {
    analyzerText,
    setAnalyzerText,
    analysisResult,
    setAnalysisResult,
    transferResumeToJobMatch,
    showToast,
  } = useApp();

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!analyzerText.trim() || analyzerText.trim().length < 30) {
      showToast('Please paste a complete resume or click "Sample Resume" first.', 'error');
      return;
    }

    try {
      setIsAnalyzing(true);
      showToast('Analyzing resume content with Gemini NLP engine...', 'info');
      const result = await apiService.analyzeResume(analyzerText);
      setAnalysisResult(result);
      showToast('Resume analysis completed!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to analyze resume. Please try again.', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = () => {
    setAnalyzerText(SAMPLE_RESUME_TEXT);
    showToast('Loaded sample student resume text!', 'success');
  };

  const handleClear = () => {
    setAnalyzerText('');
    setAnalysisResult(null);
    showToast('Cleared analyzer content.', 'info');
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
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Resume Analyzer</h1>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold uppercase tracking-wider border border-blue-200 px-2 py-0.5 rounded">
              NLP Evaluation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Algorithmic evaluation of keyword density, section coverage, readability, and bullet impact.
          </p>
        </div>

        {/* Demo buttons */}
        <div className="flex items-center space-x-2">
          <button
            id="analyzer-load-sample-btn"
            onClick={handleLoadSample}
            className="flex items-center space-x-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-2 rounded-xl transition-colors shadow-2xs"
            title="Load sample student resume for quick testing"
          >
            <Play className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
            <span>Sample Resume</span>
          </button>
          <button
            onClick={handleClear}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-slate-200"
            title="Clear text"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Paste Resume Text</span>
          </label>
          <span className="text-xs text-slate-400 font-mono">{analyzerText.length} characters</span>
        </div>

        <textarea
          id="analyzer-textarea"
          rows={8}
          placeholder="Paste your raw resume text here (Education, Experience, Skills, Projects, Achievements)..."
          value={analyzerText}
          onChange={(e) => setAnalyzerText(e.target.value)}
          className="w-full p-3.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50 transition-all leading-relaxed"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-[11px] text-slate-500 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Evaluates formatting, keyword density, action verbs, and section coverage.</span>
          </div>

          <button
            id="analyze-submit-btn"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !analyzerText.trim()}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-101 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing with NLP...</span>
              </>
            ) : (
              <>
                <FileSearch className="w-4 h-4" />
                <span>Analyze Resume</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Score Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
              {/* Radial Score */}
              <div className="flex items-center space-x-6">
                <div className={`w-28 h-28 rounded-full border-8 flex flex-col items-center justify-center shadow-inner ${getScoreColor(analysisResult.overallScore)}`}>
                  <span className="text-3xl font-extrabold tracking-tight">{analysisResult.overallScore}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Out of 100</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-slate-800">Overall Resume Score</h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                      AI Assessment
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 max-w-md leading-relaxed">
                    {analysisResult.summaryFeedback}
                  </p>
                  <div className="mt-2 text-[11px] text-slate-500 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>{analysisResult.atsReadinessSummary}</span>
                  </div>
                </div>
              </div>

              {/* Next Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                <button
                  id="analyzer-to-jobmatch-btn"
                  onClick={() => transferResumeToJobMatch(analyzerText)}
                  className="flex items-center space-x-1.5 text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  <span>Compare with Job Description</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Score Breakdown Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-8 pt-6 border-t border-slate-100">
              {Object.entries(analysisResult.breakdown || {}).map(([key, rawVal]) => {
                const val = typeof rawVal === 'number' ? rawVal : Number(rawVal) || 0;
                return (
                  <div key={key} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase truncate">{key}</div>
                    <div className="text-base font-extrabold text-slate-900">{val}%</div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          val >= 80 ? 'bg-blue-600' : val >= 65 ? 'bg-indigo-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${val}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detected Skills Cloud */}
          {analysisResult.detectedSkills?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Detected Skills ({analysisResult.detectedSkills.length})</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.detectedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg"
                  >
                    <Check className="w-3 h-3 text-blue-600" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strengths & Weaknesses 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm border-b border-emerald-100 pb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Identified Strengths ({analysisResult.strengths?.length || 0})</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {analysisResult.strengths?.map((str, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm border-b border-amber-100 pb-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Areas for Improvement ({analysisResult.weaknesses?.length || 0})</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {analysisResult.weaknesses?.map((w, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      !
                    </span>
                    <span className="leading-relaxed">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Missing Sections Alert */}
          {analysisResult.missingSections && analysisResult.missingSections.length > 0 && (
            <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center space-x-2 text-rose-900 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-rose-600" />
                <span>Missing or Under-represented Sections</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-rose-800 pt-1">
                {analysisResult.missingSections.map((sec, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actionable Suggestions */}
          {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Actionable Recommendations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {analysisResult.suggestions.map((sug, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-blue-700 block">Tip #{idx + 1}</span>
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
