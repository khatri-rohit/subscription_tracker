import { JWT_SECRET } from '../config/env.js';
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
    try {
        // // For authentication through header
        // let token;
        // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //     token = req.headers.authorization.split(' ')[1];
        // }
        const { token } = req.cookies
        // console.log(token + '\n');
        if (!token) return res.status.json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) return res.status(401).json({ message: "Unauthorized" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized",
            error: error.message
        });
    }
};

export default authorize;