import React from "react";

import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import HomePage from "./HomePage"

export const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.value.isLoggedIn);
  return isLoggedIn ? <Outlet/>  : <Navigate to="/signin" />;
};