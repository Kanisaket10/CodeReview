import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//const BACKEND_URL = 'https://codereview-1-9y0e.onrender.com';
const BACKEND_URL = 'http://localhost:5000';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BACKEND_URL}/auth/signup`, { email, password });
            alert('User registered successfully! Please log in.');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed. User may already exist.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupPage;