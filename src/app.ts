// Main node/express library
import express from 'express';
import * as bodyparser from 'body-parser';
import compression from 'compression';
import { Server } from 'http';

// 3rd party libraries
import 'reflect-metadata';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import { InversifySocketServer } from 'inversify-socket-utils';
import SocketIO from 'socket.io';

// Internal dependencies & libraries
import { IOCContainer } from './ioc-container';
import AppConfig from '../config/app.config';
import { Middleware, TYPES } from './middlewares/base.middlewares';

export default function (config: AppConfig): Server {
    // We prepare our IOC container to our server
    const container: IOCContainer = new IOCContainer();

    const server = new InversifyExpressServer(container);

    // Configure our app by enabling plugins
    server.setConfig(async (app: express.Application) => {
        // We load our static files from source directory
        if (config.STATIC_BASE_URL && config.STATIC_SOURCE_DIR) {
            app.use(
                config.STATIC_BASE_URL,
                express.static(config.STATIC_SOURCE_DIR)
            );
        }

        // We are adding middleware to parse all incoming requests as JSON
        app.use(bodyparser.json());

        // We are adding middleware to allow cross-origin requests
        app.use(cors(config.CORS_OPTIONS));

        // We are adding middleware to enable compression on server responses
        app.use(compression());

        // We will initialize here our mongodb instance if we have set it up
        if (config.MONGODB) {
            // We import it this way so we won't include views in the package if not used
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const mongodbPluginLoader = require('./plugins/mongodb').default;
            await mongodbPluginLoader(
                config.MONGODB.uri,
                config.MONGODB.options
            );
        }

        if (config.VIEW_OPTIONS) {
            // We import it this way so we won't include views in the package if not used
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const ViewPluginLoader = require('./plugins/views').default;
            ViewPluginLoader(app, config);
        }

        // We load all middlewares from our container
        const middlewares = container
            .getAll<Middleware>(TYPES.Middleware)
            .map((middleware) => middleware.handler.bind(middleware));
        app.use(middlewares);

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

    const app = server.build();
    const httpServer = app.listen(config.PORT);

    if (config.WEBSOCKET_OPTIONS) {
        const io = new SocketIO.Server(httpServer, config.WEBSOCKET_OPTIONS);
        const socketServer = new InversifySocketServer(container, io);
        socketServer.build();
    }

    return httpServer;
}
