const dbConnection = require('../config/db');
const logger = require('../middleware/logger');
const { ObjectId } = require('mongodb');
const { createError } = require('http-errors');

async function likeNews(newsId) {
    try {
        return await dbConnection('news', async (collection) => {
            try {
                const result = await collection.updateOne(
                    { _id: new ObjectId(newsId) },
                    { $inc: { app_likes: 1 } }
                );
                
                if (result.matchedCount === 0) {
                    throw createError(404, 'الخبر غير موجود');
                }

                return {
                    message: 'تم إضافة اللايك بنجاح',
                    modifiedCount: result.modifiedCount
                };
            } catch (error) {
                logger.error('Error in addLikeService : %o', error);
                throw error;
            }
        });
    } catch (error) {
        logger.error('Error in likeNews : %o', error);
        throw createError(500, 'خطأ في الخادم');
    }
}

module.exports = { likeNews };

