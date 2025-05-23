import { Router } from 'express';
import { signUp, signIn, signOut } from '../controller/auth.controller.js';
import authorize from '../middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', authorize, signOut);

export default authRouter;