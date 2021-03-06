import server from '../../../../main';

import chai, { expect } from 'chai';
import ChaiHttp from 'chai-http';

let request: ChaiHttp.Agent;

describe('Sample page', function () {
    before(async () => {
        chai.use(ChaiHttp);
        request = chai.request(server).keepOpen();
    });

    it('home', function (done) {
        request.get('/').end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res).to.have.status(200);
            done();
        });
    });

    it('404', function (done) {
        request.get('/404').end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res).to.have.status(404);
            done();
        });
    });

    after(() => server.close());
});
