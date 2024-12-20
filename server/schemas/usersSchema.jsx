const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    profilePicture: {
        type: String,
        default: '../assets/images/default-image.png',
    },
    bio: {
        type: String,
        trim: true,
        default: 'This user has not added a bio yet.',
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
