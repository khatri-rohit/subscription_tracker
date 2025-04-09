import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRoute from './routes/auth.routes.js';
import subcriptionRouter from './routes/subscription.routes.js';
import workflowRouter from './routes/workflow.routes.js';

import connectToDB from './database/mongodb.js';

import errorMiddleware from './middleware/error.middleware.js';
// eslint-disable-next-line no-unused-vars
import arcjetMiddleware from './middleware/arcjet.middleware.js';

const app = express();

app.use("/uploads", express.static('uploads'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(arcjetMiddleware);
// app.use(cors()); // For Crosss origin access (basiclly to access backend)
// In your Express app setup
app.use(cors({
    origin: ['https://subtracking.vercel.app', 'http://localhost:5173'], // Your frontend URL
    credentials: true,
}));
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