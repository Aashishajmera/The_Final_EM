import dotenv from 'dotenv';
import express from 'express';
import { createFeedback, seeFeedbackList, seeUserFeedbackList } from '../controller/FeedbackController.js';


// for env file
dotenv.config();

//Create a router level middleware
export const feedbackRouter = express.Router();

// add feedback
feedbackRouter.post(process.env.FEEDBACK_API, createFeedback);

// see feedback
feedbackRouter.post(process.env.SEE_FEEDBACK, seeFeedbackList);

// user feedback list
feedbackRouter.post(process.env.SEE_USER_FEEDBACK, seeUserFeedbackList);