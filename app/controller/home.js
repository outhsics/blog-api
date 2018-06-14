const { Controller } = require('egg');
class HomeController extends Controller {
    index() {
        this.ctx.body = 'hi, egg';
    }
}
module.exports = HomeController;