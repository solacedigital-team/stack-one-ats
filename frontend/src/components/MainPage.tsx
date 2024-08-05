import React, { useState } from 'react';
import CommonSidebar from '../components/CommonSidebar';
import ManageATSContent from './ManageJobs';

const MainPage: React.FC = () => {
  const [showManageATS, setShowManageATS] = useState(true);

  return (
    <div className="flex">
      <CommonSidebar showManageATS={showManageATS} setShowManageATS={setShowManageATS} />
      <div className="flex-1 ml-1/7  bg-white">
        {showManageATS ? <ManageATSContent /> : (
          <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Apply for Jobs</h2>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;