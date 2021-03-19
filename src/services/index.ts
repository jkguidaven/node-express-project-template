import { Container } from "inversify";
import { SampleService } from "./sample.service";

export default (container: Container): void => {
    container.bind<SampleService>('sampleService').to(SampleService);
}