exports.up = pgm => {
    pgm.addConstraint('kegiatan-fisik', 'fk_kegiatan-fisik.kegiatanId', 'FOREIGN KEY("kegiatanId") REFERENCES kegiatan(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropConstraint('kegiatan-fisik', 'fk_kegiatan-fisik.kegiatanId');
};