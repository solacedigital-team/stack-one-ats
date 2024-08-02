import axios from "axios";
import config from "../config";
import { InvalidRequestError, ForbiddenRequestError, TooManyRequestsError, ServerError, NotImplementedError, UnhandledError } from '../errors/stackoneErrors';

export const getSessionToken = async (origin_owner_id: string, origin_owner_name: string) => {

    const url: string = config.STACKONE_BASE_URL + "/connect_sessions";
    try {
        const response = await axios.post(url, {
            expires_in: 1800,
            multiple: false,
            origin_owner_id: origin_owner_id,
            origin_owner_name: origin_owner_name
        }, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            switch (error.response?.status) {
                case 400:
                    throw new InvalidRequestError('Invalid request.');
                case 403:
                    throw new ForbiddenRequestError('Forbidden request.');
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