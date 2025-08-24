import aiService from "../services/ai.service.js";
import Review from "../models/Review.js";

const getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Prompt is required");
    }

    try {
        const aiResponse = await aiService(code);

        // Save the review to the database
        const newReview = new Review({
            userId: req.userId,
            code: code,
            review: aiResponse
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
        const reviews = await Review.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export default { getReview, getReviewHistory };







// import aiService from "../services/ai.service.js";
// import Review from "../models/Review.js";

//     const getReview = async (req, res)=>{
//         const code = req.body.code;
    
//         if(!code){
//            return res.status(400).send(" Prompt is required"); 
//         }
    
//         const response = await aiService(code);
//         res.send(response);
//     }
    
//      export default {getReview}; 
