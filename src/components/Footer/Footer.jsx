import React from 'react';

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row md:justify-between px-6 md:px-16 py-6 items-center text-[16px] md:text-[18px] font-semibold bg-gray-300 text-gray-800'>
      <div className="text-center md:text-left mb-2 md:mb-0">
        © 2025 Digital India. All rights reserved.
      </div>
      <div className="text-center md:text-left mb-2 md:mb-0">
        Powered by <span className="text-blue-600">Rajneesh Maurya</span>
      </div>
      <div className="text-center md:text-left flex flex-col md:flex-row gap-1 md:gap-3">
        <p href="#" className="hover:underline">Privacy Policy</p>
        <span className="hidden md:block">|</span>
        <p href="#" className="hover:underline">Terms of Service</p>
      </div>
    </div>
  );
};

export default Footer;
