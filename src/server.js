/* eslint-disable no-console */
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const ClientError = require('./exceptions/ClientError');

// default plugin
const defaultPlugin = require('./api/default');

// acara plugin
const acara = require('./api/acara');
const AcaraServices = require('./services/postgres/AcaraServices');
const AcaraValidator = require('./validator/acara');

// kegiatan plugin
const kegiatan = require('./api/kegiatan');
const KegiatanServices = require('./services/postgres/KegiatanServices');
const KegiatanValidator = require('./validator/kegiatan');

// kegiatan fisik plugin
const kegiatanFisik = require('./api/kegiatanFisik');
const KegiatanFisikServices = require('./services/postgres/KegiatanFisikServices');
const KegiatanFisikValidator = require('./validator/kegiatanFisik');

const init = async () => {
    const acaraService = new AcaraServices();
    const kegiatanService = new KegiatanServices();
    const kegiatanFisikService = new KegiatanFisikServices();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // registrasi plugin eksternal
    await server.register([
        {
            plugin: Jwt,
        },
    ])

    // server auth strategy
    server.auth.strategy('countingapp_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });


    // registrasi plugin internal
    await server.register([
        {
            plugin: defaultPlugin,
        },
        {
            plugin: acara,
            options: {
                service: acaraService,
                validator: AcaraValidator,
            }
        },
        {
            plugin: kegiatan,
            options: {
                service: kegiatanService,
                validator: KegiatanValidator,
            }
        },
        {
            plugin: kegiatanFisik,
            options: {
                service: kegiatanFisikService,
                validator: KegiatanFisikValidator,
            }
        },
    ])

    server.ext('onPreResponse', (request, h) => {
        // mendapatkan konteks response dari request
        const { response } = request;
        if (response instanceof Error) {

            // penanganan client error secara internal.
            if (response instanceof ClientError) {
                const newResponse = h.response({
                    status: 'fail',
                    message: response.message,
                });
                newResponse.code(response.statusCode);
                return newResponse;
            }
            // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
            if (!response.isServer) {
                return h.continue;
            }
            // penanganan server error sesuai kebutuhan
            const newResponse = h.response({
                status: 'fail',
                message: response.message,
            });
            newResponse.code(500);
            return newResponse;
        }
        // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
        return h.continue;
    });

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

init();