import express from 'express';
import passport from 'passport';
import { setAuthCookie } from '../utilits/auth-utils.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPRIES_IN } from '../config/env.js';

const router = express.Router();

// GitHub authentication routes
// @desc    Auth with GitHub
// @route   GET /auth/github
router.get(
    '/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

// @desc    GitHub auth callback
// @route   GET /auth/github/callback
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        // Get user from passport auth
        const user = req.user;

        // Generate a JWT token if not already provided in auth info
        const token = req.authInfo?.token ||
            jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });

        // Set the auth cookie using the same method as regular sign-in
        setAuthCookie(res, token);

        // Log the successful authentication
        console.log("GitHub Auth successful, JWT cookie set");

        // Successful authentication - redirect to frontend
        res.redirect("http://localhost:5173" + '/dashboard');
    }
);

export default router;