import express from 'express';
import { userSignIn, userSignUp } from '../controller/User.Controller.js';
import dotenv from 'dotenv';
import { body } from 'express-validator';


// for env file
dotenv.config();

//Create a router level middleware
export const userRouter = express.Router();


//call the user sign up method 
userRouter.post(process.env.USER_SIGNUP, body('userName', 'user name is required').notEmpty(),body('email').notEmpty().withMessage('email is required').isEmail().withMessage("please write correct email"),body('password').notEmpty().withMessage('password is mandatory').isLength({ min: 8, max:16 }).withMessage('length must be at least 8 character'), userSignUp);


// call the method for user signIn
userRouter.post(process.env.USER_SIGNIN,body('email').notEmpty().withMessage('email is required').isEmail().withMessage("please write correct email"),body('password').notEmpty().withMessage('password is mandatory'), userSignIn);
