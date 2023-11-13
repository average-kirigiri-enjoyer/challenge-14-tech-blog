//importing router package & models
const router = require("express").Router();
const {User} = require("../../models");
//==============================================================

//API POST route for creating a new user
//==============================================================
router.post("/signup", async (req, res) =>
{
	try
	{
		//attempts to create a new user using data from the request body
		const userData = await User.create(req.body, {individualHooks: true});

		//saves the following data to the user's session
		req.session.save(() =>
		{
			req.session.logged_in = true; //set the 'logged_in' status to 'true'
			req.session.user_name = userData.username; //set the 'user_name' variable to the user's username
			req.session.user_id = userData.id; //set the 'user_id' variable to the user's ID
			res.status(200).json(userData); //responds with a status 200 & the user's data as JSON
		});
	}
	catch (err) //if an error occurs, log the error to console & respond with a status 400 and the error data as JSON
	{
		console.log(err);
		res.status(400).json(err);
	}
});
//==============================================================

//API POST route for logging in a user
//==============================================================
router.post("/login", async (req, res) =>
{
	try
	{
		//attempts to find a user with a username matching that of the request body
		const userData = await User.findOne({where: {username: req.body.username}});

		//if such a user cannot be found, respond with a status 400 & error message 'Invalid username or password' as JSON
		if (!userData)
		{
			res.status(400).json({name: "Invalid username or password"});
			return;
		}

		//uses the user's built-in bcrypt password validation method to compare the user's password to the password provided in the request body
		const passwordValid = await userData.checkPassword(req.body.password);

		//if the passwords do not match, respond with a status 400 & error message 'Invalid username or password' as JSON
		if (!passwordValid)
		{
			res.status(400).json({name: "Invalid username or password",});
			return;
		}

		//saves the following data to the user's session
		req.session.save(() =>
		{
			req.session.logged_in = true; //set the 'logged_in' status to 'true'
			req.session.user_name = userData.username; //set the 'user_name' variable to the user's username
			req.session.user_id = userData.id; //set the 'user_id' variable to the user's ID
			res.status(200).json(userData); //responds with a status 200 & the user's data as JSON
		});
	}
	catch (err) //if an error occurs, log the error to console & respond with a status 400 and the error data as JSON
	{
		res.status(400).json(err);
	}
});
//==============================================================

//API POST route for logging out a user
//==============================================================
router.get("/logout", (req, res) =>
{
	//if the user is logged in, destroy the user's session data, & respond with a status 200 and redirect to the home page
	if (req.session.logged_in)
	{
		req.session.destroy();
		res.status(200).redirect("/");
	}
	else
	{
		res.status(400).json({name: "Error logging out"});
	}
});
//==============================================================

module.exports = router;