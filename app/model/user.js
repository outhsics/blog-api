//app代表应用对象
module.exports = app => {
    //先得到mongoose的模块,通过它可以定义骨架模型和model
    let mongoose = app.mongoose;
    //先定义Schema ，通过它可以定义集合里文档的属性名和类型
    let Schema = mongoose.Schema;
    //用户集合的模型骨架，它不连接数据库也不能操作数据
    let UserSchema = new Schema({
        username: String,
        password: String,
        email: String
    });
    //返回一个用户模型，用户模型是可以对数据库进行增删改查的
    return mongoose.model('User', UserSchema);
}