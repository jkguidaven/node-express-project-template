import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
    controller,
    httpGet,
    request,
    response
} from 'inversify-express-utils';
import SampleMiddleware from '../middlewares/sample.middleware';
import SampleService from '../services/sample.service';
import { BaseController } from './base.controller';

@controller('/', SampleMiddleware)
export class HomeController extends BaseController {
    constructor(@inject(SampleService) private service: SampleService) {
        super();
    }

    @httpGet('/')
    public index(@request() req: Request, @response() res: Response): void {
        try {
            res.status(200).json({ message: this.service.getMessage() });
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpGet('render')
    public view(
        @request() req: Request,
        @response() res: Response
    ): Promise<string> {
        return this.render(res, 'sample', { message: 'Hello world!' });
    }
}
