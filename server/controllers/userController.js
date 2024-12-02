const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users) {
            res.status(404);
            throw new Error('No users found');
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Create a new user (Registration)
const createUser = async (req, res, next) => {
    try {
        const { email, password, ...rest } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400);
            throw new Error('Email already registered');
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user with hashed password
        const user = await User.create({
            ...rest,
            email, // Make sure email is included
            password: hashedPassword,
        });

        if (!user) {
            res.status(400);
            throw new Error('User not created');
        }

        // Exclude password from response
        const { password: userPassword, ...otherDetails } = user._doc;

        return res.status(201).json(otherDetails);
    } catch (error) {
        next(error);
    }
};

// User login
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400);
            throw new Error('User not found, please register');
        }

        // Compare password
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            res.status(400);
            throw new Error('Incorrect password');
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set cookie with token
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000 // 1 hour
        });

        // Send user details without password
        const { password: userPassword, ...rest } = user._doc;
        return res.status(200).json({ ...rest, token });
    } catch (error) {
        next(error);
    }
};

// User logout
const logoutUser = async (req, res, next) => {
    res.cookie('jwt', '', { expiresIn: '-1' }); // Expire the cookie immediately
    return res.json({ message: 'You have been logged out' });
};

module.exports = {
    getUsers,
    createUser,
    loginUser,
    logoutUser
};
