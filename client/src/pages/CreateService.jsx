import { useState, useEffect } from 'react';
import axios from 'axios';
import useUserStore from '../store/useUserStore';
import {
    TextField,
    Button,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Box
} from '@mui/material';
import useServiceStore from '../store/useServiceStore';
import PropTypes from 'prop-types';
function CreateService({ handleClose }) {
    const { username, userId, token } = useUserStore();  // Get username and userId from the store
    const [newService, setNewService] = useState({
        title: '',
        body: '',
        category: '',
        serviceImage: '',
        address: '',
        city: '',
        country: '',
        zip: '',
        phone: '',
        status: true,
        serviceType: '',
        username: 'username', 
    });
    const [serviceImagePreview, setServiceImagePreview] = useState(null);
    const services = useServiceStore((state) => state.services);
    const setServices = useServiceStore((state) => state.setServices);

    useEffect(() => {
        return () => {
            if (serviceImagePreview) {
                URL.revokeObjectURL(serviceImagePreview); // Clean up image URL when unmounting
            }
        };
    }, [serviceImagePreview]);

    function handleChange(e) {
        const { name, value } = e.target;
        setNewService((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setServiceImagePreview(URL.createObjectURL(file));
            setNewService((prevState) => ({ ...prevState, serviceImage: file })); // Store the file, not the URL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const {
                title, body, serviceImage, address, city, country, zip, phone, serviceType, status,
            } = newService;

            // Validate all required fields 
            if (!title || !body || !address || !city || !country || !zip || !phone || !serviceType) {
                alert('All fields are required');
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            formData.append('serviceImage', serviceImage); // This will be the actual file object
            formData.append('address', address);
            formData.append('city', city);
            formData.append('country', country);
            formData.append('zip', zip);
            formData.append('phone', phone);
            formData.append('serviceType', serviceType);
            formData.append('status', status);
            formData.append('username', username);  // Add username to the form data

            // Send the request with userId as a URL parameter
            const response = await axios.post(
                `http://localhost:8080/services/createService/${userId}`,  // Add userId in the URL
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                alert('Service created successfully');
                handleClose();  // Close the dialog
                setServices([...services, response.data]);  // Update the services list
            }
        } catch (error) {
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
                alert('An error occurred. Please try again later');
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2, }}>
            <h1>Create Service</h1>
            <form onSubmit={handleSubmit}>
                {/* Title */}
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                />

                {/* Description */}
                <TextField
                    fullWidth
                    label="Description"
                    name="body"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    maxLength="50"
                    onChange={handleChange}
                />

                {/* Image */}
                <input
                    type="file"
                    name="serviceImage"
                    onChange={handleImageChange}
                    style={{ marginBottom: 16 }}
                />
                {serviceImagePreview && <img src={serviceImagePreview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />}

                {/* Address */}
                <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                />

                {/* City */}
                <TextField
                    fullWidth
                    label="City"
                    name="city"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                />

                {/* Country */}
                <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                />

                {/* Zip */}
                <TextField
                    fullWidth
                    label="Zip"
                    name="zip"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                />

                {/* Phone */}
                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                />

                {/* Service Type */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Service Type</InputLabel>
                    <Select
                        label="Service Type"
                        name="serviceType"
                        value={newService.serviceType}
                        onChange={handleChange}
                    >
                        <MenuItem value="help-wanted">Help Wanted</MenuItem>
                        <MenuItem value="offering-help">Offering Help</MenuItem>
                    </Select>
                </FormControl>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Create Service
                </Button>
            </form>
        </Box>
    );
}


// Add PropTypes validation for handleClose
CreateService.propTypes = {
    handleClose: PropTypes.func.isRequired, // handleClose should be a function and is required
};

export default CreateService;
