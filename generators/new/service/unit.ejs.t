---
to: "src/test/unit/services/<%= h.changeCase.kebab(h.component(name).name) %>.service.unit.ts"
---
<%
    const importName = h.changeCase.pascal(h.component(name).name);
%>
import { expect } from 'chai';
import { Container } from 'inversify';
import 'reflect-metadata';
import <%= importName %>Service from '../../../services/<%= h.changeCase.kebab(h.component(name).name) %>.service';

let service: <%= importName %>Service;

describe('<%= h.changeCase.kebab(h.component(name).name) %> service unit test', () => {
    beforeEach(() => {
        const container: Container = new Container();
        container.bind(<%= importName %>Service).toSelf();
        service = container.get(<%= importName %>Service);
    });

    it('Service is injectable', function () {
        expect(service).to.not.equal(undefined);
    });
});
