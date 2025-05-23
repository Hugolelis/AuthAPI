// modules
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String },
    acess: { type: String, enum: ['user', 'admin', 'root'], required: true },
})

export const User = mongoose.model('User', UserSchema)