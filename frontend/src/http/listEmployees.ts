import { getHrisApiUrl, errorHandler, handleResponse } from './apiUtils';

export type EmployeeData = {
    id: string;
    first_name: string;
    last_name: string;
    remote_id: string;
    created_at: string;
    updated_at: string;
}

export type ListEmployeesResponse = {
    data: EmployeeData[];
    next?: string;
}

export const listEmployess = async (accountId: string) => {
    try {
        const apiUrl = getHrisApiUrl();
        const response = await fetch(`${apiUrl}/employees`, {
            method: 'GET',
            headers: {
                'x-account-id': accountId
            }
        });

        return await handleResponse<ListEmployeesResponse>(response);
    } catch (error) {
        console.error("Error fetching employees:", error);
        return { data: [] as EmployeeData[] }; // Return an empty array in case of error
    }
};
