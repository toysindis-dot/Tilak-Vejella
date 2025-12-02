import React from 'react';
import { Job } from '../types';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Link 
      to={`/jobs/${job.id}`}
      className="group block bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-primary-300 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full mb-2">
            {job.department}
          </span>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
            {job.title}
          </h3>
        </div>
        <span className="text-slate-400 group-hover:text-primary-500 transition-colors">
          <ArrowRight className="w-6 h-6" />
        </span>
      </div>
      
      <p className="text-slate-600 text-sm mb-6 line-clamp-2 h-10">
        {job.description}
      </p>

      <div className="flex items-center gap-4 text-sm text-slate-500 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {job.location}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {job.type}
        </div>
        <div className="ml-auto font-medium text-slate-900">
          {job.salaryRange}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
