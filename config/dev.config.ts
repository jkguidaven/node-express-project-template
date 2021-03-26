import path from 'path';
import AppConfig, { VIEW_ENGINE } from './app.config';

const config: AppConfig = {
    // Server port address
    PORT: Number(process.env.SERVER_PORT) || 3000,

    /*
     * Specifiy here the source folder of all static asset files.
     * By default it is set to 'src/static' folder.
     */
    STATIC_SOURCE_DIR: path.join(__dirname, 'src', 'static'),

    /*
     * Specify here the base url for serving the static asset files.
     * By default it is set to '/public'
     */
    STATIC_BASE_URL: '/public',

    /*
     * Specify here the CORS configuration. refer to the following
     * documentation to learn more about the options:
     * https://www.npmjs.com/package/cors#configuring-cors
     */
    CORS_OPTIONS: {
        origin: '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATH', 'POST', 'DELETE'],
        preflightContinue: false,
        optionsSuccessStatus: 204
    },

    /*
     * Specify here the view engine template you would like to use
     * and the source directory of the template files.
     *
     *  The supported engines are the following:
     *  - handlebars (https://handlebarsjs.com/)
     *  - ejs (https://www.npmjs.com/package/ejs)
     *  - pug (https://pugjs.org/api/getting-started.html)
     */
    VIEW_OPTIONS: {
        ENGINE: VIEW_ENGINE.HANDLEBARS,
        SOURCE_DIR: path.join(__dirname, 'src', 'views')
        /*
         * Incase you are using different template not official supported. Please specify
         * the loader callback here to register and configure the engine if needed. eg.
         *
         *   LOADER: (app: express.Application) => {
         *     app.engine('..', ...)
         *   }
         */
    },

    /*
     * Specify here the websocket.io configuration. To learn more about
     * how to configure your websocket.io server. refer to the link:
     * https://socket.io/docs/v4/server-api/
     *
     */
    WEBSOCKET_OPTIONS: {
        path: '/ws',
        allowEIO3: true
    }
};

export default config;
