import { errorHandler, handleResponse, getApiUrl } from './apiUtils';

export const listAccounts = async () => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/accounts`, {
      method: 'GET',
    });

    return await handleResponse(response);
  } catch (error) {
    errorHandler(error);
  }
};
