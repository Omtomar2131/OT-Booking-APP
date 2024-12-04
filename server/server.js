const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path'); // For serving static files
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
const corsOptions = {
    origin: '*', // Allow all origins
    credentials: true, // Allow cookies with requests (if needed)
  };
  
  app.use(cors(corsOptions));
  

// Middlewares
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies

// Debugging Middleware (optional, for logs)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/auth', auth); // Apply authentication middleware for specific routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build'))); // Serve static files from React build folder
  
  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, '.', 'build', 'index.html')) // Catch all other routes and serve the React app
  );
}

// Error Handler
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
