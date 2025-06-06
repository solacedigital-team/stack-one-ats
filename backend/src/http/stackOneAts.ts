import axios from "axios";
import config from '../config';
import { AxiosError } from "./errorHandler";

export const getJobs = async (accountId: string, next: string) => {

    let url: string = config.STACKONE_ATS_URL + "/jobs?page_size=25";

    if (next) {
        url += `&next=${encodeURIComponent(next)}`;
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
        AxiosError(error);
    }
}

export const getApplications = async (accountId: string, next: string) => {
    console.log('Received request for applications');

    let url: string = config.STACKONE_ATS_URL + "/applications?page_size=25";
    console.log('Constructed URL:', url);

    if (next) {
        url += `&next=${encodeURIComponent(next)}`;
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
        console.error('Error fetching applications:', error);
        AxiosError(error);
    }
}
