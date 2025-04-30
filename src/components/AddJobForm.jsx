import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const AddJobForm = ({ onJobAdded }) => {
  const token = useSelector((state) => state.auth.token);
  const recruiterId = "67b7023b42033b92fa326ea7";

  const [jobData, setJobData] = useState({
    url: "",
    title: "",
    country: "",
    skills: "",
    desc: "",
    salary: "",
    experienceLevel: "",
    jobType: "",
    position: "",
    company: "", // this will store the selected companyId
  });

  const [companies, setCompanies] = useState([]);

  // ✅ Fetch companies on load
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("https://job-backend-omega.vercel.app/api/v1/getallcompanies");
        setCompanies(response.data?.companies || []);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending job data:", jobData);

      const response = await axios.post("https://job-backend-omega.vercel.app/api/v1/addjob", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: recruiterId,
          "Content-Type": "application/json",
        },
      });

      Swal.fire("Success!", "Job added successfully", "success");
      onJobAdded(response.data);

      setJobData({
        url: "",
        title: "",
        country: "",
        skills: "",
        desc: "",
        salary: "",
        experienceLevel: "",
        jobType: "",
        position: "",
        company: "",
      });
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white shadow-2xl mt-10 border border-gray-700">
  <h2 className="text-4xl font-extrabold text-yellow-400 mb-8 text-center tracking-wide drop-shadow-sm">
    Post a New Job
  </h2>

  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <input
      type="text"
      name="title"
      value={jobData.title}
      onChange={handleChange}
      placeholder="Job Title"
      className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />
    <input
      type="text"
      name="url"
      value={jobData.url}
      onChange={handleChange}
      placeholder="Job URL"
      className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />
    <input
      type="text"
      name="country"
      value={jobData.country}
      onChange={handleChange}
      placeholder="Country"
      className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />
    <input
      type="text"
      name="skills"
      value={jobData.skills}
      onChange={handleChange}
      placeholder="Skills (comma separated)"
      className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />
    <input
      type="number"
      name="salary"
      value={jobData.salary}
      onChange={handleChange}
      placeholder="Salary"
      className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />
    <input
      type="text"
      name="experienceLevel"
      value={jobData.experienceLevel}
      onChange={handleChange}
      placeholder="Experience Level"
      className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />
    <input
      type="text"
      name="jobType"
      value={jobData.jobType}
      onChange={handleChange}
      placeholder="Job Type"
      className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />
    <input
      type="text"
      name="position"
      value={jobData.position}
      onChange={handleChange}
      placeholder="Position"
      className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />

    <select
      name="company"
      value={jobData.company}
      onChange={handleChange}
      className="bg-gray-800 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    >
      <option value="">Select Company</option>
      {companies.map((comp) => (
        <option key={comp._id} value={comp._id}>
          {comp.name}
        </option>
      ))}
    </select>

    <textarea
      name="desc"
      value={jobData.desc}
      onChange={handleChange}
      placeholder="Job Description"
      className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 col-span-1 md:col-span-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />

    <button
      type="submit"
      className="col-span-1 md:col-span-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
    >
      🚀 Post Job
    </button>
  </form>
</div>

  );
};

export default AddJobForm;
