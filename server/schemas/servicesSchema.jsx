const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: false
    },
    timestamps: true
});

module.exports = mongoose.model('Service', servicesSchema);