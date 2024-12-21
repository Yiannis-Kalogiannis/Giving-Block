// ServiceList.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './Service.card';
import debounce from 'lodash.debounce';
import useServiceStore from '../store/useServiceStore'; 
import useSearchStore from '../store/useSearchStore'; 

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
    <div className="services">
      {loading ? (
        <p>Loading...</p>
      ) : services.length === 0 ? (
        <p>No services available</p>
      ) : (
        services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))
      )}
    </div>
  );
};

export default ServiceList;
