import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css';
import { useAuth } from './context/authContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';

//const BACKEND_URL = 'https://codereview-1-9y0e.onrender.com';
 const BACKEND_URL = 'http://localhost:5000';


function Reviewer() {
    const [code, setCode] = useState(`//Write your code here`);
    const [review, setReview] = useState(``);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        prism.highlightAll();
    }, []);

    const reviewCode = async () => {
        setLoading(true); // Set loading to true when the request starts
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
           const response = await axios.post(`${BACKEND_URL}/ai/get-review`, { code }, config);
           setReview(response.data);
        } catch (error) {
           console.error("Error during code review:", error);
           setReview("Error: Could not get a review.");
        } finally {
           setLoading(false); // Set loading to false when the request finishes
        }   
    };

    return (
        <main>
            <div className="left">
                <div className="code">
                    <Editor
                        value={code}
                        onValueChange={code => setCode(code)}
                        highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                        padding={10}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 16,
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            height: "100%",
                            width: "100%"
                        }}
                    />
                </div>
                <div onClick={reviewCode} className="review">Review</div>
            </div>

            <div className="right">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                   <Markdown rehypePlugins={[rehypeHighlight]}>
                       {review}
                   </Markdown>
                )}
            </div>
        </main>
    );
}

function PrivateRoute({ children }) {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
}

// New component for navigation
function Navigation() {
    const { token, logout } = useAuth();

    return (
        <nav>
            <Link to="/app">Code Review</Link>
            {token && (
                <>
                    <Link to="/history">History</Link>
                    <button onClick={logout}>Logout</button>
                </>
            )}
            {!token && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </>
            )}
        </nav>
    );
}

function App() {

    const { token } = useAuth();
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Navigate to={token ? "/app" : "/login"} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/app" element={
                    <PrivateRoute>
                        <Reviewer />
                    </PrivateRoute>
                } />
                <Route path="/history" element={
                    <PrivateRoute>
                        <HistoryPage />
                    </PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/app" />} />
            </Routes>
        </>
    );
}


export default App;