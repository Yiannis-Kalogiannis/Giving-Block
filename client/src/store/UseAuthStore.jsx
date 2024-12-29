import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('token'), // On page load, check if token exists
  user: null,
  
  login: (token, user) => {
    localStorage.setItem('token', token);
    set({ isAuthenticated: true, user }); // Update Zustand store
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, user: null }); // Reset Zustand store
  },
}));

export default useAuthStore;
