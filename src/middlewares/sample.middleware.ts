import { Request, Response, NextFunction } from 'express';
import SampleService from '../services/sample.service';
import { inject, injectable } from 'inversify';
import debugLog from '../utils/debug';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export default class SampleMiddleware extends BaseMiddleware {
    constructor(@inject(SampleService) private service: SampleService) {
        super();
    }

    handler(request: Request, response: Response, next: NextFunction): void {
        debugLog(`Message from middleware: ${this.service.getMessage()}`);
        next();
    }
}
