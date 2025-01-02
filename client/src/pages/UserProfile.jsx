import { useState, useEffect } from 'react';
import axios from 'axios';
import useUserStore from '../store/useUserStore';
import { Avatar, Box, Typography, Button, TextField } from '@mui/material';

const UserProfile = () => {
  const { userId } = useUserStore();
  const [userDetails, setUserDetails] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: '',
    profilePicture: '',
  });
  const [editedUserData, setEditedUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    newPassword: '',
    newPasswordConfirmation: '',
    oldPassword: '',
  });
  const [editForm, setEditForm] = useState(false);

  const handleChange = (e) => {
    setEditedUserData({ ...editedUserData, [e.target.name]: e.target.value });
  };

  // Fetch user details on mount
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/getUserById/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setUserDetails(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) getUserDetails();
  }, [userId]);

  // Update user details
  const handleSaveNewUserData = async (e) => {
    e.preventDefault();

    const {
      newPassword,
      newPasswordConfirmation,
      oldPassword,
      ...otherFields
    } = editedUserData;

    if (newPassword && newPassword !== newPasswordConfirmation) {
      console.log('Passwords do not match');
      return;
    }

    const updatedFields = Object.keys(otherFields).reduce((acc, key) => {
      if (otherFields[key]) acc[key] = otherFields[key];
      return acc;
    }, {});

    if (newPassword) {
      updatedFields.newPassword = newPassword;
      updatedFields.oldPassword = oldPassword;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/users/updateUser/${userId}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setUserDetails(response.data.user);

      setEditedUserData({
        email: '',
        firstName: '',
        lastName: '',
        newPassword: '',
        newPasswordConfirmation: '',
        oldPassword: '',
      });
      setEditForm(false);
      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update user credentials:', error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={3}
    >
      <Avatar
        src={userDetails.profilePicture}
        alt="User profile picture"
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="h5" gutterBottom>
        Hello, {userDetails.firstName} {userDetails.lastName}
      </Typography>

      {editForm ? (
        <Box
          component="form"
          onSubmit={handleSaveNewUserData}
          display="flex"
          flexDirection="column"
          gap={2}
          maxWidth="400px"
          width="100%"
          bgcolor="white"
          p={3}
          borderRadius={2}
          boxShadow={3}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={editedUserData.firstName || userDetails.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={editedUserData.lastName || userDetails.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={editedUserData.email || userDetails.email}
            onChange={handleChange}
            fullWidth
            type="email"
          />
          <TextField
            label="Current Password"
            name="oldPassword"
            value={editedUserData.oldPassword}
            onChange={handleChange}
            fullWidth
            type="password"
          />
          <TextField
            label="New Password"
            name="newPassword"
            value={editedUserData.newPassword}
            onChange={handleChange}
            fullWidth
            type="password"
          />
          <TextField
            label="Confirm New Password"
            name="newPasswordConfirmation"
            value={editedUserData.newPasswordConfirmation}
            onChange={handleChange}
            fullWidth
            type="password"
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => setEditForm(false)}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor="white"
          p={3}
          borderRadius={2}
          boxShadow={3}
          maxWidth="400px"
          width="100%"
          mt={3}
        >
          <Typography>Email: {userDetails.email}</Typography>
          <Typography>Password: *********</Typography>
          <Typography>Username: {userDetails.username}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditForm(true)}
            sx={{ mt: 2 }}
          >
            Edit Profile
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;
