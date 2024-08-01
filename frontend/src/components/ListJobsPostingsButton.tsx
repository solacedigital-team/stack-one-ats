import React, { useState, useEffect } from 'react';
import { listJobsPostings } from '../utils/listJobsPostings';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../resources/ManageATSContent.css';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

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
  const [visibleJobs, setVisibleJobs] = useState<number>(2);

  const handleFetchJobs = async () => {
    try {
      const jobsData = await listJobsPostings();
      setJobs(jobsData.data);
      
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
  }, []);

  return (
    <div className="relative">
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
                <p><strong>Job ID:</strong> {job.id}</p>
                <p><strong>Status:</strong> {job.status.value}</p>
                <h3 className="job-section-title">Locations</h3>
                <ul className="job-locations">
                  {job.locations.map((location) => (
                    <li key={location.id}>
                      <FaMapMarkerAlt className="location-icon" /> {location.name}
                    </li>
                  ))}
                </ul>
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
