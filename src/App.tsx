import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { Dashboard } from './pages/Dashboard';
import { ResumeGenie } from './pages/ResumeGenie';
import { ResumeAnalyzer } from './pages/ResumeAnalyzer';
import { JobMatcher } from './pages/JobMatcher';
import { CareerAssistant } from './pages/CareerAssistant';
import { SkillGapAnalyzer } from './pages/SkillGapAnalyzer';
import { LearningRoadmap } from './pages/LearningRoadmap';

const AppLayout: React.FC = () => {
  const { activePage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#f1f5f9] text-[#1e293b] font-sans overflow-hidden">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden print:hidden"
        />
      )}

      {/* Sleek Dark Sidebar */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <Header onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />

        {/* Scrollable Page Body */}
        <div className="flex-1 overflow-y-auto">
          <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {activePage === 'home' && <Dashboard />}
            {activePage === 'resume-genie' && <ResumeGenie />}
            {activePage === 'resume-analyzer' && <ResumeAnalyzer />}
            {activePage === 'job-match' && <JobMatcher />}
            {activePage === 'career-assistant' && <CareerAssistant />}
            {activePage === 'skill-gap' && <SkillGapAnalyzer />}
            {activePage === 'roadmap' && <LearningRoadmap />}
          </main>
          <Footer />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
