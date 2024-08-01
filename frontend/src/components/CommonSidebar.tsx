import React from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

interface SidebarProps {
  showManageATS: boolean;
  setShowManageATS: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommonSidebar: React.FC<SidebarProps> = ({ showManageATS, setShowManageATS }) => {
  return (
    <div className="rounded-sm text-gray-900 w-1/7 p-4 flex flex-col items-center">
      <div className="text-center text-xl font-bold mb-8">StackOne</div>
      <div className="flex flex-col items-center space-y-4">
        <button
          className={`px-4 py-2 rounded ${showManageATS ? 'bg-emerald-500 text-white' : 'bg-transparent text-gray-900'} hover:bg-emerald-100 hover:text-emerald-500 font-semibold transition-all duration-300 flex items-center space-x-2`}
          onClick={() => setShowManageATS(true)}
        >
          <ChevronRightIcon className="w-5 h-5" />
          <span>Manage Jobs</span>
        </button>
        {/* <button
          className={`px-4 py-2 rounded ${!showManageATS ? 'bg-emerald-500 text-white' : 'bg-transparent text-gray-900'} hover:bg-emerald-100 hover:text-emerald-500 font-semibold transition-all duration-300 flex items-center space-x-2`}
          onClick={() => setShowManageATS(false)}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Apply for Jobs</span>
        </button> */}
      </div>
    </div>
  );
};

export default CommonSidebar;
