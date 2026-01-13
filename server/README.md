# GigFlow Server

## Overview
The GigFlow server is a Node.js and Express-based backend that handles user authentication, gig management, and application processing. It uses MongoDB for data persistence and provides RESTful APIs for the frontend client.

## Features
- **User Authentication**: Secure registration and login with JWT tokens and password hashing using bcrypt
- **Gig Management**: Create, retrieve, and manage gigs with detailed information
- **Gig Applications**: Users can apply for gigs with status tracking
- **Role-Based Access Control**: Different access levels for clients and applicants
- **Database Integration**: MongoDB integration for persistent data storage
- **CORS Support**: Configured to work with the frontend client
- **Cookie Management**: Secure session handling with cookies

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) and bcrypt
- **Middleware**: CORS, cookie-parser, and custom authentication middleware

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- pnpm package manager

### Installation
1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the server directory based on `.env.example`:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Start the server**:
   - **Development mode** (with hot reload):
     ```bash
     pnpm run dev
     ```
   - **Production mode**:
     ```bash
     pnpm run run
     ```

The server will start on `http://localhost:5000`.

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user and receive JWT token
- `POST /logout` - Logout user

### Gig Routes (`/api/gigs`)
- `GET /` - Fetch all gigs
- `GET /:gigId` - Fetch a specific gig
- `POST /` - Create a new gig (client only)
- `PUT /:gigId` - Update a gig (client only)
- `DELETE /:gigId` - Delete a gig (client only)
- `POST /:gigId/apply` - Apply for a gig

## Middleware
- **auth.js**: Validates JWT tokens and protects routes requiring authentication
- **isClient.js**: Ensures only users with client role can perform certain actions

## Models
- **User**: Stores user information including name, email, hashed password, and role
- **Gig**: Stores gig details including title, description, budget, and applicant information

## Database Configuration
MongoDB connection is configured in `config/db.js`. Ensure your MongoDB instance is running and accessible via the URI specified in the `.env` file.

## License
This project is licensed under the ISC License.
