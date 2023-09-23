const Joi = require('joi');

module.exports.productSchema = Joi.object({
    Name: Joi.string().required(),
    Image:Joi.string().required(),
    Price: Joi.number().min(0).required(),
    Description: Joi.string().required()
});

module.exports.reviewSchema = Joi.object({});