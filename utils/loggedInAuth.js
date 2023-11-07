//authentication middleware to check that a user is logged in
//=============================================================
const loginAuth = (req, res, next) =>
{
	if (!req.session.logged_in)
	{
		res.redirect('/login');
	}
	else
	{
		next();
	}
};
//==============================================================

module.exports = loginAuth;