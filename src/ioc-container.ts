import { Container } from "inversify";
import serviceDepLoader from './services';

export class IOCContainer extends Container {
    constructor() {
        super();
        this.setup();
    }

    setup() {
        serviceDepLoader(this);
    }
}