import { create } from 'zustand';
import axios from 'axios'; // Axios for API requests
import useServiceStore from './useServiceStore'; // Import the existing service store

const useEditDeleteStore = create(() => ({
  // Delete a service by ID and update the services list
  deleteService: async (serviceId) => {
    try {
      // Make a request to the backend to delete the service
      const response = await axios.delete(
        `http://localhost:8080/services/deleteService/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Corrected headers format
          },
        }
      );

      if (response.status === 200) {
        // After deleting, update the services state in the main store
        useServiceStore.getState().setServices((state) => ({
          services: state.services.filter(
            (service) => service._id !== serviceId
          ),
        }));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  },

  // Edit a service and update the services list
  editService: async (serviceId, formData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/services/updateService/${serviceId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedService = response.data; // Use the updated service from the response
        useServiceStore.getState().setServices((state) => ({
          services: state.services.map((service) =>
            service._id === serviceId ? updatedService : service
          ),
        }));
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  },
}));

export default useEditDeleteStore;
