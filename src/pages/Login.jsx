// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { NavLink, useNavigate } from "react-router-dom";
// import { LuUserRound, LuLockKeyhole } from "react-icons/lu";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { authAction } from "../store/auth";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!values.email || !values.password) {
//       toast.error("All fields are required!", {
//         position: "top-right",
//         theme: "colored",
//       });
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:4001/api/v1/login", values, {
//         headers: { "Content-Type": "application/json" },
//       });

//       const { token, user } = response.data;

//       // Store token & user
//       dispatch(authAction.login({ token, role: user.role }));
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       // ✅ Toast success before navigate
//       toast.success("Login Successful!", {
//         position: "top-right",
//         theme: "colored",
//       });

//       // Navigate after short delay so toast is visible
//       setTimeout(() => {
//         navigate(user.role === "recruiter" ? "/recruiter-dashboard" : "/");
//       }, 1000);
//     } catch (error) {
//       console.error("Login Error:", error);
//       toast.error(error.response?.data?.message || "Login Failed!", {
//         position: "top-right",
//         theme: "colored",
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 px-4">
//       <motion.div
//         className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
//           Login
//         </h2>

//         <form className="flex flex-col gap-5" onSubmit={submitHandler} autoComplete="off">
//           {/* Email */}
//           <div className="flex flex-col">
//             <label htmlFor="email" className="font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <div className="flex items-center">
//               <div className="p-3 bg-blue-100 text-blue-600 rounded-l-lg border border-gray-300">
//                 <LuUserRound className="text-2xl" />
//               </div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="johndoe@gmail.com"
//                 value={values.email}
//                 onChange={changeHandler}
//                 autoComplete="off"
//                 className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div className="flex flex-col">
//             <label htmlFor="password" className="font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="flex items-center">
//               <div className="p-3 bg-red-100 text-red-600 rounded-l-lg border border-gray-300">
//                 <LuLockKeyhole className="text-2xl" />
//               </div>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="********"
//                 value={values.password}
//                 onChange={changeHandler}
//                 autoComplete="new-password"
//                 className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition"
//               />
//             </div>
//           </div>

//           {/* Role Selection (optional if backend uses it) */}
//           <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
//             <label className="flex items-center cursor-pointer">
//               <input type="radio" name="role" id="student" className="mr-2" />
//               Student
//             </label>
//             <label className="flex items-center cursor-pointer">
//               <input type="radio" name="role" id="recruiter" className="mr-2" />
//               Recruiter
//             </label>
//           </div>

//           {/* Login Button */}
//           <motion.button
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Login
//           </motion.button>

//           <ToastContainer />

//           {/* Extra links */}
//           <div className="text-center text-gray-600 text-sm mt-4">
//             <NavLink to="/forgot-password" className="hover:underline text-blue-600">
//               Forgot Password?
//             </NavLink>
//             <span className="mx-2">|</span>
//             <NavLink to="/signup" className="hover:underline text-purple-600">
//               Register
//             </NavLink>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { LuUserRound, LuLockKeyhole } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [selectedRole, setSelectedRole] = useState("student"); // default

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const roleChangeHandler = (e) => {
    setSelectedRole(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      toast.error("All fields are required!", {
        position: "top-right",
        theme: "colored",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4001/api/v1/login",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user } = response.data;

      if (user.role !== selectedRole) {
        toast.error(`This is not valid for a ${selectedRole}.`, {
          position: "top-right",
          theme: "colored",
        });
        return;
      }

      // Store token & user
      dispatch(authAction.login({ token, role: user.role }));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful!", {
        position: "top-right",
        theme: "colored",
      });

      setTimeout(() => {
        navigate(user.role === "recruiter" ? "/recruiter-dashboard" : "/");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed!", {
        position: "top-right",
        theme: "colored",
      });
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
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>

        <form className="flex flex-col gap-5" onSubmit={submitHandler} autoComplete="off">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-l-lg border border-gray-300">
                <LuUserRound className="text-2xl" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="xyz@gmail.com"
                value={values.email}
                onChange={changeHandler}
                autoComplete="off"
                className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center">
              <div className="p-3 bg-red-100 text-red-600 rounded-l-lg border border-gray-300">
                <LuLockKeyhole className="text-2xl" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={values.password}
                onChange={changeHandler}
                autoComplete="new-password"
                className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                checked={selectedRole === "student"}
                onChange={roleChangeHandler}
                className="mr-2"
              />
              Student
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={selectedRole === "recruiter"}
                onChange={roleChangeHandler}
                className="mr-2"
              />
              Recruiter
            </label>
          </div>

          {/* Login Button */}
          <motion.button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>

          {/* Toast Container */}
          <ToastContainer />

          {/* Extra links */}
          <div className="text-center text-gray-600 text-sm mt-4">
            <NavLink to="/forgot-password" className="hover:underline text-blue-600">
              Forgot Password?
            </NavLink>
            <span className="mx-2">|</span>
            <NavLink to="/signup" className="hover:underline text-purple-600">
              Register
            </NavLink>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
