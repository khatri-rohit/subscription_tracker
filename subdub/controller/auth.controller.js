import mongoose from "mongoose"
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPRIES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession(); // start a session for ATOMIC OPERATION
    session.startTransaction(); // start a transaction for ATOMIC OPERATION

    try {
        // Logic to create a a new user
        const { name, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });
        // console.log(existingUser);
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log(salt + " => " + hashedPassword);

        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });


        await session.commitTransaction(); // commit the transaction if no error occurs
        session.endSession(); // end the session

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers[0],
            }
        });
    } catch (error) {
        await session.abortTransaction(); // abort the transaction if error occurs
        session.endSession(); // end the session
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isPassowrdValid = await bcrypt.compare(password, user.password); // compare the password by converting password to hash and comparing it with the hash in the database

        if (!isPassowrdValid) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });

        res.status(200).json({
            success: true,
            message: 'User Sign In in successfully',
            data: {
                token,
                user,
            }
        });

    } catch (error) {
        next(error);

    }
}

export const signOut = async (req, res, next) => {

}