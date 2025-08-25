# 🤖 CodeReview : An AI-Powered Code Review Web Application

This project is a full-stack web application designed to help developers improve their code quality. It uses an AI model on the backend to provide constructive code reviews, which are then displayed on a user-friendly frontend interface. This application demonstrates proficiency in modern web development practices, including full-stack architecture, API integration, and user interface design.

---

## ✨ Features

    - User Authentication: Secure signup and login functionality to manage user access to the application.

    - Review History: Users can view a complete history of their past code reviews, with the ability to revisit and analyze previous feedback.

    - Customizable AI-Powered Feedback: The backend leverages the Google Gemini API to act as a senior code reviewer. You can choose a specific review focus, such as General, Security, Performance, or Code Quality, to get tailored feedback.

    - Real-time Code Review: Users can paste code into an editor and receive instant feedback from the AI.

    - Syntax Highlighting: The code editor and the review output both feature syntax highlighting for enhanced readability.

    - Responsive UI: The interface is built with React and CSS to provide a clean and responsive experience.

    - Modular Backend: The backend is organized into separate files for services, controllers, and routes, following a clean architecture pattern.

---

## 🔧 Tech Stack

**Frontend:**
- React (with Vite)
- React Simple Code Editor
- React Router DOM
- PrismJS for syntax highlighting
- React Markdown + Rehype Highlight for rendering
- Axios for API requests

**Backend:**
- Framework: Express.js
- Database: MongoDB (with Mongoose)
- Authentication: JSON Web Tokens (JWT) and BcryptJS
- API: Google Gemini API via @google/generative-ai SDK
- Configuration: dotenv for environment variable management
- Dependencies: cors, dotenv, express, jsonwebtoken, mongoose, bcryptjs


---

## 🚀 Installation and Setup

### 1. Clone the repository

       git clone <repository-url>
       cd CodeReview

### 2. Backend Setup

       - Navigate to the Backend directory.
       - Install dependencies: npm install
       - Create a .env file in the root of the Backend folder.
       - Add your Google Gemini API key and MongoDB connection URI to the .env file:

           GOOGLE_GEMINI_KEY=YOUR_API_KEY
           MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
           JWT_SECRET=YOUR_SECRET_KEY

       - Start the backend server: npm start
         The server will run on http://localhost:5000.

### 3. Frontend Setup

       - Navigate to the frontend directory.
       - Install dependencies: npm install
       - Start the development server: npm run dev
       - The application will be available at http://localhost:5173 (or another port specified by Vite).

---       

## Future Enhancements 
   
    - Multi-language Support: Allow users to select different programming languages to get reviews for.
    - Code Uploads: Enable users to upload files or entire folders for review.
    - Rate Limiting: Implement API rate limiting on the backend to manage usage.

