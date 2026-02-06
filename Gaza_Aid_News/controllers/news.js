const dbConnection = require('../config/db')
const { createError } = require('http-errors')
const { ObjectId } = require('mongodb')
const { likeNews }=require('../services/like_news')
const { getNewsService }=require('../services/new_service')
const logger = require('../middleware/logger');

const getNews = async (req, res, next) => {
    try {
        const result = await getNewsService(req.query);
        res.json(result);
    } catch (err) {
        logger.error('Error in getNews: %o', err);
        next(err); 
    }
};

// addLike
const addLike = async (req, res, next) => {
  try{
    const newsId = req.params.id;
        const result = await likeNews(newsId); 
        res.json(result);
    } catch (err) {
        logger.error('Error in addLike: %o', err);
        next(err);
    }
};

module.exports = { getNews, addLike };
