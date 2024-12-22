import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  Typography,
  IconButton,
  CardActions,
  Collapse,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { jwtDecode } from "jwt-decode";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ServiceCard = ({ service = {} }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelete = () => {}

  const handleEdit = () => {}

  const userName = service.username;
  console.log(userName);

  // Get user info from token
  const token = localStorage.getItem("token");
    let username = "";
    let userId = "";
    let profilePicture = "";

    if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        username = decodedToken.username;
        userId = decodedToken.userId;
        console.log(`Username is: ${username}`);
        console.log(`User ID is: ${userId}`);
    }


    
  return (
    <Card sx={{ maxWidth: 345, margin: '20px auto', borderRadius: 2, boxShadow: 3 }}>
      {/* Card Header */}
      <CardContent sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
        <Avatar
          src={service.userId?.profilePicture ? `http://localhost:8080/uploads/${service.userId.profilePicture}` : ''}
          alt="Profile"
          sx={{ width: 50, height: 50, marginRight: 2, bgcolor: red[500] }}
        >
          {!service.userId?.profilePicture && 'N'}
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
            {service.status ? 'Active' : 'Completed'}
          </Typography>
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
        
      </CardContent>

      {/* Card Actions */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <IconButton>
          <Typography variant="body2" color="textSecondary">
            delete
          </Typography>
        </IconButton>
        <IconButton>
          <Typography variant="body2" color="textSecondary">
            edit
          </Typography>
        </IconButton>
      </CardActions>

      {/* Expandable Content */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {service.city && (
            <Typography variant="body2" color="textSecondary">
              <strong>City:</strong> {service.city}
            </Typography>
          )}
          {service.address && (
          <Typography variant="body2" color="textSecondary">
            <strong>Address:</strong> {service.address}
          </Typography>
        )}
          {service.country && (
            <Typography variant="body2" color="textSecondary">
              <strong>Country:</strong> {service.country}
            </Typography>
          )}
          {service.zip && (
            <Typography variant="body2" color="textSecondary">
              <strong>Zip-cod:</strong> {service.zip}
            </Typography>
          )}
          {service.phone && (
            <Typography variant="body2" color="textSecondary">
              <strong>Phone:</strong> {service.phone}
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ServiceCard;
