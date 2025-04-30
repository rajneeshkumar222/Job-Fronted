import React from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  //  Agar logged in nahi hai, toh direct login page pr le jao (no popup)
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  //  Agar role allowed nahi hai, toh sirf tab popup dikhao jab unauthorized user access kare
  if (!allowedRoles.includes(role)) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You don't have permission to access this page.",
    });
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
