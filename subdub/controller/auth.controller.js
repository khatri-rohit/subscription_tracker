/* eslint-disable no-unused-vars */
import mongoose from "mongoose"
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPRIES_IN, JWT_SECRET, NODE_ENV } from "../config/env.js";
import { userCreated } from "../utils/send-email.js";
import { publicEncrypt } from 'crypto'
import { promises as fs } from 'fs';

// const privateKey = fs.readFileSync('./private.pem', 'utf8');

let privateKey;
async function loadKeys() {
    try {
        privateKey = await fs.readFile('./private.pem', 'utf8');
    } catch (error) {
        console.log("Failed to Load Private Key");
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}
loadKeys();

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession(); // start a session for ATOMIC OPERATION
    session.startTransaction(); // start a transaction for ATOMIC OPERATION

    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log(salt + " => " + hashedPassword);

        const newUsers = await User.create([{ firstName, lastName, email, password: hashedPassword }], { session });

        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });

        setAuthCookie(res, token)
        // console.log(encryptToken);

        await session.commitTransaction(); // commit the transaction if no error occurs
        session.endSession(); // end the session

        userCreated({ to: newUsers[0].email, user: newUsers[0] })

        console.log("User Created");
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            // data: {
            //     token,
            //     user: newUsers[0]
            // }
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
            const error = new Error("Email doesn't exixts");
            error.statusCode = 404;
            throw error;
        }

        const isPassowrdValid = await bcrypt.compare(password, user.password); // compare the password by converting password to hash and comparing it with the hash in the database

        if (!isPassowrdValid) {
            const error = new Error('InCorrect Password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });

        setAuthCookie(res, token);

        res.status(200).json({
            success: true,
            message: 'User Sign In in successfully',
            // data: {
            //     user
            // }
        });

    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('token')
        res.status(200).json({
            success: true,
            message: 'User logged out successfully',
        });
    } catch (error) {
        next(error);
    }
}

function setAuthCookie(res, token) {
    // eslint-disable-next-line no-undef
    const encryptToken = publicEncrypt(privateKey, Buffer.from(token)).toString('base64');

    console.log(NODE_ENV === 'production');
    console.log(encryptToken);
    
    res.cookie('token', encryptToken, {
        httpOnly: true,
        secure: true,  // Must be true when sameSite is 'none'
        sameSite: 'none',  // Make sure this is a strict
        domain: '.subtracking.vercel.app/',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // res.cookie('token', encryptToken, {
    //     httpOnly: NODE_ENV === 'production',
    //     secure: NODE_ENV === 'production',  // Must be true when sameSite is 'none'
    //     sameSite: NODE_ENV === 'production' ? 'none' : 'strict',  // Make sure this is a strict
    //     maxAge: 7 * 24 * 60 * 60 * 1000
    // });
}