import { injectable } from 'inversify';

@injectable()
export class SampleService {
    getMessage(): string {
        return 'hello world';
    }
}
