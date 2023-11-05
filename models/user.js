//imports sequelize model & datatypes, plus sequelize connection instance
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//imports bcrypt
const bcrypt = require('bcrypt');

//extends user model from Model
class User extends Model
{
	checkPassword(loginPassword) //method to compare hashed bcrypt passwords 
	{
		return bcrypt.compareSync(loginPassword, this.password);
	}
}

//initializes user model
User.init(
{
	id:
	{
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	username:
	{
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password:
	{
		type: DataTypes.STRING,
		allowNull: false,
	},
},
{
	hooks:
	{
		//hook to convert a user's password to a 12-character hashed version before it is stored in the database
		beforeCreate: async (userData) =>
		{
			userData.password = await bcrypt.hash(userData.password, 12);
		},
	},
	sequelize,
	timestamps: false,
	freezeTableName: true,
	modelName: 'user',
});

module.exports = User;