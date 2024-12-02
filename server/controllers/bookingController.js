const Booking = require('../models/bookingModel');

// Get all bookings
const getBookings = async (req, res, next) => {
    try {
      const bookings = await Booking.find().populate('roomId');
      if (!bookings || bookings.length === 0) {
        return res.status(200).json([]);
      }
      return res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error.message);  // Log the error here
      next(error);  // Pass the error to the next middleware (e.g., error handler)
    }
  };
  

// Create a new booking
const createBooking = async (req, res, next) => {
    try {
        const booking = await Booking.create(req.body);
        return res.status(201).json(booking); // Return created booking with status 201
    } catch (err) {
        console.error('Error creating booking:', err.message);  // Log the error to server logs
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: err.errors }); // Handle validation errors
        }
        // If it's not a validation error, pass it to the global error handler
        next(err);
    }
};


// Update a booking
const updateBooking = async (req, res, next) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedBooking) {
            res.status(404);
            throw new Error('Cannot update booking; booking not found');
        }
        return res.status(200).json(updatedBooking); // Removed redundant query
    } catch (error) {
        next(error);
    }
};

// Delete a booking
const deleteBooking = async (req, res, next) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            res.status(404);
            throw new Error('Cannot delete; booking not found');
        }
        return res.status(200).json({ message: 'Booking deleted successfully', id: req.params.id });
    } catch (error) {
        next(error);
    }
};

// Get a single booking by ID
const getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate("roomId");
        if (!booking) {
            res.status(404);
            throw new Error('Booking not found');
        }
        return res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    getBooking
};
