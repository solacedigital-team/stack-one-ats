import React from 'react';

import ListApplicationsButton from './ListApplicationsButton';

const AllApplications: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>All Applications</h2>
      
      <ListApplicationsButton/>
    </div>
  );
};

export default AllApplications;