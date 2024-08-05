export const listJobsPostings = async (accountId: string) => {
  try {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    if (!apiUrl) {
      throw new Error('API base URL is not defined in environment variables');
    }

    const response = await fetch(`${apiUrl}/stackone/jobs`, {
      method: 'GET',
      headers: {
        'x-account-id': accountId
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs Posted:', error);
    throw error;
  }
};
