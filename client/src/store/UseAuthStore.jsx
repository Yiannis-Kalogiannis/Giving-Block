import { create } from 'zustand';
import useUserStore from './useUserStore';

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('token'), // Check if token exists
  user: null,

  login: (token, user) => {
    localStorage.setItem('token', token);
    set({ isAuthenticated: true, user }); // Update Zustand store
    useUserStore.getState().setUserFromToken(token); // Sync User Store
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, user: null }); // Reset Auth Store
    useUserStore.getState().clearUser(); // Clear User Store
  },
}));

export default useAuthStore;
