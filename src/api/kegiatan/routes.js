const routes = (handler) => [
    {
        method: 'POST',
        path: '/kegiatan',
        handler: handler.postKegiatanHandler,
    },
    {
        method: 'GET',
        path: '/kegiatan',
        handler: handler.getKegiatanHandler,
    },
    {
        method: 'GET',
        path: '/kegiatan/{id}',
        handler: handler.getKegiatanByIdHandler,
    },
    {
        method: 'PUT',
        path: '/kegiatan/{id}',
        handler: handler.putKegiatanByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/kegiatan/{id}',
        handler: handler.deleteKegiatanByIdHandler,
    },
];

module.exports = routes;
