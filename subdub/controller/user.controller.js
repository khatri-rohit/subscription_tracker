import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

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
        // const user = await User.findById(req.params.id).select('-password'); // exclude password from the response
        const user = req.user;
        // console.log(user);

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


        const body = { ...req.body };

        const user = await User.findByIdAndUpdate(req.params.id, { ...body }).select('-password');

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

export const updateImage = async (req, res, next) => {
    try {
        console.log(req.file.path);

        if (req.params.id !== req.user.id) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }

        const user = await User.findByIdAndUpdate(req.params.id, {
            profileImage: req.file.path
        }).select('-password');

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

export const updatePassword = async (req, res, next) => {
    try {
        if (req.params.id !== req.user.id) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }

        const user = await User.findById(req.params.id); // exclude password from the response
        if (!user) {
            const error = new Error("User Not Found");
            error.statusCode = 404;
            throw error;
        }

        const { password, confirmPassword } = req.body;

        const isPassowrdValid = await bcrypt.compare(password, user.password);
        if (!isPassowrdValid) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(confirmPassword, salt);
        await User.findByIdAndUpdate(req.params.id, { password: hashedPassword }).select('-password');

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

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

        await User.findByIdAndDelete(req.params.id).select('-password');

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};