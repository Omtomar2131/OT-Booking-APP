const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/authMiddleware');
const { errorHandler } = require('./middleware/errorHandler');

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Setup CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://ot-booking-app.onrender.com'], // Add local and deployed frontend URLs
  credentials: true, // Allow cookies with requests
}));

// Middlewares
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies

// Debugging Middleware (optional, for logs)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/auth', auth); // Authentication middleware
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// Error Handler
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
