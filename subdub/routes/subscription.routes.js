import { Router } from 'express';
import {
    createSubscription,
    getUserSubscriptions,
    updateSubscription,
    deleteSubscription,
    getSubscriptions
} from '../controller/subscription.controller.js';
import authorize from '../middleware/auth.middleware.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', getSubscriptions);

subscriptionRouter.get('/:id', (req, res) => {
    res.send("Subscription");
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', authorize, updateSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ title: "Cancel Subscription" });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ title: "Get Upcoming Renewals Subscription" });
});

export default subscriptionRouter;