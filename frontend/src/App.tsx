import React from 'react';
import logo from './logo.svg';
import './App.css';
import LinkAccountButton from './components/LinkAccountButton';
import FetchJobsButton from './components/fetchJobsButton';

const App: React.FC = () => {
  return (
    <div>
      <h1>StackOne Integration</h1>
      <LinkAccountButton />
      <FetchJobsButton />
    </div>
  );
};


export default App;
