import dotenv from "dotenv";
dotenv.config();
import app from './src/app.js';
import connectDB from './src/db/connection.js';
import cleanupOldReviews from './src/services/cleanup.service.js';


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);

        // Schedule the cleanup to run every 24 hours (24 * 60 * 60 * 1000 ms)
        // You can adjust this interval as needed.
        setInterval(cleanupOldReviews, 24 * 60 * 60 * 1000);
    });
});


