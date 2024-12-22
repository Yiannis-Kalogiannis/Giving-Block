import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './css/CreateService.css';

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
                alert(`Username doesn't exist`);
                return;
            }
    
            const {
                title, body, category, image, address, city, country, zip, phone, serviceType, status,
            } = newService;
    
            // Validate all required fields 
            if (!title) {
                alert('Title is required');
                return;
            }
            if (!body) {
                alert('Body is required');
                return;
            }
            if (!address) {
                alert('Address is required');
                return;
            }
            if (!city) {
                alert('City is required');
                return;
            }
            if (!country) {
                alert('Country is required');
                return;
            }
            if (!zip) {
                alert('Zip is required');
                return;
            }
            if (!phone) {
                alert('Phone is required');
                return;
            }
            if (!serviceType) {
                alert('Service Type is required');
                return;
            }
           
    
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
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
        <div className="create-service-container">
    <h1>Create Service</h1>
    <form className="create-service-form" onSubmit={handleSubmit}>
        <input
            type="text"
            name="title"
            placeholder="Title"
            className="create-service-input"
            onChange={handleChange}
        />
        <textarea 
            maxLength="50"
            name="body"
            placeholder="Description (100 characters max)"
            className="create-service-textarea"
            onChange={handleChange}
        />
        <input 
            type="file" 
            name="image" 
            className="create-service-file"
            onChange={handleImageChange} 
        />
        {image && <img src={image} alt="Preview" className="create-service-preview" />}
        <input
            type="text"
            name="address"
            placeholder="Address"
            className="create-service-input"
            onChange={handleChange}
        />
        <input
            type="text"
            name="city"
            placeholder="City"
            className="create-service-input"
            onChange={handleChange}
        />
        <input
            type="text"
            name="country"
            placeholder="Country"
            className="create-service-input"
            onChange={handleChange}
        />
        <input
            type="text"
            name="zip"
            placeholder="Zip"
            className="create-service-input"
            onChange={handleChange}
        />
        <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="create-service-input"
            onChange={handleChange}
        />
        <select
            name="serviceType"
            className="create-service-select"
            onChange={handleChange}
        >
            <option value="">Select Service Type</option>
            <option value="help-wanted">Help Wanted</option>
            <option value="offering-help">Offering Help</option>
        </select>
        <button type="submit" className="create-service-button">
            Create Service
        </button>
    </form>
</div>

    );
}

export default CreateService;
