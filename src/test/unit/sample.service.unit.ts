import { expect } from 'chai';
import { Container } from 'inversify';
import 'reflect-metadata';
import SampleService from '../../services/sample.service';

let service: SampleService;

describe('sample service unit test', () => {
    beforeEach(() => {
        const container: Container = new Container();
        container.bind(SampleService).toSelf();
        service = container.get(SampleService);
    });

    it('hello world', function () {
        expect(service.getMessage()).to.equal('hello world');
    });
});
