---
to: "src/controllers/<%= h.changeCase.kebab(h.component(name).name) %>.controller.ts"
---
<%
    const importName = h.changeCase.pascal(h.component(name).name);
%>import EventEmitter from 'events';
import { injectable } from 'inversify';
import {
    Controller,
    Payload,
    ConnectedSocket,
    OnConnect,
    OnDisconnect,
    OnMessage
} from 'inversify-socket-utils';
import 'reflect-metadata';

@injectable()
@Controller('/<%= h.changeCase.kebab(h.component(name).name) %>')
export class <%= importName %>Controller {
    @OnConnect('connection')
    connection(): void {}

    @OnDisconnect('disconnect')
    disconnect(): void {}

    @OnMessage('<%= h.changeCase.kebab(h.component(name).name) %>')
    message(
        @Payload() payload: any,
        @ConnectedSocket() socket: EventEmitter
    ): void {}
}
