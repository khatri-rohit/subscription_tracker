import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { NODE_ENV, PORT } from './config/env.js';
import passport from 'passport';

import userRouter from './routes/user.routes.js';
import authRoute from './routes/auth.routes.js';
import subcriptionRouter from './routes/subscription.routes.js';
import workflowRouter from './routes/workflow.routes.js';

import connectToDB from './database/mongodb.js';

import errorMiddleware from './middleware/error.middleware.js';
// eslint-disable-next-line no-unused-vars
import arcjetMiddleware from './middleware/arcjet.middleware.js';
import session from 'express-session';

import configPassport from './config/passport.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import googleAuth from './routes/googleAuth.routes.js';


const app = express();

// Get current file path (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-unused-vars
const __dirname = dirname(__filename);


app.use("/uploads", express.static('uploads'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(arcjetMiddleware);

app.use(cors({
    origin: ['https://subtracking.vercel.app', 'http://localhost:5173'],
    credentials: true,
}));

// Sessions
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());
configPassport(passport); // Configure passport AFTER initializing it

app.use('/auth', googleAuth);

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subcriptionRouter);
app.use('/api/v1/workflows', workflowRouter);
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send("Welcome to Subscription Tracker API");
});

app.listen(PORT, async () => {
    console.log(`API is running on http://localhost:${PORT}`);
    await connectToDB();
});

export default app;