import { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceCard from './Service.card';
import debounce from 'lodash.debounce';

const ServiceSearch = () => {
  const [query, setQuery] = useState('');
  const [services, setServices] = useState([]);
  const [serviceType, setServiceType] = useState('');
  const [status, setStatus] = useState('');
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

  // Debounced fetch
  const debouncedFetch = debounce(fetchServices, 300);

  useEffect(() => {
    debouncedFetch(query, serviceType, status);
    return () => debouncedFetch.cancel();
  }, [ query, serviceType, status]);

  return (
    <div className="service-search">
      <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
        <option value="">Service Type</option>
        <option value="offering-help">Helper</option>
        <option value="help-wanted">Help Wanted</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Status</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <input
        type="text"
        placeholder="Search services..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="services">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceSearch;
