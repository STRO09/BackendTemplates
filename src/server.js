import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

async function start() {
    try {
        await connectDB();

        const server = http.createServer(app);

        server.listen(env.PORT, () => {
            console.log(`Server running on port ${env.PORT}`);
        });
    } catch (err) {
        console.error("Failed to start application");
        console.error(err);
        process.exit(1);
    }
}

start();