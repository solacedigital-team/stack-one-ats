/* eslint-disable */
export const retrieveConnectSessionToken = async ({ username, provider }: { username: string, provider?: string }) => {
  const payload = {
    expires_in: 1800,
    multiple: false,
    origin_owner_id: 'infrasity-1001',
    origin_owner_name: 'test-infrasity'
  };

  const headers = {
    'accept': 'application/json',
    'content-type': 'application/json'
  };

  try {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    if (!apiUrl) {
      throw new Error('API base URL is not defined in environment variables');
    }

    const connectSessionResponse = await fetch(`${apiUrl}/stackone/connect-session`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!connectSessionResponse.ok) {
      throw new Error(`HTTP error! status: ${connectSessionResponse.status}`);
    }

    const response = await connectSessionResponse.json();

    return { token: response.token };
  } catch (error) {
    console.error('Error fetching connect session token:', error);
    throw error;
  }
};
