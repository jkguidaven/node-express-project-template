// Main node/express library
import express from 'express';
import * as bodyparser from 'body-parser';
import compression from 'compression';

// 3rd party libraries
import 'reflect-metadata';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';

// Internal dependencies & libraries
import { IOCContainer } from './ioc-container';

// Internal plugins

/* Uncomment this to enable view engine templating
 * import ViewPluginLoader from './src/plugins/views';
 */

// We load our controllers by declared metadata from @controller annotation
import './controllers';
import AppConfig from '../config/app.config';

export default function (config: AppConfig): express.Application {
    // We prepare our IOC container to our server
    const container: IOCContainer = new IOCContainer();
    const server = new InversifyExpressServer(container);

    // Configure our app by enabling plugins
    server.setConfig((app: express.Application) => {
        // We load our static files from source directory
        app.use(
            config.STATIC_BASE_URL,
            express.static(config.STATIC_SOURCE_DIR)
        );

        // We are adding middleware to parse all incoming requests as JSON
        app.use(bodyparser.json());

        // We are adding middleware to allow cross-origin requests
        app.use(cors(config.CORS_OPTIONS));

        // We are adding middleware to enable compression on server responses
        app.use(compression());

        /* Uncomment this to enable view engine templating
         *  ViewPluginLoader(app, config);
         */

        // here we are configuring the expressWinston logging middleware,
        // which will automatically log all HTTP requests handled by Express.js
        app.use(
            expressWinston.logger({
                transports: [new winston.transports.Console()],
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.json()
                )
            })
        );
    });

    return server.build();
}
