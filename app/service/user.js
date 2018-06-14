const { Service } = require('egg');
class UserService extends Service {
    async create(user) {
        return await this.ctx.model.User.create(user);
    }
}
module.exports = UserService;