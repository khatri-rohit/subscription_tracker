import { JWT_SECRET } from '../config/env.js';
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { privateDecrypt } from 'crypto';
import fs from 'fs';

const publicKey = fs.readFileSync('./private.pem', 'utf8');

const authorize = async (req, res, next) => {
    try {
        // First check if user is already authenticated via Passport session
        if (req.isAuthenticated() && req.user) {
            // User is authenticated via Passport
            return next();
        }

        // Otherwise, check for JWT token in cookies
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        try {
            // Decrypt the token
            const decryptedToken = privateDecrypt(publicKey, Buffer.from(token, 'base64')).toString('utf8');

            // Verify the JWT token
            const decoded = jwt.verify(decryptedToken, JWT_SECRET);

            // Find the user by ID
            const user = await User.findById(decoded.userId).select('-password');

            if (!user) {
                return res.status(401).json({ message: "Unauthorized - User not found" });
            }

            // Set user in request
            req.user = user;
            next();
        } catch (tokenError) {
            return res.status(401).json({
                message: "Unauthorized - Invalid token",
                error: tokenError.message
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error during authentication",
            error: error.message
        });
    }
};

export default authorize;