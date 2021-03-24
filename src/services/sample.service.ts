import { injectable } from 'inversify';

@injectable()
export default class SampleService {
    getMessage(): string {
        return 'hello world';
    }
}
