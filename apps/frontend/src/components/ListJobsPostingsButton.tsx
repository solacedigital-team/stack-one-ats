"use client";
import { ArrowDownIcon } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { type Job, listJobsPostings } from "../http/listJobsPostings";

const ListJobsPostingsButton: React.FC<{ accountId: string }> = ({
	accountId,
}) => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [visibleJobs, setVisibleJobs] = useState<number>(2);

	const handleFetchJobs = async () => {
		const jobsData = await listJobsPostings(accountId);

		if (!jobsData || !jobsData.data) {
			console.error("No job data found");
			setJobs([]);
			return;
		}
		if (Array.isArray(jobsData.data)) {
			setJobs(jobsData.data);
		}
	};

	const handleShowMore = () => {
		setVisibleJobs((prev) => Math.min(prev + 2, jobs.length));
	};

	const handleShowLess = () => {
		setVisibleJobs((prev) => Math.max(prev - 2, 2));
	};

	useEffect(() => {
		handleFetchJobs();
	}, [accountId]);

	return (
		<div className="relative z-1">
			{jobs.length === 0 ? (
				<div className="flex items-center justify-center min-h-[200px] bg-[#E3FFF2] border-2 border-[#05C168] rounded-lg p-4 text-[#A8D5BA]">
					<h2 className="text-xl font-bold">Jobs data is not available</h2>
				</div>
			) : (
				<TransitionGroup className="sliding-content">
					{jobs.slice(0, visibleJobs).map((job, index) => (
						<CSSTransition key={job.id} timeout={300} classNames="slide">
							<div id={`job-card-${index}`} className="job-card">
								<h2 className="job-title">{job.title}</h2>
								<p>
									<strong>Job ID:</strong>{" "}
									<span
										id={`truncated-text-${index}`}
										className="truncated-text"
									>
										{job.remote_id}
									</span>
								</p>
								<p>
									<strong>Status:</strong> {job.job_status.value}
								</p>
								<div
									id={`job-badge-container-${index}`}
									className="job-badge-container"
								>
									<p>Created at</p>
									<span className="job-badge">
										{new Date(job.created_at).toLocaleString()}
									</span>
									<p>Updated at</p>
									<span className="job-badge">
										{new Date(job.updated_at).toLocaleString()}
									</span>
								</div>
							</div>
						</CSSTransition>
					))}
				</TransitionGroup>
			)}
			<div className="flex justify-between mt-4">
				{jobs.length > 0 && visibleJobs < jobs.length && (
					<button className="show-more-button" onClick={handleShowMore}>
						<ArrowDownIcon className="icon-size" />
					</button>
				)}
				{jobs.length > 0 && visibleJobs > 2 && (
					<button className="show-more-button" onClick={handleShowLess}>
						<ArrowDownIcon className="icon-size rotate-180" />
					</button>
				)}
			</div>
		</div>
	);
};

export default ListJobsPostingsButton;
