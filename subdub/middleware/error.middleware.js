const errorMiddleware = (err, req, res, next) => {
    console.log("New Error");
    try {
        let error = { ...err };

        error.message = err.message;

        // Mongoose Bad OjectId
        if (err.name === 'CastError') {
            const message = "Resource not found";
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose Duplicate Key
        if (err.code === 11000) {
            const message = 'Duplicate feild value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose Validation Error
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        console.log("Error Acrred -> ", error);
        res.status(error.statusCode || 500).json({
            success: false, error: error.message || 'Server Error'
        });

    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;