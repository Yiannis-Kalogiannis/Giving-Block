import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// store imports
import useAuthStore from '../store/UseAuthStore';
import SearchBar from '../components/SearchComponent';
// page imports
import CreateService from '../pages/CreateService';
// material ui imports
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
// import { jwtDecode } from "jwt-decode";
import useUserStore from '../store/useUserStore';

function Navbar() {
  // state
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { username, profilePicture } = useUserStore();

  // functions
  const handleLogOut = () => {
    logout();
    navigate('/login');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333c4d', 
        color: 'white', // White text
      }}
    >
      {/* Left side: Search Bar */}
      <SearchBar />

      {/* Middle: Create Service Button */}
      <Button
        variant="contained"
        sx={{
          marginLeft: '10px',
          backgroundColor: '#333c4d', 
          border: '1px solid white', // White border
          borderRadius: '20px',
          color: 'white', // Dark blue text
          '&:hover': {
            backgroundColor: 'gray', // Light gray hover
          },
        }}
        onClick={handleOpen}
      >
        Create Service
      </Button>

      {/* Dialog for Creating Service */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Service</DialogTitle>
        <DialogContent>
          <CreateService handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#001f3f' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Right side: User Info & Logout */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          onClick={() => navigate('/userprofile')}
          variant="body1"
          sx={{
            marginRight: '10px',
            marginLeft: '10px',
            cursor: 'pointer',
            color: 'white', // White text
            '&:hover':{
               color: 'gray', // Light gray text
            }
          }}
        >
          Welcome {username}
        </Typography>
        <Avatar
          onClick={() => navigate('/userprofile')}
          sx={{
            width: 40,
            height: 40,
            
            cursor: 'pointer',
            border: '2px solid white', // Border for visibility
          }}
          src={profilePicture}
          alt="Profile"
        />
        <Button
          variant="outlined"
          sx={{
            marginLeft: '15px',
            color: 'white', // White text
            borderColor: 'white', // White border
            borderRadius: '20px',
            '&:hover': {
              borderColor: 'gray', // Light gray border
              
              color: 'gray', // Light gray text
            },
          }}
          onClick={handleLogOut}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Navbar;
