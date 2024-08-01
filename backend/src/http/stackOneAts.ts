import { JobsList } from "../dto/jobsDto";
import axios from "axios";
import config from '../config';
import { InvalidRequestError, ForbiddenRequestError, PreconditionFailedError, TooManyRequestsError, ServerError, NotImplementedError, UnhandledError } from '../errors/stackoneErrors';

export const getJobs = async (accountId: string, next: string): Promise<JobsList> => {

    let url: string = 'https://api.stackone.com/unified/ats/jobs?page_size=25';

    if (next !== null && next !== "") {
        url = `${url}&next=${next}`;
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
            switch (error.response?.status) {
                case 400:
                    throw new InvalidRequestError('Invalid request.');
                case 403:
                    throw new ForbiddenRequestError('Forbidden request.');
                case 412:
                    throw new PreconditionFailedError('Precondition failed: linked account belongs to a disabled integration.');
                case 429:
                    throw new TooManyRequestsError('Too many requests.');
                case 500:
                    throw new ServerError('Server error while executing the request.');
                case 501:
                    throw new NotImplementedError('This functionality is not implemented.');
                default:
                    throw new UnhandledError(`Unexpected error: ${error.response?.status}`);
            }
        } else {
            throw new UnhandledError(`Unexpected error: ${error}`);
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
            switch (error.response?.status) {
                case 400:
                    throw new InvalidRequestError('Invalid request.');
                case 403:
                    throw new ForbiddenRequestError('Forbidden request.');
                case 412:
                    throw new PreconditionFailedError('Precondition failed: linked account belongs to a disabled integration.');
                case 429:
                    throw new TooManyRequestsError('Too many requests.');
                case 500:
                    throw new ServerError('Server error while executing the request.');
                case 501:
                    throw new NotImplementedError('This functionality is not implemented.');
                default:
                    throw new UnhandledError(`Unexpected error: ${error.response?.status}`);
            }
        } else {
            throw new UnhandledError(`Unexpected error: ${error}`);
        }
    }
}