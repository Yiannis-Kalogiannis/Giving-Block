import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
// store imports
import useAuthStore from "../store/authStore";
import SearchBar from "../components/SearchComponent";
// page imports
import CreateService from "../pages/CreateService";
// material ui imports
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

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

    return (
        <div className="navbar" style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={handleLogOut}>
                Logout
            </button>
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
        </div>
    );
}

export default Navbar;
