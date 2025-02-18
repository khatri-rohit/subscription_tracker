import { Router } from 'express';
import { readFile } from 'fs';

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
    res.send({ title: "Sign Up" });
});

authRouter.post('/sign-in', (req, res) => {
    res.send({ title: "Sign In" });
});

authRouter.post('/sign-out', (req, res) => {
    res.send({ title: "Sign Out" });
});

export default authRouter;