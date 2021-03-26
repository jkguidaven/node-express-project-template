import express from 'express';
import SocketIO from 'socket.io';

export enum VIEW_ENGINE {
    EJS,
    PUG,
    HANDLEBARS
}

export default interface AppConfig {
    // Server port address
    PORT: number;
    STATIC_SOURCE_DIR: string;
    STATIC_BASE_URL: string;
    CORS_OPTIONS: Partial<{
        origin: string;
        methods: Array<string>;
        preflightContinue: boolean;
        optionsSuccessStatus: number;
    }>;

    VIEW_OPTIONS?: Partial<{
        ENGINE: VIEW_ENGINE;
        SOURCE_DIR: string;
        LOADER: (app: express.Application) => Express.Application;
    }>;

    WEBSOCKET_OPTIONS?: Partial<SocketIO.ServerOptions>;
}
