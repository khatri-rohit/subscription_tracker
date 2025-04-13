import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 5 });
        // console.log(decision);

        if (decision.reason.isError()) {
            console.warn("Arcjet error", decision.reason.message);
            res.writeHead(503, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Service unavailable" }));
            return;
        }
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                console.log("Rate Limit Exceeded");
                const resetTime = new Date(decision.reason.resetTime);
                console.log("Rate limit reset time (IST):", resetTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
                console.log(decision);
                return res.status(429).json({ error: "Rate Limit Exceeded" });
            }
            if (decision.reason.isBot()) {
                console.log("detected + allowed bots", decision.reason.allowed);
                console.log("detected + denied bots", decision.reason.denied);

                if (decision.reason.isSpoofed()) {
                    console.log("spoofed bot", decision.reason.spoofed);
                }

                if (decision.reason.isVerified()) {
                    console.log("verified bot", decision.reason.verified);
                }
                return res.status(403).json({ error: "Bot Detected" });
            }

            console.log("Access Deined");
            res.writeHead(429, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({ error: "Too Many Requests", reason: decision.reason }),
            );
            return res.status(403).json({ error: "Access Denied" });
        }
        next();
    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error);
    }
};

export default arcjetMiddleware;