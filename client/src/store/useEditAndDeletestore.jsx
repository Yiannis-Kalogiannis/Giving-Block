import { create } from 'zustand';
import axios from 'axios'; // Axios for API requests
import useServiceStore from './useServiceStore'; // Import the existing service store

const useEditDeleteStore = create((set) => ({
  // Delete a service by ID and update the services list
  deleteService: async (serviceId) => {
    try {
      // Make a request to the backend to delete the service
      const response = await axios.delete(
        `http://localhost:8080/services/deleteService/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected headers format
          },
        }
      );
      
      if (response.status === 200) {
        // After deleting, update the services state in the main store
        useServiceStore.getState().setServices((state) => ({
          services: state.services.filter((service) => service._id !== serviceId),
        }));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  },

// Edit a service and update the services list
editService: async (updatedService) => {
    try {
      // Make a request to the backend to update the service
      const response = await axios.put(
        `http://localhost:8080/services/updateService/${updatedService._id}`,
        updatedService,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.status === 200) {
        // After editing, update the service in the state of the main store
        useServiceStore.getState().setServices((state) => ({
          services: state.services.map((service) =>
            service._id === updatedService._id ? updatedService : service
          ),
        }));
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  },
}));

export default useEditDeleteStore;
