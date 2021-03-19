import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
    interfaces,
    controller,
    httpGet,
    request,
    response
} from 'inversify-express-utils';
import { SampleService } from '../services/sample.service';

@controller('/')
export class HomeController implements interfaces.Controller {
    constructor(@inject('sampleService') private service: SampleService) {}

    @httpGet('/')
    public index(@request() req: Request, @response() res: Response): void {
        try {
            res.status(200).json({ message: this.service.getMessage() });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
