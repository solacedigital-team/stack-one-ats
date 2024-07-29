

export const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:3001/stackone/jobs', {
        method: 'GET',
        headers: {
          'x-account-id': '43317933327317784087'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  };
  