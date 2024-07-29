import React, { useState } from 'react';
import { fetchJobs } from '../utils/getAllJobs';

interface Job {
  id: string;
  title: string;
  code: string;
  status: string;
  job_status: {
    value: string;
    source_value: string;
  };
  department_ids: string[];
  location_ids: string[];
  hiring_team: {
    user_id: string;
    first_name: string;
    last_name: string;
    role: string;
    remote_user_id: string;
  }[];
  confidential: string;
  created_at: string;
  updated_at: string;
  remote_id: string;
  remote_department_ids: string[];
  remote_location_ids: string[];
}

const FetchJobsButton: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFetchJobs = async () => {
    try {
      const jobsData = await fetchJobs();
      setJobs(jobsData.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs');
    }
  };

  return (
    <div>
      <button onClick={handleFetchJobs}>Fetch Jobs</button>
      {error && <p>{error}</p>}
      {jobs.length > 0 && (
        <div>
          {jobs.map((job) => (
            <div key={job.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
              <h2>{job.title}</h2>
              <p><strong>Code:</strong> {job.code}</p>
              <p><strong>Status:</strong> {job.status}</p>
              <p><strong>Job Status:</strong> {job.job_status.value}</p>
              <p><strong>Confidential:</strong> {job.confidential}</p>
              <p><strong>Created At:</strong> {new Date(job.created_at).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(job.updated_at).toLocaleString()}</p>
              <h3>Hiring Team</h3>
              <ul>
                {job.hiring_team.map((member) => (
                  <li key={member.user_id}>
                    {member.first_name} {member.last_name} - {member.role}
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

export default FetchJobsButton;
