Video Streaming & Moderation App

This is a full-stack MERN application built as a video streaming and moderation platform.
The application allows users with different roles (Admin, Editor, Viewer) to upload and stream videos securely.

The project demonstrates authentication, role-based access control, video streaming, and real-time updates using Socket.io.

Features

User registration & login using JWT

Role-based access control (Admin, Editor, Viewer)

Video upload (Admin & Editor only)

Video streaming in dashboard

MongoDB integration (Local / Atlas)

Real-time processing updates using Socket.io

Clean and simple UI built with React + Vite

Tech Stack

Frontend

React (Vite)

Axios

React Router

Context API

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Multer (file uploads)

Socket.io

Folder Structure
video-streaming-app
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   ├── uploads
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── context
│   │   └── services
│
└── README.md
-----------------------------------------
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
-----------------------------------------

User Roles

Admin → Can upload and view videos

Editor → Can upload and view videos

Viewer → Can only view videos

Role-based protection is handled through middleware on the backend.

Environment Variables

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/video_app
JWT_SECRET=supersecretkey

If using MongoDB Atlas, replace MONGO_URI with your Atlas connection string.

Running Locally
1. Start MongoDB

If using local MongoDB:

net start MongoDB
2. Start Backend
cd backend
npm install
npm run dev

Backend runs on:

http://localhost:5000
3. Start Frontend
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
API Endpoints

Authentication

POST /api/auth/register

POST /api/auth/login

Videos

POST /api/videos/upload

GET /api/videos

GET /api/videos/stream/:id

Notes

Video streaming is handled using Express and HTTP range requests.

JWT tokens are stored in localStorage and sent via Axios interceptors.

Upload functionality is protected using role-based middleware.

Socket.io is used to simulate video processing progress updates.

Author

Munna Nanda Kishore
Full Stack Developer
