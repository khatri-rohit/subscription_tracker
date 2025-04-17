import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User from '../models/User.js';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_EXPRIES_IN, JWT_SECRET } from './env.js';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { setAuthCookie } from '../utilits/auth-utils.js';
import { userCreated } from '../utils/send-email.js';

export default function configPassport(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                // console.log(profile);

                const newUser = {
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: "Thrid Party Auth",
                    profileImage: profile.photos[0].value,
                };
                console.log(newUser);

                const session = await mongoose.startSession();
                session.startTransaction();

                try {
                    const user = await User.findOne({ email: profile.emails[0].value });

                    if (!user) {

                        const newUsers = await User.create([{
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName || " ",
                            email: profile.emails[0].value,
                            password: "Thrid Party Auth",
                            profileImage: profile.photos[0].value,
                        }], { session });

                        console.log(newUsers);
                        // const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPRIES_IN });

                        // setAuthCookie(res, token);
                        userCreated({ to: newUsers[0].email, user: newUsers[0].firstName })

                        console.log("Account Created");

                        await session.commitTransaction();
                        session.endSession();
                        done(null, user);

                    } else {
                        // Create new user

                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);

                    await session.abortTransaction();
                    session.endSession();

                    done(err, null);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        console.log("serializeUser\n", user);
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            console.log("deserializeUser\n", id);
            const user = await User.findById(id);

            console.log(user);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}


