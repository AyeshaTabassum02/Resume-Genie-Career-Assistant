import React from 'react';
import { useApp } from '../context/AppContext';
import { Menu, Play, Sparkles } from 'lucide-react';

interface Props {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<Props> = ({ onToggleMobileMenu }) => {
  const { activePage, loadSampleResumeForm, resumeFormData } = useApp();

  const getPageMeta = () => {
    switch (activePage) {
      case 'home':
        return { title: 'Career Dashboard', subtitle: 'Student Perspective' };
      case 'resume-genie':
        return { title: 'Resume Genie', subtitle: 'AI Resume Generator' };
      case 'resume-analyzer':
        return { title: 'Resume Analyzer', subtitle: 'NLP Content & ATS Evaluation' };
      case 'job-match':
        return { title: 'Job Matcher', subtitle: 'ATS Job Description Comparison' };
      case 'career-assistant':
        return { title: 'Career Assistant', subtitle: 'AI Role Recommendations' };
      case 'skill-gap':
        return { title: 'Skill Gap Analyzer', subtitle: 'Current vs. Target Matrix' };
      case 'roadmap':
        return { title: 'Learning Roadmap', subtitle: '5-Phase Structured Curriculum' };
      default:
        return { title: 'Career Dashboard', subtitle: 'Student Perspective' };
    }
  };

  const { title, subtitle } = getPageMeta();
  const userName = resumeFormData.fullName || 'Alex Rivera';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AR';

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 print:hidden shadow-2xs">
      <div className="flex items-center space-x-3">
        <button
          id="mobile-menu-btn"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">{title}</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Quick Demo Pill */}
        <button
          onClick={loadSampleResumeForm}
          className="hidden sm:flex items-center space-x-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
          title="Pre-populate sample profile across the app"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Demo Profile</span>
        </button>

        {/* Student Profile Badge */}
        <div className="flex items-center space-x-3 pl-2 sm:border-l sm:border-slate-200">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-bold text-slate-800">{userName}</span>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">
              {resumeFormData.education?.[0]?.degree || 'Computer Science'}
            </span>
          </div>
          <div className="w-9 h-9 bg-slate-100 text-slate-700 rounded-full border-2 border-slate-200 shadow-2xs flex items-center justify-center font-bold text-xs select-none">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
};
