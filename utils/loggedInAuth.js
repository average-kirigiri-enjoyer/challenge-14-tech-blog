//authentication middleware to check that a user is logged in
//=============================================================
const loginAuth = (req, res, next) =>
{
	//if the user isn't logged in, redirect them to the login page
	if (!req.session.logged_in)
	{
		res.redirect('/login');
	}
	else //otherwise, proceed to the rest of the code
	{
		next();
	}
};
//==============================================================

module.exports = loginAuth;