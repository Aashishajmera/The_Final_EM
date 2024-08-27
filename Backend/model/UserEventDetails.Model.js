import mongoose from 'mongoose';

// Define the UserEvent Schema
const userEventSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    contactNumber: {
        type: String,
        trim: true,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    eventAttend: {
        type: Boolean,
        default: false,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events', // Reference to the Event model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the Event model
        required: true,
    },
});

// Create the UserEvent model
export const UserEventDetailsModel = mongoose.model('UserEventDetails', userEventSchema);