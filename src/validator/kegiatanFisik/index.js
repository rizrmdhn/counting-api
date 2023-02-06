const { KegiatanFisikIdPayloadSchema, KegiatanFisikPayloadSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const KegiatanFisikValidator = {
    validateKegiatanFisikId: (payload) => {
        const validationResult = KegiatanFisikIdPayloadSchema.validate(payload)
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message)
        }
    },
    validateKegiatanFisikPayload: (payload) => {
        const validationResult = KegiatanFisikPayloadSchema.validate(payload)
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message)
        }
    },
};

module.exports = KegiatanFisikValidator