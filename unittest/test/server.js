const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send('ok');
});
//很可能会传过来请求体
app.post('/post', function (req, res) {
    res.json(req.body);
});
app.listen(8080);
module.exports = app;