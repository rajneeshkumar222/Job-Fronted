import React, { useEffect, useState } from 'react';
import JobCart from '../components/JobCart/JobCart';
import axios from "axios";
import Loader from '../components/Loader/Loader';

function Browser() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://job-backend-omega.vercel.app/api/v1/alljobs");
        console.log(response);
        setJobs(response.data.data);
      } catch (e) {
        console.log("Error while fetching data =>", e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-700 min-h-screen p-8">
      <div className="text-white font-bold text-3xl text-center mb-6">
        <h1>Explore Exciting Jobs</h1>
      </div>

      {/* Loader show when data is not available */}
      {jobs.length === 0 && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {jobs.map((items, i) => (
          <div key={i}><JobCart data={items} /></div>
        ))}
      </div>
    </div>
  );
}

export default Browser; 
