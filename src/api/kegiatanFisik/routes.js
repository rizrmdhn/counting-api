const routes = (handler) => [
    {
        method: 'POST',
        path: '/kegiatan-fisik',
        handler: handler.postKegiatanFisikHandler,
    },
    {
        method: 'GET',
        path: '/kegiatan-fisik',
        handler: handler.getKegiatanFisikHandler,
    },
    {
        method: 'GET',
        path: '/kegiatan-fisik/{id}',
        handler: handler.getKegiatanFisikByIdHandler,
    },
    {
        method: 'PUT',
        path: '/kegiatan-fisik/{id}',
        handler: handler.putKegiatanFisikByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/kegiatan-fisik/{id}',
        handler: handler.deleteKegiatanFisikByIdHandler,
    },
];

module.exports = routes