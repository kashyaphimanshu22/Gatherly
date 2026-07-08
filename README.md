# Gatherly - Full-Stack Event Booking Platform

## 🌐 Live Demo

**Frontend:** [Visit Gatherly] ( https://gatherly-frontend-nine.vercel.app )


### 🌟 Overview

Gatherly is a complete MERN Stack Event Booking platform designed to simplify event management for both organizers and attendees.

Users can discover upcoming events, register securely using Email OTP verification, and track all bookings from their dashboard.

Administrators have complete control over event creation, booking approval, payment verification and user management through a dedicated Admin Dashboard.

The project demonstrates real-world full stack development using React, Node.js, Express, MongoDB and JWT Authentication.

---

### 📑 Table of Contents

- Overview
- Features
- Tech Stack
- System Architecture
- Project Structure
- Key Features
- What I Learned
- Challenges Faced
- Future Enhancements
- Setup Instructions
- Author
- Acknowledgments

### Why Gatherly?

- 🔐 Secure Email OTP Authentication
- 🎫 Smart Event Booking
- 👨‍💼 Admin Dashboard
- 📧 Automated Email Notifications
- 📊 Booking Analytics
- 📱 Responsive User Interface
- ⚡ RESTful APIs
- 🗄️ MongoDB Database

<p align="center">

<img src="https://img.shields.io/badge/MERN-FullStack-green">

<img src="https://img.shields.io/badge/React-19-blue">

<img src="https://img.shields.io/badge/Node.js-Backend-success">

<img src="https://img.shields.io/badge/MongoDB-Database-brightgreen">

<img src="https://img.shields.io/badge/TailwindCSS-Styling-38bdf8">

<img src="https://img.shields.io/badge/License-MIT-orange">

</p>

### Features

#### 🔐 Authentication

- JWT Authentication
- Password Hashing (bcrypt)
- Email OTP Verification
- Protected Routes
- Role Based Authorization

---

#### 🎫 Event Booking

- Browse Events
- Search Events
- Book Tickets
- Seat Availability
- Booking History

---

#### 👨‍💼 Admin Dashboard

- Create Events
- Delete Events
- Approve Bookings
- Reject Bookings
- Revenue Analytics
- Booking Statistics

---

#### 📧 Email Services

- OTP Verification Email
- Booking Confirmation Email
- Booking Status Email

---

#### 🎨 User Interface

- Responsive Design
- Tailwind CSS
- Beautiful Cards
- Modern Dashboard
- Animated Components

### 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Icons

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- Nodemailer

---

## Database

- MongoDB Atlas
- Mongoose ODM

---

## Development Tools

- Vite
- VS Code
- Git
- GitHub
- Postman

---

## Deployment

- Frontend : Vercel
- Backend : Render
- Database : MongoDB Atlas

# 🏗️ System Architecture

```
                 ┌────────────────────────────┐
                 │        React Frontend      │
                 │     (Tailwind CSS + Vite)  │
                 └─────────────┬──────────────┘
                               │
                         Axios REST API
                               │
                 ┌─────────────▼──────────────┐
                 │      Express.js Server     │
                 │ JWT Authentication + OTP   │
                 └─────────────┬──────────────┘
                               │
          ┌────────────────────┼───────────────────┐
          │                    │                   │
          ▼                    ▼                   ▼
     MongoDB Atlas        Nodemailer          JWT Tokens
      (Database)        (Email OTP)        Authentication
```

# 📁 Project Structure

```
Gatherly/
│
├── client/
│   ├── public/
│   ├── src/
│   │
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── README.md
└── package.json
```

# 🎯 Key Features Explained

## 🔐 Secure Authentication

- JWT based login
- Password hashing using bcrypt
- Email OTP verification
- Protected Routes
- Role-based Authorization

---

## 🎫 Smart Booking System

- Browse events
- Book free & paid events
- OTP confirmation
- Live seat availability
- Prevent overbooking

---

## 👨‍💼 Admin Dashboard

- Event creation
- Booking approval
- Revenue statistics
- Paid/Unpaid tracking
- Booking management

---

## 📧 Email Service

- Registration OTP
- Booking OTP
- Booking confirmation
- Booking status updates

# 📚 What I Learned

Developing Gatherly helped me strengthen my understanding of:

- Building complete MERN Stack applications
- JWT Authentication and Authorization
- Email OTP verification using Nodemailer
- REST API development with Express.js
- MongoDB database design using Mongoose
- React Context API for state management
- Responsive UI development using Tailwind CSS
- Role-based access control
- Git & GitHub workflow
- Full-stack project structure and deployment

# 🚧 Challenges Faced

### 1. Email OTP Authentication
**Challenge:** Implementing secure OTP verification for both user registration and event booking.

**Solution:** Used Nodemailer with Gmail App Passwords to generate and validate OTPs before allowing account activation or booking confirmation.

---

### 2. Preventing Seat Overbooking
**Challenge:** Multiple users could request bookings for the same event simultaneously.

**Solution:** Added backend seat validation and updated seat availability only after successful booking approval.

---

### 3. Role-Based Access Control
**Challenge:** Restricting administrative functionality from normal users.

**Solution:** Implemented JWT authentication with role-based middleware to protect admin routes and dashboards.

---

### 4. Admin Booking Workflow
**Challenge:** Designing a booking process that supports both free and paid events without integrating online payment gateways.

**Solution:** Developed a manual approval system where admins verify payments and approve or reject booking requests.

---

### 5. Responsive User Interface
**Challenge:** Making the application work smoothly across desktop, tablet, and mobile devices.

**Solution:** Built the frontend using Tailwind CSS with responsive layouts and reusable React components.

## 🚀 Future Enhancements

The following features can further improve Gatherly and make it production-ready:

- Razorpay / Stripe Integration
- QR Code Ticket Verification
- Google OAuth Login
- Cloudinary Image Upload
- Event Reviews & Ratings
- Admin Event Editing
- Event Recommendations
- Dark Mode


## 🚀 Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
You will also need a MongoDB database (e.g., [MongoDB Atlas Free Tier](https://www.mongodb.com/cloud/atlas/register)).

### 1. Environment Variables Configuration
Navigate to `server/.env` and fill in the necessary keys:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecretjwtkey_gatherly
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
PORT=5000
```
> **Note**: For `EMAIL_PASS`, you need to generate an "App Password" from your Google Account settings, standard passwords won't work due to 2FA.

### 2. Run from Outer Folder (Single Terminal)
You can now manage both backend and frontend from the project root:

```bash
# from Gatherly root
npm install
npm run install:all
npm run dev
```

- `npm run dev` starts both `server` and `client` together using `concurrently`.
- `npm run dev:all` installs dependencies (server + client) and starts both in one command.
- `npm run start` runs backend `start` + frontend `preview` together.

### 3. Install Dependencies
Open two separate terminals for the backend and frontend.

**Backend Terminal:**
```bash
cd server
npm install --legacy-peer-deps
```

**Frontend Terminal:**
```bash
cd client
npm install
```

### 4. Run the Application Local Servers
**Run Backend:**
```bash
cd server
npm run dev
```
*(Server will run on `http://localhost:5000`)*

**Run Frontend:**
```bash
cd client
npm run dev
```
*(Client will run on a local port provided by Vite, typically `http://localhost:5173`)*

## 📄 License

This project is licensed under the MIT License.

# 👨‍💻 Author

**your name**

- GitHub: @your-github-username
- LinkedIn: linkedin.com/in/your-linkedin-username
- Email: your-email@example.com

# 🙏 Acknowledgments

- React.js for building the frontend
- Node.js & Express.js for backend development
- MongoDB Atlas for cloud database services
- Mongoose for MongoDB object modeling
- Tailwind CSS for modern UI styling
- Nodemailer for email and OTP delivery
- JWT & bcrypt for secure authentication
- Vite for fast frontend development
- GitHub for version control
- Vercel & Render for deployment