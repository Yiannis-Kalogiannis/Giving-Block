import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function CreateService() {
    const navigate = useNavigate();
    const [newService, setNewService] = useState({
        title: '',
        body: '',
        category: '',
        image: null,
        address: '',
        city: '',
        country: '',
        zip: '',
        phone: '',
        status: true,
        serviceType: '',
        username: 'username', // Add username to the service
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        return () => {
            if (image) {
                URL.revokeObjectURL(image); // Clean up image URL when unmounting
            }
        };
    }, [image]);

    function handleChange(e) {
        const { name, value } = e.target;
        setNewService((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setNewService((prevState) => ({ ...prevState, image: file })); // Store the file, not the URL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        try {
            const token = localStorage.getItem('token');
            console.log("token:" , token);
            if (!token) {
                alert('No token found, please log in');
                return;
            }
    
            // Decode the token to extract user data
            const decodedToken = jwtDecode(token);
            console.log("Decoded token:", decodedToken);

            
            const userId = decodedToken.userId;  // Get userId from decoded token
            console.log("User ID:", userId);
            if (!userId) {
                alert('User is not authenticated');
                return;
            }
            const userName = decodedToken.username;  // Get userId from decoded token
            console.log("username:", userName);
            if (!userName) {
                alert('Username dosent exist');
                return;
            }
    
            const {
                title, body, category, image, address, city, country, zip, phone, serviceType, status,
            } = newService;
    
            // Validate all required fields
            if (!title || !body || !address || !city || !country || !zip || !phone || !serviceType) {
                alert('All fields are required');
                return;
            }
    
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            formData.append('category', category);
            formData.append('image', image); // This will be the actual file object
            formData.append('address', address);
            formData.append('city', city);
            formData.append('country', country);
            formData.append('zip', zip);
            formData.append('phone', phone);
            formData.append('serviceType', serviceType);
            formData.append('status', status);
            formData.append('username', userName);  // Add username to the form data
        
    
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
                navigate('/home');
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
        <div>
            <h1>Create Service</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                />
                <textarea
                    name="body"
                    placeholder="Body"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category (optional)"
                    onChange={handleChange}
                />
                <input type="file" name="image" onChange={handleImageChange} />
                {image && <img src={image} alt="Preview" style={{ width: '100px' }} />}
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="zip"
                    placeholder="Zip"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="serviceType"
                    placeholder="Service Type ('help-wanted' or 'offering-help')"
                    onChange={handleChange}
                />
                <button type="submit">
                    Create Service
                </button>
            </form>
        </div>
    );
}

export default CreateService;
