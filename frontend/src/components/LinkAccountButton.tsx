import React, { useCallback } from 'react';
import { useStackOneHub } from '@stackone/react-hub';
import { retrieveConnectSessionToken } from '../utils/SessionToken';

const LinkAccountButton: React.FC = () => {  
  const { startConnect } = useStackOneHub();

  const startFlow = useCallback(async () => {  
    try {
      const sessionToken = await retrieveConnectSessionToken({ username: 'jane@example.com' });
      startConnect({ sessionToken: sessionToken.token });
    } catch (error) {
      console.error('Error starting connect flow:', error);
    }
  }, [startConnect]);

  return (  
    <button onClick={startFlow}>Connect to your ATS provider</button>  
  );  
};

export default LinkAccountButton;
