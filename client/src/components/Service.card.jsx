const ServiceCard = ({ service = {} }) => {
    return (
      <div className="service-card">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    );
  };
  
  export default ServiceCard;