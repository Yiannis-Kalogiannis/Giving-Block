import { useEffect, useState } from 'react';
import axios from 'axios'; // Import the axios module

import ServiceCard from './Service.card'; // Import the ServiceCard component
import debounce from 'lodash.debounce';
import useServiceStore from '../store/useServiceStore';
import useSearchStore from '../store/useSearchStore';
import { CircularProgress, Typography, Box } from '@mui/material'; // Import Material UI components

const ServiceList = () => {
  const { query, serviceType, status } = useSearchStore();
  const services = useServiceStore((state) => state.services);
  const setServices = useServiceStore((state) => state.setServices);
  const [loading, setLoading] = useState(false);

  const fetchServices = async (query, serviceType, status) => {
    try {
      setLoading(true);
      const response = await axios.get(
        'http://localhost:8080/services/getAllServices',
        {
          params: { query, serviceType, status: status || undefined },
        }
      );
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced fetch to optimize performance
  const debouncedFetch = debounce(fetchServices, 300);

  useEffect(() => {
    // Trigger debounced fetch whenever query, serviceType, or status change
    debouncedFetch(query, serviceType, status);

    // Cleanup function to cancel the debounce on unmount or change in dependencies
    return () => debouncedFetch.cancel();
  }, [query, serviceType, status]); // Only re-run if query, serviceType, or status changes

  return (
    <Box
      sx={{
        padding: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : Array.isArray(services) && services.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No services available
        </Typography>
      ) : (
        Array.isArray(services) &&
        services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))
      )}
    </Box>
  );
};

export default ServiceList;
