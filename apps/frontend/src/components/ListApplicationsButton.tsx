"use client";
import { ArrowUpIcon, UserIcon } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import {
	type Application,
	type Candidate,
	listApplications,
} from "../http/listApplications";

interface ListApplicationsButtonProps {
	accountId: string;
}

const ListApplicationsButton: React.FC<ListApplicationsButtonProps> = ({
	accountId,
}) => {
	const [applications, setApplications] = useState<Application[]>([]);

	const handleFetchApplications = async () => {
		const applicationsData = await listApplications(accountId);
		if (!applicationsData || !applicationsData.data) {
			console.error("Failed to fetch applications data");
			return;
		}
		setApplications(applicationsData.data);
	};

	useEffect(() => {
		handleFetchApplications();
	}, [accountId]);

	const getCandidateName = (candidate?: Candidate) => {
		if (candidate) {
			return `${candidate.first_name} ${candidate.last_name}`;
		}
		return "Not available";
	};

	return (
		<div>
			<h2
				className="text-2xl font-bold mt-8 mb-4"
				style={{ fontFamily: "Inter, sans-serif" }}
			>
				All Applications
			</h2>
			{applications.length === 0 ? (
				<div className="flex items-center justify-center min-h-[200px] bg-[#E3FFF2] border-2 border-[#05C168] rounded-lg p-4 text-[#A8D5BA]">
					<h2 className="text-xl font-bold">
						Applications data is not available
					</h2>
				</div>
			) : (
				<div className="flex flex-wrap mb-4 ml-3 justify-around">
					{applications.slice(0, 4).map((application) => (
						<div
							key={application.id}
							className="flex flex-col items-start bg-[#E3FFF2] border border-[#05C168] shadow-xl p-4 rounded-lg w-full sm:w-72 sm:mx-2 mb-4"
						>
							<div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4">
								<UserIcon className="text-[#05C168] text-4xl" />
							</div>
							<div className="text-[#05C168] text-sm font-medium space-y-1">
								<div className="flex flex-col">
									<strong>Job ID:</strong>
									<span className="font-normal">
										{application.remote_job_id}
									</span>
								</div>
								<div className="flex flex-col">
									<strong>Candidate ID:</strong>
									<span className="font-normal">
										{application.remote_candidate_id}
									</span>
								</div>
								<div className="flex flex-col">
									<strong>Candidate Name:</strong>
									<span className="font-normal">
										{getCandidateName(application.candidate)}
									</span>
								</div>
								<div className="flex flex-col">
									<strong>Applied At:</strong>
									<span className="font-normal">
										{new Date(application.created_at).toLocaleString()}
									</span>
								</div>
								<div className="flex flex-col">
									<strong>Updated At:</strong>{" "}
									<span className="font-normal">
										{new Date(application.updated_at).toLocaleString()}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			{applications.length > 0 && (
				<button
					className="bg-[#E3FFF2] text-[#05C168] px-4 py-2 rounded border border-[#05C168] flex items-center space-x-2 hover:bg-[#05C168] hover:text-[#FFFFFF] transition-all duration-300 ml-4 mt-2"
					onClick={handleFetchApplications}
				>
					<span>View All</span>
					<ArrowUpIcon className="rotate" />
				</button>
			)}
		</div>
	);
};

export default ListApplicationsButton;
