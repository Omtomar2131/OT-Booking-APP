const errorHandler = (err, req, res, next) => {
    // If status code is not set, default to 500 for errors
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);

    // Return the error response with message and optional stack in development mode
    return res.json({
        message: err.message,
        // Include stack trace only in development environment
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

module.exports = {
    errorHandler,
}
