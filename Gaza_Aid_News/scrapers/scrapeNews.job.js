const cron = require('node-cron');
const scrapeNews = require('./scraper.js');
const logger = require('../middleware/logger');

const startScrapingJob = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      logger.info("Scraping job started...");
      await scrapeNews();
      logger.info("Scraping job finished successfully");
    } catch (error) {
      logger.error("Scraping job failed", error);
    }
  });
};

module.exports = startScrapingJob;
