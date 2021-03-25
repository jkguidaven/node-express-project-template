import express from 'express';
import AppConfig from '../../config/app.config';
import handlebars from 'express-handlebars';

export enum VIEW_ENGINE {
    EJS,
    PUG,
    HANDLEBARS
}

export default (app: express.Application, config: AppConfig): void => {
    const engine: VIEW_ENGINE = config.VIEW_OPTIONS.ENGINE;

    /* We check if we have specified a custom loader
     * otherwise we load the supported engine.
     */
    if (config.VIEW_OPTIONS.LOADER) {
        const loaderCallback =
            config.VIEW_OPTIONS.LOADER || ((app: express.Application) => app);

        loaderCallback(app);
    } else if (engine === VIEW_ENGINE.EJS) {
        app.set('view engine', 'ejs');
    } else if (engine === VIEW_ENGINE.PUG) {
        app.set('view engine', 'pug');
    } else if (engine === VIEW_ENGINE.HANDLEBARS) {
        app.engine('hbs', handlebars());
        app.set('view engine', 'hbs');
    }

    app.set('views', config.VIEW_OPTIONS.SOURCE_DIR);
};
