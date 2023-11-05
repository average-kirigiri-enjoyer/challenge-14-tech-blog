//imports all models
const User = require('./user.js');
const Post = require('./post.js');
const Comment = require('./comment.js');

//defining user associations
User.hasMany(Post,
{
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});
User.hasMany(Comment,
{
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

//defining post associations
Post.belongsTo(User,
{
	foreignKey: 'user_id',
});
Post.hasMany(Comment,
{
	foreignKey: 'post_id',
	onDelete: 'CASCADE',
});

//defining comment associations
Comment.belongsTo(User,
{
	foreignKey: 'user_id',
});
Comment.belongsTo(Post,
{
	foreignKey: 'post_id',
});

module.exports =
{
	User,
	Post,
	Comment,
};