# BulletinBoard
An interactive virtual event board

## Project Overview

Cork Bored is a digital campus bulletin board that allows students to discover events, share flyers, and manage their own postings through a corkboard-style interface.

## Technologies Used

- Frontend: React, TypeScript, Vite, React Router
- Backend: Node.js, Express
- Database: SQLite
- Authentication: bcrypt password hashing and Express session support
- Version Control: Git and GitHub

## Installation and Setup

### Prerequisites

- Node.js and npm
- Git
- A modern web browser

### 1. Clone the Repository

```bash
git clone https://github.com/lexih209/BulletinBoard.git
cd BulletinBoard
```

### 2. Install and Start the Backend

From the project root:

```bash
cd backend
npm install
node server.js
```

The backend runs at http://localhost:3000.

### 3. Install and Start the Frontend

Open a second terminal in the main BulletinBoard project folder, then run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually http://localhost:5173.

**Windows PowerShell note:** If npm scripts are blocked by the execution policy, use `npm.cmd install` and `npm.cmd run dev` instead.

## Features Implemented

- User registration and login
- Password hashing
- Browse flyers stored in SQLite
- View individual flyer details
- Create flyers with title, description, date, location, and category
- Optional image URLs for flyers
- Edit and delete user-owned flyers
- Loading and error handling
- Logout functionality

## Current Testing Status

The frontend production build passes. Login, flyer creation, viewing, editing, deletion, and database persistence have been tested locally. Direct backend authorization testing remains outstanding.

**Development note:** The application currently runs locally. It has not been configured for public deployment.

---

  

## Backend Progress

### September 15, 2026

- Cloned the BulletinBoard repository locally.
- Created a `backend` folder.
- Initialized a Node.js project.
- Installed Express.
- Created `server.js`.
- Configured the server to run on port 3000.
- Successfully tested the backend at `http://localhost:3000`.
- Added `.gitignore` so the `node_modules` folder is not committed to GitHub.
- Committed the initial backend setup.

### Current Test Result
### Backend Server Screenshot

The initial Express backend successfully running at `http://localhost:3000`.
The backend successfully displays:

`BulletinBoard backend is running!`
<img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/5a60d7b5-ea77-4fa3-9111-6c26979aa443" />

### Backend Server Screenshot

### Next Steps

- Set up the database.
- Create user registration and login functionality.
- Add flyer/event data.
- Create API routes for viewing, adding, editing, and deleting flyers.

### September 29, 2026

- Added consistent SQLite database path using `__dirname`.
- Enabled SQLite foreign key enforcement.
- Added flyer creation with `POST /flyers`.
- Added retrieval of all flyers with `GET /flyers`.
- Added retrieval of a single flyer with `GET /flyers/:id`.
- Tested flyer creation and retrieval successfully using PowerShell.

### Current Backend Features

- User registration
- User login
- Password hashing with bcrypt
- SQLite database storage
- Create flyer
- View all flyers
- View flyer details
- added PUT /flyers/:id
- added DELETE /flyers/:id
- verified update and delete behavior with PowerShell
- flyer CRUD is now complete
- Added flyer category filtering using `GET /flyers?category=...`.
- Tested filtering successfully with Academic and Social categories.
- Added ownership checks so users can only edit or delete flyers they created.
- Added CORS support for the React frontend running at `http://localhost:5173`.

### September 29, 2026

- Added consistent SQLite database path using `__dirname`.
- Enabled SQLite foreign key enforcement.
- Added flyer creation with `POST /flyers`.
- Added retrieval of all flyers with `GET /flyers`.
- Added retrieval of a single flyer with `GET /flyers/:id`.
- Tested flyer creation and retrieval successfully using PowerShell.

### Current Backend Features

- User registration
- User login
- Password hashing with bcrypt
- SQLite database storage
- Create flyer
- View all flyers
- View flyer details
- added PUT /flyers/:id
- added DELETE /flyers/:id
- verified update and delete behavior with PowerShell
- flyer CRUD is now complete
- Added flyer category filtering using `GET /flyers?category=...`.
- Tested filtering successfully with Academic and Social categories.
- Added ownership checks so users can only edit or delete flyers they created.
- Added CORS support for the React frontend running at `http://localhost:5173`.
- Flyer input validation
- Duplicate username/email handling

### September 29, 2026

- Completed full CRUD functionality for flyers.
- Added category filtering.
- Added ownership protection so users can only edit or delete their own flyers.
- Added CORS support for the React frontend running on port 5173.
- Added flyer validation for blank titles and missing creator IDs.
- Improved registration error handling for duplicate usernames or emails.
- Tested backend functionality successfully using PowerShell.
