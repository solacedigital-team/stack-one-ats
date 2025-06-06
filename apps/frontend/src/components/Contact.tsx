import { MailIcon, PhoneIcon, PinIcon } from 'lucide-react';
import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="mt-10 bg-[#E3FFF2] p-10 rounded-lg">
      <h2
        className="text-2xl font-bold mb-8 text-center"
        style={{ fontFamily: "Inter, sans-serif", color: "#05C168" }}
      >
        Contact Us
      </h2>
      <div className="flex flex-col md:flex-row justify-around items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
        <div className="flex flex-col items-center space-y-2 text-center">
          <PhoneIcon className="text-[#05C168] text-4xl mb-2" />
          <span
            className="text-[#05C168]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            +123-456-7890
            <br />
            +156-676-7980
          </span>
        </div>
        <div className="flex flex-col items-center space-y-2 text-center">
          <MailIcon className="text-[#05C168] text-4xl mb-2" />
          <span
            className="text-[#05C168]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            contact@example.com
          </span>
        </div>
        <div className="flex flex-col items-center space-y-2 text-center">
          <PinIcon className="text-[#05C168] text-4xl mb-2" />
          <span
            className="text-[#05C168]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            123 Main Street, <br /> Anytown, Country
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
