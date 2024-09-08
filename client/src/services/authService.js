import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/users";
// toast.configure();

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
      // Notify the user if the login failed (e.g., wrong credentials)
      toast.error("Invalid email or password", {
        position: toast.POSITION.TOP_RIGHT,
      });
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

export default { login, isAuthenticated };
