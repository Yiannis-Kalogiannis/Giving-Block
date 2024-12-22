import { Card, CardContent, CardMedia, Typography, Avatar, Box } from '@mui/material';
// import './css/ServiceCard.css';

const ServiceCard = ({ service = {} }) => {
  return (
    <Card className="service-card" sx={{ maxWidth: 345, margin: '20px auto', borderRadius: 2, boxShadow: 3 }}>
      {/* Card Header */}
      <CardContent sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
        <Avatar
          src={service.userId?.profilePicture ? `http://localhost:8080/uploads/${service.userId.profilePicture}` : ''}
          alt="Profile"
          sx={{ width: 50, height: 50, marginRight: 2 }}
        >
          {!service.userId?.profilePicture && 'No Image'}
        </Avatar>
        
        <Box sx={{ flexGrow: 1 }}>
          {service.userId?.firstName && <Typography variant="body2">{service.userId.firstName}</Typography>}
          {service.userId?.lastName && <Typography variant="body2">{service.userId.lastName}</Typography>}
          {service.userId?.username && <Typography variant="body2">@{service.userId.username}</Typography>}
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: service.status ? '#28a745' : '#dc3545',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 1,
              fontSize: '0.8rem',
            }}
          >
            {service.status ? 'Active' : 'Inactive'}
          </Typography>
          {/* Move service type here */}
          {service.serviceType && (
            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginTop: 1 }}>
              {service.serviceType === 'help-wanted' ? 'Help Wanted' : 'Offering Help'}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Service Image */}
      {service.image && (
        <CardMedia
          component="img"
          height="180"
          image={`http://localhost:8080/uploads/${service.image}`}
          alt="Service"
          sx={{ objectFit: 'cover' }}
        />
      )}

      {/* Service Details */}
      <CardContent>
        {service.title && (
          <Typography variant="body2" color="textSecondary">
            <strong>Title:</strong> {service.title}
          </Typography>
        )}
        {service.body && (
          <Typography variant="body2" color="textSecondary">
            <strong>Description:</strong> {service.body}
          </Typography>
        )}
        {service.address && (
          <Typography variant="body2" color="textSecondary">
            <strong>Address:</strong> {service.address}
          </Typography>
        )}
        {service.city && (
          <Typography variant="body2" color="textSecondary">
            <strong>City:</strong> {service.city}
          </Typography>
        )}
        {service.country && (
          <Typography variant="body2" color="textSecondary">
            <strong>Country:</strong> {service.country}
          </Typography>
        )}
        {service.zip && (
          <Typography variant="body2" color="textSecondary">
            <strong>Zip:</strong> {service.zip}
          </Typography>
        )}
        {service.phone && (
          <Typography variant="body2" color="textSecondary">
            <strong>Phone:</strong> {service.phone}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
