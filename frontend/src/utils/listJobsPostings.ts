// utils/listJobsPostings.ts
export const listJobsPostings = async (accountId: string) => {
  try {
    const response = await fetch('http://localhost:3001/stackone/jobs', {
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
