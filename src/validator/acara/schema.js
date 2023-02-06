const Joi = require('joi');

const AcaraPayloadSchema = Joi.object({
    namaAcara: Joi.string().required(),
    tahunAcara: Joi.number().integer().min(1900).max(2100).required(),
});

module.exports = { AcaraPayloadSchema };