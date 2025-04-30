// import React, { useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Home from "./pages/Home";
// import Browser from "./pages/Browser";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Profile from "./components/Profile/Profile";
// import Footer from "./components/Footer/Footer";
// import ViewJobDetailed from "./components/ViewJobDetailed/ViewJobDetailed";
// import RecruiterDashboard from "./pages/RecruiterDashboard";
// import RecruiterHome from "./pages/RecruiterHome";
// import RecruiterProfile from "./pages/RecruiterProfile ";
// import { useDispatch } from "react-redux";
// import { authAction } from "./store/auth";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       dispatch(authAction.login({ token: localStorage.getItem("token"), role: localStorage.getItem("role") }));
//     }
//   }, [dispatch]);

//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/jobs" element={<Browser />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/view-job/:jobid" element={<ViewJobDetailed />} />

//         {/* Recruiter Routes */}
//         <Route path="/recruiter-home" element={<RecruiterHome />} />
//         <Route path="/recruiter-profile" element={<RecruiterProfile />} />
//         <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Browser from "./pages/Browser";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import ViewJobDetailed from "./components/ViewJobDetailed/ViewJobDetailed";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterHome from "./pages/RecruiterHome";
import RecruiterProfile from "./pages/RecruiterProfile ";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { useDispatch } from "react-redux";
import { authAction } from "./store/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(
        authAction.login({
          token: localStorage.getItem("token"),
          role: localStorage.getItem("role"),
        })
      );
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Browser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view-job/:jobid" element={<ViewJobDetailed />} />

        {/* Recruiter-Only Routes */}
        <Route
          path="/recruiter-home"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter-profile"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
