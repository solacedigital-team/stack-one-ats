import React from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlineBell } from 'react-icons/ai';
import LinkAccountButton from './LinkAccountButton';
import AllApplications from './AllApplications';
import Contact from './Contact';
import ListJobsPostingsButton from './ListJobsPostingsButton';
import '../resources/ManageATSContent.css';

const ManageATSContent: React.FC = () => {
  const [showLinkAccount, setShowLinkAccount] = React.useState(false);

  const handleManageATSClick = () => {
    setShowLinkAccount(!showLinkAccount);
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <AiOutlineUser className="text-gray-600 text-3xl" />
          </div>
          <h1 className="text-xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Manage Jobs</h1>
        </div>
        <div className="flex space-x-4">
          <AiOutlineBell className="text-gray-600 text-3xl cursor-pointer" />
          <AiOutlineMail className="text-gray-600 text-3xl cursor-pointer" />
        </div>
      </div>
      <div className="border-b mb-6"></div>
      <button
        className="bg-black text-white px-4 py-2 rounded shadow hover:bg-green-700 mb-6"
        onClick={handleManageATSClick}
      >
        Manage Jobs Portals
      </button>
      {showLinkAccount && <LinkAccountButton />}
      
      <ListJobsPostingsButton />
      <AllApplications />
      <Contact />
    </div>
  );
};

export default ManageATSContent;
