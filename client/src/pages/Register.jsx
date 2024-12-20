import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      formData.append('firstName', firstName);
      formData.append('username', username);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', image);

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
    <div>
      <h2>Register</h2>

      <input
        type="text"
        name="firstName"
        value={newUser.firstName}
        placeholder="First name"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <input
        type="text"
        name="lastName"
        value={newUser.lastName}
        placeholder="Last name"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <input
        type="text"
        name="username"
        value={newUser.username}
        placeholder="Username"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <input
        type="email"
        name="email"
        value={newUser.email}
        placeholder="Email"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <input
        type="password"
        name="password"
        value={newUser.password}
        placeholder="Password"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <input
        type="password"
        name="password2"
        value={newUser.password2}
        placeholder="Confirm password"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
      />
      {image && (
        <img
          src={image}
          alt="preview"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      )}

      <button onClick={register}>Register</button>
      <p>
        Already have an account?
        <button onClick={() => navigate('/')}>Log In</button>
      </p>
    </div>
  );
}

export default Register;
