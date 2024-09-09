import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/users";

const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      toast.error("Invalid email or password");
      return false;
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      return true;
    } else {
      toast.error("Authentication failed. No token received.");
      return false;
    }
  } catch (err) {
    console.error("Login error:", err);
    toast.error("An error occurred during login. Please try again later.");
    return false;
  }
};
const googleLogin = async (code) => {
  try {
    const response = await fetch(`${API_URL}/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    });
    if (!response.ok) {
      toast.error("Invalid email or password");
      return false;
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      return true;
    } else {
      toast.error("Authentication failed. No token received.");
      return false;
    }
  } catch (err) {
    console.error("Login error:", err);
    toast.error("An error occurred during login. Please try again later.");
    return false;
  }
};

const isAuthenticated = () => !!localStorage.getItem("token");
export default { login, googleLogin, isAuthenticated };
