import React, { useState, useEffect } from 'react';
import { listJobsPostings } from '../utils/listJobsPostings';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../resources/Content.css'; // Import CSS file
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'; // Import up and down arrow icons

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
  job_status: JobStatus;
  department_ids: string[];
  location_ids: string[];
  hiring_team: any[];
  confidential: string;
  created_at: string;
  updated_at: string;
  remote_id: string;
}

const ListJobsPostingsButton: React.FC<{ accountId: string }> = ({ accountId }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleJobs, setVisibleJobs] = useState<number>(2);

  const handleFetchJobs = async () => {
    try {
      const jobsData = await listJobsPostings(accountId);
      if (jobsData && jobsData.data) {
        setJobs(jobsData.data);
      } else {
        throw new Error('Invalid data format');
      }
      console.log(jobsData);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs');
    }
  };

  const handleShowMore = () => {
    setVisibleJobs(prev => Math.min(prev + 2, jobs.length));
  };

  const handleShowLess = () => {
    setVisibleJobs(prev => Math.max(prev - 2, 2));
  };

  useEffect(() => {
    handleFetchJobs();
  }, [accountId]);

  return (
    <div className="relative z-1">
      {error && <p className="text-red-500">{error}</p>}
      {jobs.length > 0 && (
        <>
          <TransitionGroup className="sliding-content">
            {jobs.slice(0, visibleJobs).map((job, index) => (
              <CSSTransition key={job.id} timeout={300} classNames="slide">
                <div id={`job-card-${index}`} className="job-card">
                  <h2 className="job-title">{job.title}</h2>
                  <p>
                    <strong>Job ID:</strong>{' '}
                    <span id={`truncated-text-${index}`} className="truncated-text">
                      {job.id}
                    </span>
                  </p>
                  <p><strong>Status:</strong> {job.job_status.value}</p>
                  <div id={`job-badge-container-${index}`} className="job-badge-container">
                    <p>Created at</p>
                    <span className="job-badge">{new Date(job.created_at).toLocaleString()}</span>
                    <p>Updated at</p>
                    <span className="job-badge">{new Date(job.updated_at).toLocaleString()}</span>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
          <div className="flex justify-between mt-4">
            {visibleJobs < jobs.length && (
              <button className="show-more-button" onClick={handleShowMore}>
                <FaArrowDown />
              </button>
            )}
            {visibleJobs > 2 && (
              <button className="show-more-button" onClick={handleShowLess}>
                <FaArrowUp />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ListJobsPostingsButton;
