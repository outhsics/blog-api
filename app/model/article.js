module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ObjectId = Schema.Types.ObjectId;
    const ArticleSchema = new Schema({
        title: { type: String, required: true },//标题
        content: { type: String, required: true },//正文
        user: { type: ObjectId, ref: 'User' },//用户作者
        category: {
            type: ObjectId,
            ref: 'Category'
        },
        pv: { type: Number, default: 0 },//page view 页面的访问量
        comments: [//评论
            { user: { type: ObjectId, ref: 'User' }, content: String, createAt: { type: Date, default: Date.now } }
        ],
        createAt: { type: Date, default: Date.now }//创建时间，默认为当前时间
    });
    const Article = mongoose.model('Article', ArticleSchema);
    return Article;
}