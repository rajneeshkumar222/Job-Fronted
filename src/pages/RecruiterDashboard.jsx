import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminJobCart from "../components/AdminJobcart/AdminJobCart";

const RecruiterDashboard = () => {
  const role = useSelector((state) => state.auth.role);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://job-backend-omega.vercel.app/api/v1/alljobs");
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error while fetching jobs:", error);
        Swal.fire("Error", "Failed to fetch jobs", "error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!role) {
      setLoading(false);
      return;
    }

    if (role !== "recruiter") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You are not a recruiter, so you can't access this page!",
      }).then(() => {
        navigate("/");
      });
    } else {
      setLoading(false);
    }
  }, [role, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#141414] text-white px-4 py-10 md:px-10">
      {/* Header Card */}
      <div className="max-w-5xl mx-auto bg-[#1f1f1f] border border-gray-700 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-400">Recruiter Dashboard</h1>
        <p className="text-center text-gray-400 mt-2 mb-6 text-sm sm:text-base">
          Manage your job postings efficiently and professionally.
        </p>

        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-blue-500/40"
            onClick={() => navigate("/recruiter-home")}
          >
            ➕ Add New Job
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-6xl mx-auto mt-12 px-2">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white  text-center border rounded-lg bg-green-600 p-2">📋 Your Job Listings</h2>

        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">No jobs posted yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, i) => (
              <AdminJobCart key={i} data={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
