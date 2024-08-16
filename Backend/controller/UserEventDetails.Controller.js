import { validationResult } from "express-validator";
import { UserEventDetailsModel } from "../model/UserEventDetails.Model.js";



// ADD NEW REGISTRATION
export const RegistrationForEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const userEventDetails = await UserEventDetailsModel.create(req.body);
        return res.status(201).json({ msg: "User register successfully", userEventDetails });

    } catch (error) {
        console.error('Error during user registration', error);
        return res.status(500).json({ msg: "Internal server error..." });
    }
}