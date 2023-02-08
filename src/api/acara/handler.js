/* eslint-disable no-param-reassign */
class AcaraHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postAcaraHandler = this.postAcaraHandler.bind(this);
        this.getAcaraHandler = this.getAcaraHandler.bind(this);
        this.getAcaraByIdHandler = this.getAcaraByIdHandler.bind(this);
        this.putAcaraByIdHandler = this.putAcaraByIdHandler.bind(this);
        this.deleteAcaraByIdHandler = this.deleteAcaraByIdHandler.bind(this);

        this.getKegiatanByAcaraIdHandler = this.getKegiatanByAcaraIdHandler.bind(this);
        this.getKegiatanFisikByAcaraIdHandler = this.getKegiatanFisikByAcaraIdHandler.bind(this);
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

    async getKegiatanByAcaraIdHandler(request) {

        const { id } = request.params;

        const acara = await this._service.getAcaraById(id);
        const kegiatan = await this._service.getKegiatanAcaraById(id);

        return {
            status: 'success',
            data: {
                acara: {
                    ...acara,
                    kegiatan,
                },
            },
        };
    }

    async getKegiatanFisikByAcaraIdHandler(request) {

        const { id } = request.params;

        const acara = await this._service.getAcaraById(id);
        const kegiatan = await this._service.getKegiatanAcaraById(id);
        const kegiatanFisik = await this._service.getKegiatanFisikAcaraById(id);
        const totalPrice = await this._service.getTotalPriceKegiatanFisikAcaraById(id);


        kegiatan.forEach((Kegiatan) => {
            Kegiatan.kegiatanFisik = kegiatanFisik.filter((KegiatanFisik) => KegiatanFisik.kegiatanId === Kegiatan.id);
            Kegiatan.totalPrice = totalPrice.filter((TotalPrice) => TotalPrice.kegiatanId === Kegiatan.id);
            if (Kegiatan.totalPrice.length > 0) {
                Kegiatan.totalPrice = Kegiatan.totalPrice[0].totalPrice;
            } else {
                Kegiatan.totalPrice = 0;
            }
        });

        return {
            status: 'success',
            data: {
                acara: [
                    {

                        ...acara,
                        kegiatan,

                    },
                ],
            },
        };
    }
}

module.exports = AcaraHandler;