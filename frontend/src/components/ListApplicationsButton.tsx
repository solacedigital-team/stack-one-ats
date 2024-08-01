import React, { useState, useEffect } from 'react';
import { listApplications } from '../utils/listApplications';
import { AiOutlineUser } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';

interface InterviewStage {
  id: string;
  name: string;
  remote_id: string;
}

interface RejectedReason {
  id: string;
  label: string;
  type: string;
  remote_id: string;
}

interface ApplicationStatus {
  value: string;
  source_value: string;
}

interface Application {
  id: string;
  candidate_id: string;
  job_id: string;
  interview_stage: InterviewStage;
  interview_stage_id: string;
  rejected_reasons: RejectedReason[];
  rejected_reason_ids: string[];
  rejected_at: string | null;
  application_status: ApplicationStatus;
  created_at: string;
  updated_at: string;
  remote_id: string;
  remote_candidate_id: string;
  remote_job_id: string;
  remote_interview_stage_id: string;
  remote_rejected_reason_ids: string[];
}

const ListApplicationsButton: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFetchApplications = async () => {
    try {
      const applicationsData = await listApplications();
      setApplications(applicationsData.data);
      console.log(applicationsData);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to fetch applications');
    }
  };

  useEffect(() => {
    handleFetchApplications();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-wrap mb-4 ml-3 justify-between">
        {applications.slice(0, 4).map((application) => (
          <div key={application.id} className="flex flex-col items-center space-y-2 mx-2 bg-green-50 shadow-xl p-4 rounded-lg w-60">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <AiOutlineUser className="text-gray-400 text-4xl" />
            </div>
            <div className="text-black text-sm font-medium space-y-2">
              <div>
                <strong>Job ID:</strong><span className="font-normal">{application.job_id}</span>
              </div>
              <div>
                <strong>Candidate ID:</strong><span className="font-normal">{application.candidate_id}</span>

              </div>
              <div>
                <strong>Applied At:</strong><span className="font-normal">{new Date(application.created_at).toLocaleString()}</span>
              </div>
              <div>
                <strong>Updated At:</strong> <span className="font-normal">{new Date(application.updated_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-black text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-800 ml-4 mt-2"
        style={{ border: '1px solid transparent' }}
        onClick={handleFetchApplications}
      >
        <span>View All</span>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ListApplicationsButton;
