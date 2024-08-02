import React, { useState, useEffect } from 'react';
import { listJobsPostings } from '../utils/listJobsPostings';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../resources/ManageATSContent.css'; // Import CSS file
import { FaArrowRight } from 'react-icons/fa';

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
    setVisibleJobs((prev) => prev + 2);
  };

  useEffect(() => {
    handleFetchJobs();
  }, [accountId]);

  const truncateId = (id: string) => {
    if (id.length > 20) {
      return `${id.slice(0, 16)}...`;
    }
    return id;
  };
  

  return (
    <div className="relative z-1">
      {error && <p className="text-red-500">{error}</p>}
      {jobs.length > 0 && (
        <>
          <TransitionGroup className="sliding-content">
            {jobs.slice(0, visibleJobs).map((job) => (
              <CSSTransition key={job.id} timeout={300} classNames="slide">
                <div className="job-card">
                  <div className="job-badge-container">
                    <p>Created at</p>
                    <span className="job-badge">{new Date(job.created_at).toLocaleString()}</span>
                    <p>Updated at</p>
                    <span className="job-badge">{new Date(job.updated_at).toLocaleString()}</span>
                  </div>
                  <h2 className="job-title">{job.title}</h2>
                  <p><strong>Job ID:</strong> <span className="truncated-text">{truncateId(job.id)}</span></p>
                  <p><strong>Status:</strong> {job.job_status.value}</p>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
          {visibleJobs < jobs.length && (
            <button className="show-more-button" onClick={handleShowMore}>
              <FaArrowRight />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ListJobsPostingsButton;
