import React from 'react';
import { MOCK_JOBS } from '../constants';
import JobCard from './JobCard';
import { Search } from 'lucide-react';

const JobBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredJobs = MOCK_JOBS.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Help Build The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Future of Content</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We're looking for passionate creators, editors, and managers to join our fast-growing team. 
          If you live and breathe internet culture, we want you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
          placeholder="Search for roles (e.g. Editor, Writer)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-slate-500">
            No jobs found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
