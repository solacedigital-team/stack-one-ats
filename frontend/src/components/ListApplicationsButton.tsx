import React, { useState } from 'react';
import { listApplications } from '../utils/listApplications';

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
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to fetch applications');
    }
  };

  return (
    <div>
      <button onClick={handleFetchApplications}>Fetch Applications</button>
      {error && <p>{error}</p>}
      {applications.length > 0 && (
        <div>
          {applications.map((application) => (
            <div key={application.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
              <h2>Application ID: {application.id}</h2>
              <p><strong>Candidate ID:</strong> {application.candidate_id}</p>
              <p><strong>Job ID:</strong> {application.job_id}</p>
              <p><strong>Interview Stage:</strong> {application.interview_stage.name}</p>
              <p><strong>Application Status:</strong> {application.application_status.value}</p>
              <p><strong>Created At:</strong> {new Date(application.created_at).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(application.updated_at).toLocaleString()}</p>
              <h3>Rejected Reasons</h3>
              <ul>
                {application.rejected_reasons.map((reason) => (
                  <li key={reason.id}>
                    {reason.label} (Type: {reason.type}, Remote ID: {reason.remote_id})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListApplicationsButton;
