# Faculty Management System

A full-stack web application for managing faculty and departments in an educational institution.

## Features

- Add, view faculty members with validation
- Add, view departments with validation
- Responsive design with error handling
- MongoDB database integration
- React frontend with React Router
- Express.js backend with proper error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn package manager

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd faculty-management
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd ../client
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the server directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/facultymanagement
```

## Running the Application

### 1. Start MongoDB
Make sure MongoDB is running on your system.

### 2. Start the Server
```bash
cd server
npm run dev
```
The server will run on http://localhost:5000

### 3. Start the Client
```bash
cd client
npm run dev
```
The client will run on http://localhost:5173

## API Endpoints

### Faculty
- `GET /api/faculty` - Get all faculty members
- `POST /api/faculty` - Add a new faculty member

### Departments
- `GET /api/department` - Get all departments
- `POST /api/department` - Add a new department

## Project Structure

```
faculty-management/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   ├── App.css        # Styles
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                # Express backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── server.js         # Server entry point
│   ├── .env              # Environment variables
│   └── package.json
└── README.md
```

## Technologies Used

### Frontend
- React 19.1.0
- React Router DOM 7.7.0
- Axios for API calls
- Vite for build tooling

### Backend
- Node.js
- Express.js 5.1.0
- MongoDB with Mongoose 8.16.4
- CORS for cross-origin requests
- dotenv for environment variables

## Features Implemented

1. **Faculty Management**
   - Add faculty with name, email, department, and designation
   - Email validation
   - Error handling for duplicate emails
   - Responsive form design

2. **Department Management**
   - Add departments with name and HOD
   - Unique department names
   - Error handling for duplicates

3. **Navigation**
   - React Router for client-side routing
   - Clean navigation between pages

4. **Error Handling**
   - Client-side error display
   - Server-side validation
   - Try-catch blocks for async operations

5. **Database Integration**
   - MongoDB schemas with validation
   - Timestamps for records
   - Proper error responses

## Troubleshooting

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check the MONGO_URI in .env file

2. **Port Conflicts**
   - Change PORT in .env for server
   - Change port in vite.config.js for client

3. **CORS Issues**
   - Ensure server has CORS middleware enabled
   - Check API URLs in client code
