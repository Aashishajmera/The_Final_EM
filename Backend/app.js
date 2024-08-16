import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { userRouter } from "./router/User.Router.js";


// for using dotenv file
dotenv.config();

//Create a app level middleware 
const app = express();


//Connect database 
mongoose.connect(process.env.DATABASE_URL).then(() => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    // FOR USER TABLE AND USER SIGNUP AND SIGNIN
    app.use(process.env.USER_API, userRouter);

    app.listen(process.env.PORT_NUMBER, () => {
        console.log('server created...');
    })
}).catch((err) => {
    console.log("Database connection time error....", err)
})