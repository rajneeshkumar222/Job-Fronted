// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import {  NavLink } from "react-router-dom";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false); // State to toggle menu
// //  const [isLoggedIn,setIsLoggedIn]=useState((state)=>state.auth.isLoggedIn);
// const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
// const visibleLinks=isLoggedIn ? Links :Links.slice(0,2);

//   return (
//     <nav className="bg-gray-900 text-white p-4">
//       {/* Navbar Container */}
//       <div className="flex items-center justify-between">
//         {/* Logo */}
//         <NavLink to='/'><div>
//           <img
//             className="h-12"
//             src="https://cscsevacenter.org/wp-content/uploads/2023/05/digiindia-1.png"
//             alt="Job Portal"
//           />
//         </div></NavLink>

//         {/* Desktop Navigation (Hidden on mobile) */}
//         <div className="hidden md:flex md:gap-8 text-lg items-center">
//           <NavLink to='/'> <div className="hover:text-gray-400 cursor-pointer">Home</div></NavLink>
//           <NavLink to='/jobs'> <div className="hover:text-gray-400 cursor-pointer">Jobs</div></NavLink>
//           <NavLink to='/profile'> <div className="hover:text-gray-400 cursor-pointer">Profile</div></NavLink>
//           <NavLink to='login'><div className="hover:text-black cursor-pointer bg-green-700 p-1 rounded-sm ">Login</div></NavLink>
//           <NavLink to='signup'><div className="hover:text-black cursor-pointe bg-red-700 p-1 rounded-sm">Register</div></NavLink>
//         </div>

//         {/* Hamburger Icon for Mobile */}
//         <button
//           className="md:hidden text-white text-2xl"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Navigation Menu */}
//       <div
//         className={`${isOpen ? "block" : "hidden"
//           } md:hidden mt-4 flex flex-col items-center space-y-9 text-3xl`}
//       >
//         <NavLink to='/'> <div className="hover:text-gray-400 cursor-pointer">Home</div></NavLink>
//           <NavLink to='/jobs'> <div className="hover:text-gray-400 cursor-pointer">Jobs</div></NavLink>
//           <NavLink to='/profile'> <div className="hover:text-gray-400 cursor-pointer">Profile</div></NavLink>
//           <NavLink to='login'><div className="hover:text-gray-400 cursor-pointer  bg-green-700 p-1 rounded-sm">Login</div></NavLink>
//           <NavLink to='signup'><div className="hover:text-gray-400 cursor-pointe bg-red-700 p-1 rounded-sm">Register</div></NavLink>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role); // Get user role from Redux

 

const dispatch = useDispatch();
const logoutHandler = () => {
  dispatch(authAction.logout()); // ✅ Redux state update
  window.location.href = "/"; // ✅ Force refresh taaki state properly update ho
};

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <img
            className="h-12"
            src="https://cscsevacenter.org/wp-content/uploads/2023/05/digiindia-1.png"
            alt="Job Portal"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-8 text-lg items-center">
          {isLoggedIn ? (
            role === "student" ? (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/jobs">Jobs</NavLink>
                <NavLink to="/profile">Profile</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/recruiter-home">Add Job</NavLink>
                <NavLink to="/recruiter-profile">Profile</NavLink>
                <NavLink to="/recruiter-dashboard">Dashboard</NavLink>
              </>
            )
          ) : (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/jobs">Jobs</NavLink>
            </>
          )}

          {isLoggedIn ? (
            <button
              className="bg-red-600 px-3 py-1 rounded-md"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.location.reload();
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="bg-green-700 px-3 py-1 rounded-md">
                Login
              </NavLink>
              <NavLink to="/signup" className="bg-red-700 px-3 py-1 rounded-md">
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4">
          {isLoggedIn ? (
            role === "student" ? (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/jobs">Jobs</NavLink>
                <NavLink to="/profile">Profile</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/recruiter-home">Home</NavLink>
                <NavLink to="/recruiter-profile">Profile</NavLink>
                <NavLink to="/recruiter-dashboard">Added Jobs</NavLink>
              </>
            )
          ) : (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/jobs">Jobs</NavLink>
            </>
          )}

          {isLoggedIn ? (
            <button
              className="bg-red-600 px-3 py-1 rounded-md"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.location.reload();
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="bg-green-700 px-3 py-1 rounded-md">
                Login
              </NavLink>
              <NavLink to="/signup" className="bg-red-700 px-3 py-1 rounded-md">
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
