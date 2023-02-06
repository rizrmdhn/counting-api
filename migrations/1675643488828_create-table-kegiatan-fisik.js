/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('kegiatan-fisik', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'TEXT',
            notNull: true,
        },
        quantity: {
            type: 'INTEGER',
            notNull: true,
        },
        unit: {
            type: 'TEXT',
            notNull: true,
        },
        price: {
            type: 'INTEGER',
            notNull: true,
        },
        kegiatanId: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('kegiatan-fisik');
};