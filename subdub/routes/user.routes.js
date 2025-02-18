import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send({ title: "Get All users" });
});

userRouter.get('/:id', (req, res) => {
    res.send({ title: "Get User Details" });
});

userRouter.post('/', (req, res) => {
    res.send({ title: "Create New User" });
});

userRouter.put('/:id', (req, res) => {
    res.send({ title: "Update User" });
});

userRouter.delete('/:id', (req, res) => {
    res.send({ title: "Delete User" });
});

export default userRouter;