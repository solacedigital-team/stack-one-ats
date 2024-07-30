import { JobsList } from "../dto/jobsDto";
import axios from "axios";
import config from '../config';
import { ErrorResponse } from '../dto/errors';

export const getJobs = async (accountId: string, next: string): Promise<JobsList> => {

    let url: string = 'https://api.stackone.com/unified/ats/jobs?page_size=25';

    if (next !== null && next !== "") {
        url.concat("next=");
        url.concat(next);
    }
    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json',
                'x-account-id': `${accountId}`,
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorResponse: ErrorResponse = {
                status: error.response?.status || 500,
                message: '',
            };
            switch (errorResponse.status) {
                case 400:
                    errorResponse.message = 'Invalid request.';
                    break;
                case 403:
                    errorResponse.message = 'Forbidden request.';
                    break;
                case 412:
                    errorResponse.message = 'Precondition failed: linked account belongs to a disabled integration.';
                    break;
                case 429:
                    errorResponse.message = 'Too many requests.';
                    break;
                case 500:
                    errorResponse.message = 'Server error while executing the request.';
                    break;
                case 501:
                    errorResponse.message = 'This functionality is not implemented.';
                    break;
                default:
                    errorResponse.message = `Unexpected error: ${errorResponse.status}`;
                    break;
            }
            throw errorResponse;
        } else {
            throw new Error(`Unexpected error: ${error}`);
        }
    }
}

export const getApplications = async (accountId: string, next: string) => {

    let url: string = 'https://api.stackone.com/unified/ats/applications?page_size=25';

    if (next !== null && next !== "") {
        url.concat("next=");
        url.concat(next);
    }
    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json',
                'x-account-id': `${accountId}`,
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorResponse: ErrorResponse = {
                status: error.response?.status || 500,
                message: '',
            };
            switch (errorResponse.status) {
                case 400:
                    errorResponse.message = 'Invalid request.';
                    break;
                case 403:
                    errorResponse.message = 'Forbidden request.';
                    break;
                case 412:
                    errorResponse.message = 'Precondition failed: linked account belongs to a disabled integration.';
                    break;
                case 429:
                    errorResponse.message = 'Too many requests.';
                    break;
                case 500:
                    errorResponse.message = 'Server error while executing the request.';
                    break;
                case 501:
                    errorResponse.message = 'This functionality is not implemented.';
                    break;
                default:
                    errorResponse.message = `Unexpected error: ${errorResponse.status}`;
                    break;
            }
            throw errorResponse;
        } else {
            throw new Error(`Unexpected error: ${error}`);
        }
    }
}