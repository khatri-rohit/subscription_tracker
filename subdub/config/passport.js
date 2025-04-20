// Modified passport.js for production
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    JWT_EXPRIES_IN,
    JWT_SECRET,
    NODE_ENV,
    SERVER_URL,
} from './env.js';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { userCreated } from '../utils/send-email.js';

// Helper to generate the correct callback URL based on environment
const getCallbackURL = (provider) => {
    const baseURL = NODE_ENV === 'production'
        ? SERVER_URL
        : 'http://localhost:5500';

    return `${baseURL}/auth/${provider}/callback`;
};

export default function configPassport(passport) {
    // Google Strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: getCallbackURL('google'),
                proxy: true // Important for production behind a proxy
            },
            async (accessToken, refreshToken, profile, done) => {
                const session = await mongoose.startSession();
                session.startTransaction();

                try {
                    let user = await User.findOne({ email: profile.emails[0].value });

                    if (!user) {
                        // Create new user if not exists
                        const newUsers = await User.create([{
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName || " ",
                            email: profile.emails[0].value,
                            password: "Third Party Auth", // Fixed typo in "Third"
                            profileImage: profile.photos[0].value,
                            provider: 'google'
                        }], { session });

                        user = newUsers[0];
                        userCreated({ to: user.email, user: user.firstName });

                        await session.commitTransaction();
                        session.endSession();
                    }

                    // Generate JWT token for the user
                    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });
                    done(null, user, { token });

                } catch (err) {
                    console.error("Google auth error:", err);
                    await session.abortTransaction();
                    session.endSession();
                    done(err, null);
                }
            }
        )
    );

    // GitHub Strategy
    passport.use(
        new GitHubStrategy(
            {
                clientID: GITHUB_CLIENT_ID,
                clientSecret: GITHUB_CLIENT_SECRET,
                callbackURL: getCallbackURL('github'),
                scope: ['user:email'],
                proxy: true // Important for production behind a proxy
            },
            async (accessToken, refreshToken, profile, done) => {
                const session = await mongoose.startSession();
                session.startTransaction();

                try {
                    // Extract profile information
                    const profileData = {
                        githubId: profile.id,
                        username: profile.username,
                        displayName: profile.displayName || profile.username,
                        email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
                        profileImage: profile.photos && profile.photos[0] ? profile.photos[0].value : null
                    };

                    // Find user by GitHub ID or email
                    let user = null;

                    if (profileData.email) {
                        user = await User.findOne({ email: profileData.email });
                    }

                    if (!user) {
                        user = await User.findOne({ githubId: profileData.githubId });
                    }

                    if (!user && profileData.email) {
                        // Create new user if not found and we have an email
                        const nameParts = profileData.displayName ? profileData.displayName.split(' ') : [profileData.username, ''];

                        const newUsers = await User.create([{
                            firstName: nameParts[0],
                            lastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : '',
                            email: profileData.email,
                            githubId: profileData.githubId,
                            username: profileData.username,
                            password: "Third Party Auth", // Fixed typo
                            profileImage: profileData.profileImage,
                            provider: 'github'
                        }], { session });

                        user = newUsers[0];

                        if (user.email) {
                            userCreated({ to: user.email, user: user.firstName });
                        }

                        await session.commitTransaction();
                        session.endSession();
                    } else if (user && !user.githubId) {
                        // Link GitHub to existing user account
                        user.githubId = profileData.githubId;
                        user.provider = user.provider || 'github';
                        if (!user.profileImage && profileData.profileImage) {
                            user.profileImage = profileData.profileImage;
                        }
                        await user.save({ session });

                        await session.commitTransaction();
                        session.endSession();
                    } else {
                        await session.commitTransaction();
                        session.endSession();
                    }

                    if (!user) {
                        return done(null, false, { message: 'No email provided by GitHub' });
                    }

                    // Generate JWT token for the user
                    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });
                    done(null, user, { token });
                } catch (err) {
                    console.error("GitHub auth error:", err);
                    await session.abortTransaction();
                    session.endSession();
                    done(err, null);
                }
            }
        )
    );

    // Serialization and Deserialization
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}