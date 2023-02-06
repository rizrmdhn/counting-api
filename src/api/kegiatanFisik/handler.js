class KegiatanFisikHandler {
    constructor(service, validator) {

        this._service = service;
        this._validator = validator;

        this.postKegiatanFisikHandler = this.postKegiatanFisikHandler.bind(this);
        this.getKegiatanFisikHandler = this.getKegiatanFisikHandler.bind(this);
        this.getKegiatanFisikByIdHandler = this.getKegiatanFisikByIdHandler.bind(this);
        this.putKegiatanFisikByIdHandler = this.putKegiatanFisikByIdHandler.bind(this);
        this.deleteKegiatanFisikByIdHandler = this.deleteKegiatanFisikByIdHandler.bind(this);
    }

    async postKegiatanFisikHandler(request, h) {

        this._validator.validateKegiatanFisikPayload(request.payload);
        const { namaKegiatanFisik, quantityKegiatanFisik, unitKegiatanFisik, alokasiDanaKegiatanFisik, kegiatanId } = request.payload;

        const kegiatanFisikId = await this._service.addKegiatanFisik({ namaKegiatanFisik, quantityKegiatanFisik, unitKegiatanFisik, alokasiDanaKegiatanFisik, kegiatanId });

        const response = h.response({
            status: 'success',
            message: 'Kegiatan fisik berhasil ditambahkan',
            data: {
                kegiatanFisikId,
            },
        });
        response.code(201);
        return response;
    }

    async getKegiatanFisikHandler() {

        const kegiatanFisik = await this._service.getKegiatanFisik();

        return {
            status: 'success',
            data: {
                kegiatanFisik,
            },
        };
    }

    async getKegiatanFisikByIdHandler(request) {

        const { id } = request.params;

        const kegiatanFisik = await this._service.getKegiatanFisikById(id);

        return {
            status: 'success',
            data: {
                kegiatanFisik,
            },
        };
    }

    async putKegiatanFisikByIdHandler(request) {

        this._validator.validateKegiatanFisikPayload(request.payload);
        const { namaKegiatanFisik, quantityKegiatanFisik, unitKegiatanFisik, alokasiDanaKegiatanFisik, kegiatanId } = request.payload;

        const { id } = request.params;
        await this._service.editKegiatanFisikById(id, { namaKegiatanFisik, quantityKegiatanFisik, unitKegiatanFisik, alokasiDanaKegiatanFisik, kegiatanId });

        return {
            status: 'success',
            message: 'Kegiatan fisik berhasil diperbarui',
        };
    }

    async deleteKegiatanFisikByIdHandler(request) {

        const { id } = request.params;
        await this._service.deleteKegiatanFisikById(id);

        return {
            status: 'success',
            message: 'Kegiatan fisik berhasil dihapus',
        };
    }

};

module.exports = KegiatanFisikHandler;