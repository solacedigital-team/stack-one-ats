import React, { useState, useEffect } from 'react';
import { retrieveConnectSessionToken } from '../utils/SessionToken';
import { listJobsPostings } from '../utils/listJobsPostings';
import { listApplications } from '../utils/listApplications';
import LinkAccountButton from './LinkAccountButton';

const MainPage: React.FC = () => {
  const [showManageATS, setShowManageATS] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [showLinkAccount, setShowLinkAccount] = useState(false);

  useEffect(() => {
    if (showManageATS) {
      loadJobsAndApplications();
    }
  }, [showManageATS]);

  const loadJobsAndApplications = async () => {
    try {
      const jobsData = await listJobsPostings();
      const applicationsData = await listApplications();
      setJobs(jobsData.data);
      setApplications(applicationsData.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleManageATSClick = () => {
    setShowLinkAccount(true);
    // retrieveConnectSessionToken();
  };

  return (
    <div className="min-h-screen flex">
      <div className="bg-blue-900 text-white w-1/5 p-4 flex flex-col items-center">
        <div className="text-center text-xl font-bold mb-8">StackOne Unified ATS</div>
        <div className="flex flex-col items-center space-y-4">
          <button
            className={`px-4 py-2 rounded ${showManageATS ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            onClick={() => { setShowManageATS(true); setShowLinkAccount(false); }}
          >
            Manage ATS
          </button>
          <button
            className={`px-4 py-2 rounded ${!showManageATS ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            onClick={() => setShowManageATS(false)}
          >
            Apply for Jobs
          </button>
        </div>
      </div>
      <div className="flex-1 p-8 bg-white">
        {showManageATS && (
          <div className="p-6 rounded-lg shadow-md">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700 mb-6"
              onClick={handleManageATSClick}
            >
              Manage ATS Portals
            </button>
            {showLinkAccount && <LinkAccountButton />}
            <h2 className="text-2xl font-bold mb-4">Posted Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-gray-100 p-4 rounded shadow-md">
                  <h3 className="font-bold text-xl">{job.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: job.content.html }}></p>
                  <a href={job.external_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View Job
                  </a>
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-bold mt-8 mb-4">All Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {applications.map((application) => (
                <div key={application.id} className="bg-gray-100 p-4 rounded shadow-md">
                  <h3 className="font-bold text-xl">Application ID: {application.id}</h3>
                  <p><strong>Candidate ID:</strong> {application.candidate_id}</p>
                  <p><strong>Job ID:</strong> {application.job_id}</p>
                  <p><strong>Interview Stage:</strong> {application.interview_stage.name}</p>
                  <p><strong>Status:</strong> {application.application_status.value}</p>
                  <p><strong>Created At:</strong> {new Date(application.created_at).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(application.updated_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {!showManageATS && (
          <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Apply for Jobs</h2>
            {/* Add content for Apply for Jobs if needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
