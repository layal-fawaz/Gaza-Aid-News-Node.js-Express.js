const dbConnection = require('../config/db');

async function getNewsFromDB(query, sortOrder, limit) {
    return dbConnection('news', async (collection) => {
        return await collection
            .find(query)
            .sort({ _id: sortOrder })
            .limit(limit)
            .toArray();
    });
}

async function saveNewsToDb(newsArray) {
    if (!Array.isArray(newsArray) || newsArray.length === 0) {
        console.log('No news to save');
        return { insertedCount: 0 };
    }

    return dbConnection('news', async (collection) => {
        try {
            const result = await collection.insertMany(newsArray, { ordered: false });
            console.log(`تم حفظ ${result.insertedCount} خبر في قاعدة البيانات`);
            return result;
        } catch (err) {
            if (err.code === 11000) {
                console.log('بعض الأخبار موجودة بالفعل');
                return { insertedCount: 0 };
            }
            throw err;
        }
    });
}

module.exports = { getNewsFromDB, saveNewsToDb };
