import React from 'react';
import { GeneratedResume } from '../../types';

interface Props {
  resume: GeneratedResume;
}

export const MinimalTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div id="resume-minimal-root" className="bg-white text-zinc-900 p-8 sm:p-12 font-sans shadow-sm border border-zinc-200 rounded-xl max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-950">
          <span className="font-semibold">{resume.fullName?.split(' ')[0]}</span> {resume.fullName?.split(' ').slice(1).join(' ')}
        </h1>
        <p className="text-sm font-medium text-emerald-700 tracking-wider uppercase mt-1">
          {resume.targetRole || 'Software Engineer'}
        </p>

        {/* Minimal Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 mt-2 font-mono">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
          {resume.linkedIn && <span className="truncate max-w-[220px]">{resume.linkedIn.replace(/^https?:\/\//, '')}</span>}
          {resume.gitHub && <span className="truncate max-w-[220px]">{resume.gitHub.replace(/^https?:\/\//, '')}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (Meta/Skills/Education) */}
        <div className="space-y-6 md:border-r md:border-zinc-100 md:pr-6">
          {/* Education */}
          {resume.education && resume.education.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-2.5">
                Education
              </h3>
              <div className="space-y-3 text-xs">
                {resume.education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="font-semibold text-zinc-900">{edu.degree}</div>
                    <div className="text-zinc-600">{edu.institution}</div>
                    <div className="text-zinc-400 font-mono text-[11px] mt-0.5">{edu.year}</div>
                    {edu.cgpaOrPercentage && (
                      <div className="text-emerald-700 font-medium text-[11px] mt-0.5">{edu.cgpaOrPercentage}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {(resume.technicalSkills?.length > 0 || resume.softSkills?.length > 0) && (
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-2.5">
                Skills
              </h3>
              <div className="space-y-2.5 text-xs">
                {resume.technicalSkills?.map((cat, idx) => (
                  <div key={idx}>
                    <div className="font-semibold text-zinc-800 text-[11px] uppercase tracking-wide text-zinc-500 mb-1">
                      {cat.category}
                    </div>
                    <div className="text-zinc-700 leading-relaxed font-sans">{cat.skills.join(', ')}</div>
                  </div>
                ))}
                {resume.softSkills && resume.softSkills.length > 0 && (
                  <div className="pt-1">
                    <div className="font-semibold text-zinc-800 text-[11px] uppercase tracking-wide text-zinc-500 mb-1">
                      Soft Skills
                    </div>
                    <div className="text-zinc-700 leading-relaxed">{resume.softSkills.join(', ')}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resume.certifications && resume.certifications.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-2">
                Certifications
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-700">
                {resume.certifications.map((c, idx) => (
                  <li key={idx}>
                    <span className="font-medium text-zinc-900 block">{c.name}</span>
                    <span className="text-zinc-500 text-[11px]">{c.issuer} {c.year ? `• ${c.year}` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (Summary, Experience, Projects) */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary */}
          {resume.professionalSummary && (
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-2">
                About
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">{resume.professionalSummary}</p>
            </div>
          )}

          {/* Experience */}
          {resume.experience && resume.experience.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-3">
                Experience
              </h3>
              <div className="space-y-4">
                {resume.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-3 border-l border-zinc-300">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-zinc-900 text-sm">{exp.role}</h4>
                      <span className="text-[11px] font-mono text-zinc-400">{exp.duration}</span>
                    </div>
                    <div className="text-xs text-zinc-600 mb-1">{exp.organization}</div>
                    <ul className="space-y-1 text-xs text-zinc-700">
                      {exp.bulletPoints?.map((bp, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">• {bp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {resume.projects && resume.projects.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-3">
                Projects
              </h3>
              <div className="space-y-4">
                {resume.projects.map((proj, idx) => (
                  <div key={idx} className="relative pl-3 border-l border-zinc-300">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-zinc-900 text-sm">{proj.title}</h4>
                      {proj.role && <span className="text-[11px] text-zinc-500">{proj.role}</span>}
                    </div>
                    {proj.technologies?.length > 0 && (
                      <div className="text-[11px] font-mono text-emerald-700 mb-1">
                        {proj.technologies.join(' / ')}
                      </div>
                    )}
                    <ul className="space-y-1 text-xs text-zinc-700">
                      {proj.bulletPoints?.map((bp, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">• {bp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {resume.achievements && resume.achievements.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-2">
                Key Achievements
              </h3>
              <div className="space-y-1.5 text-xs text-zinc-700">
                {resume.achievements.map((ach, idx) => (
                  <div key={idx}>
                    <span className="font-medium text-zinc-900">{ach.title}: </span>
                    <span className="text-zinc-600">{ach.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
