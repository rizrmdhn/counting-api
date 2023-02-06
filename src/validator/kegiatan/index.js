const { KegiatanPayloadSchema, KegiatanIdPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const KegiatanValidator = {
    validateKegiatanPayload: (payload) => {
        const validationResult = KegiatanPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validateKegiatanIdPayload: (payload) => {
        const validationResult = KegiatanIdPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
};

module.exports = KegiatanValidator;