//authentication middleware to check if the post a user is attempting to access is associated with their account 
//======================================================================
const {Post} = require('../models');

const userIDAuth = async (req, res, next) =>
{
	try
	{
		const post = await Post.findOne({where:{id: req.params.id}});

		if (post.user_id === req.session.user_id)
		{
			next();
		}
		else
		{
			res.redirect('/');
		}
	}
	catch (err)
	{
		console.log(err);
		res.status(500).json(err);
	}
};
//=====================================================================

module.exports = userIDAuth;