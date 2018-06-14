const { app, assert } = require('egg-mock/bootstrap');
describe('user service', function () {
    it('signup', async function () {
        let ctx = app.mockContext();
        let doc = await ctx.service.user.create({ username: '99999999999', password: '999' });
        assert(doc);
        assert(doc._id);
        assert.equal(doc.username, '99999999999');
        assert.equal(doc.password, '999');
    });
});