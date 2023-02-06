const KegiatanFisikHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'kegiatanFisik',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const kegiatanFisikHandler = new KegiatanFisikHandler(service, validator);
        server.route(routes(kegiatanFisikHandler));
    }
};