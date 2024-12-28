// useSearchStore.js
import {create} from 'zustand';

const useSearchStore = create((set) => ({
  query: '',
  serviceType: '',
  status: '',
  filteredUserId: '',
  setQuery: (query) => set({ query }),
  setServiceType: (serviceType) => set({ serviceType }),
  setStatus: (status) => set({ status }),
  setFilteredUserId: (filteredUserId) => set({ filteredUserId }),
}));

export default useSearchStore;