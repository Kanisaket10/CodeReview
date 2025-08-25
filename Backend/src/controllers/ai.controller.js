import aiService from "../services/ai.service.js";
import Review from "../models/Review.js";

const getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Prompt is required");
    }

    try {

        // Fetch the last review for the current user
        const lastReview = await Review.findOne({ userId: req.userId }).sort({ createdAt: -1 });

        // If the code is the same as the last review, return the old review
        if (lastReview && lastReview.code === code) {
            return res.send(lastReview.review);
        }

        // If the code is new or no previous review exists, generate a new one
        const aiResponse = await aiService(code);
        
        // Generate a title from the first line of code
        const title = code.split('\n')[0].substring(0, 50) + '...';

        // Save the review to the database
        const newReview = new Review({
            userId: req.userId,
            code: code,
            review: aiResponse,
            title: title 
        });
        await newReview.save();

        res.send(aiResponse);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// New controller function to get review history
const getReviewHistory = async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.userId}, 'title createdAt').sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const getReviewDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findOne({ _id: id, userId: req.userId });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


export default { getReview, getReviewHistory, getReviewDetails };

