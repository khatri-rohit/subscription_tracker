import { Router } from 'express';
import {
    createSubscription,
    getUserSubscriptions,
    updateSubscription,
    deleteSubscription,
    getSubscriptions,
    cancelSubscription,
    renewalSubscription
} from '../controller/subscription.controller.js';
import authorize from '../middleware/auth.middleware.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', getSubscriptions);

// subscriptionRouter.get('/:id', (req, res) => {
//     res.send("Subscription");
// });

subscriptionRouter.get('/upcoming_renewals', authorize, renewalSubscription);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', authorize, updateSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

export default subscriptionRouter;