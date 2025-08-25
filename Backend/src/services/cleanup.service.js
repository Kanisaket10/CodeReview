// In Backend/src/services/cleanup.service.js
import Review from '../models/Review.js';

const cleanupOldReviews = async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    try {
        const result = await Review.deleteMany({ createdAt: { $lt: thirtyDaysAgo } });
        console.log(`Cleaned up ${result.deletedCount} old reviews.`);
    } catch (error) {
        console.error('Error during review cleanup:', error.message);
    }
};

export default cleanupOldReviews;