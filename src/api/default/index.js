const DefaultHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'default',
    version: '1.0.0',
    register: async (server) => {
        const defaultHandler = new DefaultHandler();
        server.route(routes(defaultHandler));
    }
}