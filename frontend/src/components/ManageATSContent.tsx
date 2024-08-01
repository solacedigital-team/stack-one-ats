import React, { useState, useEffect } from 'react';
import { listJobsPostings } from '../utils/listJobsPostings';
import LinkAccountButton from './LinkAccountButton';
import { FaUser, FaCircleNotch, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineUser, AiOutlineMail, AiOutlineBell } from 'react-icons/ai';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ManageATSContent.css';
import AllApplications from './AllApplications';
import Contact from './Contact';

const ManageATSContent: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [showLinkAccount, setShowLinkAccount] = useState(false);
  const [activeTab, setActiveTab] = useState('Popular');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const jobs = await listJobsPostings();
      setJobs(jobs);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleManageATSClick = () => {
    setShowLinkAccount(true);
  };

  const getCurrentMonth = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const now = new Date();
    return months[now.getMonth()];
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const tabs = ['Popular', 'Upcoming', 'Latest', 'Top Companies'];

  // Hardcoded data for sliding card
  const hardcodedJobs = [
    {
      company: 'Google',
      jobType: 'Sr. Developer',
      location: 'Germany',
      skills: ['JavaScript', 'React', 'Node.js'],
      additionalInfo: '5 years of experience required',
      description: 'Join our team at Google as a Sr. Developer. We are looking for someone with strong skills in JavaScript, React, and Node.js.',
      postedDate: '2024-07-25',
      deadline: '2024-08-15'
    },
    {
      company: 'Amazon',
      jobType: 'Backend Developer',
      location: 'USA',
      skills: ['Python', 'Django', 'AWS'],
      additionalInfo: '3 years of experience required',
      description: 'Amazon is seeking a Backend Developer skilled in Python, Django, and AWS. Join us and work on innovative projects.',
      postedDate: '2024-07-20',
      deadline: '2024-08-10'
    }
  ];

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

      <div className="mb-4">
        <div className="tabs flex space-x-4">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`pb-2 text-lg ${activeTab === tab ? 'bg-black text-white' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden mb-6" style={{ height: '20rem' }}>
        <TransitionGroup component={null}>
          <CSSTransition key={activeTab} timeout={300} classNames="slide">
            <div className="absolute top-0 left-0 right-0 flex">
              {hardcodedJobs.map((job, index) => (
                <div key={index} className="p-4 w-1/2 rounded-lg shadow-md bg-gray-100 relative m-2">
                  <div className="absolute top-2 right-2 bg-gray-200 text-yellow-900 text-xs font-bold rounded px-2 py-1">
                    Posted: {job.postedDate} <br /> Deadline: {job.deadline}
                  </div>
                  <h3 className="text-xl font-bold">{job.company}</h3>
                  <p className="mb-2">{job.jobType}</p>
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="text-gray-600 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaCircleNotch className="text-gray-600 mr-2" />
                    <span>{job.additionalInfo}</span>
                  </div>
                  <p className="mb-4">{job.description}</p>
                  <div className="flex flex-wrap space-x-2 mb-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>

      <AllApplications />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{getCurrentMonth()}</h3>
          <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>Hired all</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{getCurrentMonth()}</h3>
          <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>Hired all</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{getCurrentDate()}</h3>
          <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>Today's Updates</p>
        </div>
      </div>

      <Contact /> {/* Add the Contact component here */}
      
    </div>
  );
};

export default ManageATSContent;
