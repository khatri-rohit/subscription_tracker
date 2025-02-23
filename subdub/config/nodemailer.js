import nodemailer from 'nodemailer';
import { EMAIL_PASS } from './env.js';

export const accountEmail = 'rohitkhatri111112@gmail.com';

const transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountEmail,
        pass: EMAIL_PASS
    }
});

export default transpoter;