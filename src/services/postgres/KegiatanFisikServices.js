const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class KegiatanFisikServices {
    constructor() {
        this._pool = new Pool();
    }

    async addKegiatanFisik({ namaKegiatanFisik, quantityKegiatanFiski, unitKegiatanFiski, alokasiDanaKegiatanFiski, kegiatanId }) {

        const id = `kegiatan-fisik-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO "kegiatan-fisik" VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, namaKegiatanFisik, quantityKegiatanFiski, unitKegiatanFiski, alokasiDanaKegiatanFiski, kegiatanId],
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Kegiatan fisik gagal ditambahkan');
        }

        return result.rows[0].id;

    }

    async getKegiatanFisik() {

        const result = await this._pool.query('SELECT id, name, quantity, unit, price FROM "kegiatan-fisik"');
        return result.rows;

    }

    async getKegiatanFisikById(id) {

        const query = {
            text: 'SELECT id, name, quantity, unit, price FROM "kegiatan-fisik" WHERE id = $1',
            values: [id],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Kegiatan fisik tidak ditemukan');
        }

        return result.rows[0];
    }

    async editKegiatanFisikById(id, { namaKegiatanFisik, quantityKegiatanFiski, unitKegiatanFiski, alokasiDanaKegiatanFiski, kegiatanId }) {

        const query = {
            text: 'UPDATE "kegiatan-fisik" SET name = $1, quantity = $2, unit = $3, price = $4, "kegiatanId" = $5 WHERE id = $6 RETURNING id',
            values: [namaKegiatanFisik, quantityKegiatanFiski, unitKegiatanFiski, alokasiDanaKegiatanFiski, kegiatanId, id],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Gagal memperbarui kegiatan fisik. Id tidak ditemukan');
        }
    }

    async deleteKegiatanFisikById(id) {

        const query = {
            text: 'DELETE FROM "kegiatan-fisik" WHERE id = $1 RETURNING id',
            values: [id],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Kegiatan fisik gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = KegiatanFisikServices;