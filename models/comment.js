//imports sequelize model & datatypes, plus sequelize connection instance
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

//extends comment model from Model
class Comment extends Model {}

//initializes comment model
Comment.init(
{
	id:
	{
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	text:
	{
		type: DataTypes.TEXT,
		allowNull: false,
	},
	date:
	{
		type: DataTypes.DATEONLY,
		defaultValue: DataTypes.NOW,
		allowNull: false,
	},
	user_name:
	{
		type: DataTypes.STRING,
		references:
		{
			model: "user",
			key: "username",
		},
	},
	post_id:
	{
		type: DataTypes.INTEGER,
		references:
		{
			model: "post",
			key: "id",
		},
	},
},
{
	sequelize,
	timestamps: false,
	freezeTableName: true,
	modelName: "comment",
});

module.exports = Comment;