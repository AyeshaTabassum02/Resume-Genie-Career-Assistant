import React, { useState } from 'react';
import { GeneratedResume, ResumeTemplateType } from '../../types';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { Printer, Copy, Check, Download, FileText, Sparkles, ArrowRight, LayoutTemplate } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Props {
  resume: GeneratedResume;
  onEdit?: () => void;
}

export const ResumePreviewContainer: React.FC<Props> = ({ resume, onEdit }) => {
  const [template, setTemplate] = useState<ResumeTemplateType>('modern');
  const [copied, setCopied] = useState(false);
  const { transferResumeToAnalyzer, transferResumeToJobMatch, showToast } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let plain = `${resume.fullName}\n${resume.targetRole}\n${resume.location} | ${resume.email} | ${resume.phone}\nLinkedIn: ${resume.linkedIn}\nGitHub: ${resume.gitHub}\n\n`;
    plain += `SUMMARY\n${resume.professionalSummary}\n\n`;
    plain += `SKILLS\n`;
    resume.technicalSkills?.forEach((cat) => {
      plain += `${cat.category}: ${cat.skills.join(', ')}\n`;
    });
    if (resume.softSkills?.length) plain += `Soft Skills: ${resume.softSkills.join(', ')}\n`;
    plain += `\nEDUCATION\n`;
    resume.education?.forEach((e) => {
      plain += `${e.degree}, ${e.institution} (${e.year}) - ${e.cgpaOrPercentage}\n`;
    });
    plain += `\nEXPERIENCE\n`;
    resume.experience?.forEach((e) => {
      plain += `${e.role} at ${e.organization} (${e.duration})\n`;
      e.bulletPoints?.forEach((bp) => (plain += `• ${bp}\n`));
    });
    plain += `\nPROJECTS\n`;
    resume.projects?.forEach((p) => {
      plain += `${p.title} [${p.technologies.join(', ')}]\n`;
      p.bulletPoints?.forEach((bp) => (plain += `• ${bp}\n`));
    });
    if (resume.certifications?.length) {
      plain += `\nCERTIFICATIONS\n`;
      resume.certifications?.forEach((c) => (plain += `• ${c.name} (${c.issuer})\n`));
    }
    if (resume.achievements?.length) {
      plain += `\nACHIEVEMENTS\n`;
      resume.achievements?.forEach((a) => (plain += `• ${a.title}: ${a.description}\n`));
    }

    navigator.clipboard.writeText(plain);
    setCopied(true);
    showToast('Copied formatted resume text to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${resume.fullName.replace(/\s+/g, '_')}_Resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Downloaded resume JSON file!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Control Bar - hidden during print */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs print:hidden flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Template Selector */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            <LayoutTemplate className="w-4 h-4 text-blue-600" />
            <span>Template:</span>
          </div>
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              id="template-btn-modern"
              onClick={() => setTemplate('modern')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                template === 'modern'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modern
            </button>
            <button
              id="template-btn-classic"
              onClick={() => setTemplate('classic')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                template === 'classic'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Classic
            </button>
            <button
              id="template-btn-minimal"
              onClick={() => setTemplate('minimal')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                template === 'minimal'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Minimal
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="print-pdf-btn"
            onClick={handlePrint}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
            title="Opens system print dialog to Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download / Print PDF</span>
          </button>

          <button
            id="copy-text-btn"
            onClick={handleCopyText}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            id="download-json-btn"
            onClick={handleDownloadJSON}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 transition-colors"
            title="Download JSON structure for backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Next Step AI Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 print:hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-blue-600 text-white rounded-xl">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Next Recommended AI Actions</h4>
            <p className="text-xs text-slate-600">Run instant AI NLP analysis or compare against live job descriptions.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="send-to-analyzer-btn"
            onClick={() => transferResumeToAnalyzer()}
            className="flex items-center space-x-1 text-xs font-bold bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-xl shadow-2xs transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Analyze Resume</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>

          <button
            id="send-to-jobmatch-btn"
            onClick={() => transferResumeToJobMatch()}
            className="flex items-center space-x-1 text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 rounded-xl shadow-2xs transition-all"
          >
            <span>Match with Job</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Printable Resume Canvas */}
      <div id="printable-resume-area" className="transition-all duration-300">
        {template === 'modern' && <ModernTemplate resume={resume} />}
        {template === 'classic' && <ClassicTemplate resume={resume} />}
        {template === 'minimal' && <MinimalTemplate resume={resume} />}
      </div>
    </div>
  );
};
