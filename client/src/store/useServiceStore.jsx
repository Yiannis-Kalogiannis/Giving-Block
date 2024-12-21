import { create } from 'zustand';

const useServiceStore = create((set) => ({
  services: [],
  setServices: (services) => set({ services }),
}));

export default useServiceStore;  // Default export of the Zustand store
