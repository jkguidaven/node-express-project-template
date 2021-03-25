---
to: "src/test/integration/controllers/<%= h.changeCase.kebab(h.component(name).name) %>.controller.integration.ts"
---
<%
    const importName = h.changeCase.pascal(h.component(name).name);
%>
import app from '../../../../app';

import chai, { expect } from 'chai';
import ChaiHttp from 'chai-http';

let request: ChaiHttp.Agent;

describe('<%= importName %>Controller API test', function () {
    before(async () => {
        chai.use(ChaiHttp);
        request = chai.request(app).keepOpen();
    });<% for (let method of methods) { %>

    it('<%= method.toLowerCase() %>', function (done) {
        request.<%= method.toLowerCase() %>('/<%= h.changeCase.kebab(h.component(name).name) %>').end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res).to.have.status(200);
            done();
        });
    });<% } %>

    after(() => app.close());
});
