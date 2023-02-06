const Joi = require('joi');

const KegiatanFisikPayloadSchema = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(3000).required(),
});

const KegiatanFisikIdPayloadSchema = Joi.object({
    acaraId: Joi.string().required(),
});

module.exports = { KegiatanFisikPayloadSchema, KegiatanFisikIdPayloadSchema };