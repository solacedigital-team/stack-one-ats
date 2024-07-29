
export const listJobsPostings = async () => {
  try {
    const response = await fetch('http://localhost:3001/stackone/job_postings', {
      method: 'GET',
      headers: {
        'x-account-id': '43317933327317784087' // hard coded, to be removed
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
