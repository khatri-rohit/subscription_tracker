import nodemailer from 'nodemailer';
import { EMAIL_PASS } from './env.js';

export const accountEmail = 'johnapitest01@gmail.com';

const transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountEmail,
        pass: EMAIL_PASS
    }
});

export default transpoter;