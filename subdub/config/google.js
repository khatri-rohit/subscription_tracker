import { google } from 'googleapis'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './env.js'

export const oAuthClient = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage'
)