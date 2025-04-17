import express from 'express';
import passport from 'passport';
import { setAuthCookie } from '../utilits/auth-utils.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPRIES_IN } from '../config/env.js';

const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Get user from passport auth
        const user = req.user;

        // Generate a JWT token if not already provided in auth info
        const token = req.authInfo?.token ||
            jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });

        // Set the auth cookie using the same method as regular sign-in
        setAuthCookie(res, token);

        // Log the successful authentication
        console.log("Google Auth successful, JWT cookie set");

        // Successful authentication - redirect to frontend
        res.redirect("http://localhost:5173" + '/dashboard');
    }
);

// @desc    Get current user
// @route   GET /auth/user
router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            success: true,
            user: req.user
        });
    } else {
        res.json({
            success: false,
            message: 'Not authenticated'
        });
    }
});

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }

        res.clearCookie('token', {
            httpOnly: false,
            secure: true,
            sameSite: 'none'
        });
        res.redirect("http://localhost:5173");
    });
});

export default router;