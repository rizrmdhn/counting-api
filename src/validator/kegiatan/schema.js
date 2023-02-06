const Joi = require('joi');

const KegiatanPayloadSchema = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(3000).required(),
});

const KegiatanIdPayloadSchema = Joi.object({
    acaraId: Joi.string().required(),
});

module.exports = { KegiatanPayloadSchema, KegiatanIdPayloadSchema };