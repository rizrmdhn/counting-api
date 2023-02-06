class AcaraHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postAcaraHandler = this.postAcaraHandler.bind(this);
        this.getAcaraHandler = this.getAcaraHandler.bind(this);
        this.getAcaraByIdHandler = this.getAcaraByIdHandler.bind(this);
        this.putAcaraByIdHandler = this.putAcaraByIdHandler.bind(this);
        this.deleteAcaraByIdHandler = this.deleteAcaraByIdHandler.bind(this);
    }

    async postAcaraHandler(request, h) {

        this._validator.validateAcaraPayload(request.payload);
        const { namaAcara, tahunAcara } = request.payload;

        const acaraId = await this._service.addAcara({ namaAcara, tahunAcara });

        const response = h.response({
            status: 'success',
            message: 'Acara berhasil ditambahkan',
            data: {
                acaraId,
            },
        });
        response.code(201);
        return response;
    }

    async getAcaraHandler() {

        const acara = await this._service.getAcara();

        return {
            status: 'success',
            data: {
                acara,
            },
        };
    }

    async getAcaraByIdHandler(request) {

        const { id } = request.params;

        const acara = await this._service.getAcaraById(id);

        return {
            status: 'success',
            data: {
                acara,
            },
        };
    }

    async putAcaraByIdHandler(request) {

        this._validator.validateAcaraPayload(request.payload);
        const { namaAcara, tahunAcara } = request.payload;
        const { id } = request.params;

        await this._service.editAcaraById(id, { namaAcara, tahunAcara });

        return {
            status: 'success',
            message: 'Acara berhasil diperbarui',
        };
    }

    async deleteAcaraByIdHandler(request) {

        
        const { id } = request.params;

        await this._service.deleteAcaraById(id);

        return {
            status: 'success',
            message: 'Acara berhasil dihapus',
        };
    }
}

module.exports = AcaraHandler;