const routes = (handler) => [
    {
        method: 'POST',
        path: '/acara',
        handler: handler.postAcaraHandler,
    },
    {
        method: 'GET',
        path: '/acara',
        handler: handler.getAcaraHandler,
    },
    {
        method: 'GET',
        path: '/acara/{id}',
        handler: handler.getAcaraByIdHandler,
    },
    {
        method: 'PUT',
        path: '/acara/{id}',
        handler: handler.putAcaraByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/acara/{id}',
        handler: handler.deleteAcaraByIdHandler,
    },
];

module.exports = routes;