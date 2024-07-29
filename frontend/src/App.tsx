import React from 'react';
import logo from './logo.svg';
import './App.css';
import LinkAccountButton from './components/LinkAccountButton';
import ListJobsPostingsButton from './components/ListJobsPostingsButton';
import ListApplicationsButton from './components/ListApplicationsButton';

const App: React.FC = () => {
  return (
    <div>
      <h1>StackOne Integration</h1>
      <LinkAccountButton />
      <ListJobsPostingsButton />
      <ListApplicationsButton />
    </div>
  );
};


export default App;
