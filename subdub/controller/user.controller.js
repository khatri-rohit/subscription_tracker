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
            success: true, data: user
        });
    } catch (error) {
        next(error);
    }
}