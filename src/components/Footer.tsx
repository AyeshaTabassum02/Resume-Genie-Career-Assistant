import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-2xs">
            G
          </div>
          <span className="font-semibold text-slate-800 text-xs">Resume Genie & Career Assistant</span>
        </div>
        <p>© {new Date().getFullYear()} Resume Genie. All rights reserved.</p>
      </div>
    </footer>
  );
};
