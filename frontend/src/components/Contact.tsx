import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <div className="mt-10 bg-[#E3FFF2] p-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Inter, sans-serif', color: '#05C168' }}>Contact Us</h2>
      <div className="flex justify-around">
        <div className="flex flex-col items-center space-y-2">
          <FaPhoneAlt className="text-[#05C168] text-4xl mb-2" />
          <span className="text-[#05C168]" style={{ fontFamily: 'Inter, sans-serif' }}>
            +123-456-7890<br />
            +156-676-7980
          </span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <FaEnvelope className="text-[#05C168] text-4xl mb-2" />
          <span className="text-[#05C168]" style={{ fontFamily: 'Inter, sans-serif' }}>
            contact@example.com
          </span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <FaMapMarkerAlt className="text-[#05C168] text-4xl mb-2" />
          <span className="text-[#05C168]" style={{ fontFamily: 'Inter, sans-serif' }}>
            123 Main Street, <br /> Anytown, Country
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
