import './css/serviceCard.css';  // Import the CSS file

const ServiceCard = ({ service = {} }) => {
  return (
    <div className="service-card">
      {service.title && <h3>{service.title}</h3>}
      {service.status !== undefined && <p>Status: {service.status ? 'Active' : 'Inactive'}</p>}
      {service.body && <p>{service.body}</p>}
      {service.serviceType && (
        <p>Service Type: {service.serviceType === 'help-wanted' ? 'Help Wanted' : 'Offering Help'}</p>
      )}
      {service.address && <p>Address: {service.address}</p>}
      {service.city && <p>City: {service.city}</p>}
      {service.country && <p>Country: {service.country}</p>}
      {service.zip && <p>Zip: {service.zip}</p>}
      {service.phone && <p>Phone: {service.phone}</p>}
      {service.userId?.username && <p>Posted by: {service.userId.username}</p>}
      {service.userId?.firstName && <p>First Name: {service.userId.firstName}</p>}
      {service.userId?.lastName && <p>Last Name: {service.userId.lastName}</p>}
      {service.userId?.email && <p>Email: {service.userId.email}</p>}
      {service.userId?.profilePicture && (
        <img
          src={`http://localhost:8080/uploads/${service.userId.profilePicture}`}
          alt="Profile"
          style={{ width: "100px", height: "100px" }}
        />
      )}
    </div>
  );
};

export default ServiceCard;
