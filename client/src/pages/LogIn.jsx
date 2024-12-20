import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/authStore'; // Import Zustand store

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // Zustand's login function
  const [loggedData, setLoggedData] = useState({ email: '', password: '' });

  // Handle input change
  function handleChange(e) {
    try {
      e.preventDefault();
      const { name, value } = e.target;
      setLoggedData({
        ...loggedData,
        [name]: value,
      });
    } catch (error) {
      console.log(`Error updating input data: ${error}`);
    }
  }

  // Trigger login on Enter key press
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      logIn();
    }
  };

  // Login logic with Zustand's store
  const logIn = async () => {
    try {
      const { email, password } = loggedData;

      // Validate if fields are filled
      if (!email || !password) {
        return alert("Both fields are required");
      }

      const response = await axios.post(
        `http://localhost:8080/users/login`,
        loggedData
      );

      if (response.status === 200 || response.status === 201) {
        const { token, user } = response.data; // Assuming response contains token and user info
        login(token, user); // Call Zustand's login function to update global state
        alert(response.data.message);
        navigate("/"); // Redirect to homepage
      } else {
        console.warn("Unexpected response:", response);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        value={loggedData.email}
        placeholder="Email"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <input
        type="password"
        name="password"
        value={loggedData.password}
        placeholder="Password"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <button onClick={logIn}>Log In</button>
      <p>
        Don’t have an account?{" "}
        <button onClick={() => navigate("/register")}>
          <span>Sign Up</span>
        </button>
      </p>
    </div>
  );
}

export default Login;
