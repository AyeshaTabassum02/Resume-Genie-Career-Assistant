import React from 'react';
import { GeneratedResume } from '../../types';

interface Props {
  resume: GeneratedResume;
}

export const ClassicTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div id="resume-classic-root" className="bg-white text-gray-900 p-8 sm:p-10 font-serif shadow-sm border border-gray-300 rounded-xl max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none">
      {/* Header Centered */}
      <div className="text-center pb-4 mb-5 border-b border-gray-400">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 uppercase">{resume.fullName || 'Candidate Name'}</h1>
        <p className="text-sm font-semibold tracking-wider text-gray-700 mt-1 uppercase">{resume.targetRole || 'Software Engineer'}</p>

        {/* Contact Line */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-600 font-sans">
          {resume.location && <span>{resume.location}</span>}
          {resume.location && resume.phone && <span>•</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.phone && resume.email && <span>•</span>}
          {resume.email && <span>{resume.email}</span>}
          {resume.linkedIn && (
            <>
              <span>•</span>
              <span className="truncate max-w-[200px]">{resume.linkedIn.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
          {resume.gitHub && (
            <>
              <span>•</span>
              <span className="truncate max-w-[200px]">{resume.gitHub.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.professionalSummary && (
        <section className="mb-5">
          <h2 className="text-sm uppercase font-bold tracking-widest text-gray-900 border-b border-gray-300 pb-0.5 mb-2 font-sans">
            Executive Summary
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-gray-800 text-justify">{resume.professionalSummary}</p>
        </section>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm uppercase font-bold tracking-widest text-gray-900 border-b border-gray-300 pb-0.5 mb-2.5 font-sans">
            Education
          </h2>
          <div className="space-y-2.5">
            {resume.education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-gray-900">{edu.institution}</span>
                  <span className="text-gray-700 italic text-xs">{edu.year}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-gray-700">
                  <span className="italic">{edu.degree}</span>
                  {edu.cgpaOrPercentage && <span className="font-medium">Score: {edu.cgpaOrPercentage}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {(resume.technicalSkills?.length > 0 || resume.softSkills?.length > 0) && (
        <section className="mb-5">
          <h2 className="text-sm uppercase font-bold tracking-widest text-gray-900 border-b border-gray-300 pb-0.5 mb-2 font-sans">
            Technical & Professional Skills
          </h2>
          <div className="space-y-1 text-xs sm:text-sm">
            {resume.technicalSkills?.map((cat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-bold text-gray-900 min-w-[150px]">{cat.category}:</span>
                <span className="text-gray-800">{cat.skills.join(', ')}</span>
              </div>
            ))}
            {resume.softSkills && resume.softSkills.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:gap-2 pt-0.5">
                <span className="font-bold text-gray-900 min-w-[150px]">Core Competencies:</span>
                <span className="text-gray-800">{resume.softSkills.join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm uppercase font-bold tracking-widest text-gray-900 border-b border-gray-300 pb-0.5 mb-2.5 font-sans">
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {resume.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-gray-900">{exp.role}</span>
                  <span className="text-gray-700 italic text-xs">{exp.duration}</span>
                </div>
                <div className="text-xs text-gray-700 italic mb-1">{exp.organization}</div>
                <ul className="list-disc list-outside ml-4 text-xs sm:text-sm text-gray-800 space-y-1">
                  {exp.bulletPoints?.map((bp, bIdx) => (
                    <li key={bIdx} className="leading-snug">{bp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm uppercase font-bold tracking-widest text-gray-900 border-b border-gray-300 pb-0.5 mb-2.5 font-sans">
            Academic & Technical Projects
          </h2>
          <div className="space-y-3.5">
            {resume.projects.map((proj, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-gray-900">
                    {proj.title} {proj.role && <span className="font-normal italic text-gray-600">({proj.role})</span>}
                  </span>
                  {proj.technologies?.length > 0 && (
                    <span className="text-xs text-gray-600 font-sans italic">
                      [{proj.technologies.join(', ')}]
                    </span>
                  )}
                </div>
                <ul className="list-disc list-outside ml-4 text-xs sm:text-sm text-gray-800 space-y-1 mt-1">
                  {proj.bulletPoints?.map((bp, bIdx) => (
                    <li key={bIdx} className="leading-snug">{bp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Honors */}
      {((resume.certifications && resume.certifications.length > 0) || (resume.achievements && resume.achievements.length > 0)) && (
        <section className="mb-3">
          <h2 className="text-sm uppercase font-bold tracking-widest text-gray-900 border-b border-gray-300 pb-0.5 mb-2 font-sans">
            Honors, Certifications & Achievements
          </h2>
          <ul className="list-disc list-outside ml-4 text-xs sm:text-sm text-gray-800 space-y-1">
            {resume.certifications?.map((cert, idx) => (
              <li key={`cert-${idx}`}>
                <span className="font-semibold">{cert.name}</span> — {cert.issuer} {cert.year ? `(${cert.year})` : ''}
              </li>
            ))}
            {resume.achievements?.map((ach, idx) => (
              <li key={`ach-${idx}`}>
                <span className="font-semibold">{ach.title}:</span> {ach.description}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
