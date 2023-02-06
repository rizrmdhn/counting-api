const { AcaraPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const AcaraValidator = {
    validateAcaraPayload: (payload) => {
        const validationResult = AcaraPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
}

module.exports = AcaraValidator;