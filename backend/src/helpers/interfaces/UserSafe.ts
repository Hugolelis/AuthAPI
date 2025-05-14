// modules
import mongoose from "mongoose";

export interface UserSafeData {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
}