import axios from "axios";
import config from '../config';
import { AxiosError } from "./errorHandler";

export const getEmployees = async (accountId: string, next: string) => {

    let url: string = config.STACKONE_HRIS_URL + "/employees?page_size=25"; // Assuming STACKONE_HRIS_URL exists in config

    if (next) {
        url += `&next=${encodeURIComponent(next)}`;
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json',
                'x-account-id': `${accountId}`,
                'authorization': `Basic ${config.STACKONE_API_KEY}`, // Assuming STACKONE_API_KEY is also used for HRIS
            }
        });
        return response.data;
    } catch (error) {
        AxiosError(error);
    }
}
