export const getApiUrl = (): string => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    if (!apiUrl) {
        throw new Error('API URL is not defined in environment variables');
    }
    return apiUrl;
};
export const getAtsApiUrl = (): string => {
    const apiUrl = process.env.REACT_APP_API_ATS_URL;
    if (!apiUrl) {
        throw new Error('API ATS URL is not defined in environment variables');
    }
    return apiUrl;
};

export const getHrisApiUrl = (): string => {
    const apiUrl = process.env.REACT_APP_API_HRIS_URL;
    if (!apiUrl) {
        throw new Error('API ATS URL is not defined in environment variables');
    }
    return apiUrl;
};

export const getSessionApiUrl = (): string => {
    const apiUrl = process.env.REACT_APP_API_SESSION_URL;
    if (!apiUrl) {
        throw new Error('API Session URL is not defined in environment variables');
    }
    return apiUrl;
};

export const handleResponse = async <T>(response: Response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json() as T;
};

export const errorHandler = (error: unknown) => {
    console.error('API Error:', error);
    throw error;
};
