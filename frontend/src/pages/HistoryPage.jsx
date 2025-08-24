import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

//const BACKEND_URL = 'https://codereview-1-9y0e.onrender.com';
const BACKEND_URL = 'http://localhost:5000';

function HistoryPage() {
    const [reviews, setReviews] = useState([]);
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

    if (loading) {
        return <div>Loading history...</div>;
    }

    return (
        <div className="history-container">
            <h2>Review History</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="review-card">
                        <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleString()}</p>
                        <h3>Code Submitted:</h3>
                        <div className="code-block">
                            <Markdown rehypePlugins={[rehypeHighlight]}>{`\`\`\`javascript\n${review.code}\n\`\`\``}</Markdown>
                        </div>
                        <h3>AI Review:</h3>
                        <div className="review-block">
                            <Markdown rehypePlugins={[rehypeHighlight]}>{review.review}</Markdown>
                        </div>
                    </div>
                ))
            ) : (
                <p>No review history found.</p>
            )}
        </div>
    );
}

export default HistoryPage;