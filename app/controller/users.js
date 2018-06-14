const BaseController = require('./base');
class UsersController extends BaseController {
    async signup() {
        let { ctx } = this;
        //1.得到请求体 {username,password,email}
        let user = ctx.request.body;
        try {
            //保存数据库{_id,username,password,email}
            user = await ctx.service.user.create(user);
            /**
             * 下了一个订单，服务器
             * 1. 调用订单服务创建订单
             * 2. 调用商品服务减少库存
             * 3. 调用物流服务生成发货单
             * 4. 调用账户服务减少用户余额
             */
            this.success({ user });
        } catch (error) {
            this.error(error);
        }
    }
    async signin() {
        let { ctx } = this;
        let user = ctx.request.body;//得到请求体对象
        try {
            let doc = await ctx.model.User.findOne(user);
            if (doc) {
                //如果登录成功了，则需要写入session会话
                //可以通过ctx.session.user是否为null来判断此用户是否登录
                ctx.session.user = doc;
                this.success({ user: doc });
            } else {
                this.error('用户名或密码错误!');
            }
        } catch (error) {
            this.error(error);
        }
    }

    async signout() {
        let { ctx } = this;
        ctx.session.user = null;
        this.success('退出成功');
    }
}
module.exports = UsersController;