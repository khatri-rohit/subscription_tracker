import { SERVER_URL } from '../config/env.js';
import { workflowClient } from '../config/upstash.js';
import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        // console.log(subscription);

        await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        });

        res.status(201).json({ success: true, data: subscription })
    } catch (error) {
        next(error);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("You are not the Owner of the Account");
            error.status = 401;
            throw error;
        }

        const subscription = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const getSubscriptions = async (req, res, next) => {
    try {
        const subscription = await Subscription.find();
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error("Not Found");
            error.status = 404;
            throw error;
        }

        if (!req.user._id.equals(subscription.user._id)) {
            const error = new Error("You are not the Owner of the Account");
            error.status = 401;
            throw error;
        }

        const { name, price, currency, frequency, category, paymentMethod, status, startDate, renewalDate } = req.body;

        const newSubs = await Subscription.findByIdAndUpdate(req.params.id, { name, price, currency, frequency, category, paymentMethod, status, startDate, renewalDate });

        res.status(200).json({ success: true, message: "Subscription Updated", data: newSubs });
    } catch (error) {
        next(error);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error("Not Found");
            error.status = 404;
            throw error;
        }

        if (!req.user._id.equals(subscription.user._id)) {
            const error = new Error("You are not the Owner of the Account");
            error.status = 401;
            throw error;
        }

        await Subscription.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted"
        });
    } catch (error) {
        next(error);
    }
}