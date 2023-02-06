const KegiatanHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'kegiatan',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const kegiatanHandler = new KegiatanHandler(service, validator);
        server.route(routes(kegiatanHandler));
    }
};