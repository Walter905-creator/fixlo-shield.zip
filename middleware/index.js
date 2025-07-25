// Express.js Middleware - Advanced Protection
const rateLimit = require('express-rate-limit');
const blacklist = new Set(["192.168.1.1", "203.0.113.5"]);

module.exports = function (req, res, next) {
    const ip = req.ip;

    if (blacklist.has(ip)) {
        return res.status(403).send("Forbidden");
    }

    const suspiciousPatterns = [/\b(select|union|insert|drop|script|onerror|onload)\b/i, /\.\.\//];
    for (const pattern of suspiciousPatterns) {
        if (pattern.test(req.url) || pattern.test(JSON.stringify(req.body))) {
            return res.status(403).send("Malicious activity detected");
        }
    }

    next();
};