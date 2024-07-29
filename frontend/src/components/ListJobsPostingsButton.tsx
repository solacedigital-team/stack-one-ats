import React, { useState } from 'react';
import { listJobsPostings } from '../utils/listJobsPostings';

interface JobLocation {
  id: string;
  name: string;
  remote_id: string;
}

interface JobStatus {
  value: string;
  source_value: string;
}

interface JobContent {
  html: string;
}

interface Job {
  id: string;
  title: string;
  locations: JobLocation[];
  internal: string;
  status: JobStatus;
  job_id: string;
  content: JobContent;
  external_url: string;
  updated_at: string;
  created_at: string;
  remote_id: string;
  remote_job_id: string;
}

const ListJobsPostingsButton: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFetchJobs = async () => {
    try {
      const jobsData = await listJobsPostings();
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
              <p><strong>Job ID:</strong> {job.job_id}</p>
              <p><strong>Internal:</strong> {job.internal}</p>
              <p><strong>Status:</strong> {job.status.value}</p>
              <p><strong>External URL:</strong> <a href={job.external_url} target="_blank" rel="noopener noreferrer">{job.external_url}</a></p>
              <p><strong>Created At:</strong> {new Date(job.created_at).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(job.updated_at).toLocaleString()}</p>
              <h3>Locations</h3>
              <ul>
                {job.locations.map((location) => (
                  <li key={location.id}>
                    {location.name} (ID: {location.id}, Remote ID: {location.remote_id})
                  </li>
                ))}
              </ul>
              <h3>Content</h3>
              <div dangerouslySetInnerHTML={{ __html: job.content.html }}></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListJobsPostingsButton;
