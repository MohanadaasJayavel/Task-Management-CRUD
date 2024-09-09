import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import glogin from "../icons/signin_google.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await authService.login(email, password);
    if (success) {
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { code } = response;
      const result = await authService.googleLogin(code);
      if (result) {
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.log("Google login failed", error);
    }
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="divider">OR</div>
        <LoginSocialGoogle
          client_id="880149139013-tcgjtif3tpjskfudntl47684nv7g0gu5.apps.googleusercontent.com"
          access_type="offline"
          onResolve={({ provider, data }) => handleGoogleLoginSuccess(data)}
          onReject={(err) => console.log("Google login failed", err)}
        >
          <button className="google-button">
            <img src={glogin} alt="Google Icon" className="google-icon" />
          </button>
        </LoginSocialGoogle>
      </div>
    </div>
  );
};

export default Login;
