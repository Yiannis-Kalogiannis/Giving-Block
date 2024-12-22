const ServiceCard = ({ service = {} }) => {
  return (
    <div className="service-card">
      {/* Card Header */}
      <div className="card-header">
        <div className="profile-picture-container">
          {service.userId?.profilePicture ? (
            <img
              src={`http://localhost:8080/uploads/${service.userId.profilePicture}`}
              alt="Profile"
              className="profile-picture"
            />
          ) : (
            <div className="profile-placeholder">No Image</div>
          )}
        </div>
        <div className="user-info">
          {service.userId?.firstName && <span>{service.userId.firstName}</span>}
          {service.userId?.lastName && <span>{service.userId.lastName}</span>}
          {service.userId?.username && <span>@{service.userId.username}</span>}
        </div>
        <div
          className={`status ${service.status ? 'active' : 'inactive'}`}
        >
          {service.status ? 'Active' : 'Inactive'}
        </div>
        {/* Move service type here */}
        {service.serviceType && (
          <div className="service-type">
            {service.serviceType === 'help-wanted' ? 'Help Wanted' : 'Offering Help'}
          </div>
        )}
      </div>

      {/* Service Image */}
      {service.image && (
        <img
          src={`http://localhost:8080/uploads/${service.image}`}
          alt="Service"
          className="service-image"
        />
      )}

      {/* Service Details */}
      <div className="service-details">
        {service.title && <p><span>Title:</span> {service.title}</p>}
        {service.body && <p><span>Description:</span> {service.body}</p>}
        {service.address && <p><span>Address:</span> {service.address}</p>}
        {service.city && <p><span>City:</span> {service.city}</p>}
        {service.country && <p><span>Country:</span> {service.country}</p>}
        {service.zip && <p><span>Zip:</span> {service.zip}</p>}
        {service.phone && <p><span>Phone:</span> {service.phone}</p>}
      </div>
    </div>
  );
};

export default ServiceCard;
