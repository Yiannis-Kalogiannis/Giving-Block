import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/UseAuthStore'; // Import Zustand store
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useUserStore from '../store/useUserStore';
import BlurText from './css/BlurText';
import Swal from 'sweetalert2'

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // Zustand's login function
  const [loggedData, setLoggedData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const setUserFromToken = useUserStore((state) => state.setUserFromToken);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoggedData({
      ...loggedData,
      [name]: value,
    });
  };

  // Trigger login on Enter key press
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      logIn();
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Login logic with Zustand's store
  const logIn = async () => {
    try {
      const { email, password } = loggedData;

      if (!email || !password) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields",
        });
      }

      const response = await axios.post(
        `http://localhost:8080/users/login`,
        loggedData
      );

      if (response.status === 200 || response.status === 201) {
        const { token, user } = response.data;
        login(token, user);
        Swal.fire({
          title: (response.data.message),
          icon: "success",
          draggable: true
        });
        navigate('/');
        setUserFromToken(token);
      } else {
        console.warn('Unexpected response:', response);
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: (error.response.data.message),
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage:
          'url("https://res.cloudinary.com/dj02fukkg/image/upload/v1735410370/Giving%20block/x9031cflh1tjsl0217yk.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          background: 'linear-gradient(rgb(182, 204, 225),rgb(88, 102, 119))',
          padding: 3,
          borderRadius: 2,
        }}
      >
        <BlurText
          text="GIVING BLOCK"
          delay={150}
          animateBy="words"
          direction="top"
          textSize="1rem"
        />

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
          type={showPassword ? 'text' : 'password'} // Dynamically change the input type
          value={loggedData.password}
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          onKeyDown={handleEnter}
          sx={{ backgroundColor: 'white' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
