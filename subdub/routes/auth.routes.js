import { Router } from 'express';

import { signUp, signIn, signOut, googleAuth } from '../controller/auth.controller.js';
import authorize from '../middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post('/google', googleAuth)

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', authorize, signOut);

export default authRouter;