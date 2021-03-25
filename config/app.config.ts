import express from 'express';

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
    CORS_OPTIONS: {
        origin: string;
        methods: Array<string>;
        preflightContinue: boolean;
        optionsSuccessStatus: number;
    };

    VIEW_OPTIONS: {
        ENGINE: VIEW_ENGINE;
        SOURCE_DIR: string;
        LOADER?: (app: express.Application) => Express.Application;
    };
}
