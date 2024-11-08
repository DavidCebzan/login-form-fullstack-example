import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    // navigate to login if the user is not logged in
    auth.user ? (
      <Outlet />
    ) : (
      // from location remembers where we came from
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
