🎬 Video Streaming & Moderation Platform

A full-stack MERN application that allows Admins and Editors to upload videos, process them, and stream them with role-based access control.

🚀 Features

🔐 JWT Authentication

👥 Role-based access (Admin, Editor, Viewer)

📤 Video upload (Editors & Admin only)

🎥 Video streaming

⚡ Real-time processing updates using Socket.io

🗂 MongoDB database (Local / Atlas)

🌐 Full-stack deployment ready

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Multer (File upload)

Socket.io

Frontend

React (Vite)

Axios

React Router

Context API

📂 Project Structure
video-streaming-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │
│   ├── uploads/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── components/
│
└── README.md
🔑 User Roles
Role	Permissions
Admin	Upload, View
Editor	Upload, View
Viewer	View Only
⚙️ Environment Variables

Create a .env file inside backend/:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/video_app
JWT_SECRET=supersecretkey

For MongoDB Atlas:

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/videodb?retryWrites=true&w=majority
▶️ Running Locally
1️⃣ Start MongoDB
net start MongoDB
2️⃣ Start Backend
cd backend
npm install
npm run dev
3️⃣ Start Frontend
cd frontend
npm install
npm run dev

Open:

http://localhost:5173
🔐 Demo Credentials

You can register manually or create users via Postman.

Example:

Admin
email: admin@test.com
password: 123456
role: admin
Editor
email: editor@test.com
password: 123456
role: editor
Viewer
email: viewer@test.com
password: 123456
role: viewer
📡 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Videos
POST /api/videos/upload
GET /api/videos
GET /api/videos/stream/:id
🌍 Deployment

Backend: Render
Frontend: Vercel
Database: MongoDB Atlas

Steps:

Push to GitHub

Deploy backend

Deploy frontend

Set environment variables

📌 Notes

Video streaming uses HTTP range requests.

Role-based middleware protects upload routes.

Socket.io provides live processing updates.

👨‍💻 Author

Munna Nanda Kishore
Full Stack Developer