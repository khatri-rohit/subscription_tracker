import { Router } from 'express'
import { createSubscription, getUserSubscriptions } from '../controller/subscription.controller.js';
import authorize from '../middleware/auth.middleware.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({ title: "Get All Subscriptions" });
});

subscriptionRouter.get('/:id', authorize, getUserSubscriptions);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
    res.send({ title: "Update Subscription" });
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({ title: "Delete Subscription" });
});

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({ title: "Get All User Subscriptions" });
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ title: "Cancel Subscription" });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ title: "Get Upcoming Renewals Subscription" });
});

export default subscriptionRouter;