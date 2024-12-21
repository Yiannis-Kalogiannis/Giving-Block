import { useState, useEffect } from 'react';
import axios from 'axios'; 
import ServiceCard from './Service.card';

const ServiceSearch = () => {
  const [query, setQuery] = useState('');
  const [services, setServices] = useState([]); // State for services
  const [serviceType, setServiceType] = useState(''); // State for service type

  useEffect(() => { // Fetch services based on query and serviceType
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/services/getAllServices',
          {
            params: { query, serviceType }, // Include serviceType in params
          }
        );
        setServices(response.data);   // Update services state with the fetched data
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [query, serviceType]); // Trigger useEffect on both query and serviceType changes

  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update query state
  };

  const handleServiceTypeChange = (e) => {
    setServiceType(e.target.value); // Correctly update serviceType state
  };

  return ( // Display the search input and services
    <div className="service-search">
      <select value={serviceType} onChange={handleServiceTypeChange}>
        <option value="">Service Type</option>
        <option value="offering-help">Helper</option>
        <option value="help-wanted">Help Wanted</option>
      </select>
      <input
        type="text"
        placeholder="Search services..."
        value={query}
        onChange={handleInputChange}
      />
      <div className="services" >
        {services.map((service) => (
          <div key={service._id} style={{ margin: '10px' }}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSearch;
