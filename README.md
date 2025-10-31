


## ⚙️ **Backend README.md** (`booklt_server/README.md`)

# 🧠 BookLT Backend

This is the backend of **BookLT**, a booking platform built with **Node.js + Express + MongoDB**.  
It provides REST APIs for managing experiences and user bookings, with proper CORS setup for frontend integration.

---

## 🚀 Live Server

🔗 [BookLT Server (Render)](https://booklt-server.onrender.com)

---

## 🧩 Tech Stack

- 🟢 **Node.js**
- ⚙️ **Express.js**
- 🗄️ **MongoDB (Mongoose)**
- 🌐 **CORS Configuration**
- 🔐 **dotenv** for environment variables

---

## 🗂️ Project Structure
booklt_server/
│
├── routes/ # All API route files
│ └── index.js
│
├── models/ # Mongoose schemas
│
├── db.js # MongoDB connection
├── server.js # Main entry file
└── .env # Environment variables

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/SunnyS214/booklt_server.git
cd booklt_server


🔗 API Routes


GET : /api/experiences =>	 Fetch all experiences

POST 	 :       /api/bookings	=>  Create a new booking

GET     : 	/api/bookings/:id	=> Get booking details



🌐 Frontend Connection

Frontend Repo:
🔗 [BookLT FrontendRepo:](https://github.com/SunnyS214/booklt-frontend)

Allowed Origins (CORS):

https://booklt-smoky.vercel.app

https://booklt-r8geoheji-sunnyss-projects.vercel.app

http://localhost:5173

👨‍💻 Developer

Sunny Sonawane
📧 sonawanesunny69@gmail.com

🌍 Pune, India
💼 MERN Stack Developer | Passionate about scalable full-stack solutions


