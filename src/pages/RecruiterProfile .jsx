import React, { useEffect, useState } from "react";

const RecruiterProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Read user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-6">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-lg text-center border border-gray-700">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Recruiter Profile</h1>

        <div className="flex justify-center mb-6">
          <img
            src="https://png.pngtree.com/png-clipart/20231015/original/pngtree-man-avatar-clipart-illustration-png-image_13302499.png"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
        </div>

        {user ? (
          <div className="text-lg space-y-3 text-left text-gray-300">
            <p>
              <span className="text-yellow-400 font-semibold">Name:</span>{" "}
              <span className="text-green-400 italic">{user.username}</span>
            </p>
            <p>
              <span className="text-pink-700 font-semibold">Email:</span>{" "}
              <span className="text-blue-400 italic">{user.email}</span>
            </p>
            <p>
              <span className="text-green-400 font-semibold">Mobile:</span>{" "}
              <span className="text-pink-400 italic">+91 XXXXXXXX07</span>
            </p>
            <p>
              <span className="text-red-500 font-semibold">Role:</span>{" "}
              <span className="text-purple-400 italic ">{user.role}</span>
            </p>
          </div>
        ) : (
          <p className="text-gray-400">Loading user info...</p>
        )}
      </div>
    </div>

  );
};

export default RecruiterProfile;





