const dbConnection = require('../config/db');
dbConnection('news', async (collection) => {
    try {
        await collection.createIndex({ title: "text" });
        await collection.createIndex({ createdAt: -1 });
        await collection.createIndex({ link: 1 }, { unique: true });
        console.log("Indexes تم إنشاؤها بنجاح!");
        process.exit(0);
    } catch (err) {
        console.error("خطأ بإنشاء Indexes:", err);
        process.exit(1);
    }
});
