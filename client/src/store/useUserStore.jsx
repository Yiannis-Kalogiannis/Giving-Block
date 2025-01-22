import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const useUserStore = create((set) => ({
    username: "",
    userId: "",
    profilePicture: "",
    token: localStorage.getItem("token") || "", // Store token in Zustand

    setUserFromToken: (token) => {
        if (token) {
            localStorage.setItem("token", token); // Ensure it's stored in localStorage
            const decodedToken = jwtDecode(token);
            set({
                username: decodedToken.username,
                userId: decodedToken.userId,
                profilePicture: decodedToken.image || "",
                token: token, // Store token in Zustand state
            });
        }
    },

    clearUser: () => {
        localStorage.removeItem("token");
        set({
            username: "",
            userId: "",
            profilePicture: "",
            token: "",
        });
    },
}));

// If a token exists in localStorage when the app loads, initialize Zustand state
const token = localStorage.getItem("token");
if (token) {
    useUserStore.getState().setUserFromToken(token);    
}

export default useUserStore;
