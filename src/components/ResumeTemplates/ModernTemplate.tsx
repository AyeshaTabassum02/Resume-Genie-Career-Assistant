import React from 'react';
import { GeneratedResume } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Award, GraduationCap, Briefcase, FolderGit2, CheckCircle2 } from 'lucide-react';

interface Props {
  resume: GeneratedResume;
}

export const ModernTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div id="resume-modern-root" className="bg-white text-slate-800 p-8 sm:p-10 font-sans shadow-sm border border-slate-200 rounded-xl max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none">
      {/* Header Banner */}
      <div className="border-b-2 border-indigo-600 pb-5 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{resume.fullName || 'Your Name'}</h1>
        <p className="text-lg font-semibold text-indigo-600 mt-1">{resume.targetRole || 'Professional Role'}</p>

        {/* Contact Links Bar */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs sm:text-sm text-slate-600">
          {resume.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span>{resume.email}</span>
            </div>
          )}
          {resume.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-600" />
              <span>{resume.phone}</span>
            </div>
          )}
          {resume.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>{resume.location}</span>
            </div>
          )}
          {resume.linkedIn && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-indigo-600" />
              <span className="truncate max-w-[200px]">{resume.linkedIn.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
          {resume.gitHub && (
            <div className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-indigo-600" />
              <span className="truncate max-w-[200px]">{resume.gitHub.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
          {resume.portfolio && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span className="truncate max-w-[200px]">{resume.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.professionalSummary && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-wider font-bold text-indigo-900 bg-indigo-50/80 px-2.5 py-1 rounded inline-block mb-2.5">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">{resume.professionalSummary}</p>
        </section>
      )}

      {/* Technical & Soft Skills */}
      {(resume.technicalSkills?.length > 0 || resume.softSkills?.length > 0) && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-wider font-bold text-indigo-900 bg-indigo-50/80 px-2.5 py-1 rounded inline-block mb-2.5">
            Skills & Competencies
          </h2>
          <div className="space-y-2 text-sm">
            {resume.technicalSkills?.map((cat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <span className="font-semibold text-slate-900 min-w-[140px] text-xs uppercase tracking-wide text-indigo-700">
                  {cat.category}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills?.map((sk, sIdx) => (
                    <span key={sIdx} className="bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded font-medium border border-slate-200">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {resume.softSkills && resume.softSkills.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 pt-1">
                <span className="font-semibold text-slate-900 min-w-[140px] text-xs uppercase tracking-wide text-indigo-700">
                  Soft Skills:
                </span>
                <span className="text-slate-700 text-xs sm:text-sm">{resume.softSkills.join(' • ')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experience / Internships */}
      {resume.experience && resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-wider font-bold text-indigo-900 bg-indigo-50/80 px-2.5 py-1 rounded inline-block mb-3 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            Experience & Internships
          </h2>
          <div className="space-y-4">
            {resume.experience.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-indigo-200 pl-3.5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{exp.role}</h3>
                  <span className="text-xs text-indigo-700 font-medium">{exp.duration}</span>
                </div>
                <div className="text-xs font-semibold text-slate-600 mb-1.5">{exp.organization}</div>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1 leading-relaxed">
                  {exp.bulletPoints?.map((bp, bIdx) => (
                    <li key={bIdx} className="leading-snug">
                      <span className="inline leading-relaxed">{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-wider font-bold text-indigo-900 bg-indigo-50/80 px-2.5 py-1 rounded inline-block mb-3 flex items-center gap-1.5">
            <FolderGit2 className="w-3.5 h-3.5" />
            Key Projects
          </h2>
          <div className="space-y-4">
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="border-l-2 border-slate-200 pl-3.5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{proj.title}</h3>
                  {proj.role && <span className="text-xs font-medium text-slate-500">{proj.role}</span>}
                </div>
                {proj.technologies?.length > 0 && (
                  <div className="text-xs text-indigo-600 font-medium mb-1.5">
                    Tech Stack: {proj.technologies.join(', ')}
                  </div>
                )}
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1">
                  {proj.bulletPoints?.map((bp, bIdx) => (
                    <li key={bIdx} className="leading-snug">
                      <span className="inline leading-relaxed">{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-wider font-bold text-indigo-900 bg-indigo-50/80 px-2.5 py-1 rounded inline-block mb-3 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline pb-2 border-b border-slate-100 last:border-b-0">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                  <p className="text-xs text-slate-600">{edu.institution}</p>
                </div>
                <div className="text-left sm:text-right mt-1 sm:mt-0">
                  <span className="text-xs font-medium text-indigo-700 block">{edu.year}</span>
                  {edu.cgpaOrPercentage && (
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                      {edu.cgpaOrPercentage}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Achievements */}
      {((resume.certifications && resume.certifications.length > 0) || (resume.achievements && resume.achievements.length > 0)) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
          {resume.certifications && resume.certifications.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-indigo-900 mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                Certifications
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {resume.certifications.map((cert, idx) => (
                  <li key={idx} className="leading-snug">
                    <span className="font-semibold text-slate-800">{cert.name}</span>
                    <span className="text-slate-500 block">{cert.issuer} {cert.year ? `(${cert.year})` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resume.achievements && resume.achievements.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-indigo-900 mb-2 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                Achievements
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {resume.achievements.map((ach, idx) => (
                  <li key={idx} className="leading-snug">
                    <span className="font-semibold text-slate-800">{ach.title}</span>
                    <p className="text-slate-600 text-[11px] leading-tight">{ach.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
