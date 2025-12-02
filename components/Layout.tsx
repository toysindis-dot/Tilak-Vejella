import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Twitter, Youtube, Instagram } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-primary-600 p-2 rounded-lg text-white group-hover:bg-primary-700 transition-colors">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">CreatorJobs</span>
              </Link>
            </div>
            <div className="flex items-center gap-6">
               <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">Our Team</a>
               <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">Perks</a>
               <Link to="/" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                 View Openings
               </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="bg-slate-100 p-1.5 rounded-md">
                 <Briefcase className="w-5 h-5 text-slate-900" />
               </div>
               <span className="font-semibold text-slate-900">CreatorJobs</span>
            </div>
            
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} CreatorJobs. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-[#1DA1F2] transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-[#FF0000] transition-colors"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-[#E4405F] transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
