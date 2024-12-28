import React, { useEffect, useState } from 'react';
import useUserStore from '../store/useUserStore';
import useEditDeleteStore from '../store/useEditAndDeletestore';
import useServiceStore from '../store/useServiceStore';
// Import MUI components and icons
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Styled Components
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
  const { userId } = useUserStore();
  // const { services, setServices } = useServiceStore();
  const [openEditModal, setOpenEditModal] = useState(false); // Modal state
  const [editedService, setEditedService] = useState({
    title: service.title || '',
    body: service.body || '',
    address: service.address || '',
    city: service.city || '',
    country: service.country || '',
    zip: service.zip || '',
    phone: service.phone || '',
    status: service.status || false,
    serviceImage: null, // Initialize serviceImage state for image file
  });
  const [serviceImagePreview, setServiceImagePreview] = useState(''); // Image preview state
  const { deleteService, editService } = useEditDeleteStore();

  useEffect(() => {
    return () => {
      if (serviceImagePreview) {
        URL.revokeObjectURL(serviceImagePreview); // Clean up image URL when unmounting
      }
    };
  }, [serviceImagePreview]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    deleteService(service._id); // Call the delete action from the store
  };

  const handleEdit = () => {
    setOpenEditModal(true); // Open the modal when edit button is clicked
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();

    // Append all service fields to FormData
    Object.keys(editedService).forEach((key) => {
      if (key === 'serviceImage' && editedService[key]) {
        // Append the file separately
        formData.append(key, editedService[key]);
      } else if (key !== 'serviceImage') {
        formData.append(key, editedService[key]);
      }
    });

    // Send formData to the edit service action
    await editService(service._id, formData);
    setOpenEditModal(false); // Close the modal after saving
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle file input separately
    if (name === 'serviceImage' && files.length > 0) {
      const file = files[0];
      setEditedService((prev) => ({
        ...prev,
        [name]: file, // Store the file
      }));

      // Generate a preview for the selected image
      setServiceImagePreview(URL.createObjectURL(file));
    } else {
      setEditedService((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          margin: '20px auto',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Card Header */}
        <CardContent
          sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}
        >
          <Avatar
            src={
              service.userId?.profilePicture
                ? service.userId.profilePicture
                : ''
            }
            alt="Profile"
            sx={{ width: 50, height: 50, marginRight: 2, bgcolor: red[500] }}
          >
            {!service.userId?.profilePicture && 'N'}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            {service.userId?.firstName && (
              <Typography variant="body2">
                {service.userId.firstName}
              </Typography>
            )}
            {service.userId?.lastName && (
              <Typography variant="body2">{service.userId.lastName}</Typography>
            )}
            {service.userId?.username && (
              <Typography variant="body2">
                @{service.userId.username}
              </Typography>
            )}
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
              <Typography
                variant="body2"
                sx={{ fontSize: '0.8rem', marginTop: 1 }}
              >
                {service.serviceType === 'help-wanted'
                  ? 'Help Wanted'
                  : 'Offering Help'}
              </Typography>
            )}
          </Box>
        </CardContent>

        {/* Service Image */}
        {service.serviceImage && (
          <CardMedia
            component="img"
            height="180"
            image={service.serviceImage}
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

          {/* Conditionally Render Edit and Delete */}
          {userId === service.userId?._id && (
            <>
              <IconButton
                onClick={handleDelete}
                sx={{
                  backgroundColor: 'red',
                  borderRadius: '8px', // Less round
                  '&:hover': { backgroundColor: 'red' },
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  delete
                </Typography>
              </IconButton>
              <IconButton
                onClick={handleEdit}
                sx={{
                  backgroundColor: 'lightblue',
                  borderRadius: '8px', // Less round
                  '&:hover': { backgroundColor: 'red' },
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  edit
                </Typography>
              </IconButton>
            </>
          )}
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
                <strong>Zip-code:</strong> {service.zip}
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

      {/* Edit Service Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={editedService.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="body"
            value={editedService.body}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={editedService.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="city"
            value={editedService.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Country"
            name="country"
            value={editedService.country}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Zip-code"
            name="zip"
            value={editedService.zip}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={editedService.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Image Input and Preview */}
          <input
            type="file"
            name="serviceImage"
            onChange={handleChange}
            accept="image/*"
          />
          {serviceImagePreview && (
            <img src={serviceImagePreview} alt="Preview" height="100" />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ServiceCard;
