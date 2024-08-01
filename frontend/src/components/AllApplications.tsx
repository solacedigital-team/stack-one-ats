import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';

const AllApplications: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>All Applications</h2>
      <div className="flex flex-wrap mb-4 ml-3 justify-between">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="flex flex-col items-center space-y-2 mx-2">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <AiOutlineUser className="text-gray-400 text-4xl" />
            </div>
            <span className="font-semibold text-center" style={{ fontFamily: 'Inter, sans-serif' }}>Candidate {i + 1}</span>
            <span className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Role {i + 1}</span>
          </div>
        ))}
      </div>

      <button
        className="bg-black text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-300"
        style={{ border: '1px solid transparent' }}
      >
        <span>View All</span>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default AllApplications;
