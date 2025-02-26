import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true, data: users
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // exclude password from the response

        if (!user) {
            const error = new Error("user Not Found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        if (req.params.id !== req.user.id) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }

        console.log("Updation");

        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(req.params.id, { name, email }); // exclude password from the response

        if (!user) {
            const error = new Error("User Not Found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        if (req.params.id !== req.user.id) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            const error = new Error("No user found");
            error.statusCode = 404;
            throw error;
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted"
        });
    } catch (error) {
        next(error);
    }
};