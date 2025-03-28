import dayjs from 'dayjs';
import { SERVER_URL } from '../config/env.js';
import { workflowClient } from '../config/upstash.js';
import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        console.log(subscription);

        // await workflowClient.trigger({
        //     url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        //     body: {
        //         subscriptionId: subscription.id,
        //     },
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     retries: 0,
        // });

        return res.status(200).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("Forbidden for unauthorized access");
            error.status = 403;
            throw error;
        }

        const subscription = await Subscription.find({ user: req.params.id });

        return res.status(200).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

export const getSubscriptions = async (req, res, next) => {
    try {
        const subscription = await Subscription.find();
        return res.status(200).json({
            success: true,
            data: subscription
        });
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
            const error = new Error("Unauthorized access");
            error.status = 403;
            throw error;
        }

        await Subscription.findByIdAndUpdate(req.params.id, { ...req.body }); // destructure all the updated value and pass into the query

        return res.status(200).json({
            success: true,
            message: "Subscription Updated",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error("Not Found");
            error.status = 404;
            throw error;
        }

        if (!req.user._id.equals(subscription.user._id)) {
            const error = new Error("Unauthorized Account Access");
            error.status = 401;
            throw error;
        }

        await Subscription.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Subscription deleted"
        });
    } catch (error) {
        next(error);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error("Not Found");
            error.status = 404;
            throw error;
        }

        if (!req.user._id.equals(subscription.user._id)) {
            const error = new Error("Unauthorized Account Access");
            error.status = 401;
            throw error;
        }

        await Subscription.findByIdAndUpdate(req.params.id, { status: "cancelled" });

        return res.status(200).json({
            success: true,
            message: "Subscription has been cancelled"
        });
    } catch (error) {
        next(error);
    }
};

export const renewalSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.find({ user: req.user.id });
        if (!subscription) {
            const error = new Error("Not Subscription Created by User");
            error.status = 404;
            throw error;
        }

        const renewalSubscriptions = subscription.filter((subs) => dayjs().isBefore(subs.renewalDate)); // Only filer the data for upcomming renweal dates and exclude expired and cancelled data


        return res.status(200).json({
            success: true,
            data: renewalSubscriptions
        });
    } catch (error) {
        next(error);
    }
};