import { validationResult } from "express-validator";
import { EventModel } from "../model/Event.Model.js";
import mongoose from "mongoose";

// ADD NEW EVENT
export const addEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const event = await EventModel.create(req.body);
        return res.status(201).json({ msg: "Event successfully created...", event });

    } catch (error) {
        console.error('Error during adding event:', err);
        return res.status(500).json({ msg: "Internal server error..." });
    }
}

// FIND OUR EVENT
export const readOurEvent = async (req, res, next) => {
    try {
        const { userId } = req.body; // Assuming userId is passed in the request body

        if (!userId) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        // Find events where userId matches
        const allEvents = await EventModel.find({ userId });

        // Log the retrieved events
        console.log('Retrieved events:', allEvents);

        if (allEvents.length === 0) {
            return res.status(404).json({ msg: "No events found for the given user ID", allEvents });
        }

        return res.status(200).json({ msg: "Events retrieved successfully", allEvents });

    } catch (error) {
        console.error('Error during get all events:', error);
        return res.status(500).json({ msg: "Internal server error..." });
    }
};

// READ ALL THE EVENTS
export const readAllEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const allEvents = await EventModel.find();
        return res.status(201).json({ msg: "Get all events successfully", allEvents });

    } catch (error) {
        console.error('Error during get all events:', error);
        return res.status(500).json({ msg: "Internal server error..." });
    }
}

// DELETE PARTICULAR EVENT
export const deleteEvent = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const deleteOneEvent = await EventModel.deleteOne({ _id });


        if (deleteOneEvent.deletedCount > 0) {
            return res.status(200).json({ msg: "Event successfully deleted", deleteOneEvent });
        } else {
            return res.status(404).json({ msg: "Event not found" });
        }
    } catch (error) {
        console.error('Error during delete one event:', error);
        return res.status(500).json({ msg: "Internal server error..." });
    }
}

// UPDATE PARTICULAR EVENT
export const updateEvent = async (req, res, next) => {
    try {
        // Extract and validate input data
        const {id, title, description, date, time, location, capacity } = req.body;

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid Event ID format' });
        }

        // Update the event document
        const updatedEvent = await EventModel.findByIdAndUpdate(
            id,
            { title, description, date, time, location, capacity },
            { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` applies schema validation
        );

        if (!updatedEvent) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        return res.status(200).json({ msg: 'Event updated successfully', updatedEvent });
        
    } catch (error) {
        console.error('Error updating event:', error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

