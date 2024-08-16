import { validationResult } from "express-validator";
import { UserModel } from "../model/User.Model.js";

export const userSignUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const user = await UserModel.create(req.body);
        return res.status(201).json({ msg: "User sign-up successful...", user });
    } catch (err) {
        console.error('Error during user sign-up:', err);
        return res.status(500).json({ msg: "Internal server error..." });
    }
};

export const userSignIn = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Assuming `checkPassword` is an async method in your UserModel
        const isPasswordValid = await UserModel.checkPassword(password, user.password);

        if (isPasswordValid) {
            return res.status(200).json({ msg: 'User successfully signed in', user });
        } else {
            return res.status(401).json({ msg: 'Wrong password' });
        }
    } catch (err) {
        console.error('Error during user sign-in:', err);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};
