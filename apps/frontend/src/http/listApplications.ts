import { hc } from "@repo/api-client";
import { handleResponse } from "./apiUtils";

type InterviewStage = {
	id: string;
	name: string;
	remote_id: string;
};

type RejectedReason = {
	id: string;
	label: string;
	type: string;
	remote_id: string;
};

type ApplicationStatus = {
	value: string;
	source_value: string;
};

export type Candidate = {
	name: string;
	first_name: string;
	last_name: string;
};

export type Application = {
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
	candidate?: Candidate;
};

type ApplicationResponse = {
	data: Application[];
};

export const listApplications = async (accountId: string) => {
	try {
		const response = await hc.api.ats.applications.$get(
			{},
			{
				headers: {
					"x-account-id": accountId,
				},
			},
		);

		return await handleResponse<ApplicationResponse>(response);
	} catch (error) {
		console.error("Error fetching applications:", error);
		return { data: [] };
	}
};
