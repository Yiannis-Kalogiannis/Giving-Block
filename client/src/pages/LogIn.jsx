import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/UseAuthStore'; // Import Zustand store
import { TextField, Button, Box, Typography } from '@mui/material';
import useUserStore from '../store/useUserStore';

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // Zustand's login function
  const [loggedData, setLoggedData] = useState({ email: '', password: '' });
  const setUserFromToken = useUserStore((state) => state.setUserFromToken);

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
    if (e.key === 'Enter') {
      logIn();
    }
  };

  // Login logic with Zustand's store
  const logIn = async () => {
    try {
      const { email, password } = loggedData;

      // Validate if fields are filled
      if (!email || !password) {
        return alert('Both fields are required');
      }

      const response = await axios.post(
        `http://localhost:8080/users/login`,
        loggedData
      );

      if (response.status === 200 || response.status === 201) {
        const { token, user } = response.data;  // Destructure token and user from response
        login(token, user); // Call Zustand's login function to update global state
        alert(response.data.message);
        navigate('/'); // Redirect to homepage
        setUserFromToken(token); // Update user data in Zustand store
      } else {
        console.warn('Unexpected response:', response);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          'Server responded with error:',
          error.response.data.message
        );
        alert(error.response.data.message);
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        backgroundColor: 'darkBlue',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background for readability
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ color: 'white', marginBottom: 2 }}
        >
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={loggedData.email}
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          onKeyDown={handleEnter}
          sx={{ backgroundColor: 'white' }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={loggedData.password}
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          onKeyDown={handleEnter}
          sx={{ backgroundColor: 'white' }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={logIn}
          sx={{ marginTop: 2 }}
        >
          Log In
        </Button>

        <Box sx={{ marginTop: 6, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            Don’t have an account?{' '}
            <Button
              onClick={() => navigate('/register')}
              color="primary"
              sx={{ textDecoration: 'underline' }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
