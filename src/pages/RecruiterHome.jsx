import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AddJobForm from "../components/AddJobForm";

const RecruiterHome = () => {
  const token = useSelector((state) => state.auth.token);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://job-backend-omega.vercel.app/api/v1/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [token]);

  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Recruiter Home</h1>
      <AddJobForm onJobAdded={handleJobAdded} />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Posted Jobs</h2>
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="border p-4 mb-2 rounded">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p>{job.desc}</p>
              <p className="text-gray-500">Salary: ${job.salary}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecruiterHome;
