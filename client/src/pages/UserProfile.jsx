import { useState, useEffect } from 'react';
import axios from 'axios';
import useUserStore from '../store/useUserStore';
import { Avatar } from '@mui/material';

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
  async function handleSaveNewUserData(e) {
    e.preventDefault();

    const {
      newPassword,
      newPasswordConfirmation,
      oldPassword,
      ...otherFields
    } = editedUserData;

    // Check if passwords match
    if (newPassword && newPassword !== newPasswordConfirmation) {
      console.log('Passwords do not match');
      return;
    }

    // Create an update payload with only non-empty fields
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

      // Clear editedUserData and exit edit mode
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
  }

  return (
    <div>
      <Avatar src={userDetails.profilePicture} alt="User profile picture" />
      <h3>
        Hello {userDetails.firstName} {userDetails.lastName}
      </h3>

      {editForm ? (
        <form
          onSubmit={handleSaveNewUserData}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <input
            type="text"
            name="firstName"
            value={editedUserData.firstName || userDetails.firstName}
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            value={editedUserData.lastName || userDetails.lastName}
            placeholder="Last Name"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={editedUserData.email || userDetails.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="oldPassword"
            value={editedUserData.oldPassword}
            placeholder="Current Password"
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            value={editedUserData.newPassword}
            placeholder="New Password"
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPasswordConfirmation"
            value={editedUserData.newPasswordConfirmation}
            placeholder="Confirm New Password"
            onChange={handleChange}
          />

          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditForm(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Email: {userDetails.email}</p>
          <p>Password: *********</p>
          <p>Username: {userDetails.username}</p>
          <button onClick={() => setEditForm(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
