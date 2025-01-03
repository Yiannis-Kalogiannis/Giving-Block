import { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './Service.card';
import useServiceStore from '../store/useServiceStore';
import useSearchStore from '../store/useSearchStore';
import { CircularProgress, Typography, Box, Grid } from '@mui/material';

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

  useEffect(() => {
    fetchServices();
  }, [query, serviceType, status, services.length, filteredUserId]);

  return (
    <Box
    sx={{
      padding: 1,
      background: 'radial-gradient(circle, rgba(208,208,208,1) 34%, rgba(148,187,233,1) 100%)', // Radial gradient background
      minHeight: '100vh', // Full height background
      color: 'white', // White text
    }}
  >
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
          <CircularProgress sx={{ color: 'white' }} />
        </Box>
      ) : Array.isArray(services) && services.length === 0 ? (
        <Typography variant="h6" color="inherit" textAlign="center" sx={{ marginTop: 2 }}>
          No services available
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {Array.isArray(services) &&
            services.map((service) => (
              <Grid
                item
                key={service._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{
                  marginTop: {
                    xs: '200px',
                    sm: '60px',
                    md: '50px',
                    lg: '50px',
                  },
                }}
              >
                <ServiceCard service={service} />
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default ServiceList;
