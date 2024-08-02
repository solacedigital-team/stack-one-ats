export const listApplications = async (accountId: string) => {
  try {
    const response = await fetch('http://localhost:3001/stackone/applications', {
      method: 'GET',
      headers: {
        'x-account-id': accountId // Use the passed accountId
      }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};
