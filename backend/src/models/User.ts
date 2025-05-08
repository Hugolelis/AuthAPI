// modules
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    photo: { type: String },
    acess: { type: String },
})

export const User = mongoose.model('User', UserSchema)