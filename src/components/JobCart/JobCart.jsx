import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import isAuthenticated from '../Profile/Profile'; // Ensure this function correctly returns the login status

const JobCart = ({ data }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const user = localStorage.getItem("token"); 
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ Handle job save functionality
  const handleSaveJob = () => {
    if (!isLoggedIn) {
      alert("Please login first😊!");
      navigate("/login");
      return;
    }

    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    // Check if job is already saved
    const isAlreadySaved = savedJobs.some((item) => item._id === data._id);

    if (!isAlreadySaved) {
      savedJobs.push(data); 
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs)); 
      alert("Job Saved!");
    } else {
      alert("Job Already Saved!");
    }
  };

  const authHandler = () => {
    if (!isLoggedIn) {
      alert("Please login first😊!");
      navigate("/login");
    } else {
      navigate(`/view-job/${data?._id || data.id}`);
    }
  };

  return (
    <motion.div
      className="border border-gray-300 p-5 rounded-xl shadow-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Job Image & Title */}
      <div className='flex flex-col items-center justify-center'>
        <motion.img
          src={data.url}
          alt="Job"
          className="rounded-full h-14 w-14 border-2 border-blue-500 p-1 bg-gray-200 shadow-md"
          whileHover={{ scale: 1.1 }}
        />
        <div className='text-center mt-3'>
          <h2 className="font-bold text-lg text-blue-700">{data.title}</h2>
          <h3 className="text-gray-500 text-sm">{data.country}</h3>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4 text-gray-900 text-sm font-medium bg-blue-50 p-2 rounded-lg shadow-sm border border-blue-200 overflow-auto">
        <span className="font-semibold text-blue-600 ">Skills: </span>{data.skills}
      </div>

      {/* Job Description */}
      <p className="mt-3 text-gray-700 text-sm leading-relaxed">
        {data.desc.length > 100 ? data.desc.substring(0, 100) + "..." : data.desc}
      </p>

      {/* Position & Salary */}
      <div className="mt-5 flex justify-between">
        <motion.div
          className='font-bold px-3 py-2 bg-green-100 text-green-800 rounded-lg shadow-md border border-green-300'
          whileHover={{ scale: 1.1 }}
        >
          Remote
        </motion.div>
        <motion.div
          className='font-bold px-3 py-2 bg-purple-100 text-purple-800 rounded-lg shadow-md border border-purple-300'
          whileHover={{ scale: 1.1 }}
        >
          5 LPA
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between items-center gap-2">
        {/* View Details Button */}
        <motion.button
          className="w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold  text-[15px] p-[5px] rounded-lg shadow-md transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={authHandler}
        >
          🔍 View Details
        </motion.button>

        {/* Save for Later Button */}
        <button onClick={handleSaveJob} className="bg-blue-500 text-white p-[6px] text-[15px] rounded-md">
          Save Later
        </button>
      </div>
    </motion.div>
  );
};

export default JobCart;
