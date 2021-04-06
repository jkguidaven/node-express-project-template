import { Middleware } from './base.middleware';
import { Request, Response, NextFunction } from 'express';
import SampleService from '../services/sample.service';
import { inject, injectable } from 'inversify';
import debugLog from '../utils/debug';

@injectable()
export class SampleMiddleware implements Middleware {
    constructor(@inject('sampleService') private service: SampleService) {}

    handler(request: Request, response: Response, next: NextFunction): void {
        debugLog(this.service.getMessage());
        next();
    }
}
