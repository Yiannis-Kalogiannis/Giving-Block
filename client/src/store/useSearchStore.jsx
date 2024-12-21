// useSearchStore.js
import {create} from 'zustand';

const useSearchStore = create((set) => ({
  query: '',
  serviceType: '',
  status: '',
  setQuery: (query) => set({ query }),
  setServiceType: (serviceType) => set({ serviceType }),
  setStatus: (status) => set({ status }),
}));

export default useSearchStore;