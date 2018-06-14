const { assert } = require('chai');
describe('async', () => {
    it('async add', (done) => {
        setTimeout(() => {
            assert.equal(1 + 2, 3);
            done();
        }, 100);
    });
    it('promise add', () => {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                assert.equal(1 + 2, 3);
                resolve();
            }, 100);
        });
    });
    it('async add', async () => {
        await new Promise(function (resolve, reject) {
            setTimeout(() => {
                assert.equal(1 + 2, 3);
                resolve();
            }, 100);
        });
    });
});