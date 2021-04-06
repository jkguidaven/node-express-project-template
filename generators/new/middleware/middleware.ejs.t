---
to: "src/middlewares/<%= h.changeCase.kebab(h.component(name).name) %>.middleware.ts"
---
<%
    const importName = h.changeCase.pascal(h.component(name).name);
%>import { Middleware } from './base.middleware';
import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

@injectable()
export class <%= importName %>Middleware implements Middleware {
    handler(request: Request, response: Response, next: NextFunction): void {
        next();
    }
}
