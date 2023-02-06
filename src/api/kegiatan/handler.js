class KegiatanHandler {
    constructor(service, validator) {

        this._service = service;
        this._validator = validator;

        this.postKegiatanHandler = this.postKegiatanHandler.bind(this);
        this.getKegiatanHandler = this.getKegiatanHandler.bind(this);
        this.getKegiatanByIdHandler = this.getKegiatanByIdHandler.bind(this);
        this.putKegiatanByIdHandler = this.putKegiatanByIdHandler.bind(this);
        this.deleteKegiatanByIdHandler = this.deleteKegiatanByIdHandler.bind(this);
    }

    async postKegiatanHandler(request, h) {

        this._validator.validateKegiatanPayload(request.payload);
        const { namaKegiatan, tahunKegiatan, acaraId } = request.payload;

        const kegiatanId = await this._service.addKegiatan({ namaKegiatan, tahunKegiatan, acaraId });

        const response = h.response({
            status: 'success',
            message: 'Kegiatan berhasil ditambahkan',
            data: {
                kegiatanId,
            },
        });
        response.code(201);
        return response;
    }

    async getKegiatanHandler() {

        const kegiatan = await this._service.getKegiatan();

        return {
            status: 'success',
            data: {
                kegiatan,
            },
        };
    }

    async getKegiatanByIdHandler(request) {

        const { id } = request.params;

        const kegiatan = await this._service.getKegiatanById(id);

        return {
            status: 'success',
            data: {
                kegiatan,
            },
        };
    }

    async putKegiatanByIdHandler(request) {

        this._validator.validateKegiatanPayload(request.payload);
        const { namaKegiatan, tahunKegiatan, acaraId } = request.payload;
        const { id } = request.params;

        await this._service.editKegiatanById(id, { namaKegiatan, tahunKegiatan, acaraId });

        return {
            status: 'success',
            message: 'Kegiatan berhasil diperbarui',
        };
    }

    async deleteKegiatanByIdHandler(request) {

        const { id } = request.params;

        await this._service.deleteKegiatanById(id);

        return {
            status: 'success',
            message: 'Kegiatan berhasil dihapus',
        };
    }

}

module.exports = KegiatanHandler;