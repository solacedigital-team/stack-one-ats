import React, { useState } from 'react';
import './App.css';
import './index.css';  
import LinkAccountButton from './components/LinkAccountButton';
import ListJobsPostingsButton from './components/ListJobsPostingsButton';
import ListApplicationsButton from './components/ListApplicationsButton';
import { SidebarProvider } from './context/SidebarContext';
import CommonSidebar from './components/CommonSidebar'; // Import the CommonSidebar component
import ManageATSContent from './components/ManageJobs'; // Import ManageATSContent

const App: React.FC = () => {
  const [showManageATS, setShowManageATS] = useState(true);

  return (
    <SidebarProvider>
      <div className="flex">
        {/* Sidebar */}
        <CommonSidebar showManageATS={showManageATS} setShowManageATS={setShowManageATS} />

        {/* Main Content */}
        <div className="ml-1/7 p-6 flex-1">
          <h1 className="text-3xl font-bold mb-6">StackOne Integration</h1>
          <LinkAccountButton />
          {/* The ListJobsPostingsButton should be removed from here if it's managed in ManageATSContent */}
          {/* <ListApplicationsButton /> */}
          
          {/* ManageATSContent Component */}
          {showManageATS && <ManageATSContent />}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default App;
