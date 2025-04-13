import arcjet, { shield, detectBot, tokenBucket, fixedWindow } from '@arcjet/node';
import { ARCJET_KEY } from '../config/env.js';

const aj = arcjet({
    key: ARCJET_KEY,
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ],
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 20,
        }),
        fixedWindow({
            mode: "LIVE",
            window: "20s",
            max: 100,
        }),
    ],
});

export default aj;