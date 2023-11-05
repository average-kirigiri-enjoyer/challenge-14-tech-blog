//importing packages, models, & utils
//==============================================================
const router = require('express').Router();
const {Post, Comment} = require('../models');
const loggedInAuth = require('../utils/loggedInAuth');
//==============================================================

//GET route to render the blog's home page
//==============================================================
router.get('/', async (req, res) =>
{
	try
	{
		const postData = await Post.findAll();

		console.log(postData);

		res.status(200).render('homepage',
		{
			postData,
			logged_in: req.session.logged_in,
		});
	}
	catch (err)
	{
		res.status(500).json(err);
	}
});
//==============================================================

//GET route to view a specific blog post
//==============================================================
router.get('/blog-post/:id', loggedInAuth, async (req, res) =>
{
    try
		{
			const blogPostData = await Post.findByPk(req.params.id, {include: [{model: Comment}]});
			const blogPost = blogPostData.get({plain: true});

			console.log(blogPostData);
			console.log(blogPost);

			res.status(200).render('topic',
			{
				blogPost,
				loggedIn: req.session.logged_in,
			});
    }
		catch (err)
		{
			res.status(500).json(err);
    }
});
//==============================================================

//GET route to view the login / sign-up page
//==============================================================
router.get('/login', (req, res) =>
{
	if (req.session.loggedIn)
	{
		res.redirect('/');
		return;
	}
	res.render('login');
});
//==============================================================

module.exports = router;