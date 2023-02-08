const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AcaraServices {
    constructor() {
        this._pool = new Pool();
    }

    async addAcara({ namaAcara, tahunAcara }) {

        const id = `acara-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO acara VALUES($1, $2, $3) RETURNING id',
            values: [id, namaAcara, tahunAcara],
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Acara gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getAcara() {

        const result = await this._pool.query('SELECT id, name, year FROM acara');
        return result.rows;
    }

    async getAcaraById(id) {

        const query = {
            text: 'SELECT id, name, year FROM acara WHERE id = $1',
            values: [id],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Acara tidak ditemukan');
        }

        return result.rows[0];
    }

    async editAcaraById(id, { namaAcara, tahunAcara }) {

        const query = {
            text: 'UPDATE acara SET name = $1, year = $2 WHERE id = $3 RETURNING id',
            values: [namaAcara, tahunAcara, id],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Gagal memperbarui acara. Id tidak ditemukan');
        }
    }

    async deleteAcaraById(id) {

        const query = {
            text: 'DELETE FROM acara WHERE id = $1 RETURNING id',
            values: [id],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Acara gagal dihapus. Id tidak ditemukan');
        }
    }

    async getKegiatanAcaraById(id) {

        const query = {

            text: `SELECT kegiatan.id, kegiatan.name, kegiatan.year 
            FROM kegiatan 
            INNER JOIN acara 
            ON acara.id = kegiatan."acaraId"
            WHERE acara.id = $1`,
            values: [id],
        }

        const result = await this._pool.query(query);

        return result.rows;
    }

    async getKegiatanFisikAcaraById(id) {

        const query = {
            text: `SELECT "kegiatan-fisik".id, "kegiatan-fisik".name, "kegiatan-fisik".quantity, "kegiatan-fisik".unit, "kegiatan-fisik".price, "kegiatan-fisik"."kegiatanId"
            FROM "kegiatan-fisik"
            JOIN kegiatan
            ON kegiatan.id = "kegiatan-fisik"."kegiatanId"
            JOIN acara
            ON acara.id = kegiatan."acaraId"
            WHERE acara.id = $1`,
            values: [id],
        }

        const result = await this._pool.query(query);

        return result.rows;
    }

    async getTotalPriceKegiatanFisikAcaraById(id) {

        const query = {
            text: `SELECT SUM("kegiatan-fisik".price) AS total, "kegiatan-fisik"."kegiatanId"
            FROM "kegiatan-fisik"
            JOIN kegiatan
            ON kegiatan.id = "kegiatan-fisik"."kegiatanId"
            JOIN acara
            ON acara.id = kegiatan."acaraId"
            WHERE acara.id = $1
            GROUP BY "kegiatan-fisik"."kegiatanId"`,
            values: [id],
        }

        const result = await this._pool.query(query);


        return result.rows;
    }
}

module.exports = AcaraServices;