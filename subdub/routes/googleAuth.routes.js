import express from 'express';
import passport from 'passport';

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
        // Successful authentication
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