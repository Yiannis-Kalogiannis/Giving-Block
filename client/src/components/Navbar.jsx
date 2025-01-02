import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// store imports
import useAuthStore from '../store/UseAuthStore';
import SearchBar from '../components/SearchComponent';
// page imports
import CreateService from '../pages/CreateService';
// material ui imports
import {
  CssBaseline,
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
        padding: '10px',
        backgroundColor: 'white',
      }}
    >
      {/* Left side: Search Bar */}
      <SearchBar />

      {/* Middle: Create Service Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginLeft: '10px' }}
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
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Right side: User Info & Logout */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography onClick={() => navigate('/userprofile')} variant="body1" sx={{ marginRight: '10px' , mt: 2, cursor: 'pointer'}}>
          Welcome {username}
        </Typography>
        <Avatar
        
        onClick={() => navigate('/userprofile')}
          sx={{ width: 40, height: 40, mt: 2, cursor: 'pointer'}}
          src={profilePicture}
          alt="Profile"
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogOut}
          sx={{ marginLeft: '15px' }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Navbar;
