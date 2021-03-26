import express from 'express';
import AppConfig from '../../config/app.config';
import handlebars from 'express-handlebars';

export enum VIEW_ENGINE {
    EJS,
    PUG,
    HANDLEBARS
}

export default (app: express.Application, config: AppConfig): void => {
    const options:
        | Partial<{
              ENGINE: VIEW_ENGINE;
              SOURCE_DIR: string;
              LOADER?:
                  | ((app: express.Application) => Express.Application)
                  | undefined;
          }>
        | undefined = config.VIEW_OPTIONS;

    // If we don't have views config.. skip this loader
    if (!options) return;

    const engine: VIEW_ENGINE | undefined = options.ENGINE;

    /* We check if we have specified a custom loader
     * otherwise we load the supported engine.
     */
    if (options.LOADER) {
        const loaderCallback =
            options.LOADER || ((app: express.Application) => app);

        loaderCallback(app);
    } else if (engine === VIEW_ENGINE.EJS) {
        app.set('view engine', 'ejs');
    } else if (engine === VIEW_ENGINE.PUG) {
        app.set('view engine', 'pug');
    } else if (engine === VIEW_ENGINE.HANDLEBARS) {
        app.engine('hbs', handlebars());
        app.set('view engine', 'hbs');
    }

    app.set('views', options.SOURCE_DIR);
};
