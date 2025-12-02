import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_JOBS } from '../constants';
import { ArrowLeft, MapPin, Clock, DollarSign, CheckCircle2, Upload, Sparkles } from 'lucide-react';
import { ApplicationFormState } from '../types';
import AIWriterModal from './AIWriterModal';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = MOCK_JOBS.find(j => j.id === id);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  
  const [formState, setFormState] = useState<ApplicationFormState>({
    fullName: '',
    email: '',
    portfolioUrl: '',
    coverLetter: '',
    resume: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900">Job not found</h2>
        <Link to="/" className="text-primary-600 hover:underline mt-4 inline-block">Back to Job Board</Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleAIApply = (text: string) => {
    setFormState(prev => ({ ...prev, coverLetter: text }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
        <p className="text-slate-600 text-lg mb-8">
          Thanks for applying to be our new <span className="font-semibold text-slate-900">{job.title}</span>. 
          We've sent a confirmation email to {formState.email}. We'll be in touch soon!
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/" className="inline-flex items-center text-slate-500 hover:text-primary-600 mb-8 transition">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to all jobs
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-8 border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full mb-3">
                {job.department}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{job.title}</h1>
              <div className="flex flex-wrap gap-4 text-slate-500 text-sm mt-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {job.type}
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  {job.salaryRange}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50/50">
          <div className="prose prose-slate max-w-none">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">About the Role</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">{job.description}</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Responsibilities</h3>
                <ul className="space-y-2">
                  {job.responsibilities.map((res, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                      {res}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="apply-form" className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-900">Apply for this Position</h2>
          <p className="text-slate-500 mt-1">Fill out the form below to submit your application.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="Jane Doe"
                value={formState.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="jane@example.com"
                value={formState.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="portfolioUrl" className="block text-sm font-medium text-slate-700 mb-2">Portfolio / LinkedIn URL</label>
            <input
              type="url"
              id="portfolioUrl"
              name="portfolioUrl"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="https://..."
              value={formState.portfolioUrl}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="coverLetter" className="block text-sm font-medium text-slate-700">Cover Letter</label>
              <button
                type="button"
                onClick={() => setIsAIModalOpen(true)}
                className="text-xs flex items-center gap-1 text-primary-600 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-full font-medium transition"
              >
                <Sparkles className="w-3 h-3" />
                Write with AI
              </button>
            </div>
            <textarea
              id="coverLetter"
              name="coverLetter"
              required
              rows={6}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-y"
              placeholder="Tell us why you're a great fit..."
              value={formState.coverLetter}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Resume / CV</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:bg-slate-50 transition cursor-pointer relative">
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <div className="space-y-1 text-center pointer-events-none">
                {formState.resume ? (
                  <div className="flex flex-col items-center text-primary-600">
                    <CheckCircle2 className="w-10 h-10 mb-2" />
                    <span className="text-sm font-medium text-slate-900">{formState.resume.name}</span>
                    <span className="text-xs text-slate-500">{(formState.resume.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-slate-400" />
                    <div className="flex text-sm text-slate-600 justify-center">
                      <span className="font-medium text-primary-600 hover:text-primary-500">Upload a file</span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PDF, DOC up to 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
      
      <AIWriterModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onApply={handleAIApply}
        jobTitle={job.title}
      />
    </div>
  );
};

export default JobDetail;
