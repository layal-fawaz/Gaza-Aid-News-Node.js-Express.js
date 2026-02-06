const dbConnection = require('../config/db');
const { scrapeNews } = require('../scrapers/scraper');
async function saveNews(newsArray) {
    try {
        return await dbConnection('news', async (collection) => {
            let savedCount = 0;
            let skippedCount = 0;

            for (let newsItem of newsArray) {
                const exists = await collection.findOne({ link: newsItem.link });
                
                if (!exists) {
                    await collection.insertOne({
                        title: newsItem.title,
                        link: newsItem.link,
                        date: newsItem.date,
                        likes_count: newsItem.likes_count,
                        app_likes: 0,
                        createdAt: new Date()
                    });
                    savedCount++;
                } else {
                    skippedCount++;
                }
            }

            console.log(`تم حفظ ${savedCount} خبر جديد`);
            console.log(`تم تخطي ${skippedCount} خبر موجود مسبقاً`);
            
            return {
                success: true,
                saved: savedCount,
                skipped: skippedCount,
                total: newsArray.length
            };

        });
    } catch (error) {
        console.error('خطأ في حفظ الأخبار:', error);
        throw error;
    }
}

async function scrapeAndSave(pageCount = 10) {
    try {
        console.log(` بدء جلب ${pageCount} صفحة من الموقع...`)
        
        const newsArray = await scrapeNews(pageCount);
        console.log(`تم جلب ${newsArray.length} خبر من الموقع`)
        const result = await saveNews(newsArray);
        
        return result;

    } catch (error) {
        console.error(' خطأ في عملية الجلب والحفظ:', error);
        throw error;
    }
}

module.exports = { saveNews, scrapeAndSave };
