import { useNavigate } from "react-router-dom";
import { useState } from 'react';
// store imports
import useAuthStore from "../store/authStore";
import SearchBar from "../components/SearchComponent";
// page imports
import CreateService from "../pages/CreateService";
// material ui imports
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Avatar } from '@mui/material';
import { jwtDecode } from "jwt-decode";

function Navbar() {
    // state
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    
    // functions
    const handleLogOut = () => {
        logout();
        navigate("/login");
    };
    
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const token = localStorage.getItem("token");
    let username = "";
    let userId = "";
    let profilePicture = "";

    if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        username = decodedToken.username;
        userId = decodedToken.userId;
        profilePicture = decodedToken.image;
        console.log(`Username is: ${username}`);
        console.log(`User ID is: ${userId}`);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
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
                    <CreateService />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Right side: User Info & Logout */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ marginRight: '10px' }}>
                    {username}
                </Typography>
                <Avatar 
                    sx={{ width: 40, height: 40 }} 
                    alt="Profile Picture" 
                    src={`http://localhost:8080/uploads/${profilePicture}`} 
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
