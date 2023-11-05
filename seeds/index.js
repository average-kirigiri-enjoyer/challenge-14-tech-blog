//importing necessary files for seeding database
const sequelize = require('../config/connection');
const userSeeds = require('./user-seeds');
const postSeeds = require('./post-seeds');
const commentSeeds = require('./comment-seeds');

//function to seed database
const seedDatabase = async () =>
{
	//initializes sequelize connection, & forces database to update as per the following code
	await sequelize.sync({force: true});

	//seeds database using pre-defined user, post, & comment data
	await userSeeds();
	await postSeeds();
	await commentSeeds();

	console.log('seeding complete');
	process.exit(0); //ends sequelize connection
};

//seeds database
seedDatabase();