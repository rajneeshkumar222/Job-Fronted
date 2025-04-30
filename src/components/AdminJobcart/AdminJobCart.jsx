import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminJobCart = ({ data }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleDelete = async () => {
    try {
      const response = await axios.delete("https://job-backend-omega.vercel.app/api/v1/deletejob", {
        headers: {
          Authorization: `Bearer ${token}`,
          jobid: data._id,
        },
      });

      if (response.status === 200) {
        alert("Job deleted successfully!");
        window.location.reload();
        // Optional: window.location.reload() or remove from UI
      } else {
        alert("Failed to delete the job.");
      }
    } catch (e) {
      console.error("Error while deleting job:", e);
      alert("Something went wrong while deleting.");
    }
  };

  const updateHandler = async () => {
    const updatedTitle = prompt("Enter updated job title:", data.title);
    const updatedDesc = prompt("Enter updated job description:", data.desc);
    const updatedSkills = prompt("Enter updated skills (comma-separated):", data.skills);
    const updateSalary=prompt()
  
    if (!updatedTitle || !updatedDesc || !updatedSkills) {
      alert("All fields are required for update.");
      return;
    }
  
    try {
      const response = await axios.put(
        "https://job-backend-omega.vercel.app/api/v1/updatejob",
        {
          title: updatedTitle,
          desc: updatedDesc,
          skills: updatedSkills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            jobid: data._id,
          },
        }
      );
  
      if (response.status === 200) {
        alert("Job updated successfully!");
        window.location.reload(); // or use setState to update UI without reload
      } else {
        alert("Failed to update job.");
      }
    } catch (e) {
      console.error("Error while updating job", e);
      alert("Something went wrong while updating.");
    }
  };
  

  return (

    <motion.div
      className="border border-indigo-200 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white via-indigo-50 to-blue-100 hover:shadow-2xl transition-all duration-300 max-w-md w-full mx-auto"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center">
        <motion.img
          src={data.url}
          alt="Job"
          className="rounded-full h-16 w-16 border-2 border-indigo-500 p-1 bg-indigo-100 shadow-lg"
          whileHover={{ scale: 1.1 }}
        />
        <div className="text-center mt-4">
          <h2 className="font-bold text-xl text-indigo-700">{data.title}</h2>
          <h3 className="text-gray-500 text-sm">{data.country}</h3>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4 bg-indigo-50 text-indigo-700 text-sm font-medium p-3 rounded-lg shadow-sm border border-indigo-200">
        <span className="font-semibold">Skills: </span>{data.skills}
      </div>

      {/* Description */}
      <p className="mt-3 text-gray-700 text-sm leading-relaxed">
        {data.desc.length > 100 ? `${data.desc.substring(0, 100)}...` : data.desc}
      </p>

      {/* Position & Salary */}
      <div className="mt-5 flex justify-between items-center">
        <motion.div
          className="px-4 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full border border-green-300"
          whileHover={{ scale: 1.1 }}
        >
          Remote
        </motion.div>
        <motion.div
          className="px-4 py-1 bg-purple-100 text-purple-800 text-sm font-semibold rounded-full border border-purple-300"
          whileHover={{ scale: 1.1 }}
        >
          5 LPA
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between items-center gap-3">
        <motion.button
          className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-semibold py-2 rounded-lg shadow-md transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={updateHandler}
        >
          Upadate
        </motion.button>

        <motion.button
          onClick={handleDelete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition-all "
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AdminJobCart;
