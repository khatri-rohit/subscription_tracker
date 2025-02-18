import express from "express";

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRoute from './routes/auth.routes.js';
import subcriptionRouter from './routes/subscription.routes.js';

const app = express();

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subcriptionRouter);

app.get('/', (req, res) => {
    res.send("Welcome to Subscription Tracker API");
});

app.listen(PORT, () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
});

export default app;