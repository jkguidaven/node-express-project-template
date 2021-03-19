import { injectable } from "inversify";

@injectable()
export class SampleService {
    getMessage() {
        return 'hello world';
    }
}