//imports user model
const {User} = require('../models');

//defines sample user data
const userData =
[
	{
		username: 'HAHAHAHA',
		password: 'HAHAHAHA',
	},
	{
		username: 'username',
		password: 'password',
	},
	{
		username: 'test',
		password: 'test',
	},
];

//bulk-creates user data in database
const userSeeds = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = userSeeds;