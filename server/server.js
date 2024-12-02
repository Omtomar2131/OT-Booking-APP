const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
const roomRoutes = require('./routes/roomRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/authMiddleware');

// Connect to the database
connectDB();

const port = process.env.PORT || 5000;

// Setup middlewares
app.use(cookieParser()); // <-- Fixed here
app.use(express.json());

// Setup routes
app.use("/auth", auth); // This is usually for login or JWT validation; check if it's needed here
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler); // Custom error handling middleware

// Start server
app.listen(port, () => console.log(`Listening on port ${port}`));
