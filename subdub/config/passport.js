import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
// import { Strategy as TwitterStrategy } from 'passport-twitter';
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    JWT_EXPRIES_IN,
    JWT_SECRET,
    // X_CLIENT_ID,
    // X_CLIENT_SECRET
} from './env.js';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { userCreated } from '../utils/send-email.js';

export default function configPassport(passport) {
    // Google Strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                // // console.log(profile);
                // eslint-disable-next-line no-unused-vars
                const newUser = {
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: "Thrid Party Auth",
                    profileImage: profile.photos[0].value,
                };
                // console.log(newUser);

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
                            password: "Thrid Party Auth",
                            profileImage: profile.photos[0].value,
                            provider: 'google'
                        }], { session });

                        // console.log("Account Created");

                        // Set user to newly created user
                        user = newUsers[0];

                        // Send welcome email
                        userCreated({ to: user.email, user: user.firstName });

                        await session.commitTransaction();
                        session.endSession();
                    }

                    // Generate JWT token for the user (for both new and existing users)
                    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });

                    // Attach token to req.authToken so it can be accessed in the callback route
                    done(null, user, { token });

                } catch (err) {
                    console.error(err);

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
                callbackURL: '/auth/github/callback',
                scope: ['user:email'] // Request email access
            },
            async (accessToken, refreshToken, profile, done) => {
                // console.log(profile);

                const session = await mongoose.startSession();
                session.startTransaction();

                try {
                    // Extract profile information
                    const profileData = {
                        githubId: profile.id,
                        username: profile.username,
                        displayName: profile.displayName || profile.username,
                        // GitHub might not provide email in profile directly, it could be in emails array
                        email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
                        profileImage: profile.photos && profile.photos[0] ? profile.photos[0].value : null
                    };

                    // console.log("GitHub profile data:", profileData);

                    // Find user by GitHub ID or email
                    let user = null;

                    if (profileData.email) {
                        user = await User.findOne({ email: profileData.email });
                    }

                    if (!user) {
                        // If we have no email or user doesn't exist, check by githubId
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
                            password: "Thrid Party Auth",
                            profileImage: profileData.profileImage,
                            provider: 'github'
                        }], { session });

                        // console.log("GitHub Account Created");

                        user = newUsers[0];

                        // Send welcome email if we have an email
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
                        // User exists, no update needed
                        await session.commitTransaction();
                        session.endSession();
                    }

                    if (!user) {
                        // This should only happen if GitHub didn't provide an email
                        // and this is the first login attempt
                        return done(null, false, { message: 'No email provided by GitHub' });
                    }

                    // Generate JWT token for the user
                    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });

                    // Return user with token
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

    // passport.use(
    //     new TwitterStrategy(
    //         {
    //             consumerKey: X_CLIENT_ID,
    //             consumerSecret: X_CLIENT_SECRET,
    //             callbackURL: '/auth/twitter/callback',
    //             includeEmail: true  // Request email if available
    //         },
    //         async (token, tokenSecret, profile, done) => {
    //             // console.log("Twitter profile:", profile);

    //             const session = await mongoose.startSession();
    //             session.startTransaction();

    //             try {
    //                 // Extract profile information
    //                 const profileData = {
    //                     twitterId: profile.id,
    //                     username: profile.username,
    //                     displayName: profile.displayName || profile.username,
    //                     // Twitter might provide email if includeEmail is true and user has allowed it
    //                     email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
    //                     profileImage: profile.photos && profile.photos[0] ? profile.photos[0].value : null
    //                 };

    //                 // console.log("Twitter profile data:", profileData);

    //                 // Find user by Twitter ID or email
    //                 let user = null;

    //                 if (profileData.email) {
    //                     user = await User.findOne({ email: profileData.email });
    //                 }

    //                 if (!user) {
    //                     // If we have no email or user doesn't exist, check by twitterId
    //                     user = await User.findOne({ twitterId: profileData.twitterId });
    //                 }

    //                 if (!user && profileData.email) {
    //                     // Create new user if not found and we have an email
    //                     const nameParts = profileData.displayName ? profileData.displayName.split(' ') : [profileData.username, ''];

    //                     const newUsers = await User.create([{
    //                         firstName: nameParts[0],
    //                         lastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : '',
    //                         email: profileData.email,
    //                         twitterId: profileData.twitterId,
    //                         username: profileData.username,
    //                         password: "Thrid Party Auth",
    //                         profileImage: profileData.profileImage,
    //                         provider: 'twitter'
    //                     }], { session });

    //                     // console.log("Twitter Account Created");

    //                     user = newUsers[0];

    //                     // Send welcome email if we have an email
    //                     if (user.email) {
    //                         userCreated({ to: user.email, user: user.firstName });
    //                     }

    //                     await session.commitTransaction();
    //                     session.endSession();
    //                 } else if (user && !user.twitterId) {
    //                     // Link Twitter to existing user account
    //                     user.twitterId = profileData.twitterId;
    //                     user.provider = user.provider || 'twitter';
    //                     if (!user.profileImage && profileData.profileImage) {
    //                         user.profileImage = profileData.profileImage;
    //                     }
    //                     await user.save({ session });

    //                     await session.commitTransaction();
    //                     session.endSession();
    //                 } else {
    //                     // User exists, no update needed
    //                     await session.commitTransaction();
    //                     session.endSession();
    //                 }

    //                 if (!user) {
    //                     // This should only happen if Twitter didn't provide an email
    //                     // and this is the first login attempt
    //                     return done(null, false, { message: 'No email provided by Twitter' });
    //                 }

    //                 // Generate JWT token for the user
    //                 const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });

    //                 // Return user with token
    //                 done(null, user, { token });
    //             } catch (err) {
    //                 console.error("Twitter auth error:", err);

    //                 await session.abortTransaction();
    //                 session.endSession();

    //                 done(err, null);
    //             }
    //         }
    //     )
    // );

    passport.serializeUser((user, done) => {
        // console.log("serializeUser\n", user);
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            // console.log("deserializeUser\n", id);
            const user = await User.findById(id);

            // console.log(user);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}