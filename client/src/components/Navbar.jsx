import { useNavigate } from "react-router-dom";
import { useState } from 'react';
// store imports
import useAuthStore from "../store/authStore";
import SearchBar from "../components/SearchComponent";
// page imports
import CreateService from "../pages/CreateService";
// material ui imports
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
        <div className="navbar" style={{ display: "flex", justifyContent: "space-between" }}>
            <SearchBar />
            <button onClick={handleOpen}>
                Create Service
            </button>
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
            <button onClick={handleLogOut}>
                Logout
            </button>
            <div>
                <span>{username}</span>
                <img style={{ width: "40px", height: "40px",  borderRadius: "50%" }}
              src={`http://localhost:8080/uploads/${profilePicture}` }
              alt="Profile"
              className="profile-picture"
            />
            </div>
        </div>
    );
}

export default Navbar;
