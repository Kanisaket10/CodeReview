import express from 'express';
import aiController from '../controllers/ai.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Protect the get-review endpoint with authentication middleware
router.post("/get-review", authMiddleware, aiController.getReview);

// New route to get all reviews for the authenticated user
router.get("/history", authMiddleware, aiController.getReviewHistory);


//router.post("/get-review", aiController.getReview)

export default router;
    