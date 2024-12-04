const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const cors = require("cors");
const { auth, verifyAdmin } = require("./middleware/authMiddleware");
const app = express();

// setup middleware

app.use(cookieParser());
app.use(express.json());

// connect to database
connectDB();

// setup routes

// remove this later
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  // define paths
  const publicPath = path.join(__dirname,".", "./build");
  const filePath = path.resolve(__dirname, ".", "build", "index.html");

  app.use(express.static(publicPath));

  app.get("*", (req, res) => {
    // const fileUrl = path.resolve(__dirname, "server", "build");
    return res.sendFile(filePath);
  });
}

// error handler
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));