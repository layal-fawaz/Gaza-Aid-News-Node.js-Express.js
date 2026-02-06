const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://www.motqdmon.com/search/label/المساعدات";
const MAX_RESULTS_PER_PAGE = 6; 

async function scrapeArticleDetails(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const dateElement = $('a.timestamp-link abbr.published');   
    const date = dateElement.length ? dateElement.text().trim() : 'غير متوفر';

    const likes_count = 0;

    return { date, likes_count };
  } catch (error) {
    console.error(`Error scraping details for ${url}:`, error.message);
    return { date: 'خطأ في الجلب', likes_count: 0 };
  }
}

async function scrapeNews(maxPages = 10) {
  const news = [];
  let page = 0;
  let nextPageUrl = BASE_URL;

  while (nextPageUrl && page < maxPages) {
    try {
      page++;
      console.log(`Scraping page ${page} from: ${nextPageUrl}`);

      const { data } = await axios.get(nextPageUrl);
      const $ = cheerio.load(data);

      const pagePromises = [];

      $(".post-title a").each((_, element) => {
        const title = $(element).text().trim();
        const link = $(element).attr("href");

        const detailsPromise = scrapeArticleDetails(link).then(details => {
          news.push({
            title,
            link,
            date: details.date,
            likes_count: details.likes_count,
            app_likes: 0
          });
        });

        pagePromises.push(detailsPromise);
      });

      await Promise.all(pagePromises);

      // البحث عن الرابط للصفحة التالية باستخدام updated-max
      const nextLink = $("a.blog-pager-older-link").attr("href");
      nextPageUrl = nextLink || null;

      if (!nextPageUrl) console.log("وصلنا لآخر صفحة.");

    } catch (error) {
      console.error(`Error scraping page ${page}:`, error.message);
      break;
    }
  }

  console.log(`تم جلب ${news.length} أخبار.`);
  console.log(`تم جلب ${news.length} أخبار.`);
  return news;
}

module.exports = {scrapeNews,scrapeArticleDetails};
