const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//if there is a JAWSDB_URL (i.e. application is set up on heroku), use that to initialize the sequelize connection
if (process.env.JAWSDB_URL)
{
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}
else //otherwise (i.e. the application is being run locally), use environmental variables
{
	sequelize = new Sequelize
	(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: 'localhost',
			dialect: 'mysql',
			port: 3306,
		}
	);
}

module.exports = sequelize;