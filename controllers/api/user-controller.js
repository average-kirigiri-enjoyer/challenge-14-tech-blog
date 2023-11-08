//importing router package & models
const router = require('express').Router();
const {User} = require('../../models');
//==============================================================

//API POST route for creating a new user
//==============================================================
router.post('/signup', async (req, res) =>
{
	try
	{
		const userData = await User.create(req.body, {individualHooks: true});

		console.log(userData);

		req.session.save(() =>
		{
			req.session.logged_in = true;
			req.session.user_name = userData.username;
			req.session.user_id = userData.id;
			res.status(200).redirect('/');
		});
	}
	catch (err) 
	{
		res.status(400).json(err);
	}
});
//==============================================================

//API POST route for logging in a user
//==============================================================
router.post('/login', async (req, res) =>
{
	try
	{
		const userData = await User.findOne({where: {username: req.body.username}});

		if (!userData)
		{
			res.status(400).json({name: 'Invalid username or password'});
			return;
		}

		const passwordValid = await userData.checkPassword(req.body.password);

		if (!passwordValid)
		{
			res.status(400).json({name: 'Invalid email or password',});
			return;
		}

		req.session.save(() =>
		{
			req.session.logged_in = true;
			req.session.user_name = userData.username;
			req.session.user_id = userData.id;
			res.status(200).redirect('/');
		});

		console.log(req.session.logged_in);	
	}
	catch (err)
	{
		res.status(400).json(err);
	}
});
//==============================================================

//API POST route for logging out a user
//==============================================================
router.get('/logout', (req, res) =>
{
	if (req.session.logged_in)
	{
		req.session.destroy();
		res.status(200).redirect('/');
	}
	else
	{
		res.status(404).json({name: 'Error logging out'});
	}
});
//==============================================================

module.exports = router;