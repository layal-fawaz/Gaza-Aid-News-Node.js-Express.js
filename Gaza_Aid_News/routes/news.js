const { Router } = require('express');
const { getNews, addLike } = require('../controllers/news');
const { scrapeAndSave } = require('../services/save_news');
const rateLimit = require('express-rate-limit');

const router = Router();

/**
 * Rate Limiter خاص باللايك
 * لكل IP يسمح بـ 5 لايكات لكل خبر خلال ساعة
 */
const likeLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 ساعة
    max: 5,
    message: {
        success: false,
        message: "وصلت الحد الأقصى لإضافة اللايك خلال هذه الساعة"
    },
    standardHeaders: true,
    legacyHeaders: false
});

// جلب الأخبار
router.get('/', getNews);

router.post('/:id/like', likeLimiter, addLike);

// Endpoint scraping (محمي)
router.get('/scrape', async (req, res) => {
    if (process.env.NODE_ENV === "production") {
        return res.status(403).json({
            success: false,
            message: "Scraping endpoint is disabled in production"
        });
    }

    try {
        const pageCount = parseInt(req.query.pages) || 10;
        console.log(`بدء عملية جلب ${pageCount} صفحة...`);
        const result = await scrapeAndSave(pageCount);
        res.json(result);
    } catch (error) {
        console.error('خطأ:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في جلب الأخبار'
        });
    }
});

module.exports = router;
