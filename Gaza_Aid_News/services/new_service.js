const { getNewsFromDB } = require('../models');
const { getNewsSchema } = require('../validators/validation');
const { ObjectId } = require('mongodb');
const logger = require('../middleware/logger'); 

async function getNewsService(query) {
    try {
        // تحقق من المدخلات
        const { value, error } = getNewsSchema.validate(query);
        if (error) {
            logger.error('Error in getNewsService: %o', error);
            throw new Error(error.details[0].message);
        }

        const { page, sortBy, order, search } = value;
        const limit = parseInt(query.limit) || 10;
        const lastId = query.lastId || null;
        const sortOrder = order === 'asc' ? 1 : -1;

        // بناء query للـ DB
        let dbQuery = {};
        if (search) dbQuery.title = { $regex: search, $options: 'i' };
        if (lastId) {
            dbQuery._id = sortOrder === 1
                ? { $gt: new ObjectId(lastId) }
                : { $lt: new ObjectId(lastId) };
        }

        // جلب الأخبار من الداتا بيز
        let news = await getNewsFromDB(dbQuery, sortOrder, limit);
        if (!Array.isArray(news)) news = [];
        logger.info('Fetched news: %o', news);

        // إضافة total_likes
        const newsWithLikes = news.map(item => ({
            ...item,
            total_likes: (item.likes_count || 0) + (item.app_likes || 0)
        }));

        const nextCursor = news.length ? news[news.length - 1]._id : null;

        return { data: newsWithLikes, nextCursor };

    } catch (err) {
        logger.error('Unhandled error in getNewsService: %o', err);
        throw err;
    }
}

module.exports = { getNewsService };
