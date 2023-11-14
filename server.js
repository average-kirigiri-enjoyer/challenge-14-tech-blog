/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 14 Weekly Challenge - Tech Blog
Created 2023/11/03
Last Edited 2023/11/13
*/

//importing packages & other files necessary for the application
const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const hbs = exphbs.create();
require('dotenv').config();

//initializes express application & express session
const app = express();
const sess =
{
	secret: process.env.SESSION_SECRET,
	cookie:
	{
		expires: 60 * 60 * 1000, //session expires after an hour
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore(
	{
		db: sequelize
	}),
};

//defines application port
const PORT = process.env.PORT || 3001;

//initializes handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess)); //sets application to use express session
app.use(express.json()); //sets application to process incoming JSON data
app.use(express.urlencoded({extended: true})); //sets application to process incoming URL-encoded data
app.use(express.static(path.join(__dirname, 'public'))); //sets application to serve static files from the 'public' folder
app.use(routes); //sets application to use predefined routes

//syncs sequelize models to the database, then start running the server
sequelize.sync({force: false}).then(() =>
{
	app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});