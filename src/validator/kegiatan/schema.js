const Joi = require('joi');

const KegiatanPayloadSchema = Joi.object({
    namaKegiatan: Joi.string().required(),
    tahunKegiatan: Joi.number().integer().min(1900).max(3000).required(),
    acaraId: Joi.string().required(),
});

const KegiatanIdPayloadSchema = Joi.object({
    acaraId: Joi.string().required(),
});

module.exports = { KegiatanPayloadSchema, KegiatanIdPayloadSchema };