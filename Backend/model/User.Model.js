import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
    }, email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }, password: {
        type: String,
        required: true,
        set: (password) => {
            const saltkey = bcryptjs.genSaltSync(10);
            return bcryptjs.hashSync(password, saltkey);
        },
    }

})

// Create use model 

export const UserModel = mongoose.model("user", userSchema);

UserModel.checkPassword = (password, encryptPass) => {
    return bcryptjs.compare(password, encryptPass);
};