import { JWT_SECRET } from '../config/env.js';
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { privateDecrypt } from 'crypto';
import fs from 'fs';

const publicKey = fs.readFileSync('./private.pem', 'utf8');

const authorize = async (req, res, next) => {
    try {
        // // For authentication through header
        // let token;
        // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //     token = req.headers.authorization.split(' ')[1];
        // }
        // console.log({ ...req.cookies });
        const { isagiKun } = req.cookies
        console.log({ ...req.cookies });

        // eslint-disable-next-line no-undef
        const decryptedToken = privateDecrypt(publicKey, Buffer.from(isagiKun, 'base64')).toString('utf8');
        // console.log(decryptedToken);
        // console.log("Auth Middleware");

        if (!decryptedToken) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(decryptedToken, JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) return res.status(401).json({ message: "Unauthorized" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized",
            error: error
        });
    }
};

export default authorize;