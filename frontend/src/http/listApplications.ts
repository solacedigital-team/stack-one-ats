import { getAtsApiUrl, errorHandler, handleResponse } from "./apiUtils";

export const listApplications = async (accountId: string) => {
    try {
        console.log("Fetching applications for account ID:", accountId);
        const apiUrl = getAtsApiUrl();
        const response = await fetch(`${apiUrl}/applications`, {
            method: 'GET',
            headers: {
                'x-account-id': accountId
            }
        });

        return await handleResponse(response);
    } catch (error) {
        errorHandler(error);
    }
};
