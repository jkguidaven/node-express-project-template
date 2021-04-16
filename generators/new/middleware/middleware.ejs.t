---
to: "src/middlewares/<%= h.changeCase.kebab(h.component(name).name) %>.middleware.ts"
---
<%
    const importName = h.changeCase.pascal(h.component(name).name);
%>import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export default class <%= importName %>Middleware extends BaseMiddleware {
    handler(request: Request, response: Response, next: NextFunction): void {
        next();
    }
}
