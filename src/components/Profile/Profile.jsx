import React, { useState, useEffect } from "react";
import { LuMail, LuPhone, LuUserRound, LuFileText, LuTrash2 } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAction } from "../../store/auth";

const Profile = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  useEffect(() => {
    const userDetail = localStorage.getItem("user");
    if (userDetail) {
      setUser(JSON.parse(userDetail));
    }
  }, []);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  const handleRemoveJob = (id) => {
    const updatedJobs = savedJobs.filter((job) => String(job._id) !== String(id));
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
    setSavedJobs(updatedJobs);
  };

  useEffect(() => {
    const storedPdf = localStorage.getItem("UploadedPdf");
    if (storedPdf) setPdfFile(storedPdf);
  }, []);

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("UploadedPdf", reader.result);
        setPdfFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleRemovePdf = () => {
    localStorage.removeItem("UploadedPdf");
    setPdfFile(null);
  };

  const handleLogout = () => {
    dispatch(authAction.logout());
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-6">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-lg text-center border border-gray-700">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 text-6xl shadow-md">
            <LuUserRound />
          </div>
          {user && (
            <>
              <h2 className="mt-4 text-3xl font-bold text-yellow-500">Name: {user.username}</h2>
              <p className="font-semibold text-red-500">
                Role: <span className="text-green-500">{user.role}</span>
              </p>
            </>
          )}
        </div>

        <div className="mt-6 space-y-4 text-left">
          {user && (
            <div className="flex items-center gap-3 text-gray-300">
              <LuMail className="text-blue-400 text-xl" />
              <p className="text-yellow-400 font-medium">
                Email: <span className="text-green-500 font-semibold italic">{user.email}</span>
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 text-gray-300">
            <LuPhone className="text-green-400 text-xl" />
            <span className="italic text-blue-500 font-semibold">+91 XXXXXXXX39</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-pink-500">Upload Resume</h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            className="mt-3 text-sm text-gray-300 border border-blue-500 rounded-sm p-2"
          />
          {pdfFile && (
            <div className="mt-4">
              <a
                href={pdfFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View PDF
              </a>
              <button
                onClick={handleRemovePdf}
                className="ml-4 bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Saved Jobs</h2>
        {savedJobs.length === 0 ? (
          <p className="text-gray-400">No saved jobs yet.</p>
        ) : (
          savedJobs.map((job) => (
            <div
              key={job._id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md mb-2 border border-gray-700"
            >
              <div>
                <h3 className="text-lg font-medium text-white">{job.title}</h3>
                <p className="text-gray-400">{job.company}</p>
              </div>
              <button
                onClick={() => handleRemoveJob(job._id)}
                className="text-red-400 hover:text-red-500"
              >
                <LuTrash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
