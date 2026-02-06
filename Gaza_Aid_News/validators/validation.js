const Joi = require('joi');

// Validation باستخدام Joi
const getNewsSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10), 
    sortBy: Joi.string().valid('date', 'title', 'likes_count', 'createdAt').default('createdAt'),
    order: Joi.string().valid('asc', 'desc').default('desc'),
    search: Joi.string().allow('').default(''),
    lastId: Joi.string().hex().length(24).optional()
});


module.exports = { getNewsSchema };
