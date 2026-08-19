import React from 'react';
import { useApp } from '../context/AppContext';
import { ActivePage } from '../types';
import {
  Sparkles,
  FileEdit,
  FileSearch,
  Target,
  Compass,
  GitPullRequest,
  Map,
  Home,
  Cpu,
  X,
} from 'lucide-react';

interface Props {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<Props> = ({ mobileOpen, onCloseMobile }) => {
  const { activePage, setActivePage } = useApp();

  const navItems: { id: ActivePage; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'resume-genie', label: 'Resume Genie', icon: FileEdit },
    { id: 'resume-analyzer', label: 'Resume Analyzer', icon: FileSearch },
    { id: 'job-match', label: 'Job Matcher', icon: Target },
    { id: 'career-assistant', label: 'Career Assistant', icon: Compass },
    { id: 'skill-gap', label: 'Skill Gap Analyzer', icon: GitPullRequest },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Map },
  ];

  const handleNavClick = (id: ActivePage) => {
    setActivePage(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`bg-[#0f172a] text-white flex flex-col h-full shrink-0 border-r border-slate-800 transition-all duration-300 z-50 print:hidden ${
        mobileOpen
          ? 'fixed inset-y-0 left-0 w-72 shadow-2xl block'
          : 'hidden lg:flex w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div
          id="sidebar-brand-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            G
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-base font-extrabold tracking-tight uppercase text-white">Genie AI</span>
              <span className="text-[9px] bg-blue-500/20 text-blue-400 font-bold px-1.5 py-0.5 rounded border border-blue-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Career Intelligence</p>
          </div>
        </div>

        {mobileOpen && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-4 space-y-1.5 text-sm overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`w-full p-3 rounded-xl font-semibold flex items-center space-x-3 transition-all text-left ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80 opacity-80 hover:opacity-100'
              }`}
            >
              {isActive ? (
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
              ) : (
                <Icon className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span className="text-xs tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Status Card */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/90 border border-slate-700/60 p-3.5 rounded-xl text-xs space-y-2 shadow-inner">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Gemini AI Status</span>
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400 text-xs">Online & Ready</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
