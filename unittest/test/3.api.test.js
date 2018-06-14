const request = require('supertest');
const { assert } = require('chai');
const app = require('./server');
describe('test api', function () {
    it('test /', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect('Content-Length', "2")
            .expect(200)
            .end(function (err, response) {
                //console.log(response);
                assert.equal(response.text, 'ok');
                done();
            })
    });

    it('test /post', function (done) {
        request(app)
            .post('/post')
            .type('form')//请求体的类型 表单
            .send({ name: 'zfpx' })//发送的请求体请求体 
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, response) {
                //console.log(response);
                assert.equal(response.text, '{"name":"zfpx"}');
                assert.equal(response.body.name, "zfpx");
                done();
            })
    });
});
