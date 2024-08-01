// Contact.tsx
import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <div className='mt-10'>

      <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Contact Us</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-3">
          <FaPhoneAlt className="text-blue-500 text-2xl" />
          <span className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>+123-456-7890</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-blue-500 text-2xl" />
          <span className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>contact@example.com</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-blue-500 text-2xl" />
          <span className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>123 Main Street, Anytown, Country</span>
        </div>
      </div>


    </div>
  );
};

export default Contact;
