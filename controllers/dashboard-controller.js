//importing packages, models, & utils
const router = require('express').Router();
const {Post} = require('../models');
const loggedInAuth = require('../utils/loggedInAuth');
const userIDAuth = require('../utils/userIDAuth.js')
//==============================================================

//GET route to view the user's dashboard page
// =============================================================
router.get('/', loggedInAuth, async (req, res) =>
{
	try
	{
		const postData = await Post.findAll(
		{
			where:
			{
				user_id: req.session.user_id,
			},
		});
		const posts = postData.map((post) => post.get({plain: true}));

		console.log(posts);

		res.status(200).render('dashboard',
		{
			posts,
			logged_in: req.session.logged_in,
			user_id: req.session.user_id,
		});
	}
	catch (err)
	{
		res.status(500).json(err);
	}
});
//==============================================================

//GET route to render the new blog post creation page
//==============================================================
router.get('/create-post', loggedInAuth, async (req, res) =>
{
	try
	{
		res.render('new-post',
		{
			logged_in: req.session.logged_in,
		});
	}
	catch (err)
	{
		res.status(500).json(err);
	}
});
//==============================================================

//GET route to render the blog post edit page
//==============================================================
router.get('/edit/:id', loggedInAuth, userIDAuth, async (req, res) =>
{
	try
	{
		const blogPostData = await Post.findByPk(req.params.id);
		const blogPost = blogPostData.get({plain: true});

		console.log(blogPostData);
		const {title, text} = blogPost;

		res.render('new-post',
		{
			title, text, logged_in: req.session.logged_in, edit: true,
		});
	}
	catch (err)
	{
		res.status(500).json(err);
	}
});
//==============================================================

module.exports = router;