import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Auth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.isAuthenticated();
      if (!isAuthenticated) navigate("/login");
    };
    checkAuth();
  }, [navigate]);

  return <>{children}</>;
};

export default Auth;
