import { Container } from 'inversify';
import servicesDepLoader from './services';
import controllersDepLoader from './controllers';
import middlewareDepLoader from './middleware';

export class IOCContainer extends Container {
    constructor() {
        super();
        this.setup();
    }

    setup(): void {
        servicesDepLoader(this);
        controllersDepLoader(this);
        middlewareDepLoader(this);
    }
}
