const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class KegiatanServices {
    constructor() {
        this._pool = new Pool();
    }

    async addKegiatan({ namaKegiatan, tahunKegiatan, acaraId }) {

        const id = `kegiatan-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO kegiatan VALUES($1, $2, $3, $4) RETURNING id',
            values: [id, namaKegiatan, tahunKegiatan, acaraId],
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Kegiatan gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getKegiatan() {

        const result = await this._pool.query('SELECT id, name, year FROM kegiatan');
        return result.rows;

    }

    async getKegiatanById(id) {

        const query = {
            text: 'SELECT id, name, year FROM kegiatan WHERE id = $1',
            values: [id],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Kegiatan tidak ditemukan');
        }

        return result.rows[0];
    }

    async editKegiatanById(id, { namaKegiatan, tahunKegiatan, acaraId }) {

        const query = {
            text: 'UPDATE kegiatan SET name = $1, year = $2, "acaraId" = $3 WHERE id = $4 RETURNING id',
            values: [namaKegiatan, tahunKegiatan, acaraId, id],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Gagal memperbarui kegiatan. Id tidak ditemukan');
        }
    }

    async deleteKegiatanById(id) {

        const query = {
            text: 'DELETE FROM kegiatan WHERE id = $1 RETURNING id',
            values: [id],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Kegiatan gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = KegiatanServices;