import { JWT_SECRET } from '../config/env.js';
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        console.log(req.headers);

        if (!token) return res.status.json({ message: "Unauthorized" });
        // console.log("2");
        // console.log(token);

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        // console.log("3");

        const user = await User.findById(decoded.userId);
        // console.log("4");

        if (!user) return res.status(401).json({ message: "Unauthorized" });
        // console.log("5");

        req.user = user;
        console.log(user);

        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized",
            error: error.message
        });
    }
};

export default authorize;