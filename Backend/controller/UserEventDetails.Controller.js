import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { UserEventDetailsModel } from '../model/UserEventDetails.Model.js';

// for using dotenv file
dotenv.config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SEND_EMAIL, // Your email address
        pass: process.env.SEND_EMAIL_PASSWORD, // Your email password
    },
});

// ADD NEW REGISTRATION
export const RegistrationForEvent = async (req, res, next) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        // Create user event registration
        const userEventDetails = await UserEventDetailsModel.create(req.body);

        // Populate the event details
        const populatedUserEventDetails = await UserEventDetailsModel
            .findById(userEventDetails._id)
            .populate('eventId');

        // Extract specific fields
        const { username, email } = populatedUserEventDetails;
        const { title, date, time, location } = populatedUserEventDetails.eventId;

        // Prepare email content
        const mailOptions = {
            from: process.env.SEND_EMAIL,
            to: email,
            subject: `Registration Successful for ${title} event`,
            text: `
Dear ${username},
We are delighted to inform you that your registration for the event "${title}" has been successfully completed.

  **Event Details:**
 - **Title:** ${title}
 - **Date:** ${new Date(date).toDateString()}
 - **Time:** ${time}
 - **Location:** ${location}

Thank you for registering. We look forward to seeing you at the event

Best regards,
Event Managment Team`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Respond with success
        return res.status(201).json({
            msg: "User registered successfully and mail send.",
            userEventDetails: populatedUserEventDetails,
        });

    } catch (error) {
        console.error('Error during user registration or sending mail', error);
        return res.status(500).json({ msg: "Internal server error..." });
    }
};

// CHECK USER IS REGISTER OR NOT
export const checkUserRegistration = async (req, res) => {
    try {
      const { userId, eventId } = req.body;
  
      // Check if both userId and eventId are provided
      if (!userId || !eventId) {
        return res.status(400).json({ message: 'userId and eventId are required' });
      }
  
      // Find a document where both userId and eventId match
      const userEvent = await UserEventDetailsModel.findOne({ userId: userId, eventId: eventId });
  
      // If a match is found, return that the user is already registered
      if (userEvent) {
        return res.status(200).json({ message: 'User is already registered for this event' });
      }
  
      // If no match is found, return that no user is registered
      return res.status(201).json({ message: 'No user registered for this event' });
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error('Error checking user registration:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };