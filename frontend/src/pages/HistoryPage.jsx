import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const BACKEND_URL = 'https://codereview-0.onrender.com';
//const BACKEND_URL = 'http://localhost:5000';

function HistoryPage() {
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get(`${BACKEND_URL}/ai/history`, config);
                setReviews(response.data);
            } catch (error) {
                console.error('Failed to fetch review history:', error);
                alert('Failed to load review history.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchHistory();
        }
    }, [token]);

    const fetchReviewDetails = async (reviewId) => {
        try {
            // This is a new endpoint you need to create in your backend
            const response = await axios.get(`${BACKEND_URL}/ai/history/${reviewId}`, { headers: { Authorization: `Bearer ${token}` } });
            setSelectedReview(response.data);
        } catch (error) {
            console.error('Failed to fetch review details:', error);
            alert('Failed to load review details.');
        }
    };

    if (loading) {
        return <div>Loading history...</div>;
    }

     return (
        <div className="history-container">
            <div className="review-list">
                <h2>Review History</h2>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review._id} className="review-title" onClick={() => fetchReviewDetails(review._id)}>
                            <p>{review.title}</p>
                            <small>{new Date(review.createdAt).toLocaleString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No review history found.</p>
                )}
            </div>
            <div className="review-details">
                {selectedReview ? (
                    <>
                        <h3>Code Submitted:</h3>
                        <div className="code-block">
                            <Markdown rehypePlugins={[rehypeHighlight]}>{`\`\`\`javascript\n${selectedReview.code}\n\`\`\``}</Markdown>
                        </div>
                        <h3>AI Review:</h3>
                        <div className="review-block">
                            <Markdown rehypePlugins={[rehypeHighlight]}>{selectedReview.review}</Markdown>
                        </div>
                    </>
                ) : (
                    <p>Select a review from the left to see details.</p>
                )}
            </div>
        </div>
    );

    // return (
    //     <div className="history-container">
    //         <h2>Review History</h2>
    //         {reviews.length > 0 ? (
    //             reviews.map((review, index) => (
    //                 <div key={index} className="review-card">
    //                     <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleString()}</p>
    //                     <h3>Code Submitted:</h3>
    //                     <div className="code-block">
    //                         <Markdown rehypePlugins={[rehypeHighlight]}>{`\`\`\`javascript\n${review.code}\n\`\`\``}</Markdown>
    //                     </div>
    //                     <h3>AI Review:</h3>
    //                     <div className="review-block">
    //                         <Markdown rehypePlugins={[rehypeHighlight]}>{review.review}</Markdown>
    //                     </div>
    //                 </div>
    //             ))
    //         ) : (
    //             <p>No review history found.</p>
    //         )}
    //     </div>
    // );
}

export default HistoryPage;