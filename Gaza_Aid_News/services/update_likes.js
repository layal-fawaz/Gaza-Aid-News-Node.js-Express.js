const cron = require('node-cron');
const dbConnection = require('../config/db');
const scrapeNews = require('../scrapers/scraper');

cron.schedule('0 * * * *', async () => { 
    console.log('بدء تحديث اللايكات...');
    dbConnection('news', async (collection) => {
        const news = await collection.find({}).toArray();
        for (let item of news) {
            try {
                const details = await scrapeNews.scrapeArticleDetails(item.link);
                await collection.updateOne(
                    { _id: item._id },
                    { $set: { likes_count: details.likes_count } }
                );
            } catch (err) {
                console.error('خطأ تحديث اللايكات:', err);
            }
        }
    });
});
