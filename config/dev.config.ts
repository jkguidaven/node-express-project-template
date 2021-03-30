import path from 'path';
import AppConfig from './app.config';

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
     * To initialize a mongodb connection, specify configuration here. To learn more about
     * configuring the connection. refer to the link: https://mongoosejs.com/docs/connections.html
     */
    MONGODB: {
        uri: 'mongodb://localhost/sample',
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    }
};

export default config;
