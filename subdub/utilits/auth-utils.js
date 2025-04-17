/* eslint-disable no-unused-vars */
import { publicEncrypt } from 'crypto';
import { promises as fs } from 'fs';
import { NODE_ENV } from "../config/env.js";

let privateKey;

async function loadKeys() {
    try {
        privateKey = await fs.readFile('./private.pem', 'utf8');
    } catch (error) {
        console.log("Failed to Load Private Key");
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}

// Load keys when the module is imported
loadKeys();

export function setAuthCookie(res, token) {
    // Encrypt the token
    // eslint-disable-next-line no-undef
    const encryptToken = publicEncrypt(privateKey, Buffer.from(token)).toString('base64');

    // Set the cookie
    res.cookie('token', encryptToken, {
        httpOnly: NODE_ENV === 'production',
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
}