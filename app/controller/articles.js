const BaseController = require('./base');
module.exports = class ArticlesController extends BaseController {
    async index() {
        try {
            //'Article', ['title', 'content'], ['category']
            await this.getPager({
                modName: 'Article',
                returnFields: ['title', 'content'],
                populateFields: ['category', 'user', 'comments.user']
            })
        } catch (error) {
            this.error(error);
        }
    }
    async create() {
        const { ctx } = this;
        let article = ctx.request.body;
        article.user = this.user;
        try {
            article = await ctx.model.Article.create(article);
            this.success('文章发表成功');
        } catch (error) {
            this.error(error);
        }
    }
    async update() {
        const { ctx } = this;
        let id = ctx.params.id;
        let article = ctx.request.body;
        try {
            await ctx.model.Article.findByIdAndUpdate(id, article);
            this.success('更新文章成功');
        } catch (error) {
            this.error(error);
        }
    }
    //删除文章
    async destroy() {
        const { ctx } = this;
        let id = ctx.params.id;
        let { ids = [] } = ctx.request.body;
        ids.push(id);
        try {
            await ctx.model.Article.remove({ _id: { $in: ids } });
            this.success('删除文章成功');
        } catch (error) {
            this.error(error);
        }
    }

    async addPv() {
        const { ctx } = this;
        let id = ctx.params.id;
        try {
            await ctx.model.Article.findByIdAndUpdate(id, { $inc: { pv: 1 } });
            this.success('修改PV成功');
        } catch (error) {
            this.error(error);
        }
    }

    async addComment() {
        const { ctx } = this;
        let id = ctx.params.id;
        let comment = ctx.request.body;
        comment.user = this.user;
        try {
            await ctx.model.Article.findByIdAndUpdate(id, { $push: { comments: comment } });
            this.success('评论成功');
        } catch (error) {
            this.error(error);
        }
    }
    async removeComment() {
        const { ctx } = this;
        let { article_id, comment_id } = ctx.params;
        try {
            await ctx.model.Article.findByIdAndUpdate(article_id, { $pull: { comments: { _id: comment_id } } });
            this.success('删除评论成功');
        } catch (error) {
            this.error(error);
        }
    }
}