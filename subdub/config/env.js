/* eslint-disable no-undef */
import { config } from "dotenv"

config(
    { path: `.env.${process.env.NODE_ENV || 'development'}.local` }
);

export const {
    PORT,
    SERVER_URL,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPRIES_IN,
    ARCJET_ENV,
    ARCJET_KEY,
    QSTASH_URL,
    QSTASH_TOKEN,
    QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY,
    EMAIL_PASS,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    X_CLIENT_ID,
    X_CLIENT_SECRET,
    SESSION_SECRET,
    CLIENT_URL,
    SERVER_URI
} = process.env;