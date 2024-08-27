import mongoose from 'mongoose';

// Define the Event Schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String, // You might want to use a more specific type or format
        required: true,
    },
    location: {
        type: String,
        trim: true,
        required: true,
    },
    eventComplete: {
        type: Boolean,
        default: false,
    },
    capacity: {
        type: Number,
        required: true,
        min: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        required: true,
    },
});

// Create the Event model
export const EventModel = mongoose.model('events', eventSchema);
