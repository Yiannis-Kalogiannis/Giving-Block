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
      const response = await axios.get('http://localhost:8080/services/getAllServices', {
        params: { query, serviceType, status: status || undefined },
      });
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
    debouncedFetch(query, serviceType, status);
    return () => debouncedFetch.cancel();
  }, [query, serviceType, status]);

  return (
    <Box sx={{ padding: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {loading ? (
        <CircularProgress />
      ) : services.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No services available
        </Typography>
      ) : (
        services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))
      )}
    </Box>
  );
};

export default ServiceList;
