import { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './Service.card';
import useServiceStore from '../store/useServiceStore';
import useSearchStore from '../store/useSearchStore';
import { CircularProgress, Typography, Box } from '@mui/material';

const ServiceList = () => {
  const { query, serviceType, status, filteredUserId } = useSearchStore();
  const services = useServiceStore((state) => state.services);
  const setServices = useServiceStore((state) => state.setServices);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      console.log('Fetching services with:', { query, serviceType, status, filteredUserId });
      const response = await axios.get(
        'http://localhost:8080/services/getAllServices',
        {
          params: { query, serviceType, status: status || undefined, filteredUserId: filteredUserId || undefined },
        }
      );
      setServices([...response.data]); // Ensure a new reference is set
      console.log('Fetched services:', response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch services on mount and whenever query, serviceType, or status changes
  useEffect(() => {
    fetchServices();
  }, [query, serviceType, status, services.length, filteredUserId]);


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
