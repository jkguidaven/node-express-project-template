---
to: "src/controllers/<%= h.changeCase.kebab(h.component(name).name) %>.controller.ts"
---
<%
    const importName = h.changeCase.pascal(h.component(name).name);
    const decoratorMap = {
        'GET': 'httpGet',
        'POST': 'httpPost',
        'PUT': 'httpPut',
        'DELETE': 'httpDelete'
    };
%>
import { Request, Response } from 'express';
import {
    controller,
    <% for(let method of methods) { %><%= decoratorMap[method] %>,
    <% } %>request,
    response
} from 'inversify-express-utils';
import { BaseController } from './base.controller';

@controller('/<%= h.changeCase.kebab(h.component(name).name) %>')
export class <%= importName %>Controller extends BaseController {
    constructor() {
        super();
    }<% for(let method of methods) { %>

    @<%= decoratorMap[method] %>('/')
    public <%= method.toLowerCase() %>(@request() req: Request, @response() res: Response): void {
        res.status(200).json({ message: 'ok' });
    }<% } %>
}
