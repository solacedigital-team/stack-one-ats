import { getAtsApiUrl, errorHandler, handleResponse } from "./apiUtils";


export type JobStatus = {
    value: string;
    source_value: string;
}

export type HiringTeamMember = {
    user_id: string;
    first_name: string;
    last_name: string;
    role: string;
    remote_user_id: string;
}

export type Job = {
    id: string;
    title: string;
    job_status: JobStatus;
    department_ids: string[];
    location_ids: string[];
    hiring_team: HiringTeamMember[];
    confidential: string;
    created_at: string;
    updated_at: string;
    remote_id: string;
}

type ListJobsPostingsResponse = {
    data: Job[];
}

export const listJobsPostings = async (accountId: string) => {
    try {
        const apiUrl = getAtsApiUrl();
        const response = await fetch(`${apiUrl}/jobs`, {
            method: 'GET',
            headers: {
                'x-account-id': accountId
            }
        });

        return await handleResponse<ListJobsPostingsResponse>(response);
    } catch (error) {
        errorHandler(error);
    }
};
