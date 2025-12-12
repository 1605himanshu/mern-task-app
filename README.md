🚀 MERN Task Manager – Authentication + Dashboard

A full-stack web application built for the Frontend Developer Intern Assignment.
This app includes JWT authentication, protected dashboard, and CRUD operations with a modern UI using TailwindCSS and Framer Motion.

🌟 Features
🔐 Authentication

User Signup & Login

JWT Token generation & validation

Auto-login persistence using localStorage

Logout & protected routes

🗂 Dashboard Features

View logged-in user profile

Create, edit, delete tasks

Mark tasks as completed

Search tasks

Real-time updates after operations

Animated UI interactions

🛠 Backend Highlights

Node.js + Express

MongoDB + Mongoose

Secure password hashing (bcrypt)

JWT-based auth middleware

Proper MVC structure

Robust error messages

🎨 Frontend Highlights

React + Vite

TailwindCSS UI

Framer Motion animations

Axios API layer

Context API for authentication state

PrivateRoute for protected routing

📂 Project Structure
frontend/
  components/
  pages/
  context/
  services/
  App.jsx
  main.jsx

backend/
  controllers/
  routes/
  models/
  middleware/
  config/
  server.js

🔧 Installation & Setup
1️⃣ Clone repo
git clone <repo-url>
cd doItWell

2️⃣ Install backend dependencies
cd backend
npm install


Create .env:

PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret


Run backend:

npm run dev

3️⃣ Install frontend dependencies
cd frontend
npm install


Create .env:

VITE_API_URL=http://localhost:5000/api


Run frontend:

npm run dev

