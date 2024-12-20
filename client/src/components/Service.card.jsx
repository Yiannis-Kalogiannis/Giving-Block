

const ServiceCard = ({ service = {} }) => {
  return (
    <div className="service-card">
      {service.title && <h3>{service.title}</h3>}
      {service.description && <p>{service.description}</p>}
      {service.category && <p>Category: {service.category}</p>}
      {service.address && <p>Address: {service.address}</p>}
      {service.city && <p>City: {service.city}</p>}
      {service.country && <p>Country: {service.country}</p>}
      {service.zip && <p>Zip: {service.zip}</p>}
      {service.phone && <p>Phone: {service.phone}</p>}
      {service.userId.username && <p>Posted by: {service.userId.username}</p>}
      {service.userId.firstName && (
        <p>First Name: {service.userId.firstName}</p>
      )}
      {service.userId.lastName && <p>Last Name: {service.userId.lastName}</p>}
    </div>
  );
};

export default ServiceCard;
