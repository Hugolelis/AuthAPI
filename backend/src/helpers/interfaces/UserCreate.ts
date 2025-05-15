// modules
import mongoose from "mongoose";

// types
import { AccessLevel } from "../types/AcessLevel";

export interface UserCreate {
    _id?: mongoose.Types.ObjectId | null;
    name: string | null | undefined;
    email: string;
    password: string;
    photo?: string | null;
    acess: AccessLevel;
}