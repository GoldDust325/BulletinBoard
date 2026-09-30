# BulletinBoard
An interactive virtual event board
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

### September 20, 2026

- Added SQLite database support.
- Created `users` and `flyers` tables.
- Added secure user registration.
- Added password hashing using bcryptjs.
- Added user login authentication.
- Tested successful login with correct credentials.
- Tested rejection of incorrect passwords.
- Updated Git configuration so the shared group repository is the default upstream for the `main` branch.

### Current Backend Status

The backend currently supports:

- Express server
- SQLite database
- User registration
- Hashed password storage
- User login authentication

### Next Steps

- Add flyer creation route.
- Add route to retrieve all flyers.
- Add flyer update and delete routes.
- Connect frontend components to the backend API.
## Backend Progress - September 29, 2026

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
