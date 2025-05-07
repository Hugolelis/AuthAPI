// .env
import 'dotenv/config';

// modules
import mongoose from "mongoose";

export async function main() {
    await mongoose.connect(process.env.DB_URI)
    console.log('Connected on db')
}

main().catch(e => console.log(e))