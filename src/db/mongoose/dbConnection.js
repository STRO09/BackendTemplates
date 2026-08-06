import mongoose from "mongoose";

import env from "../../config/env.js";

export default async function connectMongo() {

    try {

        await mongoose.connect(env.MONGO_URI);

        console.log("✅ MongoDB Connected");

    } catch (err) {

        console.error("MongoDB connection failed.");

        throw err;

    }

}