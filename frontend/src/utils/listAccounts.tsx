// src/utils/listAccounts.ts

export const listAccounts = async () => {
    try {
      const response = await fetch('http://localhost:3001/stackone/accounts', {
        method: 'GET',
        headers: {
          'x-account-id': '43317933327317784087',  // hard coded, to be removed
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  };
  