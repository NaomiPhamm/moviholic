# 🎬 Moviholic – Full Stack Movie Review Web App

## Project Overview

Moviholic is a full-stack movie review web application that allows users to:

- Register and login securely
- Add movies
- Review movies
- Edit or delete their reviews
- Edit or delete their own movies
- View top-rated movies
- Search movies
- See latest reviews in real time

This application demonstrates authentication, REST API design, CRUD operations, WebSocket events, and deployment using Render.

---

# 🧰 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt Password Hashing
- Socket.io (Realtime events)

## Frontend

- Angular (Standalone Components)
- TypeScript
- HTML / CSS

---

#  Features

## Authentication

Users can:

- Signup
- Login
- Access protected routes
- View profile information

JWT is used for authentication and route protection.

---

## Movie Model (Full CRUD)

Users can:

- Create movies
- View movies
- Update their movies
- Delete their movies

Fields:

- title
- genre
- releaseYear
- director
- description
- posterUrl
- averageRating

---

## Review Model (Full CRUD)

Users can:

- Add reviews
- Update reviews
- Delete reviews
- View reviews by movie
- View personal reviews

Fields:

- movie
- user
- rating
- comment

---

## Profile Page

Users can:

- View account info
- View personal reviews
- View movies they created
- Edit reviews
- Edit movies

---

## Search System

Search movies by:

- title
- genre
- director
- releaseYear

---

## Top Movies Section

Displays top 3 movies sorted by:

- averageRating

---

## Latest Reviews Section

Displays latest reviews sorted by:

- createdAt

---

# ⚡ Real-Time Features (WebSocket)

The application includes real-time updates using Socket.io:

Event 1:

review:created

Triggered when a new review is added.

Event 2:

review:updated

Triggered when a review is edited.

---

#  Environment Variables

Create a `.env` file inside backend:

PORT=5000  
MONGODB_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key

Never upload secrets to GitHub.

---

# ▶️ Run Backend Locally

Inside backend folder:

npm install  
npm start

Server runs on:

http://localhost:5000

---

# ▶️ Run Frontend Locally

Inside frontend folder:

npm install  
ng serve

App runs on:

http://localhost:4200

---

# 🚀 Deployment (Render)

## Backend Deployment

1. Create Web Service on Render
2. Connect GitHub repository
3. Add environment variables:

MONGODB_URI  
JWT_SECRET

4. Build command:

npm install

5. Start command:

npm start

---

## Frontend Deployment

Inside frontend:

ng build

Upload:

dist/frontend

as Render Static Site

Update API URL inside Angular services:

http://localhost:5000

Replace with:

https://your-render-backend-url.onrender.com

---

# 📡 Example API Endpoints

## Auth

POST /api/auth/signup  
POST /api/auth/login  
GET /api/auth/me  

---

## Movies

GET /api/movies  
GET /api/movies/:id  
POST /api/movies  
PUT /api/movies/:id  
DELETE /api/movies/:id  

---

## Reviews

GET /api/reviews  
GET /api/reviews/movie/:movieId  
GET /api/reviews/my  
POST /api/reviews  
PUT /api/reviews/:id  
DELETE /api/reviews/:id  

---

# 📁 Project Structure

backend/

- controllers/
- middleware/
- models/
- routes/
- server.js

frontend/

- components/
- services/
- guards/
- app.routes.ts

---

# 🎥 Video Demonstration Includes

The demo video shows:

- Signup
- Login
- Create Movie
- Update Movie
- Delete Movie
- Add Review
- Update Review
- Delete Review
- Profile Page
- WebSocket live update events
- Deployed application running on Render

---

# 🌐 Live Deployment

Frontend:

https://your-frontend-url.onrender.com

Backend:

https://your-backend-url.onrender.com