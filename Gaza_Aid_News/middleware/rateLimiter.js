import rateLimit from "express-rate-limit";
/**
 * Limit عام لكل الـ API
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 300, // 300 request لكل IP
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Limit خاص بالـ Likes 
 */
export const likeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // ساعة
  max: 20, // 20 لايك فقط
  message: {
    status: "error",
    message: "Too many likes from this IP, try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
