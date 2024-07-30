import axios from "axios";
import { ErrorResponse } from "../dto/errors";
import config from "../config";


export const getSessionToken = async (origin_owner_id: string, origin_owner_name: string) => {

    try {
        const response = await axios.post(config.STACKONE_API_URL, {
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