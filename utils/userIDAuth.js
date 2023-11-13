//authentication middleware to check if the post a user is attempting to access is associated with their account 
//======================================================================
const {Post} = require('../models'); //importing post model

const userIDAuth = async (req, res, next) =>
{
	try
	{
		//attempts to find a post with an ID matching that of the request parameters
		const post = await Post.findOne({where: {id: req.params.id}});

		//if the ID of the user the post is assigned matches the user ID saved in session storage, proceed with the rest of the code
		if (post.user_id === req.session.user_id)
		{
			next();
		}
		else //otherwise redirect the user to the home page
		{
			res.redirect('/');
		}
	}
	catch (err) //if an error occurs, respond with a status 500, return the error as JSON data, & log the error to console
	{
		console.log(err);
		res.status(500).json(err);
	}
};
//=====================================================================

module.exports = userIDAuth;