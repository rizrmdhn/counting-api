const AcaraHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'acara',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const acaraHandler = new AcaraHandler(service, validator);
        server.route(routes(acaraHandler));
    }
}