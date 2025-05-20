const rateLimit = require('express-rate-limit');

// Limitar intentos de login a 3 por minuto por IP
const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 1, // máximo de intentos
    message: {
        message: 'Demasiados intentos de login desde esta IP. Intenta de nuevo en 1 minuto.'
    },
    standardHeaders: true, // Incluir info de rate limit en headers estándar
    legacyHeaders: false   // Desactivar X-RateLimit-* headers antiguos
});
module.exports = { loginLimiter };