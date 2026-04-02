# Freelancer Portfolio with Express.js Backend & MongoDB

This project is a fully functional freelancer portfolio website featuring a modern frontend (HTML, CSS, JS), a Node.js/Express backend for handling contact form submissions, and an Admin Dashboard for managing those messages securely using JWT authentication.

## 🚀 Features
- **Frontend**: Responsive, modern portfolio with dark/cyan aesthetics and glassmorphism elements.
- **Backend API**: Node.js & Express.js REST API with rate limiting to prevent spam.
- **Database**: MongoDB Atlas connection using Mongoose.
- **Admin Dashboard**: Secure control panel to view, delete, and manage all messages sent from the portfolio.

---

## 🛠️ Prerequisites

Before you begin, ensure you have met the following requirements:
1. **Node.js**: You need to have Node.js and npm installed on your computer. Download it from [nodejs.org](https://nodejs.org/).
2. **MongoDB Atlas**: You need a MongoDB cluster. Get your MongoDB Connection String (URI).

---

## ⚙️ Setup and Installation

### 1. Configure the Backend Environment
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Open the `.env` file (`backend/.env`).
3. Set your variables, particularly the `MONGO_URI`.

```ini
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 2. Install Backend Dependencies
Remaining inside the `backend/` directory, install the required NPM packages:
```bash
npm install
```

### 3. Start the Backend Server
Once dependencies are installed, you can start the development server using `nodemon`:
```bash
npm run dev
```
If successful, the terminal will log:
> `Server started on port 5000`
> `MongoDB Connected: cluster0...`

---

## 🌐 Running the Application (Frontend & Admin)

Since the frontend consists of static files (`.html`, `.css`, `.js`), you don't need a heavy build process.

1. **Start a Local Server**: Use an extension like **Live Server** in VS Code.
2. **View Portfolio**: Open `index.html` with Live Server. Scroll down to the Contact section, enter your details, and click "Send Message" to test the backend API.
3. **Admin Dashboard**: Click the "Admin Dashboard" link in the navigation bar (or open `admin/admin.html` manually).
4. **Login**: Enter the credentials you defined in your `.env` file (Default is `admin` / `admin123`).
5. **Manage Messages**: From the dashboard, you can view all submitted messages, delete individual ones, or clear them all.

---

## 📂 Backend Folder Structure
The `backend/` directory is organized following the MVC (Model-View-Controller) architecture:

- **`server.js`**: The main entry point of the server. It initializes Express, connects to MongoDB, sets up CORS (Cross-Origin Resource Sharing) security, rate limiting, and mounts the API routes.
- **`config/db.js`**: Contains the MongoDB Atlas connection logic using Mongoose.
- **`models/`**: Defines the data structure.
  - `Message.js`: The Mongoose schema for the contact form submissions, detailing fields like name, email, and message.
- **`routes/`**: Defines the API endpoints.
  - `messageRoutes.js`: Handles POST requests from the contact form.
  - `adminRoutes.js`: Handles authentication (login) and retrieving/deleting messages.
- **`controllers/`**: Contains the core logic for the routes.
  - `messageController.js`: Functions to save new messages and fetch/delete existing ones.
  - `authController.js`: Function to verify admin credentials and generate JWT tokens.
- **`middleware/`**: Functions that run before controllers.
  - `authMiddleware.js`: Verifies the JWT token to protect admin routes from unauthorized access.
- **`.env`**: Stores secret environment variables (like passwords, JWT secret, and database URI) so they are kept out of the source code.

---

## 🔒 Security Notes
- Admin routes are protected using a **JSON Web Token (JWT)**.
- Input fields on the contact form are properly validated.
- Rate limiting is enabled on the `/api/messages` endpoint (max 10 requests / 15 minutes per IP address) to stop automated spam.