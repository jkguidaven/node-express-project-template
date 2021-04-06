import { Request, Response, NextFunction } from 'express';

export interface Middleware {
    handler(request: Request, response: Response, next: NextFunction): void;
}

export const TYPES = {
    Middleware: Symbol.for('Middleware')
};
