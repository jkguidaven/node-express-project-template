import EventEmitter from 'events';
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
import debuglog from '../utils/debug';

@injectable()
@Controller('/message')
export class MessageController {
    @OnConnect('connection')
    connection(): void {
        debuglog('Client connected');
    }

    @OnDisconnect('disconnect')
    disconnect(): void {
        debuglog('Client disconnected');
    }

    @OnMessage('message')
    message(
        @Payload() payload: { message: string },
        @ConnectedSocket() socket: EventEmitter
    ): void {
        debuglog('Message received');
        socket.emit(
            'message',
            'Hello! I have received a message containing: ' +
                JSON.stringify(payload)
        );
    }
}
