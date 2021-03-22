import { injectable } from 'inversify';
import express from 'express';
import { interfaces } from 'inversify-express-utils';
import debugLog from '../utils/debug';

@injectable()
export abstract class BaseController implements interfaces.Controller {
    /*
     * This is a workaround to make some template engine to properly work
     * with inversify-express-util's response bug.
     */
    public render(
        res: express.Response,
        template: string,
        options = {}
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            res.render(template, options, (err, compiled) => {
                if (err) {
                    this.printLog(err);
                    reject('500 when rendering the template');
                }
                resolve(compiled);
            });
        });
    }

    public printLog(log: any): void { // eslint-disable-line
        debugLog(log);
    }
}
