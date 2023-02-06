const routes = (handler) => [
    {
        method: 'GET',
        path: '/',
        handler: handler.getApiStatusHandler,
    },
]

module.exports = routes