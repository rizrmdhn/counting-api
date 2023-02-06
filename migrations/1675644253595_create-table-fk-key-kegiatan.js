exports.up = pgm => {
    pgm.addConstraint('kegiatan', 'fk_kegiatan.acaraId', 'FOREIGN KEY("acaraId") REFERENCES acara(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropConstraint('kegiatan', 'fk_kegiatan.acaraId');
};