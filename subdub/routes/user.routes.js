import { Router } from 'express';

import {
    getUsers,
    getUser,
    updateUser,
    updatePassword,
    deleteUser
} from '../controller/user.controller.js';
import authorize from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.post('/', authorize, getUser);

userRouter.put('/:id', authorize, updateUser);

userRouter.put('/isagi/:id', authorize, updatePassword);

userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;