import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuUserRound, LuAtSign, LuLockKeyhole, LuPhone } from "react-icons/lu";
import axios from "axios";



const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });


  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
  
    if (!values.username || !values.email || !values.password || !values.phone) {
      toast.error("All fields are required!", { position: "top-right", theme: "colored" });
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4001/api/v1/signup", values, {
        headers: {
          "Content-Type": "application/json",  
        },
      });
  
      console.log(response);
      toast.success("Signup Successful!", { position: "top-right", theme: "colored" });
  
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup Failed!", { position: "top-right", theme: "colored" });
    }
  };
  



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Toast Notifications */}
        <ToastContainer />

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Register
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-5" autoComplete="off" onSubmit={signupHandler}>
          {/* Name Input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-gray-700 mb-1">Full Name</label>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-l-lg border border-gray-300">
                <LuUserRound className="text-2xl" />
              </div>
              <input
                type="text"
                name="username"  
                className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="John Doe"
                value={values.username}  
                onChange={changeHandler}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-l-lg border border-gray-300">
                <LuAtSign className="text-2xl" />
              </div>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                placeholder="johndoe@gmail.com"
                value={values.email}
                onChange={changeHandler}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center">
              <div className="p-3 bg-red-100 text-red-600 rounded-l-lg border border-gray-300">
                <LuLockKeyhole className="text-2xl" />
              </div>
              <input
                type="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                placeholder="********"
                value={values.password}
                onChange={changeHandler}
              />
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col">
            <label htmlFor="number" className="font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 text-green-600 rounded-l-lg border border-gray-300">
                <LuPhone className="text-2xl" />
              </div>
              <input
                type="tel"
                name="phone"  // Change from "number" to "phone"
                className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                placeholder="+919234567890"
                value={values.phone}  // Change from values.number to values.phone
                onChange={changeHandler}
              />
            </div>
          </div>

          {/* Signup Button */}
          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>

          {/* Already have an account? */}
          <div className="text-center text-gray-600 text-sm mt-4">
            Already have an account?
            <NavLink to="/login" className="hover:underline text-blue-600 ml-1">
              Login
            </NavLink>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
