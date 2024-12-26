import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

function Register() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    image: null,
  });
  const [image, setImage] = useState(null);

  // Clean up the image URL when the component unmounts
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  function handleChange(e) {
    let { value, name } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setNewUser((prevState) => ({ ...prevState, image: file }));
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      register();
    }
  };

  const register = async () => {
    try {
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        password2,
        image,
      } = newUser;

      if (!firstName || !lastName || !email || !password || !password2) {
        return alert('All fields are required');
      }
      if (password !== password2) {
        return alert("Both passwords don't match");
      }

      const formData = new FormData();
      formData.append('firstName', firstName); // Append the user details to the form data
      formData.append('username', username);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profilePicture', image);

      const response = await axios.post(
        'http://localhost:8080/users/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert('User created successfully');
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        console.error(
          'Server responded with error:',
          error.response.data.message
        );
        alert(error.response.data.message);
      } else {
        console.error('Unexpected error from handling register:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          padding: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
          Register
        </Typography>

        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={newUser.firstName}
          onChange={handleChange}
          onKeyDown={handleEnter}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={newUser.lastName}
          onChange={handleChange}
          onKeyDown={handleEnter}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          onKeyDown={handleEnter}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          onKeyDown={handleEnter}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleChange}
          onKeyDown={handleEnter}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="password2"
          type="password"
          value={newUser.password2}
          onChange={handleChange}
          onKeyDown={handleEnter}
          margin="normal"
        />

        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ marginBottom: 2, marginTop: 2 }}
        >
          Upload Image
          <input
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        {image && (
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <img
              src={image}
              alt="preview"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={register}
          sx={{ marginTop: 2 }}
        >
          Register
        </Button>

        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Button onClick={() => navigate('/login')} color="primary">
              Log In
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
