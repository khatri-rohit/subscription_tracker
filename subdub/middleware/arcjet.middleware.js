import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 5 });
        // console.log(decision);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                console.log("Rate Limit Exceeded");
                return res.status(429).json({ error: "Rate Limit Exceeded" });
            }
            if (decision.reason.isBot()) {
                console.log("Bot Detected");
                return res.status(403).json({ error: "Bot Detected" });
            }

            console.log("Access Deined");
            return res.status(403).json({ error: "Access Denied" });
        }
        next();
    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error);
    }
};

export default arcjetMiddleware;