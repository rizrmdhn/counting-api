const Joi = require('joi');

const KegiatanFisikPayloadSchema = Joi.object({
    namaKegiatanFisik: Joi.string().required(),
    quantityKegiatanFisik: Joi.number().required(),
    unitKegiatanFisik: Joi.string().required(),
    alokasiDanaKegiatanFisik: Joi.number().required(),
    kegiatanId: Joi.string().required(),
});

const KegiatanFisikIdPayloadSchema = Joi.object({
    acaraId: Joi.string().required(),
});

module.exports = { KegiatanFisikPayloadSchema, KegiatanFisikIdPayloadSchema };