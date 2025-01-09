import { useEffect, useState } from 'react';
import useUserStore from '../store/useUserStore';
import useEditDeleteStore from '../store/useEditAndDeleteStore';
import useConvarsationStore from '../store/chat.store/useConvarsationStore';

// import { useNavigate } from 'react-router-dom';

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useChatStore from '../store/chat.store/useOpenChatStore';

// Styled Components
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)', // Use expand for rotation
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ServiceCard = ({ service = {} }) => {
  // const navigate = useNavigate();
  const { toggleChat } = useChatStore(); // Access the toggleChat function from Zustand store
  const { setSelectedConversation, selectedConversation } = useConvarsationStore();

  const handleShareButtonClick = () => {
    toggleChat(); // Toggle chat visibility
  };

  const [expanded, setExpanded] = useState(false);
  const { userId } = useUserStore();
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

  const handleExpandClick = () => { // Toggle the expanded state
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    alert('Are you sure you want to delete this service?');
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
  boxShadow: 5,
  background: 'linear-gradient(rgb(180, 180, 180),rgb(65, 97, 134))', // Linear gradient background color
}}
>
        {/* Card Header */}
        <CardContent
          sx={{ display: 'flex', alignItems: 'center', padding: '16px', }}
        >
          <Avatar
          sx={{
            width: 50,
            height: 50,
            mr: 2,
            cursor: 'pointer',
            
          }}
            src={
              service.userId?.profilePicture
                ? service.userId.profilePicture
                : ''
            }
            alt="Profile"
          >
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            {service.userId?.firstName && (
              <Typography variant="body2" sx={{ color: 'white' }}>
                {service.userId.firstName}
              </Typography>
            )}
            {service.userId?.lastName && (
              <Typography variant="body2" sx={{ color: 'white' }}>{service.userId.lastName}</Typography>
            )}
            {service.userId?.username && (
              <Typography variant="body2" sx={{ color: 'white' }}>
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
                sx={{ fontSize: '0.8rem', marginTop: 1, color: 'white' }}
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
            <Typography variant="body2" color="textSecondary" sx={{ color: 'white' }}>
              <strong>Title:</strong> {service.title}
            </Typography>
          )}
          {service.body && (
            <Typography variant="body2" color="textSecondary" sx={{ color: 'white' }}>
              <strong>Description:</strong> {service.body}
            </Typography>
          )}
        </CardContent>

        {/* Card Actions */}
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton onClick={() => {
    handleShareButtonClick(); // First function
    setSelectedConversation(); // Second function
  }}  aria-label="share">
          <ShareIcon sx={{ color: 'white' }} />  
               </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon sx={{ color: 'white' }} />
          </ExpandMore>

          {/* Conditionally Render Edit and Delete */}
          {userId === service.userId?._id && (
            <>
              <IconButton
                onClick={handleDelete}
                sx={{
                  backgroundColor: 'red',
                  borderRadius: '20px', // Less round
                  '&:hover': { backgroundColor: 'darkRed' },
                }}
              >
                <Typography variant="body2" color="white">
                  delete
                </Typography >
              </IconButton>
              <IconButton
                onClick={handleEdit}
                sx={{
                  backgroundColor: 'lightblue',
                  borderRadius: '20px', // Less round
                  '&:hover': { backgroundColor: 'green' },
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
              <Typography variant="body2" color="textSecondary" sx={{ color: 'white' }}>
                <strong>City:</strong> {service.city}
              </Typography>
            )}
            {service.address && (
              <Typography variant="body2" color="textSecondary" sx={{ color: 'white' }}>
                <strong>Address:</strong> {service.address}
              </Typography>
            )}
            {service.country && (
              <Typography variant="body2" color="textSecondary" sx={{ color: 'white' }}>
                <strong>Country:</strong> {service.country}
              </Typography>
            )}
            {service.zip && (
              <Typography variant="body2" color="textSecondary" sx={{ color: 'white' }}>
                <strong>Zip-code:</strong> {service.zip}
              </Typography>
            )}
            {service.phone && (
              <Typography variant="body2" color="textSecondary" sx={{ color: 'white' }}>
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

          {/* Status Toggle */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={editedService.status} onChange={handleChange}>
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Completed</MenuItem>
            </Select>
          </FormControl >
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