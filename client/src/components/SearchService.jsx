import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceCard from './Service.card';

const ServiceSearch = () => {
  const [query, setQuery] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/services/getAllServices',
          {
            params: { query },
          }
        );
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search services..."
        value={query}
        onChange={handleInputChange}
      />
      <ul>
  {services.map((service) => (
    <li key={service._id}>
      <ServiceCard service={service} />
    </li>
  ))}
</ul>
    </div>
  );
};

export default ServiceSearch;
