const express=require('express');
const routes = require('./routes')
const errorHndler=require('./middleware/error_handler')
const startScrapingJob=require('./scrapers/scrapeNews.job')
const { generalLimiter } =require('./middleware/rateLimiter') 

const app=express();

app.use("/api", generalLimiter);
routes(app);

app.use(errorHndler)

if (process.env.ENABLE_CRON === "true") {
  startScrapingJob();
}

module.exports = app
