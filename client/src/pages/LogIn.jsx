import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [loggedData, setLogedData] = useState({ email: '', password: '' });

  function handleChange(e) {
    try {
      e.preventDefault();
      const { name, value } = e.target;
      setLogedData({
        ...loggedData,
        [name]: value,
      });
    } catch (error) {
      console.log(`Error updating input data: ${error}`);
    }
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      logIn();
    }
  };


  const logIn = async () => {
    try {
      const { email, password } = loggedData;

      if (!email || !password) {
        return alert("Both fields are required");
      }

      const response = await axios.post(
        `http://localhost:8080/users/login`,
        loggedData
      );

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("token", response.data.token);
        alert(response.data.message);
        navigate("/");
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
      <button
        onClick={logIn}
      >
        Log In
      </button>
      <p>
        Don t have an account?{" "}
        <button onClick={() => navigate("/register")}>
          <span>
            Sign Up
          </span>
        </button>
      </p>
    </div>
  </div>
  
  );
}

export default Login;
