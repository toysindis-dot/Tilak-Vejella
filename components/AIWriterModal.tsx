import React, { useState } from 'react';
import { generateCoverLetter } from '../services/gemini';
import { Loader2, Sparkles, X, Check } from 'lucide-react';

interface AIWriterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (text: string) => void;
  jobTitle: string;
}

const AIWriterModal: React.FC<AIWriterModalProps> = ({ isOpen, onClose, onApply, jobTitle }) => {
  const [experience, setExperience] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!experience.trim()) {
      setError("Please provide some details about your experience first.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await generateCoverLetter(jobTitle, "The Creator Team", experience);
      setGeneratedText(result);
    } catch (err) {
      setError("Failed to generate text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    onApply(generatedText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <h2 className="text-xl font-bold">AI Cover Letter Assistant</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {!generatedText ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tell us briefly about your experience & why you fit this role:
                </label>
                <textarea
                  className="w-full h-40 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                  placeholder="e.g. I have 3 years of editing experience using Premiere Pro. I love your channel's pacing and humor. I previously worked at..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
                <p className="text-xs text-slate-500 mt-2">
                  The AI will take these raw notes and turn them into a polished cover letter.
                </p>
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Generated Draft:
                </label>
                <div className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-lg overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap">
                  {generatedText}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-700 bg-primary-50 p-3 rounded-lg">
                <Check className="w-4 h-4" />
                <span>Review the text above. You can edit it further in the main form.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 font-medium hover:text-slate-800 transition"
          >
            Cancel
          </button>
          
          {!generatedText ? (
            <button
              onClick={handleGenerate}
              disabled={isLoading || !experience.trim()}
              className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Draft
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2 transition shadow-md"
            >
              Use This Text
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIWriterModal;
