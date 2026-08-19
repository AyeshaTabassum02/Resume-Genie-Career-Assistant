import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { ResumePreviewContainer } from '../components/ResumeTemplates/ResumePreviewContainer';
import {
  Sparkles,
  Plus,
  Trash2,
  RotateCcw,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  CheckCircle2,
  Loader2,
  Play,
  Eye,
  Edit3,
} from 'lucide-react';

export const ResumeGenie: React.FC = () => {
  const {
    resumeFormData,
    setResumeFormData,
    generatedResume,
    setGeneratedResume,
    loadSampleResumeForm,
    clearResumeForm,
    showToast,
  } = useApp();

  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>(generatedResume ? 'preview' : 'form');

  // Personal info updater
  const updatePersonalInfo = (field: keyof typeof resumeFormData, value: string) => {
    setResumeFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Education handlers
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      year: '',
      cgpaOrPercentage: '',
    };
    setResumeFormData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const removeEducation = (id: string) => {
    setResumeFormData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeFormData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  // Project handlers
  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      technologies: '',
      roleOrContribution: '',
    };
    setResumeFormData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const removeProject = (id: string) => {
    setResumeFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const updateProject = (id: string, field: string, value: string) => {
    setResumeFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  // Experience handlers
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      organization: '',
      role: '',
      duration: '',
      description: '',
    };
    setResumeFormData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const removeExperience = (id: string) => {
    setResumeFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  // Certification handlers
  const addCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      year: '',
    };
    setResumeFormData((prev) => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const removeCertification = (id: string) => {
    setResumeFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const updateCertification = (id: string, field: string, value: string) => {
    setResumeFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }));
  };

  // Achievement handlers
  const addAchievement = () => {
    const newAch = {
      id: `ach-${Date.now()}`,
      title: '',
      description: '',
    };
    setResumeFormData((prev) => ({ ...prev, achievements: [...prev.achievements, newAch] }));
  };

  const removeAchievement = (id: string) => {
    setResumeFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
  };

  const updateAchievement = (id: string, field: string, value: string) => {
    setResumeFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    }));
  };

  const handleGenerate = async () => {
    if (!resumeFormData.fullName.trim()) {
      showToast('Please enter at least your Full Name.', 'error');
      return;
    }

    try {
      setIsGenerating(true);
      showToast('Polishing resume with Gemini AI NLP...', 'info');

      const result = await apiService.generateResume(resumeFormData);
      setGeneratedResume(result);
      setActiveTab('preview');
      showToast('Resume generated successfully!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to generate resume.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Resume Genie</h1>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold uppercase tracking-wider border border-blue-200 px-2 py-0.5 rounded">
              AI Generator
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Transform raw student projects and education into a high-impact, action-oriented resume.
          </p>
        </div>

        {/* View Toggle & Demo Presets */}
        <div className="flex items-center space-x-2">
          {generatedResume && (
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                id="tab-btn-form"
                onClick={() => setActiveTab('form')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'form' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Form</span>
              </button>
              <button
                id="tab-btn-preview"
                onClick={() => setActiveTab('preview')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'preview' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Resume View</span>
              </button>
            </div>
          )}

          <button
            id="load-sample-btn"
            onClick={loadSampleResumeForm}
            className="flex items-center space-x-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-2 rounded-xl transition-colors shadow-2xs"
            title="Populates complete student details for instant demo"
          >
            <Play className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
            <span>Sample Profile</span>
          </button>

          <button
            id="clear-form-btn"
            onClick={clearResumeForm}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-slate-200"
            title="Clear all fields"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area: Form or Preview */}
      {activeTab === 'preview' && generatedResume ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveTab('form')}
              className="flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>← Back to Form Editor</span>
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center space-x-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>Regenerate Content</span>
            </button>
          </div>

          <ResumePreviewContainer resume={generatedResume} onEdit={() => setActiveTab('form')} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Section 1: Personal Information */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-blue-600" />
              <span>1. Personal Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="input-fullname"
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={resumeFormData.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  id="input-email"
                  type="email"
                  placeholder="e.g. alex.rivera@university.edu"
                  value={resumeFormData.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  id="input-phone"
                  type="text"
                  placeholder="e.g. +1 (555) 019-2834"
                  value={resumeFormData.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  id="input-location"
                  type="text"
                  placeholder="e.g. Seattle, WA"
                  value={resumeFormData.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
                <input
                  id="input-linkedin"
                  type="text"
                  placeholder="e.g. linkedin.com/in/alex-rivera-cs"
                  value={resumeFormData.linkedIn}
                  onChange={(e) => updatePersonalInfo('linkedIn', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / Portfolio</label>
                <input
                  id="input-github"
                  type="text"
                  placeholder="e.g. github.com/alexrivera-dev"
                  value={resumeFormData.gitHub}
                  onChange={(e) => updatePersonalInfo('gitHub', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Career Target & Skills */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>2. Career Objective & Skills</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Role / Career Objective
                </label>
                <input
                  id="input-targetrole"
                  type="text"
                  placeholder="e.g. Full Stack Developer, Frontend Software Engineer"
                  value={resumeFormData.targetRole}
                  onChange={(e) => updatePersonalInfo('targetRole', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Technical Skills (Comma separated)
                  </label>
                  <textarea
                    id="input-techskills"
                    rows={3}
                    placeholder="e.g. JavaScript, TypeScript, React.js, Node.js, Express, SQL, MongoDB, Tailwind, Git"
                    value={resumeFormData.technicalSkills}
                    onChange={(e) => updatePersonalInfo('technicalSkills', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Soft Skills & Strengths
                  </label>
                  <textarea
                    id="input-softskills"
                    rows={3}
                    placeholder="e.g. Problem Solving, Agile Collaboration, Technical Writing, Fast Learner"
                    value={resumeFormData.softSkills}
                    onChange={(e) => updatePersonalInfo('softSkills', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Education */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>3. Education</span>
              </div>
              <button
                type="button"
                onClick={addEducation}
                className="flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Degree</span>
              </button>
            </div>

            <div className="space-y-4">
              {resumeFormData.education.map((edu, idx) => (
                <div key={edu.id} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Degree #{idx + 1}
                    </span>
                    {resumeFormData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Degree / Course</label>
                      <input
                        type="text"
                        placeholder="e.g. B.S. in Computer Science"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Institution</label>
                      <input
                        type="text"
                        placeholder="e.g. University of Washington"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Year / Timeline</label>
                      <input
                        type="text"
                        placeholder="e.g. 2022 - 2026"
                        value={edu.year}
                        onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">GPA / Score</label>
                      <input
                        type="text"
                        placeholder="e.g. 3.82 GPA"
                        value={edu.cgpaOrPercentage}
                        onChange={(e) => updateEducation(edu.id, 'cgpaOrPercentage', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Projects */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                  <FolderGit2 className="w-4 h-4 text-blue-600" />
                  <span>4. Academic & Portfolio Projects</span>
                </div>
                <p className="text-[11px] text-slate-500">Gemini will polish project descriptions into impactful action bullets.</p>
              </div>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-4">
              {resumeFormData.projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Project #{idx + 1}
                    </span>
                    {resumeFormData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProject(proj.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Project Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Cloud Task Hub"
                        value={proj.title}
                        onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Technologies Used</label>
                      <input
                        type="text"
                        placeholder="e.g. React, Node.js, Express, MongoDB, Tailwind"
                        value={proj.technologies}
                        onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Project Description & Outcomes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Built an online task manager with real-time socket sync and JWT security."
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Experience */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>5. Experience & Internships (Optional)</span>
              </div>
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Experience</span>
              </button>
            </div>

            {resumeFormData.experience.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No experience entries added yet.</p>
            ) : (
              <div className="space-y-4">
                {resumeFormData.experience.map((exp, idx) => (
                  <div key={exp.id} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Experience #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company / Organization</label>
                        <input
                          type="text"
                          placeholder="e.g. CloudScale Labs"
                          value={exp.organization}
                          onChange={(e) => updateExperience(exp.id, 'organization', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Role Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Software Engineering Intern"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. June 2024 - Aug 2024"
                          value={exp.duration}
                          onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Key Responsibilities & Tasks</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Built responsive dashboards using React and Express APIs, improving load time by 25%."
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Action Bar */}
          <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-blue-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>AI transforms input into polished action-oriented bullet points.</span>
            </div>

            <button
              id="generate-resume-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-101 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Polishing with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Generate Professional Resume</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
